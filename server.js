require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require("path");

// --- Database and Authentication Imports ---
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { constants } = require('buffer');

// --- SETUP ---
const app = express();
app.use(cors());
app.use(express.json());

// Serve React app in production, fallback to public folder for development
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
} else {
    app.use(express.static('public'));
}

// --- DATABASE SETUP & INITIALIZATION ---
const db = new Database('wellness.db');

const createTables = `
    CREATE TABLE IF NOT EXISTS Users (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL UNIQUE,
        Email TEXT NOT NULL UNIQUE,
        PasswordHash TEXT NOT NULL,
        CreatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS JournalEntries (
        EntryID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        Title TEXT NOT NULL,
        Content TEXT NOT NULL,
        CreatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    CREATE TABLE IF NOT EXISTS DailyQuestions (
        ResponseID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        QuestionText TEXT NOT NULL,
        AnswerText TEXT NOT NULL,
        AnsweredAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    CREATE TABLE IF NOT EXISTS QuizResults (
        ResultID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        QuizName TEXT NOT NULL,
        Score INTEGER NOT NULL,
        TakenAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    CREATE TABLE IF NOT EXISTS SleepLogs (
        LogID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        LogDate TEXT NOT NULL,
        HoursSlept REAL NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
`;
db.exec(createTables);
console.log("Database connected and tables are ready.");

// --- AUTHENTICATION MIDDLEWARE ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token is not valid" });
        req.user = user;
        next();
    });
}

// --- AUTHENTICATION ENDPOINTS ---
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required." });
    }
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    try {
        const stmt = db.prepare('INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)');
        stmt.run(username, email, passwordHash);
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: "Username or email already exists." });
        }
        res.status(500).json({ error: "Database error during signup." });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const stmt = db.prepare('SELECT * FROM Users WHERE Username = ?');
    const user = stmt.get(username);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
    }
    const passwordMatch = bcrypt.compareSync(password, user.PasswordHash);
    if (passwordMatch) {
        const tokenPayload = { id: user.UserID, username: user.Username };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ message: "Login successful!", token: token });
    } else {
        res.status(401).json({ error: "Invalid credentials." });
    }
});

// --- SECURED DATA ENDPOINTS ---

// Journal Endpoints
app.post('/journal', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    try {
        const stmt = db.prepare('INSERT INTO JournalEntries (UserID, Title, Content) VALUES (?, ?, ?)');
        stmt.run(userId, title, content);
        res.status(201).json({ message: "Journal entry saved." });
    } catch (error) {
        res.status(500).json({ error: "Failed to save journal entry." });
    }
});
app.get('/journal', authenticateToken, (req, res) => {
    const userId = req.user.id;
    try {
        const stmt = db.prepare('SELECT Title, Content, CreatedAt FROM JournalEntries WHERE UserID = ? ORDER BY CreatedAt DESC');
        const entries = stmt.all(userId);
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve journal entries." });
    }
});

// Daily Question Endpoints
app.post('/daily-question', authenticateToken, (req, res) => {
    const { questionText, answerText } = req.body;
    const userId = req.user.id;
    if (!questionText || !answerText) {
        return res.status(400).json({ error: "Question and answer are required." });
    }
    try {
        const stmt = db.prepare('INSERT INTO DailyQuestions (UserID, QuestionText, AnswerText) VALUES (?, ?, ?)');
        stmt.run(userId, questionText, answerText);
        res.status(201).json({ message: "Answer saved successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to save daily question answer." });
    }
});
app.get('/daily-question', authenticateToken, (req, res) => {
    const userId = req.user.id;
    try {
        const stmt = db.prepare('SELECT QuestionText, AnswerText, AnsweredAt FROM DailyQuestions WHERE UserID = ? ORDER BY AnsweredAt DESC');
        const answers = stmt.all(userId);
        res.json(answers);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve answers." });
    }
});

// Sleep Log Endpoints
app.post('/sleep-log', authenticateToken, (req, res) => {
    const { date, hours } = req.body;
    const userId = req.user.id;
    if (!date || !hours) {
        return res.status(400).json({ error: "Date and hours are required." });
    }
    try {
        const stmt = db.prepare('INSERT INTO SleepLogs (UserID, LogDate, HoursSlept) VALUES (?, ?, ?)');
        stmt.run(userId, date, hours);
        res.status(201).json({ message: "Sleep log saved successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to save sleep log." });
    }
});
app.get('/sleep-log', authenticateToken, (req, res) => {
    const userId = req.user.id;
    try {
        const stmt = db.prepare('SELECT LogDate, HoursSlept FROM SleepLogs WHERE UserID = ? ORDER BY LogDate ASC');
        const logs = stmt.all(userId);
        
        // If no sleep logs exist, create some sample data
        if (logs.length === 0) {
            const insertStmt = db.prepare('INSERT INTO SleepLogs (UserID, LogDate, HoursSlept) VALUES (?, ?, ?)');
            const today = new Date();
            
            // Add 7 days of sample sleep data
            for (let i = 6; i >= 0; i--) {
                const logDate = new Date(today);
                logDate.setDate(today.getDate() - i);
                const randomHours = 6 + Math.random() * 3; // 6-9 hours
                insertStmt.run(userId, logDate.toISOString().split('T')[0], randomHours.toFixed(1));
            }
            
            // Get the newly created logs
            const newLogs = stmt.all(userId);
            res.status(200).json(newLogs);
        } else {
            res.status(200).json(logs);
        }
    } catch (error) {
        console.error('Sleep log error:', error);
        res.status(500).json({ error: "Failed to retrieve sleep logs." });
    }
});

