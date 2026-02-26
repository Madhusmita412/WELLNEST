document.addEventListener('DOMContentLoaded', () => {
    // --- Get HTML Elements ---
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const analyzeSleepBtn = document.getElementById('analyze-sleep');

    // --- Authentication ---
    const token = localStorage.getItem('authToken');
    if (!token) {
        // If no token, the user is not logged in. Redirect to the login page.
        alert("Please log in to access the chat.");
        window.location.href = 'index.html';
        return;
    }

    // --- Helper Functions ---

    /**
     * Adds a message to the chat box UI.
     * @param {string} content - The text content of the message.
     * @param {boolean} isUser - True if the message is from the user, false if from the AI.
     */
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        // The HTML file already has a system message, so we'll remove it when the chat starts.
        const initialMessage = chatBox.querySelector('.system-message');
        if (initialMessage) {
            initialMessage.remove();
        }

        // Apply different CSS classes for user and AI messages
        messageDiv.className = isUser ? 'user-message' : 'ai-message';
        messageDiv.textContent = content;
        
        // Add premium entrance animation with delay
        messageDiv.style.animationDelay = '0.1s';
        
        chatBox.appendChild(messageDiv);

        // Automatically scroll to the latest message with smooth animation
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    /**
     * Shows a premium typing indicator for AI responses
     */
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <span style="margin-left: 10px; color: #666; font-style: italic;">Clario is thinking...</span>
        `;
        
        chatBox.appendChild(typingDiv);
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
        
        return typingDiv;
    }
    
    /**
     * Removes the typing indicator
     */
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transform = 'translateX(-20px) scale(0.9)';
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }

    /**
     * Sends a general message to the Clario AI and displays the response.
     * @param {string} message - The user's message to send.
     */
    async function sendMessageToClario(message) {
        try {
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            const response = await fetch('http://localhost:3000/chat-with-clario', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            // Remove typing indicator before showing response
            removeTypingIndicator();

            if (!response.ok) {
                throw new Error('Failed to get response from the server.');
            }

            const data = await response.json();
            
            // Add slight delay for better UX
            setTimeout(() => {
                addMessage(data.reply, false); // Add AI's reply to the chat
            }, 300);

        } catch (error) {
            console.error('Error sending message:', error);
            removeTypingIndicator();
            setTimeout(() => {
                addMessage("I'm having trouble responding right now. Please check the server and try again.", false);
            }, 300);
        }
    }

    /**
     * Fetches the sleep analysis from the backend and displays it.
     */
    async function getSleepAnalysis() {
        try {
            const response = await fetch('http://localhost:3000/analyze-sleep-mood', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // If no sleep data is found (404 error)
                if (response.status === 404) {
                    addMessage("I notice you haven't logged any sleep data yet. You can start tracking your sleep in the 'Wellness Practice' section.", false);
                    return;
                }
                throw new Error('Failed to analyze sleep data.');
            }

            const data = await response.json();
            addMessage(data.question, false); // Add AI's analysis/question to the chat

        } catch (error) {
            console.error('Error analyzing sleep:', error);
            addMessage("I'm having trouble accessing your sleep data at the moment. Please try again later.", false);
        }
    }


    // --- Event Listeners ---

    // Handle regular chat message submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        const userMessage = chatInput.value.trim();
        if (!userMessage) return; // Don't send empty messages

        addMessage(userMessage, true); // Display the user's message immediately
        chatInput.value = ''; // Clear the input field

        // Show a typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message typing-indicator';
        typingIndicator.textContent = 'Clario is typing...';
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        await sendMessageToClario(userMessage); // Send message to AI and wait for reply

        // Remove the typing indicator
        typingIndicator.remove();
    });

    // Handle "Analyze My Sleep" button click
    if (analyzeSleepBtn) {
        analyzeSleepBtn.addEventListener('click', async () => {
            const userRequest = "Can you analyze my sleep patterns?";
            addMessage(userRequest, true); // Show the request in the chat as if the user typed it

            // Show a typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'ai-message typing-indicator';
            typingIndicator.textContent = 'Clario is analyzing...';
            chatBox.appendChild(typingIndicator);
            chatBox.scrollTop = chatBox.scrollHeight;

            await getSleepAnalysis(); // Call the sleep analysis function and wait for the result

            // Remove the typing indicator
            typingIndicator.remove();
        });
    }
});