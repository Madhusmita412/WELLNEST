// Professional Language Switching System for Clario Dashboard
document.addEventListener('DOMContentLoaded', function() {
    
    // Translation Database
    const translations = {
        en: {
            // Navigation
            "Dashboard": "Dashboard",
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
            
            // Hero Section
            "Your safe space for mental wellness": "Your safe space for mental wellness",
            "In a world that demands so much, finding a place to simply be is essential. We've created a secure, professional, and welcoming environment for you to care for your mind. Whether you're navigating challenges or seeking personal growth, our doors are open.": "In a world that demands so much, finding a place to simply be is essential. We've created a secure, professional, and welcoming environment for you to care for your mind. Whether you're navigating challenges or seeking personal growth, our doors are open.",
            
            // Global Presence
            "Our global presence": "Our global presence",
            "Mental health support reaching every corner of the world": "Mental health support reaching every corner of the world",
            
            // Statistics
            "970M+": "970M+",
            "People affected by mental health conditions worldwide": "People affected by mental health conditions worldwide",
            "1 in 4": "1 in 4", 
            "People will experience a mental health problem each year": "People will experience a mental health problem each year",
            "50+": "50+",
            "Countries where we provide mental health support": "Countries where we provide mental health support",
            "24/7": "24/7",
            "Round-the-clock support available globally": "Round-the-clock support available globally",
            
            // Quick Links
            "Explore various health topics.": "Explore various health topics.",
            "Improve your mental health and find calm.": "Improve your mental health and find calm.",
            "Write down your daily thoughts and feelings.": "Write down your daily thoughts and feelings.",
            "Test your wellness knowledge.": "Test your wellness knowledge.",
            "Talk with your wellness assistant.": "Talk with your wellness assistant.",
            "Track your nightly sleep patterns.": "Track your nightly sleep patterns.",
            
            // Dashboard Cards
            "Your Daily Check-in": "Your Daily Check-in",
            "Loading your question...": "Loading your question...",
            "Answer Now": "Answer Now",
            "Personalized Recommendations": "Personalized Recommendations",
            "Based on your recent activities": "Based on your recent activities",
            "View All": "View All",
            "Weekly Progress": "Weekly Progress",
            "You're doing great this week!": "You're doing great this week!",
            "See Details": "See Details",
            
            // Search
            "Search wellness topics...": "Search wellness topics...",
            "Searching...": "Searching...",
            "No results found": "No results found",
            "Try searching for anxiety, depression, meditation, or other wellness topics": "Try searching for anxiety, depression, meditation, or other wellness topics",
            
            // Language Loading
            "Switching Language...": "Switching Language...",
            "Please wait while we update the interface": "Please wait while we update the interface",
            
            // User Info
            "Logged in as:": "Logged in as:",
            "Logout": "Logout"
        },
        hi: {
            // Navigation
            "Dashboard": "डैशबोर्ड",
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
            
            // Hero Section
            "Your safe space for mental wellness": "मानसिक कल्याण के लिए आपका सुरक्षित स्थान",
            "In a world that demands so much, finding a place to simply be is essential. We've created a secure, professional, and welcoming environment for you to care for your mind. Whether you're navigating challenges or seeking personal growth, our doors are open.": "एक ऐसी दुनिया में जो बहुत कुछ मांगती है, केवल होने के लिए एक जगह ढूंढना आवश्यक है। हमने आपके मन की देखभाल के लिए एक सुरक्षित, पेशेवर और स्वागत करने वाला माहौल बनाया है। चाहे आप चुनौतियों का सामना कर रहे हों या व्यक्तिगत विकास की तलाश कर रहे हों, हमारे दरवाजे खुले हैं।",
            
            // Global Presence
            "Our global presence": "हमारी वैश्विक उपस्थिति",
            "Mental health support reaching every corner of the world": "मानसिक स्वास्थ्य सहायता दुनिया के हर कोने तक पहुंच रही है",
            
            // Statistics
            "970M+": "97 करोड़+",
            "People affected by mental health conditions worldwide": "दुनियाभर में मानसिक स्वास्थ्य स्थितियों से प्रभावित लोग",
            "1 in 4": "4 में से 1",
            "People will experience a mental health problem each year": "लोग हर साल मानसिक स्वास्थ्य समस्या का अनुभव करेंगे",
            "50+": "50+",
            "Countries where we provide mental health support": "देश जहाँ हम मानसिक स्वास्थ्य सहायता प्रदान करते हैं",
            "24/7": "24/7",
            "Round-the-clock support available globally": "विश्वव्यापी रूप से चौबीसों घंटे सहायता उपलब्ध",
            
            // Quick Links
            "Explore various health topics.": "विभिन्न स्वास्थ्य विषयों का अन्वेषण करें।",
            "Improve your mental health and find calm.": "अपने मानसिक स्वास्थ्य में सुधार करें और शांति पाएं।",
            "Write down your daily thoughts and feelings.": "अपने दैनिक विचारों और भावनाओं को लिखें।",
            "Test your wellness knowledge.": "अपने कल्याण ज्ञान का परीक्षण करें।",
            "Talk with your wellness assistant.": "अपने कल्याण सहायक से बात करें।",
            "Track your nightly sleep patterns.": "अपने रात्रिकालीन नींद के पैटर्न को ट्रैक करें।",
            
            // Dashboard Cards  
            "Your Daily Check-in": "आपका दैनिक चेक-इन",
            "Loading your question...": "आपका प्रश्न लोड हो रहा है...",
            "Answer Now": "अभी उत्तर दें",
            "Personalized Recommendations": "व्यक्तिगत सुझाव",
            "Based on your recent activities": "आपकी हाल की गतिविधियों के आधार पर",
            "View All": "सभी देखें",
            "Weekly Progress": "साप्ताहिक प्रगति", 
            "You're doing great this week!": "इस सप्ताह आप बहुत अच्छा कर रहे हैं!",
            "See Details": "विवरण देखें",
            
            // Search
            "Search wellness topics...": "कल्याण विषय खोजें...",
            "Searching...": "खोज रहे हैं...",
            "No results found": "कोई परिणाम नहीं मिला",
            "Try searching for anxiety, depression, meditation, or other wellness topics": "चिंता, अवसाद, ध्यान, या अन्य कल्याण विषयों की खोज करने का प्रयास करें",
            
            // Language Loading
            "Switching Language...": "भाषा बदल रहे हैं...",
            "Please wait while we update the interface": "कृपया प्रतीक्षा करें जब तक हम इंटरफेस को अपडेट करते हैं",
            
            // User Info
            "Logged in as:": "के रूप में लॉग इन:",
            "Logout": "लॉगआउट"
        }
    };

    // DOM Elements
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const languageLoading = document.getElementById('languageLoading');
    const loadingText = document.getElementById('loadingText');
    const loadingDesc = document.getElementById('loadingDesc');

    let currentLanguage = localStorage.getItem('clario-language') || 'en';
    let isDropdownOpen = false;

    // Initialize language system
    function initLanguage() {
        updateCurrentLanguageDisplay();
        updateActiveLanguageOption();
        
        // Apply saved language on page load
        if (currentLanguage !== 'en') {
            setTimeout(() => {
                applyTranslations(currentLanguage, false);
            }, 100);
        }
    }

    // Toggle language dropdown
    function toggleLanguageDropdown() {
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            languageDropdown.classList.add('active');
            document.addEventListener('click', handleOutsideClick);
        } else {
            closeLanguageDropdown();
        }
    }

    // Close language dropdown
    function closeLanguageDropdown() {
        isDropdownOpen = false;
        languageDropdown.classList.remove('active');
        document.removeEventListener('click', handleOutsideClick);
    }

    // Handle clicks outside dropdown
    function handleOutsideClick(e) {
        if (!languageDropdown.contains(e.target) && !languageToggle.contains(e.target)) {
            closeLanguageDropdown();
        }
    }

    // Update current language display
    function updateCurrentLanguageDisplay() {
        currentLangSpan.textContent = currentLanguage.toUpperCase();
    }

    // Update active language option
    function updateActiveLanguageOption() {
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    // Switch language
    function switchLanguage(newLang) {
        if (newLang === currentLanguage) {
            closeLanguageDropdown();
            return;
        }

        // Show loading overlay
        showLanguageLoading(newLang);
        
        // Close dropdown
        closeLanguageDropdown();

        // Simulate loading time for smooth transition
        setTimeout(() => {
            currentLanguage = newLang;
            localStorage.setItem('clario-language', newLang);
            
            // Update displays
            updateCurrentLanguageDisplay();
            updateActiveLanguageOption();
            
            // Apply translations
            applyTranslations(newLang);
            
            // Hide loading after translations are applied
            setTimeout(() => {
                hideLanguageLoading();
                
                // Show success toast
                showLanguageSuccessToast(newLang);
            }, 800);
            
        }, 1000);
    }

    // Show language loading overlay
    function showLanguageLoading(newLang) {
        const langName = newLang === 'en' ? 'English' : 'हिंदी';
        
        if (currentLanguage === 'hi') {
            loadingText.textContent = 'भाषा बदल रहे हैं...';
            loadingDesc.textContent = 'कृपया प्रतीक्षा करें जब तक हम इंटरफेस को अपडेट करते हैं';
        } else {
            loadingText.textContent = 'Switching Language...';
            loadingDesc.textContent = 'Please wait while we update the interface';
        }
        
        languageLoading.classList.add('active');
    }

    // Hide language loading overlay
    function hideLanguageLoading() {
        languageLoading.classList.remove('active');
    }

    // Apply translations to page
    function applyTranslations(lang, showAnimation = true) {
        const langData = translations[lang];
        
        // Animate elements during translation
        if (showAnimation) {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0.7';
        }

        // Translate all text elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // Translate elements by text content matching
        Object.keys(langData).forEach(key => {
            const elements = document.querySelectorAll('*');
            elements.forEach(element => {
                // Skip if element has children (to avoid replacing parent text)
                if (element.children.length === 0 && element.textContent.trim() === key) {
                    element.textContent = langData[key];
                }
                
                // Handle placeholders
                if (element.placeholder === key) {
                    element.placeholder = langData[key];
                }
                
                // Handle titles
                if (element.title === key) {
                    element.title = langData[key];
                }
            });
        });

        // Update search placeholder specifically
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = langData["Search wellness topics..."] || searchInput.placeholder;
        }

        // Restore opacity
        if (showAnimation) {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
        }

        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Update font family for Hindi
        if (lang === 'hi') {
            document.body.style.fontFamily = "'Noto Sans Devanagari', 'Arial Unicode MS', Arial, sans-serif";
        } else {
            document.body.style.fontFamily = "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif";
        }
    }

    // Show language success toast
    function showLanguageSuccessToast(lang) {
        const toast = document.getElementById('toast-notification');
        const message = lang === 'en' 
            ? '✓ Language switched to English' 
            : '✓ भाषा हिंदी में बदल दी गई';
        
        if (toast) {
            toast.textContent = message;
            toast.style.background = 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)';
            toast.style.color = 'white';
            toast.style.display = 'block';
            toast.style.opacity = '1';
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }

    // Event Listeners
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleLanguageDropdown();
    });

    // Language option clicks
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            switchLanguage(selectedLang);
        });
    });

    // Prevent dropdown from closing when clicking inside it
    languageDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + L to toggle language
        if (e.altKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            toggleLanguageDropdown();
        }
    });

    // Initialize the language system
    initLanguage();

    // Add data-translate attributes to elements (for future updates)
    setTimeout(() => {
        // This can be expanded to automatically add data-translate attributes
        // to elements based on their text content
    }, 500);
});