// Quiz Endpoints
app.post('/emotion-analyze', authenticateToken, async (req, res) => {
    try {
        const { answers, score } = req.body;
        const userId = req.user.id;
        
        // Get recent user data for context
        const sleepStmt = db.prepare(`
            SELECT LogDate, HoursSlept FROM SleepLogs 
            WHERE UserID = ? ORDER BY LogDate DESC LIMIT 7
        `);
        const recentSleep = sleepStmt.all(userId);
        
        const journalStmt = db.prepare(`
            SELECT Content, CreatedAt FROM JournalEntries 
            WHERE UserID = ? ORDER BY CreatedAt DESC LIMIT 3
        `);
        const recentJournals = journalStmt.all(userId);
        
        // Format context data
        const sleepContext = recentSleep.length > 0 ? 
            `Recent sleep: ${recentSleep.map(s => `${s.LogDate}: ${s.HoursSlept}h`).join(', ')}` : 
            'No recent sleep data';
            
        const journalContext = recentJournals.length > 0 ? 
            `Recent journal themes: ${recentJournals.map(j => j.Content.substring(0, 100)).join('; ')}` : 
            'No recent journal entries';
        
        const answersText = Object.keys(answers).map(key => `${key}: ${answers[key]}`).join('\n');
        
        const prompt = `You are a mental health AI assistant. Based on the quiz answers and user's recent data, analyze their emotional state and return a single word from this list: Sadness, Anger, Fear, Happiness.

QUIZ ANSWERS:
${answersText}

RECENT CONTEXT:
${sleepContext}
${journalContext}

Consider both the quiz responses and the context data to determine the most accurate emotional state. Return only one word from the list.`;

        const result = await model.generateContent(prompt);
        const emotion = (await result.response).text().trim().replace(/[^a-zA-Z]/g, '');
        
        // Ensure the emotion is from our valid list
        const validEmotions = ['Sadness', 'Anger', 'Fear', 'Happiness'];
        const finalEmotion = validEmotions.includes(emotion) ? emotion : 'Mixed';
        
        const stmt = db.prepare('INSERT INTO QuizResults (UserID, QuizName, Score) VALUES (?, ?, ?)');
        stmt.run(userId, "Emotion Check-in Quiz", score);
        
        res.json({ emotion: finalEmotion, message: "Quiz result saved with comprehensive analysis." });
    } catch (error) {
        console.error("Error in /emotion-analyze endpoint:", error);
        res.status(500).json({ error: "Failed to analyze emotion and save result" });
    }
});
app.get('/quiz-results', authenticateToken, (req, res) => {
    const userId = req.user.id;
    try {
        const stmt = db.prepare('SELECT QuizName, Score, TakenAt FROM QuizResults WHERE UserID = ? ORDER BY TakenAt DESC');
        const results = stmt.all(userId);
        res.json(results);
    } catch (error) {
        console.error("Database error fetching quiz results:", error);
        res.status(500).json({ error: "Failed to retrieve quiz results." });
    }
});

// --- GEMINI API ENDPOINTS ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Chat history storage
const chatHistory = new Map();

