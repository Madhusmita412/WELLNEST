// Universal Language System for Clario Website
// This file provides language switching functionality for all pages

class ClarionLanguageSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('clario-language') || 'en';
        this.translations = this.getTranslations();
        this.init();
    }

    // Comprehensive translation database for entire website
    getTranslations() {
        return {
            en: {
                // Common Navigation & Headers
                "Dashboard": "Dashboard",
                "Home": "Home",
                "Condition A-Z": "Condition A-Z",
                "Anxiety": "Anxiety",
                "Depression": "Depression",
                "Sleep Disorder": "Sleep Disorder",
                "View More": "View More",
                "Face Analysis": "Face Analysis",
                "Journal": "Journal",
                "Wellness Practice": "Wellness Practice",
                "Daily Question": "Daily Question",
                "Quiz": "Quiz",
                "Chat with AI": "Chat with AI",
                "Sleep Tracker": "Sleep Tracker",
                "OCD": "OCD",
                "PTSD": "PTSD",
                "Bipolar": "Bipolar",
                "Panic": "Panic",
                "Gaslighting": "Gaslighting",
                "Emotion": "Emotion",
                
                // Common UI Elements
                "Search wellness topics...": "Search wellness topics...",
                "Searching...": "Searching...",
                "No results found": "No results found",
                "Back": "Back",
                "Next": "Next",
                "Submit": "Submit",
                "Cancel": "Cancel",
                "Save": "Save",
                "Delete": "Delete",
                "Edit": "Edit",
                "Close": "Close",
                "Loading...": "Loading...",
                "Try Again": "Try Again",
                "Get Started": "Get Started",
                "Learn More": "Learn More",
                
                // User Account
                "Sign Up": "Sign Up",
                "Login": "Login",
                "Logout": "Logout",
                "Logged in as:": "Logged in as:",
                "Profile": "Profile",
                "Settings": "Settings",
                "Account": "Account",
                "Password": "Password",
                "Email": "Email",
                "Username": "Username",
                
                // Dashboard Specific
                "Your safe space for mental wellness": "Your safe space for mental wellness",
                "Hero description": "In a world that demands so much, finding a place to simply be is essential. We've created a secure, professional, and welcoming environment for you to care for your mind. Whether you're navigating challenges or seeking personal growth, our doors are open.",
                "Our global presence": "Our global presence",
                "970M+": "970M+",
                "People affected by mental health conditions worldwide": "People affected by mental health conditions worldwide",
                "1 in 4": "1 in 4",
                "People will experience a mental health problem each year": "People will experience a mental health problem each year",
                "50+": "50+",
                "Countries where we provide mental health support": "Countries where we provide mental health support",
                "24/7": "24/7",
                "Round-the-clock support available globally": "Round-the-clock support available globally",
                "Your Daily Check-in": "Your Daily Check-in",
                "Answer Now": "Answer Now",
                
                // Journal Page
                "My Wellness Journal": "My Wellness Journal",
                "Write your thoughts...": "Write your thoughts...",
                "How are you feeling today?": "How are you feeling today?",
                "Save Entry": "Save Entry",
                "New Entry": "New Entry",
                "Today": "Today",
                "Yesterday": "Yesterday",
                "This Week": "This Week",
                "Mood": "Mood",
                "Energy Level": "Energy Level",
                "Sleep Quality": "Sleep Quality",
                "Stress Level": "Stress Level",
                
                // Chat Page
                "Chat with Your Wellness Assistant": "Chat with Your Wellness Assistant",
                "Type your message...": "Type your message...",
                "Send": "Send",
                "AI is typing...": "AI is typing...",
                "Clear Chat": "Clear Chat",
                "New Conversation": "New Conversation",
                
                // Practice Page
                "Wellness Practices": "Wellness Practices",
                "Meditation": "Meditation",
                "Breathing Exercises": "Breathing Exercises",
                "Mindfulness": "Mindfulness",
                "Relaxation": "Relaxation",
                "Start Practice": "Start Practice",
                "Duration": "Duration",
                "Minutes": "Minutes",
                "Begin": "Begin",
                "Pause": "Pause",
                "Resume": "Resume",
                "Complete": "Complete",
                
                // Quiz Page
                "Mental Health Quiz": "Mental Health Quiz",
                "Question": "Question",
                "of": "of",
                "Previous": "Previous",
                "Finish Quiz": "Finish Quiz",
                "Your Score": "Your Score",
                "Correct": "Correct",
                "Incorrect": "Incorrect",
                "Review Answers": "Review Answers",
                "Retake Quiz": "Retake Quiz",
                
                // Sleep Tracker
                "Sleep Tracker": "Sleep Tracker",
                "Bedtime": "Bedtime",
                "Wake Time": "Wake Time",
                "Sleep Duration": "Sleep Duration",
                "Sleep Quality": "Sleep Quality",
                "Hours": "Hours",
                "Record Sleep": "Record Sleep",
                "Sleep History": "Sleep History",
                
                // Condition Pages
                "Symptoms": "Symptoms",
                "Treatment": "Treatment",
                "Self-Help": "Self-Help",
                "When to Seek Help": "When to Seek Help",
                "Resources": "Resources",
                "Support Groups": "Support Groups",
                "Professional Help": "Professional Help",
                
                // Common Messages
                "Welcome": "Welcome",
                "Thank you": "Thank you",
                
                // Question Page Specific
                "Today's Question from Clario": "Today's Question from Clario",
                "Your Answer:": "Your Answer:",
                "Save Answer": "Save Answer",
                "Your Past Answers": "Your Past Answers",
                "Your previous answers will appear here.": "Your previous answers will appear here.",
                "Take a moment to reflect and write your answer here...": "Take a moment to reflect and write your answer here...",
                "Your Daily Question": "Your Daily Question",
                
                // Common Daily Questions
                "What's one thing you are grateful for today?": "What's one thing you are grateful for today?",
                "How are you feeling right now?": "How are you feeling right now?",
                "What brings you peace?": "What brings you peace?",
                "What is something you learned about yourself recently?": "What is something you learned about yourself recently?",
                "What are you looking forward to?": "What are you looking forward to?",
                "What challenge are you currently facing?": "What challenge are you currently facing?",
                "What makes you feel most like yourself?": "What makes you feel most like yourself?",
                
                // Quiz Page Specific
                "Wellness Quizzes": "Wellness Quizzes",
                "TAKE A QUIZ": "TAKE A QUIZ",
                "What Emotion Are You?": "What Emotion Are You?",
                "What's Your Attachment Style?": "What's Your Attachment Style?",
                "Are You Being Gaslighted?": "Are You Being Gaslighted?",
                "Your Past Quiz Results": "Your Past Quiz Results",
                "quiz-description": "A quiz can't tell you everything you need to know about yourself, but it can help provide insight into some of your personality traits, behaviors, and how you view and respond to the world around you. If you're curious about a particular aspect of your personality or something that's going on in your life and relationships, try out one of our quizzes below to find out more about what your thoughts and feelings may say about you.",
                "You have no saved quiz results yet.": "You have no saved quiz results yet.",
                "Could not load your past quiz results.": "Could not load your past quiz results.",
                "Failed to save your quiz result.": "Failed to save your quiz result.",
                "Congratulations": "Congratulations",
                "Success": "Success",
                "Error": "Error",
                "Warning": "Warning",
                "Information": "Information",
                "Please wait...": "Please wait...",
                "You have no saved answers yet.": "You have no saved answers yet.",
                "Could not load your past answers.": "Could not load your past answers.",
                "Please provide an answer.": "Please provide an answer.",
                "Your answer has been saved!": "Your answer has been saved!",
                "Failed to save your answer.": "Failed to save your answer.",
                "Processing...": "Processing...",
                "Completed": "Completed",
                
                // Language System
                "Switching Language...": "Switching Language...",
                "Please wait while we update the interface": "Please wait while we update the interface",
                "Language switched to English": "Language switched to English",
            },
            hi: {
                // Common Navigation & Headers
                "Dashboard": "डैशबोर्ड",
                "Home": "होम",
                "Condition A-Z": "स्थितियाँ ए-जेड",
                "Anxiety": "चिंता",
                "Depression": "अवसाद",
                "Sleep Disorder": "नींद संबंधी विकार",
                "View More": "और देखें",
                "Face Analysis": "चेहरा विश्लेषण",
                "Journal": "डायरी",
                "Wellness Practice": "कल्याण अभ्यास",
                "Daily Question": "दैनिक प्रश्न",
                "Quiz": "प्रश्नोत्तरी",
                "Chat with AI": "एआई के साथ चैट",
                "Sleep Tracker": "नींद ट्रैकर",
                "OCD": "ओसीडी",
                "PTSD": "पीटीएसडी", 
                "Bipolar": "द्विध्रुवी",
                "Panic": "पैनिक",
                "Gaslighting": "गैसलाइटिंग",
                "Emotion": "भावना",
                "Sleep": "नींद",
                "Practice": "अभ्यास",
                "Chat": "चैट",
                "For You": "आपके लिए",
                "Your Daily Check-in": "आपका दैनिक चेक-इन",
                "Loading your question...": "आपका प्रश्न लोड हो रहा है...",
                "Answer Now": "अब उत्तर दें",
                "For You Today": "आज आपके लिए",
                "Your Sleep Log": "आपका नींद लॉग",
                
                // Dynamic content from dashboard.script.js
                "What's one thing you are grateful for today?": "आज आप किस बात के लिए आभारी हैं?",
                "Journaling is a great way to clear your head. Why not": "डायरी लिखना अपने दिमाग को साफ करने का एक बेहतरीन तरीका है। क्यों न",
                "write an entry?": "एक प्रविष्टि लिखें?",
                "Explore your thoughts with": "अपने विचारों का अन्वेषण करें",
                "Clario, your AI assistant": "क्लारियो, आपके एआई सहायक",
                "Curious about your emotional state?": "अपनी भावनात्मक स्थिति के बारे में उत्सुक हैं?",
                "Take a quick quiz.": "एक त्वरित प्रश्नोत्तरी लें।",
                
                // Chart labels
                "Hours Slept": "नींद के घंटे",
                "Good (7.5+ hrs)": "अच्छा (7.5+ घंटे)",
                "Okay (6-7.5 hrs)": "ठीक (6-7.5 घंटे)",
                "Poor (<6 hrs)": "खराब (<6 घंटे)",
                "Could not load sleep data from the server.": "सर्वर से नींद डेटा लोड नहीं हो सका।",
                "Could not load sleep analysis.": "नींद विश्लेषण लोड नहीं हो सका।",
                
                // Alphabet Navigation
                "Find a topic by its first letter:": "पहले अक्षर से विषय खोजें:",
                "All": "सभी",
                
                // Hindi Alphabet Letters (Devanagari)
                "A": "क", "B": "ख", "C": "ग", "D": "घ", "E": "ङ", 
                "F": "च", "G": "छ", "H": "ज", "I": "झ", "K": "ञ", 
                "L": "ट", "M": "ठ", "N": "ड", "O": "ढ", "P": "ण", 
                "Q": "त", "S": "थ", "T": "द",
                
                "Your Private Journal": "आपकी निजी डायरी",
                
                // Journal Intro Content
                "📖 Your Journal - A Safe Space for Your Thoughts ✨": "📖 आपकी डायरी - आपके विचारों के लिए एक सुरक्षित स्थान ✨",
                "Writing in your journal is more than putting words on a page—it's an act of self-discovery and healing. It's your personal sanctuary, where you can freely express your feelings, release what weighs on your heart, and celebrate the little victories of your journey.": "अपनी डायरी में लिखना केवल पन्ने पर शब्द लिखने से कहीं अधिक है—यह आत्म-खोज और उपचार का कार्य है। यह आपका व्यक्तिगत अभयारण्य है, जहाँ आप अपनी भावनाओं को स्वतंत्र रूप से व्यक्त कर सकते हैं, अपने दिल पर पड़े बोझ को छोड़ सकते हैं, और अपनी यात्रा की छोटी जीत का जश्न मना सकते हैं।",
                "Each entry is a step toward understanding yourself better, building resilience, and finding clarity in moments of doubt. Journaling allows you to transform your worries into wisdom, your dreams into goals, and your reflections into growth.": "हर प्रविष्टि अपने आप को बेहतर समझने, दृढ़ता निर्माण करने, और संदेह के क्षणों में स्पष्टता पाने की दिशा में एक कदम है। डायरी लेखन आपको अपनी चिंताओं को बुद्धि में, अपने सपनों को लक्ष्यों में, और अपने विचारों को विकास में बदलने की अनुमति देता है।",
                "🌱 Every word you write is a seed planted for a stronger, brighter, and more mindful you.": "🌱 आप जो भी शब्द लिखते हैं, वह एक मजबूत, उज्जवल और अधिक सचेत आप के लिए बोया गया बीज है।",
                
                // Journal Form Elements
                "New Entry": "नई प्रविष्टि",
                "Title:": "शीर्षक:",
                "Content:": "सामग्री:",
                "e.g., A Good Day": "जैसे, एक अच्छा दिन",
                "Write your thoughts here...": "अपने विचार यहाँ लिखें...",
                "Save Entry": "प्रविष्टि सहेजें",
                "Past Entries": "पुरानी प्रविष्टियाँ",
                "Loading your journal entries...": "आपकी डायरी प्रविष्टियाँ लोड हो रही हैं...",
                
                // Wellness Practice Page
                "Wellness Practices": "कल्याण अभ्यास",
                "🌟 Wellness Practices – Nurture Your Mind, Body, and Spirit 🌟": "🌟 कल्याण अभ्यास – अपने मन, शरीर और आत्मा का पोषण करें 🌟",
                "Discover simple yet powerful tools to bring balance, peace, and positivity into your daily life. Each practice is designed to help you reduce stress, improve focus, and cultivate a sense of inner calm. Whether you're seeking relaxation, clarity, or mindfulness, these practices empower you to take small steps toward a healthier, happier you.": "अपने दैनिक जीवन में संतुलन, शांति और सकारात्मकता लाने के लिए सरल लेकिन शक्तिशाली उपकरणों की खोज करें। प्रत्येक अभ्यास आपको तनाव कम करने, ध्यान में सुधार करने और आंतरिक शांति की भावना विकसित करने में मदद करने के लिए डिज़ाइन किया गया है। चाहे आप विश्राम, स्पष्टता या सचेतता की तलाश कर रहे हों, ये अभ्यास आपको एक स्वस्थ, खुश व्यक्ति की दिशा में छोटे कदम उठाने की शक्ति देते हैं।",
                
                // Wellness Practice Cards
                "Guided Meditation": "निर्देशित ध्यान",
                "Follow along to calm your mind and reduce stress.": "अपने मन को शांत करने और तनाव कम करने के लिए अनुसरण करें।",
                "Breathing Exercises": "श्वास अभ्यास",
                "Techniques to control your breathing and find focus.": "अपनी सांस को नियंत्रित करने और ध्यान केंद्रित करने की तकनीकें।",
                "Mindfulness": "सचेतता",
                "Learn to stay present and aware of the moment.": "वर्तमान में रहना और पल के प्रति जागरूक रहना सीखें।",
                // Note: "Sleep Log" and "Track your nightly sleep patterns" already exist in translations
                
                "Mental Health AI": "मानसिक स्वास्थ्य एआई",
                "Your safe space for mental wellness": "मानसिक कल्याण के लिए आपका सुरक्षित स्थान",
                "Logged in as:": "लॉग इन किया गया:",
                "Logout": "लॉगआउट",
                "EN": "हिं",
                "Loading recommendations...": "सुझाव लोड हो रहे हैं...",
                "Write down your daily thoughts and feelings.": "अपने दैनिक विचार और भावनाएं लिखें।",
                "Quiz Section": "प्रश्नोत्तरी अनुभाग",
                "Test your wellness knowledge.": "अपने कल्याण ज्ञान का परीक्षण करें।",
                "Chat with AI": "एआई के साथ चैट करें",
                "Talk with your wellness assistant.": "अपने कल्याण सहायक से बात करें।",
                "Sleep Log": "नींद लॉग",
                "Track your nightly sleep patterns.": "अपने रात्रिकालीन नींद पैटर्न को ट्रैक करें।",
                
                // Mental Health Conditions
                "Eating Disorders": "खाने के विकार",
                "Substance Abuse": "मादक पदार्थ का दुरुपयोग",
                "Schizophrenia": "स्किजोफ्रेनिया",
                "ADHD": "एडीएचडी",
                "Suicide Prevention": "आत्महत्या रोकथाम",
                "Dementia": "मनोभ्रंश",
                "Work Stress": "काम का तनाव",
                "Anxiety Disorders": "चिंता विकार",
                "PTSD & Trauma": "पीटीएसडी और आघात",
                "Bipolar Disorder": "द्विध्रुवी विकार",
                
                // Geographical Regions
                "North America": "उत्तर अमेरिका",
                "Europe": "यूरोप", 
                "Asia": "एशिया",
                "Africa": "अफ्रीका",
                "South America": "दक्षिण अमेरिका",
                "Australia": "ऑस्ट्रेलिया",
                "Canada": "कनाडा",
                "Mexico": "मेक्सिको",
                "Eastern Europe": "पूर्वी यूरोप",
                "Scandinavia": "स्कैंडिनेविया",
                "East Asia": "पूर्व एशिया",
                "Japan": "जापान",
                "South Asia": "दक्षिण एशिया",
                "Northern Europe": "उत्तरी यूरोप",
                "Middle East": "मध्य पूर्व",
                "North Africa": "उत्तर अफ्रीका",
                "Argentina": "अर्जेंटीना",
                "New Zealand": "न्यूजीलैंड",
                
                // Statistics and Numbers
                "40M+ affected": "4 करोड़+ प्रभावित",
                "164M+ affected": "16.4 करोड़+ प्रभावित",
                "25M+ affected": "2.5 करोड़+ प्रभावित",
                "60% workforce": "60% कार्यबल",
                "15M+ cases": "1.5 करोड़+ मामले",
                "8M+ individuals": "80 लाख+ व्यक्ति",
                "23% increase": "23% वृद्धि",
                "68% professionals": "68% पेशेवर",
                "76% workers affected": "76% कामगार प्रभावित",
                
                // Mental Health Conditions in Detail
                "Social Media Anxiety": "सोशल मीडिया चिंता",
                "Professional Burnout": "पेशेवर थकावट",
                
                // UI Language Elements
                "English": "अंग्रेजी",
                "Default": "डिफ़ॉल्ट",
                "Hindi": "हिंदी",
                
                // Dashboard Specific Content
                "Hero description": "ऐसी दुनिया में जो बहुत कुछ मांगती है, केवल होने के लिए एक स्थान पाना आवश्यक है। हमने आपके मन की देखभाल के लिए एक सुरक्षित, पेशेवर और स्वागत योग्य वातावरण बनाया है। चाहे आप चुनौतियों से निपट रहे हों या व्यक्तिगत विकास की तलाश कर रहे हों, हमारे दरवाजे खुले हैं।",
                "Explore various health topics.": "विभिन्न स्वास्थ्य विषयों का अन्वेषण करें।",
                "Improve your mental health and find calm.": "अपने मानसिक स्वास्थ्य में सुधार करें और शांति पाएं।",
                
                // About Section
                "Certified": "प्रमाणित",
                "Platform certification": "यह प्लेटफॉर्म मानसिक स्वास्थ्य और कल्याण सहायता के उच्च मानकों को पूरा करता है।",
                "Services": "सेवाएं",
                "Anxiety Support": "चिंता सहायता",
                "Depression Care": "अवसाद देखभाल",
                "Sleep Wellness": "नींद कल्याण",
                "Mindfulness Practice": "सचेतता अभ्यास",
                "Resources": "संसाधन",
                "Mental Health A-Z": "मानसिक स्वास्थ्य ए-जेड",
                "Crisis Support": "संकट सहायता",
                "OCD Resources": "ओसीडी संसाधन",
                "Relationship Support": "रिश्ते की सहायता",
                "Emotion Analysis": "भावना विश्लेषण",
                "Tools": "उपकरण",
                "Daily Journal": "दैनिक डायरी",
                "Check-in Questions": "चेक-इन प्रश्न",
                "Wellness Assessments": "कल्याण मूल्यांकन",
                "AI Chat Support": "एआई चैट सहायता",
                "Attachment Insights": "अनुलग्नक अंतर्दृष्टि",
                "Emotion Tracking": "भावना ट्रैकिंग",
                "Quick Links": "त्वरित लिंक",
                "About Us": "हमारे बारे में",
                "Success Stories": "सफलता की कहानियां",
                "Wellness Library": "कल्याण पुस्तकालय",
                "Join Our Team": "हमारी टीम में शामिल हों",
                "Become a Partner": "पार्टनर बनें",
                "Connect With Us": "हमसे जुड़ें",
                "Latest Updates": "नवीनतम अपडेट",
                "Privacy & Terms": "गोपनीयता और शर्तें",
                "Copyright": "© 2025 क्लारियो मानसिक कल्याण समाधान प्राइवेट लिमिटेड",
                
                // Brand and Interface
                "Clario": "क्लारियो",
                "EN": "हिं",
                "Dashboard": "डैशबोर्ड", 
                "Chat with Clario": "क्लारियो के साथ चैट करें",
                "Send Message": "संदेश भेजें",
                "Your Private Journal": "आपकी निजी डायरी",
                "New Entry": "नई प्रविष्टि",
                
                // Condition A-Z Page
                "Conditions A-Z": "स्थितियां ए-जेड",
                "How can we help you?": "हम आपकी कैसे सहायता कर सकते हैं?",
                "GO": "जाएं",
                "Filter by category:": "श्रेणी के अनुसार फ़िल्टर करें:",
                "All Conditions": "सभी स्थितियां",
                "Anxiety Related": "चिंता संबंधी",
                "Mood Disorders": "मूड विकार",
                "Personality Disorders": "व्यक्तित्व विकार",
                "Eating Disorders": "भोजन विकार",
                "Sleep Disorders": "नींद विकार",
                "Trauma Related": "आघात संबंधी",
                "Behavioral Disorders": "व्यवहार विकार",
                "Developmental": "विकासात्मक",
                "Meditation": "ध्यान",
                "Relationships": "रिश्ते",
                "Self-Improvement": "आत्म-सुधार",
                "Therapy": "चिकित्सा",
                "Find a topic by its first letter:": "पहले अक्षर से विषय खोजें:",
                "All": "सभी",
                "Health Conditions A-Z": "स्वास्थ्य स्थितियां ए-जेड",
                "Comprehensive guide to mental health conditions organized alphabetically": "मानसिक स्वास्थ्य स्थितियों के लिए वर्णानुक्रम में व्यवस्थित व्यापक गाइड",
                
                // Mental health conditions
                "Addiction": "नशा",
                "ADHD, Childhood": "एडीएचडी, बचपन",
                "Adjustment Disorder": "समायोजन विकार",
                "Alcohol Addiction": "शराब की लत",
                "Alzheimer's Disease": "अल्जाइमर रोग",
                "Anorexia": "एनोरेक्सिया",
                "Antisocial Personality Disorder": "असामाजिक व्यक्तित्व विकार",
                "ADHD": "एडीएचडी",
                "Agoraphobia": "एगोराफोबिया",
                "Bipolar Disorder": "द्विध्रुवी विकार",
                "Borderline Personality": "बॉर्डरलाइन व्यक्तित्व",
                "Body Dysmorphia": "शारीरिक विकृति",
                "Burnout": "बर्नआउट",
                "Chronic Pain": "पुराना दर्द",
                "Conduct Disorder": "आचरण विकार",
                "Delayed Sleep Phase Syndrome": "विलंबित नींद चरण सिंड्रोम",
                "Dementia": "डिमेंशिया",
                "Depression, Childhood": "अवसाद, बचपन",
                "Disruptive Mood Dysregulation Disorder": "विघटनकारी मूड नियंत्रण विकार",
                "Drug Addiction": "नशीली दवाओं की लत",
                "DSM-5": "डीएसएम-5",
                "Dissociative Disorders": "वियोजनात्मक विकार",
                "Emotional Dysregulation": "भावनात्मक नियंत्रण की कमी",
                "Anxiety Disorders": "चिंता विकार",
                "Explosive Disorder": "विस्फोटक विकार",
                "Phobias": "फोबिया",
                "Gaslighting": "गैसलाइटिंग",
                "Grief & Loss": "शोक और हानि",
                "Hoarding": "जमाखोरी",
                "Insomnia": "अनिद्रा",
                "Intermittent Explosive": "रुक-रुक कर विस्फोटक",
                "Major Depression": "प्रमुख अवसाद",
                "Narcissistic Personality": "नार्सिसिस्टिक व्यक्तित्व",
                "Obsessive-Compulsive": "जुनूनी-बाध्यकारी",
                "Oppositional Defiant": "विपक्षी उद्दंड",
                "Panic Disorder": "पैनिक विकार",
                "PTSD": "पीटीएसडी",
                "Schizophrenia": "सिज़ोफ्रेनिया",
                "Seasonal Depression": "मौसमी अवसाद",
                "Social Anxiety": "सामाजिक चिंता",
                "Stress Disorders": "तनाव विकार",
                "Trauma Disorders": "आघात विकार",
                "Trichotillomania": "ट्रिकोटिलोमेनिया",
                
                // Condition descriptions
                "Learn about types, symptoms, and treatments.": "प्रकार, लक्षण और उपचार के बारे में जानें।",
                "Attention Deficit Hyperactivity Disorder symptoms and management.": "ध्यान की कमी हाइपरएक्टिविटी डिसऑर्डर के लक्षण और प्रबंधन।",
                "Understanding substance and behavioral addictions.": "पदार्थ और व्यवहारिक लत को समझना।",
                "Fear of situations where escape might be difficult.": "ऐसी स्थितियों का डर जहां बचना मुश्किल हो।",
                "Find resources on living with bipolar disorder.": "द्विध्रुवी विकार के साथ जीने पर संसाधन खोजें।",
                "Understanding intense relationships and emotions.": "तीव्र रिश्ते और भावनाओं को समझना।",
                "Distorted body image and appearance concerns.": "विकृत शरीर छवि और रूप संबंधी चिंताएं।",
                "Work-related stress and emotional exhaustion.": "कार्य-संबंधित तनाव और भावनात्मक थकान।",
                "Coping strategies and treatment options.": "मुकाबला रणनीति और उपचार विकल्प।",
                "Behavioral problems in children and teens.": "बच्चों और किशोरों में व्यवहारिक समस्याएं।",
                "Understand the signs and how to seek help.": "संकेतों को समझें और मदद कैसे लें।",
                "Cognitive decline and memory disorders.": "संज्ञानात्मक गिरावट और स्मृति विकार।",
                "Disconnection from thoughts, identity, or memory.": "विचारों, पहचान या स्मृति से डिस्कनेक्शन।",
                "Anorexia, bulimia, and binge eating disorders.": "एनोरेक्सिया, बुलिमिया, और द्विपक्षीय भोजन विकार।",
                "Specific fears and avoidance behaviors.": "विशिष्ट डर और बचाव व्यवहार।",
                "Psychological manipulation and abuse patterns.": "मनोवैज्ञानिक हेरफेर और दुरुपयोग के पैटर्न।",
                "Coping with bereavement and major losses.": "शोक और बड़े नुकसान से निपटना।",
                "Difficulty discarding possessions.": "सामान फेंकने में कठिनाई।",
                "Sleep difficulties and disorders.": "नींद की कठिनाइयां और विकार।",
                "Sudden episodes of aggressive behavior.": "आक्रामक व्यवहार के अचानक एपिसोड।",
                "Severe form of depressive disorder.": "अवसादग्रस्तता विकार का गंभीर रूप।",
                "Conditions affecting emotional state.": "भावनात्मक स्थिति को प्रभावित करने वाली स्थितियां।",
                "Grandiose sense of self-importance.": "आत्म-महत्व की भव्य भावना।",
                "Explore intrusive thoughts and compulsions.": "अनावश्यक विचारों और मजबूरियों का अन्वेषण करें।",
                "Pattern of defiant behavior in children.": "बच्चों में उद्दंड व्यवहार का पैटर्न।",
                "Learn about sudden and repeated panic attacks.": "अचानक और बार-बार होने वाले पैनिक अटैक के बारे में जानें।",
                "Patterns of thinking and behavior.": "सोच और व्यवहार के पैटर्न।",
                "Post-traumatic stress disorder recovery.": "पोस्ट-ट्रॉमेटिक स्ट्रेस डिसऑर्डर रिकवरी।",
                "Understanding symptoms and treatments.": "लक्षणों और उपचार को समझना।",
                "Seasonal Affective Disorder (SAD).": "मौसमी भावात्मक विकार (एसएडी)।",
                "Information on insomnia, apnea, and more.": "अनिद्रा, एप्निया और अधिक की जानकारी।",
                "Fear of social situations and judgment.": "सामाजिक स्थितियों और निर्णय का डर।",
                "Acute and chronic stress responses.": "तीव्र और पुरानी तनाव प्रतिक्रियाएं।",
                "Effects of traumatic experiences.": "दर्दनाक अनुभवों के प्रभाव।",
                "Compulsive hair pulling disorder.": "बाध्यकारी बाल खींचने का विकार।",
                
                // Common UI Elements
                "Search wellness topics...": "कल्याण विषय खोजें...",
                "Searching...": "खोज रहे हैं...",
                "No results found": "कोई परिणाम नहीं मिला",
                "Back": "वापस",
                "Next": "अगला",
                "Submit": "जमा करें",
                "Cancel": "रद्द करें",
                "Save": "सेव करें",
                "Delete": "हटाएं",
                "Edit": "संपादित करें",
                "Close": "बंद करें",
                "Loading...": "लोड हो रहा है...",
                "Try Again": "फिर से कोशिश करें",
                "Get Started": "शुरू करें",
                "Learn More": "और जानें",
                
                // User Account
                "Sign Up": "साइन अप",
                "Login": "लॉगिन",
                "Logout": "लॉगआउट",
                "Logged in as:": "के रूप में लॉग इन:",
                "Profile": "प्रोफाइल",
                "Settings": "सेटिंग्स",
                "Account": "खाता",
                "Password": "पासवर्ड",
                "Email": "ईमेल",
                "Username": "उपयोगकर्ता नाम",
                
                // Dashboard Specific
                "Your safe space for mental wellness": "मानसिक कल्याण के लिए आपका सुरक्षित स्थान",
                "Our global presence": "हमारी वैश्विक उपस्थिति",
                "970M+": "97 करोड़+",
                "People affected by mental health conditions worldwide": "दुनियाभर में मानसिक स्वास्थ्य स्थितियों से प्रभावित लोग",
                "1 in 4": "4 में से 1",
                "People will experience a mental health problem each year": "लोग हर साल मानसिक स्वास्थ्य समस्या का अनुभव करेंगे",
                "50+": "50+",
                "Countries where we provide mental health support": "देश जहाँ हम मानसिक स्वास्थ्य सहायता प्रदान करते हैं",
                "24/7": "24/7",
                "Round-the-clock support available globally": "विश्वव्यापी रूप से चौबीसों घंटे सहायता उपलब्ध",
                "Your Daily Check-in": "आपका दैनिक चेक-इन",
                "Answer Now": "अभी उत्तर दें",
                
                // Journal Page
                "My Wellness Journal": "मेरी कल्याण डायरी",
                "Write your thoughts...": "अपने विचार लिखें...",
                "How are you feeling today?": "आज आप कैसा महसूस कर रहे हैं?",
                "Save Entry": "प्रविष्टि सेव करें",
                "New Entry": "नई प्रविष्टि",
                "Today": "आज",
                "Yesterday": "कल",
                "This Week": "इस सप्ताह",
                "Mood": "मूड",
                "Energy Level": "ऊर्जा स्तर",
                "Sleep Quality": "नींद की गुणवत्ता",
                "Stress Level": "तनाव का स्तर",
                
                // Chat Page
                "Chat with Your Wellness Assistant": "अपने कल्याण सहायक के साथ चैट करें",
                "Type your message...": "अपना संदेश टाइप करें...",
                "Send": "भेजें",
                "AI is typing...": "एआई टाइप कर रहा है...",
                "Clear Chat": "चैट साफ़ करें",
                "New Conversation": "नई बातचीत",
                
                // Practice Page
                "Wellness Practices": "कल्याण अभ्यास",
                "Meditation": "ध्यान",
                "Breathing Exercises": "सांस की एक्सरसाइज",
                "Mindfulness": "सचेतता",
                "Relaxation": "विश्राम",
                "Start Practice": "अभ्यास शुरू करें",
                "Duration": "अवधि",
                "Minutes": "मिनट",
                "Begin": "शुरू करें",
                "Pause": "रोकें",
                "Resume": "फिर से शुरू करें",
                "Complete": "पूरा",
                
                // Quiz Page
                "Mental Health Quiz": "मानसिक स्वास्थ्य प्रश्नोत्तरी",
                "Question": "प्रश्न",
                "of": "का",
                "Previous": "पिछला",
                "Finish Quiz": "प्रश्नोत्तरी समाप्त करें",
                "Your Score": "आपका स्कोर",
                "Correct": "सही",
                "Incorrect": "गलत",
                "Review Answers": "उत्तर देखें",
                "Retake Quiz": "प्रश्नोत्तरी फिर से लें",
                
                // Sleep Tracker
                "Sleep Tracker": "नींद ट्रैकर",
                "Bedtime": "सोने का समय",
                "Wake Time": "जागने का समय",
                "Sleep Duration": "नींद की अवधि",
                "Sleep Quality": "नींद की गुणवत्ता",
                "Hours": "घंटे",
                "Record Sleep": "नींद रिकॉर्ड करें",
                "Sleep History": "नींद का इतिहास",
                
                // Condition Pages
                "Symptoms": "लक्षण",
                "Treatment": "उपचार",
                "Self-Help": "स्व-सहायता",
                "When to Seek Help": "सहायता कब लें",
                "Resources": "संसाधन",
                "Support Groups": "सहायता समूह",
                "Professional Help": "व्यावसायिक सहायता",
                
                // Common Messages
                "Welcome": "स्वागत है",
                "Thank you": "धन्यवाद",
                
                // Question Page Specific
                "Today's Question from Clario": "क्लारियो की ओर से आज का प्रश्न",
                "Your Answer:": "आपका उत्तर:",
                "Save Answer": "उत्तर सहेजें",
                "Your Past Answers": "आपके पिछले उत्तर",
                "Your previous answers will appear here.": "आपके पिछले उत्तर यहाँ दिखाई देंगे।",
                "Take a moment to reflect and write your answer here...": "एक पल रुकें और अपना उत्तर यहाँ लिखें...",
                "Your Daily Question": "आपका दैनिक प्रश्न",
                
                // Common Daily Questions in Hindi
                "What's one thing you are grateful for today?": "आज आप किस बात के लिए आभारी हैं?",
                "How are you feeling right now?": "आप अभी कैसा महसूस कर रहे हैं?",
                "What brings you peace?": "आपको क्या शांति देता है?",
                "What is something you learned about yourself recently?": "हाल ही में आपने अपने बारे में क्या सीखा है?",
                "What are you looking forward to?": "आप किस बात का इंतज़ार कर रहे हैं?",
                "What challenge are you currently facing?": "आप वर्तमान में किस चुनौती का सामना कर रहे हैं?",
                "What makes you feel most like yourself?": "कौन सी बात आपको सबसे अधिक खुद जैसा महसूस कराती है?",
                
                // Quiz Page Specific in Hindi
                "Wellness Quizzes": "कल्याण प्रश्नोत्तरी",
                "TAKE A QUIZ": "एक प्रश्नोत्तरी लें",
                "What Emotion Are You?": "आप कौन सी भावना हैं?",
                "What's Your Attachment Style?": "आपका अटैचमेंट स्टाइल क्या है?",
                "Are You Being Gaslighted?": "क्या आपको गैसलाइट किया जा रहा है?",
                "Your Past Quiz Results": "आपके पिछले प्रश्नोत्तरी परिणाम",
                "quiz-description": "एक प्रश्नोत्तरी आपके बारे में सब कुछ नहीं बता सकती, लेकिन यह आपके व्यक्तित्व लक्षणों, व्यवहार, और आप दुनिया को कैसे देखते हैं और उस पर कैसे प्रतिक्रिया करते हैं, इसमें अंतर्दृष्टि प्रदान करने में मदद कर सकती है। यदि आप अपने व्यक्तित्व के किसी विशेष पहलू या अपने जीवन और रिश्तों में चल रही किसी बात के बारे में उत्सुक हैं, तो नीचे दी गई हमारी प्रश्नोत्तरी में से किसी एक को आज़माएं।",
                "You have no saved quiz results yet.": "आपका कोई सहेजा गया प्रश्नोत्तरी परिणाम अभी तक नहीं है।",
                "Could not load your past quiz results.": "आपके पिछले प्रश्नोत्तरी परिणाम लोड नहीं हो सके।",
                "Failed to save your quiz result.": "आपका प्रश्नोत्तरी परिणाम सहेजने में असफल।",
                "Congratulations": "बधाई हो",
                "Success": "सफलता",
                "Error": "त्रुटि",
                "Warning": "चेतावनी",
                "Information": "जानकारी",
                "Please wait...": "कृपया प्रतीक्षा करें...",
                "You have no saved answers yet.": "आपका कोई सहेजा गया उत्तर अभी तक नहीं है।",
                "Could not load your past answers.": "आपके पिछले उत्तर लोड नहीं हो सके।",
                "Please provide an answer.": "कृपया एक उत्तर प्रदान करें।",
                "Your answer has been saved!": "आपका उत्तर सहेज लिया गया है!",
                "Failed to save your answer.": "आपका उत्तर सहेजने में असफल।",
                "Logged in as:": "के रूप में लॉग इन:",
                "Logout": "लॉगआउट",
                "Processing...": "प्रसंस्करण...",
                "Completed": "पूर्ण",
                
                // Login Page Specific
                "Sign In": "साइन इन",
                "Please enter login to your account.": "कृपया अपने खाते में लॉगिन की जानकारी दर्ज करें।",
                "Remember me": "मुझे याद रखें",
                "Forgot Password?": "पासवर्ड भूल गए?",
                "SIGN IN": "साइन इन",
                "Don't have an account?": "खाता नहीं है?",
                "Sign up": "साइन अप",
                
                // Common Translations - Hindi
                "Sign In": "साइन इन",
                "Please enter login to your account.": "कृपया अपने खाते में लॉगिन की जानकारी दर्ज करें।",
                "Remember me": "मुझे याद रखें", 
                "Forgot Password?": "पासवर्ड भूल गए?",
                "SIGN IN": "साइन इन",
                "Don't have an account?": "खाता नहीं है?",
                "Sign up": "साइन अप",
            }
        };
    }

    // Initialize the language system
    init() {
        this.createLanguageToggle();
        this.applyStoredLanguage();
        this.attachEventListeners();
    }

    // Create language toggle HTML if it doesn't exist
    createLanguageToggle() {
        // Check if language toggle already exists
        if (document.getElementById('languageToggle')) return;

        // Find navigation or create one
        let nav = document.querySelector('nav, .top-nav');
        if (!nav) {
            // Create a minimal nav if none exists
            nav = document.createElement('nav');
            nav.className = 'top-nav';
            document.body.insertBefore(nav, document.body.firstChild);
        }

        // Create language toggle HTML
        const languageHTML = `
            <div class="language-container" id="universalLanguageContainer">
                <div class="language-toggle" id="languageToggle">
                    <i class="fas fa-globe language-icon"></i>
                    <span class="current-lang" id="currentLang">${this.currentLanguage.toUpperCase()}</span>
                </div>
                <div class="language-dropdown" id="languageDropdown">
                    <div class="language-option" data-lang="en">
                        <div class="flag-icon flag-en">🇺🇸</div>
                        <span>English</span>
                        <small>Default</small>
                    </div>
                    <div class="language-option" data-lang="hi">
                        <div class="flag-icon flag-hi">🇮🇳</div>
                        <span>हिंदी</span>
                        <small>Hindi</small>
                    </div>
                </div>
            </div>
        `;

        // Add to existing nav structure
        if (nav.querySelector('ul')) {
            const li = document.createElement('li');
            li.innerHTML = languageHTML;
            nav.querySelector('ul').appendChild(li);
        } else {
            nav.innerHTML += languageHTML;
        }

        // Add CSS if not already present
        this.addLanguageCSS();
    }

    // Add necessary CSS for language toggle
    addLanguageCSS() {
        if (document.getElementById('universalLanguageCSS')) return;

        const style = document.createElement('style');
        style.id = 'universalLanguageCSS';
        style.textContent = `
            .language-container {
                position: relative;
                margin-left: 15px;
                display: inline-block;
            }
            
            .language-toggle {
                width: 50px;
                height: 45px;
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
                gap: 2px;
                padding: 0 8px;
            }
            
            .language-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(46, 125, 50, 0.4);
            }
            
            .language-icon {
                color: white;
                font-size: 1rem;
            }
            
            .current-lang {
                color: white;
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            
            .language-dropdown {
                position: absolute;
                top: 55px;
                right: 0;
                width: 200px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                border: 2px solid rgba(46, 125, 50, 0.2);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-20px) scale(0.9);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1001;
                overflow: hidden;
            }
            
            .language-dropdown.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }
            
            .language-option {
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(46, 125, 50, 0.1);
            }
            
            .language-option:hover {
                background: rgba(46, 125, 50, 0.1);
            }
            
            .language-option.active::after {
                content: '✓';
                margin-left: auto;
                color: #4caf50;
                font-weight: bold;
            }
            
            .flag-icon {
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Apply stored language on page load
    applyStoredLanguage() {
        if (this.currentLanguage !== 'en') {
            setTimeout(() => {
                this.translatePage(this.currentLanguage);
            }, 100);
        }
        this.updateActiveLanguageOption();
    }

    // Attach event listeners
    attachEventListeners() {
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');

        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });

            // Language option clicks
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const selectedLang = option.dataset.lang;
                    this.switchLanguage(selectedLang);
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageDropdown.classList.remove('active');
            });
        }
    }

    // Switch language
    switchLanguage(newLang) {
        if (newLang === this.currentLanguage) return;

        console.log(`Switching language from ${this.currentLanguage} to ${newLang}`);
        this.showLoadingOverlay();
        
        setTimeout(() => {
            this.currentLanguage = newLang;
            localStorage.setItem('clario-language', newLang);
            
            this.updateCurrentLanguageDisplay();
            this.updateActiveLanguageOption();
            this.translatePage(newLang);
            
            setTimeout(() => {
                this.hideLoadingOverlay();
                this.showSuccessMessage(newLang);
                console.log(`Language switched to ${newLang} successfully`);
                
                // Dispatch custom event for dashboard to refresh dynamic content
                window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
            }, 800);
            
        }, 500);
    }

    // Translate entire page
    translatePage(lang) {
        const translations = this.translations[lang];
        if (!translations) {
            console.error(`No translations found for language: ${lang}`);
            return;
        }

        console.log(`Translating page to ${lang}...`);
        
        // Update document language
        document.documentElement.lang = lang;

        let translatedCount = 0;

        // Translate elements with data-translate attributes (highest priority)
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                console.log(`Translating data-translate: "${key}" -> "${translations[key]}"`);
                element.textContent = translations[key];
                translatedCount++;
            } else {
                console.warn(`No translation found for data-translate key: "${key}"`);
            }
        });

        // Handle placeholder translations
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.dataset.translatePlaceholder;
            if (translations[key]) {
                console.log(`Translating placeholder: "${key}" -> "${translations[key]}"`);
                element.placeholder = translations[key];
                translatedCount++;
            }
        });

        // Handle title translations
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.dataset.translateTitle;
            if (translations[key]) {
                console.log(`Translating title: "${key}" -> "${translations[key]}"`);
                element.title = translations[key];
                translatedCount++;
            }
        });

        // Translate common text content using TreeWalker for better performance
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script and style elements
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Only accept text nodes with meaningful content
                    if (node.textContent.trim().length > 0) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            },
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Translate text nodes
        textNodes.forEach(textNode => {
            const trimmedText = textNode.textContent.trim();
            if (translations[trimmedText]) {
                console.log(`Translating text node: "${trimmedText}" -> "${translations[trimmedText]}"`);
                textNode.textContent = textNode.textContent.replace(trimmedText, translations[trimmedText]);
                translatedCount++;
            }
        });

        // Handle specific attributes
        document.querySelectorAll('[placeholder]').forEach(element => {
            if (translations[element.placeholder]) {
                console.log(`Translating placeholder: "${element.placeholder}" -> "${translations[element.placeholder]}"`);
                element.placeholder = translations[element.placeholder];
                translatedCount++;
            }
        });

        document.querySelectorAll('[title]').forEach(element => {
            if (translations[element.title]) {
                element.title = translations[element.title];
                translatedCount++;
            }
        });

        document.querySelectorAll('[aria-label]').forEach(element => {
            const ariaLabel = element.getAttribute('aria-label');
            if (translations[ariaLabel]) {
                element.setAttribute('aria-label', translations[ariaLabel]);
                translatedCount++;
            }
        });

        // Update font family for Hindi
        if (lang === 'hi') {
            document.body.style.fontFamily = "'Noto Sans Devanagari', 'Arial Unicode MS', Arial, sans-serif";
            // Add Hindi font support link if not exists
            if (!document.querySelector('link[href*="Noto+Sans+Devanagari"]')) {
                const link = document.createElement('link');
                link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
                console.log('Added Hindi font support');
            }
        } else {
            document.body.style.fontFamily = "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif";
        }

        // Force update of search input placeholder
        const searchInput = document.getElementById('searchInput');
        if (searchInput && translations["Search wellness topics..."]) {
            searchInput.placeholder = translations["Search wellness topics..."];
            translatedCount++;
        }

        console.log(`Translation completed. ${translatedCount} elements translated to ${lang}`);
    }

    // Update current language display
    updateCurrentLanguageDisplay() {
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLanguage.toUpperCase();
        }
    }

    // Update active language option
    updateActiveLanguageOption() {
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    // Show loading overlay
    showLoadingOverlay() {
        let overlay = document.getElementById('languageLoadingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'languageLoadingOverlay';
            overlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <h3>Switching Language...</h3>
                    <p>Please wait while we update the interface</p>
                </div>
            `;
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(46, 125, 50, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                color: white;
                text-align: center;
            `;
            document.body.appendChild(overlay);
            
            // Add spinner styles
            const spinnerStyle = document.createElement('style');
            spinnerStyle.textContent = `
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyle);
        }
        overlay.style.display = 'flex';
    }

    // Hide loading overlay
    hideLoadingOverlay() {
        const overlay = document.getElementById('languageLoadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    // Show success message
    showSuccessMessage(lang) {
        const message = lang === 'en' 
            ? '✓ Language switched to English' 
            : '✓ भाषा हिंदी में बदल दी गई';
        
        // Create or update toast
        let toast = document.getElementById('languageToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'languageToast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                z-index: 10000;
                font-weight: 600;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
        }, 3000);
    }
}

// Initialize the universal language system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already initialized
    if (!window.clarionLanguageSystem) {
        window.clarionLanguageSystem = new ClarionLanguageSystem();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClarionLanguageSystem;
}