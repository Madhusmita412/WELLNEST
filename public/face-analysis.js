document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const video = document.getElementById('webcam');
    const analyzeButton = document.getElementById('analyze-button');
    const statusSpan = document.getElementById('status');
    const expressionSpan = document.getElementById('expression-result');
    const usernameDisplay = document.getElementById('username-display');
    
    // Create a canvas element in memory; it doesn't need to be on the page
    const canvas = document.createElement('canvas');

    // --- State variables ---
    let isAnalyzing = false;
    let analysisInterval; // This will hold the reference to our setInterval timer

    // Display username from localStorage if available
    const username = localStorage.getItem('username');
    if (username) {
        usernameDisplay.textContent = username;
    }

    // --- 1. Initialize Webcam ---
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.play();
        } catch (err) {
            console.error("Error accessing webcam:", err);
            statusSpan.textContent = 'Webcam Error! Please grant permission.';
            statusSpan.style.color = 'red';
            analyzeButton.disabled = true;
        }
    }

    // --- 2. Main control function for the button ---
    analyzeButton.addEventListener('click', () => {
        isAnalyzing = !isAnalyzing; // Toggle the state
        if (isAnalyzing) {
            startAnalysis();
        } else {
            stopAnalysis();
        }
    });

    // --- 3. Start the Real-time Analysis Loop ---
    function startAnalysis() {
        // Update UI to reflect 'running' state
        analyzeButton.textContent = 'Stop Real-time Analysis';
        analyzeButton.style.backgroundColor = '#f44336'; // Red color for 'stop'
        statusSpan.textContent = 'Running...';
        statusSpan.style.color = 'green';

        // Set canvas dimensions to a smaller size for faster processing
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');

        // Set up a recurring timer to send frames to the backend
        analysisInterval = setInterval(async () => {
            // Ensure video is ready before trying to capture a frame
            if (video.readyState < 2) return; 

            // Draw the current video frame onto the hidden canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert the canvas content to a JPEG blob
            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // Use FormData to send the blob as a file
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg');

                try {
                    // Send the frame to our Python server's /predict endpoint
                    const response = await fetch('http://127.0.0.1:5000/predict', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error(`Server error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    
                    if (data.expression) {
                        expressionSpan.textContent = data.expression;
                    } else {
                        expressionSpan.textContent = data.error || 'No face detected';
                    }
                } catch (error) {
                    console.error('Connection error:', error);
                    expressionSpan.textContent = 'Connection error. Is the server running?';
                    // Stop the analysis if a connection error occurs
                    stopAnalysis(); 
                }
            }, 'image/jpeg');
        }, 1500); // Send a frame every 1.5 seconds
    }

    // --- 4. Stop the Analysis Loop ---
    function stopAnalysis() {
        if (analysisInterval) {
            clearInterval(analysisInterval); // Clear the timer
        }
        isAnalyzing = false;

        // Update UI to reflect 'idle' state
        analyzeButton.textContent = 'Start Real-time Analysis';
        analyzeButton.style.backgroundColor = '#5D5FEF'; // Back to the original purple color
        statusSpan.textContent = 'Idle';
        statusSpan.style.color = 'black';
        expressionSpan.textContent = '...';
    }

    // Initialize the webcam as soon as the page loads
    startWebcam();
});