app.post('/chat-with-clario', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { message } = req.body;

    try {
        // Initialize or get user's chat history
        if (!chatHistory.has(userId)) {
            chatHistory.set(userId, []);
        }
        const userHistory = chatHistory.get(userId);

        // Add user's message to history
        userHistory.push({ role: "user", content: message });

        // Check if this is a quiz analysis request
        const isQuizAnalysisRequest = /quiz|test|score|mental health|emotional|assessment/i.test(message);
        
        // Construct the conversation context
        let prompt = `You are Clario, a friendly and empathetic AI assistant. Respond naturally to the user's messages as if having a casual conversation, while being supportive and understanding. You can discuss any topic they bring up, share knowledge, or help solve problems.

        Important guidelines:
        - Be conversational and natural, like chatting with a friend
        - Feel free to express personality and engage in casual topics
        - If they ask questions, provide helpful and informative answers
        - Be supportive if they share personal experiences or concerns
        - You can make appropriate suggestions or give advice when relevant
        - You can gently ask follow-up questions if it helps the conversation flow

        Previous conversation:
        ${userHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`;

        // If it's a quiz analysis request, include user's quiz data
        if (isQuizAnalysisRequest) {
            const quizStmt = db.prepare(`
                SELECT SubmissionDate, Score, Answers FROM QuizResults 
                WHERE UserID = ? 
                ORDER BY SubmissionDate DESC 
                LIMIT 5
            `);
            const quizResults = quizStmt.all(userId);

            if (quizResults.length > 0) {
                const quizData = quizResults.map(quiz => {
                    const answers = JSON.parse(quiz.Answers || '{}');
                    return `${quiz.SubmissionDate}: Score ${quiz.Score}`;
                }).join('\n');

                prompt += `

                **IMPORTANT: The user is asking about quizzes/mental health. Here are their recent quiz results:**
                
                QUIZ RESULTS (last 5):
                ${quizData}
                
                Based on this quiz data, provide insights about their mental health patterns, emotional trends, and supportive recommendations. Be empathetic and focus on their progress and well-being.`;
            } else {
                prompt += `

                **NOTE: The user is asking about quizzes but hasn't taken any yet. Encourage them to take some mental health quizzes to track their wellness.**`;
            }
        }

        prompt += `

        User's message: ${message}

        Respond naturally to continue the conversation:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponse = response.text().trim();

        // Add AI's response to history
        userHistory.push({ role: "assistant", content: aiResponse });

        // Limit history size
        if (userHistory.length > 20) {
            userHistory.splice(0, 2); // Remove oldest pair of messages
        }

        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("Error in chat endpoint:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.get('/get-daily-question', async (req, res) => {
    try {
        const prompt = `Generate a single, open-ended, and reflective question for a user's daily journal. Only return the question text itself, without any introductory phrases.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const questionText = response.text().replace(/"/g, '').trim();
        res.json({ question: questionText });
    } catch (error) {
        console.error("Error in /get-daily-question endpoint:", error);
        res.status(500).json({ error: "Failed to get a question from the AI." });
    }
});

app.post('/analyze-sleep-mood', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get the last 7 days of sleep logs
        const stmt = db.prepare(`
            SELECT LogDate, HoursSlept 
            FROM SleepLogs 
            WHERE UserID = ? 
            ORDER BY LogDate DESC 
            LIMIT 7
        `);
        const sleepLogs = stmt.all(userId);

        if (sleepLogs.length === 0) {
            return res.status(404).json({ error: "No sleep data found" });
        }

        const sleepData = sleepLogs.map(log => `${log.LogDate}: ${log.HoursSlept} hours`).join('\n');
        
        const prompt = `You are a mental health AI assistant. Based on the following sleep data, ask a relevant question about the user's mood and well-being. Consider sleep patterns and potential impacts on mental health. Sleep data for the last 7 days:\n${sleepData}\n\nBased on this data, formulate a caring, empathetic question about the user's well-being.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const question = response.text().trim();
        
        res.json({ question: question });
    } catch (error) {
        console.error("Error in /analyze-sleep-mood endpoint:", error);
        res.status(500).json({ error: "Failed to analyze sleep data" });
    }
});

// Quiz Analysis Endpoint
app.post('/analyze-quiz-results', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get user's quiz results
        const stmt = db.prepare(`
            SELECT SubmissionDate, Score, Answers 
            FROM QuizResults 
            WHERE UserID = ? 
            ORDER BY SubmissionDate DESC 
            LIMIT 10
        `);
        const quizResults = stmt.all(userId);

        if (quizResults.length === 0) {
            return res.status(404).json({ error: "No quiz results found" });
        }

        // Format quiz data for analysis
        const quizData = quizResults.map(quiz => {
            const answers = JSON.parse(quiz.Answers || '{}');
            return `Date: ${quiz.SubmissionDate}, Score: ${quiz.Score}, Answers: ${Object.entries(answers).map(([q, a]) => `Q${q}: ${a}`).join(', ')}`;
        }).join('\n');

        // Create focused quiz analysis prompt
        const prompt = `You are Clario, an empathetic AI assistant. Analyze this user's quiz results to provide insights about their mental health patterns and emotional well-being trends.

QUIZ RESULTS DATA:
${quizData}

Based on these quiz results, please provide:
1. Overall emotional/mental health patterns you observe
2. Any concerning trends or positive improvements
3. Specific insights about their responses
4. Personalized recommendations for mental wellness
5. Encouragement and next steps

Be supportive, empathetic, and focus specifically on what the quiz results reveal about their mental state. Keep response under 400 words.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = response.text().trim();
        
        res.json({ 
            analysis: analysis,
            quizCount: quizResults.length,
            latestScore: quizResults[0]?.Score || 0,
            averageScore: Math.round(quizResults.reduce((sum, quiz) => sum + quiz.Score, 0) / quizResults.length)
        });
        
    } catch (error) {
        console.error("Error in quiz analysis:", error);
        res.status(500).json({ error: "Failed to analyze quiz results" });
    }
});

// --- START THE SERVER ---
const PORT = 3000;

// Catch-all handler for React Router (must be after API routes)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});