document.addEventListener('DOMContentLoaded', () => {
    
    // --- SECURE AUTHENTICATION ---
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    let userPayload;
    try {
        userPayload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
        return;
    }

    if (usernameDisplay) usernameDisplay.textContent = userPayload.username;
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    }

    // --- SLEEP TRACKER ELEMENTS ---
    const logSleepForm = document.getElementById('log-sleep-form');
    const sleepDateInput = document.getElementById('sleep-date');
    const sleepHoursInput = document.getElementById('sleep-hours-input');
    const trendChartCanvas = document.getElementById('sleepTrendChart');
    const pieChartCanvas = document.getElementById('sleepQualityPieChart');

    if (sleepDateInput) {
        sleepDateInput.valueAsDate = new Date();
    }

    let sleepTrendChart, sleepQualityPieChart;

    // --- NEW: FUNCTION TO FETCH DATA FROM DATABASE AND UPDATE CHARTS ---
    async function fetchAndRenderData() {
        try {
            const response = await fetch('http://localhost:3000/sleep-log', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch sleep data');
            }
            
            const sleepData = await response.json(); // Data from the database
            updateCharts(sleepData);

        } catch (error) {
            console.error('Error:', error);
            showToast('Could not load sleep data from the server.');
        }
    }

    // --- MODIFIED: `updateCharts` now works with database data ---
    function updateCharts(sleepData) {
        const recentData = sleepData.slice(-7); // Get last 7 entries

        if (!trendChartCanvas || !pieChartCanvas) return;

        if (recentData.length === 0) {
            trendChartCanvas.parentElement.innerHTML = "<p>Log your sleep to see your trend chart here.</p>";
            pieChartCanvas.parentElement.innerHTML = "<p>Your sleep quality summary will appear here.</p>";
            return;
        }
        
        const trendChartData = {
            labels: recentData.map(log => new Date(log.LogDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            datasets: [{
                label: 'Hours Slept',
                data: recentData.map(log => log.HoursSlept),
                backgroundColor: '#2e7d32',
                borderColor: '#2E5C88',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#2E5C88'
            }]
        };
        if (sleepTrendChart) {
            sleepTrendChart.data = trendChartData;
            sleepTrendChart.update();
        } else {
            sleepTrendChart = new Chart(trendChartCanvas, {
                type: 'bar',
                data: trendChartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 12,
                            grid: {
                                color: 'rgba(30, 61, 89, 0.1)'
                            },
                            ticks: {
                                stepSize: 2,
                                font: {
                                    family: "'Poppins', sans-serif"
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    family: "'Poppins', sans-serif"
                                }
                            }
                        }
                    },
                    barThickness: 25,
                    maintainAspectRatio: false
                }
            });
        }

        let good = 0, ok = 0, poor = 0;
        recentData.forEach(log => {
            const hours = log.HoursSlept;
            if (hours >= 7.5) good++;
            else if (hours >= 6) ok++;
            else poor++;
        });
        const pieChartData = {
            labels: ['Good (7.5+ hrs)', 'Okay (6-7.5 hrs)', 'Poor (<6 hrs)'],
            datasets: [{ data: [good, ok, poor], backgroundColor: ['#23d5ab', '#ffc107', '#e53e3e'] }]
        };
        if (sleepQualityPieChart) {
            sleepQualityPieChart.data = pieChartData;
            sleepQualityPieChart.update();
        } else {
            sleepQualityPieChart = new Chart(pieChartCanvas, { type: 'doughnut', data: pieChartData, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } });
        }
    }

    // --- MODIFIED: Form submission now sends data to the server ---
    if (logSleepForm) {
        logSleepForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const date = sleepDateInput.value;
            const hours = parseFloat(sleepHoursInput.value);

            if (!date || isNaN(hours) || hours <= 0 || hours > 24) {
                showToast('Please enter a valid date and number of hours.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/sleep-log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ date, hours })
                });

                if (!response.ok) {
                    throw new Error('Server failed to save the log.');
                }
                
                showToast('Sleep log saved successfully!');
                sleepHoursInput.value = '';

                const currentDate = new Date(sleepDateInput.value);
                currentDate.setDate(currentDate.getDate() + 1);
                sleepDateInput.valueAsDate = currentDate;

                // Re-fetch all data from the database to update the charts
                fetchAndRenderData(); 

            } catch (error) {
                console.error('Error submitting sleep log:', error);
                showToast('Failed to save sleep log.');
            }
        });
    }

    // --- Reusable Toast Notification ---
    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

    // --- INITIALIZE THE PAGE by fetching data from the database ---
    fetchAndRenderData();
});