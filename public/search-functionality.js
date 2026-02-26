// Professional Search Functionality for Clario Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Search data - all available pages and topics
    const searchData = [
        {
            title: "Anxiety Disorders",
            description: "Learn about anxiety symptoms, causes, and treatment options",
            url: "anxiety.html",
            icon: "fas fa-heart-pulse",
            keywords: ["anxiety", "panic", "worry", "fear", "stress", "nervousness"]
        },
        {
            title: "Depression Support",
            description: "Understanding depression and finding effective treatments",
            url: "depression.html",
            icon: "fas fa-cloud-rain",
            keywords: ["depression", "sad", "mood", "low", "mental health", "sadness"]
        },
        {
            title: "Sleep Disorders",
            description: "Improve your sleep quality and address sleep issues",
            url: "sleep-disorder.html",
            icon: "fas fa-bed",
            keywords: ["sleep", "insomnia", "rest", "tired", "fatigue", "sleeping"]
        },
        {
            title: "OCD Treatment",
            description: "Obsessive-compulsive disorder information and support",
            url: "ocd.html",
            icon: "fas fa-sync-alt",
            keywords: ["ocd", "obsessive", "compulsive", "rituals", "thoughts"]
        },
        {
            title: "Panic Disorder",
            description: "Managing panic attacks and panic disorder symptoms",
            url: "panic.html",
            icon: "fas fa-exclamation-triangle",
            keywords: ["panic", "attacks", "fear", "breathing", "heart racing"]
        },
        {
            title: "Wellness Journal",
            description: "Track your mental health journey with daily journaling",
            url: "journal.html",
            icon: "fas fa-book-open",
            keywords: ["journal", "diary", "writing", "thoughts", "reflection", "daily"]
        },
        {
            title: "Wellness Practice",
            description: "Meditation, breathing exercises, and wellness techniques",
            url: "practice.html",
            icon: "fas fa-spa",
            keywords: ["meditation", "mindfulness", "breathing", "relaxation", "calm", "peace"]
        },
        {
            title: "AI Chat Support",
            description: "Talk with our AI wellness assistant for personalized help",
            url: "chat.html",
            icon: "fas fa-comments",
            keywords: ["chat", "ai", "assistant", "help", "support", "talk", "conversation"]
        },
        {
            title: "Mental Health Quiz",
            description: "Test your knowledge about mental health topics",
            url: "quiz.html",
            icon: "fas fa-brain",
            keywords: ["quiz", "test", "knowledge", "mental health", "assessment"]
        },
        {
            title: "Sleep Tracker",
            description: "Monitor and improve your sleep patterns",
            url: "sleeptracker.html",
            icon: "fas fa-moon",
            keywords: ["sleep tracker", "monitor", "patterns", "quality", "hours"]
        },
        {
            title: "Face Analysis",
            description: "AI-powered emotional state analysis through facial recognition",
            url: "face-analysis.html",
            icon: "fas fa-user-astronaut",
            keywords: ["face", "analysis", "emotion", "ai", "recognition", "mood"]
        },
        {
            title: "Daily Check-in",
            description: "Answer daily questions about your mental wellness",
            url: "question.html",
            icon: "fas fa-hand-sparkles",
            keywords: ["daily", "question", "check-in", "wellness", "mood tracking"]
        },
        {
            title: "Gaslighting Recognition",
            description: "Identify and understand gaslighting behaviors",
            url: "gaslighting.html",
            icon: "fas fa-shield-alt",
            keywords: ["gaslighting", "manipulation", "abuse", "recognition", "signs"]
        },
        {
            title: "Attachment Styles",
            description: "Learn about different attachment styles and relationships",
            url: "attachment.html",
            icon: "fas fa-heart",
            keywords: ["attachment", "relationships", "love", "connection", "styles"]
        },
        {
            title: "Emotion Regulation",
            description: "Techniques for managing and understanding emotions",
            url: "emotion.html",
            icon: "fas fa-smile",
            keywords: ["emotions", "feelings", "regulation", "management", "control"]
        }
    ];

    // DOM elements
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.getElementById('searchClose');

    let searchTimeout;
    let isSearchOpen = false;

    // Toggle search box
    function toggleSearch() {
        isSearchOpen = !isSearchOpen;
        
        if (isSearchOpen) {
            searchBox.classList.add('active');
            searchInput.focus();
            document.addEventListener('click', handleOutsideClick);
        } else {
            closeSearch();
        }
    }

    // Close search
    function closeSearch() {
        isSearchOpen = false;
        searchBox.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.removeEventListener('click', handleOutsideClick);
    }

    // Handle clicks outside search
    function handleOutsideClick(e) {
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            closeSearch();
        }
    }

    // Search function
    function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }

        // Show loading
        searchResults.innerHTML = '<div class=\"search-loading\">Searching...</div>';

        // Simulate slight delay for professional feel
        setTimeout(() => {
            const results = searchData.filter(item => {
                const searchTerm = query.toLowerCase();
                return item.title.toLowerCase().includes(searchTerm) ||
                       item.description.toLowerCase().includes(searchTerm) ||
                       item.keywords.some(keyword => keyword.includes(searchTerm));
            });

            displayResults(results, query);
        }, 300);
    }

    // Display search results
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class=\"search-no-results\">
                    <i class=\"fas fa-search\" style=\"font-size: 2rem; color: #ccc; margin-bottom: 10px;\"></i><br>
                    No results found for \"${query}\"<br>
                    <small>Try searching for anxiety, depression, meditation, or other wellness topics</small>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(item => `
            <div class=\"search-result-item\" onclick=\"navigateToPage('${item.url}');\">
                <div class=\"search-result-icon\">
                    <i class=\"${item.icon}\"></i>
                </div>
                <div class=\"search-result-content\">
                    <div class=\"search-result-title\">${highlightText(item.title, query)}</div>
                    <div class=\"search-result-desc\">${highlightText(item.description, query)}</div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Highlight search terms
    function highlightText(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
        return text.replace(regex, '<mark style=\"background: rgba(76, 175, 80, 0.3); padding: 1px 3px; border-radius: 3px;\">$1</mark>');
    }

    // Navigate to selected page
    window.navigateToPage = function(url) {
        // Add a nice transition effect
        searchBox.style.transform = 'scale(0.9)';
        searchBox.style.opacity = '0.5';
        
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    };

    // Event listeners
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSearch();
    });

    searchClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSearch();
    });

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 250);
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
        } else if (e.key === 'Enter') {
            const firstResult = searchResults.querySelector('.search-result-item');
            if (firstResult) {
                firstResult.click();
            }
        }
    });

    // Prevent search box from closing when clicking inside it
    searchBox.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Add keyboard shortcut (Ctrl + K or Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    });

    // Add subtle animation to search toggle on page load
    setTimeout(() => {
        searchToggle.style.animation = 'searchPulse 2s ease-in-out infinite';
    }, 1000);
});