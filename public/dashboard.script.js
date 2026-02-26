// --- QUIZ ANALYSIS FUNCTIONS ---
window.performQuizAnalysis = async function() {
    console.log('Quiz analysis function called!');
    
    try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            alert('Please log in to perform quiz analysis');
            return;
        }

        // Show loading message
                // Instant click feedback - no animation delay
                button.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 50);   const toastElement = document.getElementById('toast-notification');
        if (toastElement) {
            toastElement.textContent = 'Analyzing your quiz results...';
            toastElement.classList.add('show');
        }
        
        const response = await fetch('http://localhost:3000/analyze-quiz-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                alert('No quiz results found. Please take some quizzes first!');
                return;
            }
            const errorText = await response.text();
            alert(`Server error: ${response.status} - ${errorText}`);
            return;
        }

        const result = await response.json();
        console.log('Quiz analysis result:', result);
        
        // Display the analysis
        window.displayQuizAnalysis(result.analysis, result);
        
    } catch (error) {
        console.error('Error in quiz analysis:', error);
        alert(`Error: ${error.message}`);
    }
};

window.displayQuizAnalysis = function(analysis, data) {
    // Create or update quiz analysis section
    let analysisSection = document.getElementById('quiz-analysis-section');
    
    if (!analysisSection) {
        // Create new section if it doesn't exist
        analysisSection = document.createElement('div');
        analysisSection.id = 'quiz-analysis-section';
        analysisSection.className = 'card';
        analysisSection.style.marginTop = '30px';
        
        // Find a good place to insert it (after dashboard grid)
        const dashboardGrid = document.getElementById('dashboard-grid');
        if (dashboardGrid) {
            dashboardGrid.parentNode.insertBefore(analysisSection, dashboardGrid.nextSibling);
        }
    }
    
    analysisSection.innerHTML = `
        <div class="card-header">
            <i class="fas fa-brain"></i>
            <h3>Your Quiz Results Analysis</h3>
        </div>
        <div class="quiz-analysis-content">
            <div class="data-summary">
                <p><strong>Analysis based on:</strong> ${data.quizCount} quiz results | Latest Score: ${data.latestScore} | Average Score: ${data.averageScore}</p>
            </div>
            <div class="analysis-text">
                ${analysis.replace(/\n/g, '<br>')}
            </div>
            <button class="card-button" onclick="performQuizAnalysis()" style="margin-top: 15px;">
                <i class="fas fa-sync-alt"></i> Refresh Analysis
            </button>
        </div>
    `;
    
    const toastElement = document.getElementById('toast-notification');
    if (toastElement) {
        toastElement.textContent = 'Quiz analysis complete!';
        toastElement.classList.add('show');
        setTimeout(() => toastElement.classList.remove('show'), 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SECURE AUTHENTICATION & DATA SETUP ---
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (!token) {
        // alert("You are not logged in. Please log in to continue.");
        window.location.href = 'index.html';
        return; // Stop the script if not logged in
    }

    // Decode the token to get the user's information
    let userPayload;
    try {
        userPayload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
        return;
    }

    // Display username and setup logout
    if (usernameDisplay) {
        usernameDisplay.textContent = userPayload.username;
    }
    
    if(logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authToken');
            alert("You have been logged out.");
            window.location.href = 'index.html';
        });
    }

    // --- DAILY QUESTION LOGIC ---
    async function getDailyCheckinQuestion() {
        const dashboardElement = document.getElementById('daily-check-in-question');
        if (!dashboardElement) return;

        try {
            const response = await fetch('http://localhost:3000/get-daily-question');
            if (!response.ok) throw new Error('Failed to fetch question');
            const data = await response.json();
            dashboardElement.textContent = data.question;
        } catch (error) {
            console.error('Error fetching daily question:', error);
            const currentLang = localStorage.getItem('clario-language') || 'en';
            const defaultQuestion = currentLang === 'hi' ? 
                "आज आप किस बात के लिए आभारी हैं?" : 
                "What's one thing you are grateful for today?";
            dashboardElement.textContent = defaultQuestion;
        }
    }

    // --- DASHBOARD-SPECIFIC LOGIC ---
    function displayRecommendations() {
        const recommendationsList = document.getElementById('recommendations-list');
        if (!recommendationsList) return;
        
        // Get current language
        const currentLang = localStorage.getItem('clario-language') || 'en';
        
        let recommendations;
        if (currentLang === 'hi') {
            recommendations = [
                'डायरी लिखना अपने दिमाग को साफ करने का एक बेहतरीन तरीका है। क्यों न <a href="journal.html">एक प्रविष्टि लिखें?</a>',
                'अपने विचारों का अन्वेषण करें <a href="chat.html">क्लारियो, आपके एआई सहायक</a> के साथ।',
                'अपनी भावनात्मक स्थिति के बारे में उत्सुक हैं? <a href="quiz.html">एक त्वरित प्रश्नोत्तरी लें।</a>'
            ];
        } else {
            recommendations = [
                'Journaling is a great way to clear your head. Why not <a href="journal.html">write an entry?</a>',
                'Explore your thoughts with <a href="chat.html">Clario, your AI assistant</a>.',
                'Curious about your emotional state? <a href="quiz.html">Take a quick quiz.</a>'
            ];
        }

        recommendationsList.innerHTML = '';
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.innerHTML = rec;
            recommendationsList.appendChild(li);
        });
    }

    // --- UPDATED SLEEP CHART FUNCTION ---
    async function displaySleepCharts() {
        const lineChartCanvas = document.getElementById('dashboardSleepChart');
        const pieChartCanvas = document.getElementById('sleepQualityPieChart');

        if (!lineChartCanvas || !pieChartCanvas) return; // Only run if charts are on the page

        try {
            // Fetch sleep data from the server, including the auth token
            const response = await fetch('http://localhost:3000/sleep-log', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const sleepData = await response.json();

            // If there's no data, show a message
            if (sleepData.length === 0) {
                lineChartCanvas.parentElement.innerHTML = "<p>Log your sleep to see your trend chart here.</p>";
                pieChartCanvas.parentElement.innerHTML = "<p>Your sleep quality summary will appear here.</p>";
                return;
            }

            // --- Bar Chart (Last 7 Days) - Updated to match the new design ---
            const recentSleepData = sleepData.slice(-7);
            const lineLabels = recentSleepData.map(d => new Date(d.LogDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            const lineValues = recentSleepData.map(d => d.HoursSlept);
            
            new Chart(lineChartCanvas, {
                type: 'bar',
                data: {
                    labels: lineLabels,
                    datasets: [{
                        label: currentLang === 'hi' ? 'नींद के घंटे' : 'Hours Slept',
                        data: lineValues,
                        backgroundColor: '#20b2aa',
                        borderColor: '#20b2aa',
                        borderWidth: 0,
                        borderRadius: 4,
                        borderSkipped: false,
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#666',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 12,
                            grid: {
                                color: '#f0f0f0',
                                borderDash: [2, 2]
                            },
                            ticks: {
                                stepSize: 2,
                                color: '#666',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    }
                }
            });

            // --- Pie Chart (All Time) ---
            let good = 0, ok = 0, poor = 0;
            sleepData.forEach(log => {
                const hours = log.HoursSlept;
                if (hours >= 7.5) good++;
                else if (hours >= 6) ok++;
                else poor++;
            });

            // Get current language
            const currentLang = localStorage.getItem('clario-language') || 'en';
            const pieLabels = currentLang === 'hi' ? 
                ['अच्छा (7.5+ घंटे)', 'ठीक (6-7.5 घंटे)', 'खराब (<6 घंटे)'] : 
                ['Good (7.5+ hrs)', 'Okay (6-7.5 hrs)', 'Poor (<6 hrs)'];

            new Chart(pieChartCanvas, {
                type: 'doughnut',
                data: {
                    labels: pieLabels,
                    datasets: [{
                        data: [good, ok, poor],
                        backgroundColor: ['#23d5ab', '#ffc107', '#e53e3e'],
                        borderWidth: 0
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { 
                            position: 'left',
                            align: 'center',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 20,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10
                        }
                    }
                }
            });

        } catch (error) {
            console.error("Error displaying sleep charts:", error);
            const currentLang = localStorage.getItem('clario-language') || 'en';
            const errorMsg1 = currentLang === 'hi' ? 
                "सर्वर से नींद डेटा लोड नहीं हो सका।" : 
                "Could not load sleep data from the server.";
            const errorMsg2 = currentLang === 'hi' ? 
                "नींद विश्लेषण लोड नहीं हो सका।" : 
                "Could not load sleep analysis.";
                
            lineChartCanvas.parentElement.innerHTML = `<p>${errorMsg1}</p>`;
            pieChartCanvas.parentElement.innerHTML = `<p>${errorMsg2}</p>`;
        }
    }

    // --- INITIALIZE THE DASHBOARD ---
    getDailyCheckinQuestion();
    displayRecommendations();
    displaySleepCharts();
    
    // --- REFRESH CONTENT ON LANGUAGE CHANGE ---
    // Listen for language change events
    window.addEventListener('languageChanged', function() {
        displayRecommendations();
        displaySleepCharts();
    });
    
    // --- TABLE OF CONTENTS FUNCTIONALITY ---
    initializeTableOfContents();
});

// --- TABLE OF CONTENTS ACTIVE SECTION TRACKING ---
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const progressBar = document.querySelector('.content-article header::after');
    const tocProgressLine = document.querySelector('.toc ul::after');
    
    if (tocLinks.length === 0 || sections.length === 0) return;
    
    // Add smooth scrolling to TOC links with enhanced behavior
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Calculate offset for header
                const headerHeight = document.querySelector('.main-header-centered').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced scroll tracking with progress indicators
    function updateActiveSection() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / documentHeight, 1);
        
        // Update reading progress bar in header
        const progressBar = document.querySelector('.content-article header');
        if (progressBar) {
            progressBar.style.setProperty('--progress', `${scrollPercent * 100}%`);
        }
        
        // Update floating progress indicator
        const progressIndicator = document.querySelector('.reading-progress-indicator');
        const progressPercentageElement = document.getElementById('progress-percentage');
        if (progressIndicator && progressPercentageElement) {
            const readingProgress = Math.round(scrollPercent * 100);
            progressPercentageElement.textContent = `${readingProgress}%`;
            progressIndicator.style.setProperty('--reading-progress', `${scrollPercent * 360}deg`);
            
            // Show/hide indicator based on scroll position
            if (scrollPercent > 0.05) {
                progressIndicator.style.opacity = '1';
                progressIndicator.style.transform = 'translateY(-50%) scale(1)';
            } else {
                progressIndicator.style.opacity = '0';
                progressIndicator.style.transform = 'translateY(-50%) scale(0.8)';
            }
        }
        
        let currentSection = '';
        let activeIndex = 0;
        const headerHeight = document.querySelector('.main-header-centered').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        // Find current section with better accuracy
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
                activeIndex = index;
            }
        });
        
        // If no section is active, check if we're at the top or bottom
        if (!currentSection && sections.length > 0) {
            if (scrollPosition < sections[0].offsetTop) {
                currentSection = sections[0].id;
                activeIndex = 0;
            } else if (scrollPosition >= sections[sections.length - 1].offsetTop) {
                currentSection = sections[sections.length - 1].id;
                activeIndex = sections.length - 1;
            }
        }
        
        // Update ToC progress line
        const tocUl = document.querySelector('.toc ul');
        if (tocUl && sections.length > 0) {
            const progressPercentage = ((activeIndex + 1) / sections.length) * 100;
            tocUl.style.setProperty('--toc-progress', `${progressPercentage}%`);
        }
        
        // Update active states instantly - no animations for better performance
        tocLinks.forEach((link, index) => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Update section visibility indicators
        sections.forEach((section, index) => {
            if (section.id === currentSection) {
                section.setAttribute('data-visible', 'true');
            } else {
                section.removeAttribute('data-visible');
            }
        });
    }
    
    // Optimized scroll handler - immediate response
    let isScrolling = false;
    function handleScroll() {
        if (!isScrolling) {
            isScrolling = true;
            updateActiveSection();
            // Use shorter timeout for faster response
            setTimeout(() => {
                isScrolling = false;
            }, 10);
        }
    }
    
    // Initial call and scroll listener
    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Simplified intersection observer for minimal processing
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -50% 0px',
            threshold: [0.1]
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            // Minimal processing for better performance
            entries.forEach(entry => {
                const link = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
                if (link) {
                    if (entry.isIntersecting) {
                        link.setAttribute('data-in-view', 'true');
                    } else {
                        link.removeAttribute('data-in-view');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Optional: Auto-perform analysis on page load if user has substantial data
    // setTimeout(() => {
    //     performComprehensiveMoodAnalysis();
    // }, 2000);
};