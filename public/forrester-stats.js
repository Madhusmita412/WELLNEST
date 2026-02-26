// Forrester-Style Statistics Animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const statItems = entry.target.querySelectorAll('.stat-item');
                
                // Trigger staggered animations
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                        
                        // Start icon animation
                        const icon = item.querySelector('.stat-icon');
                        if (icon) {
                            icon.style.animationPlayState = 'running';
                        }
                        
                        // Start bar animation
                        const barFill = item.querySelector('.stat-bar-fill');
                        if (barFill) {
                            barFill.style.animationPlayState = 'running';
                        }
                        
                        // Start content animation
                        const content = item.querySelector('.stat-content');
                        if (content) {
                            content.style.animationPlayState = 'running';
                        }
                        
                        // Start bottom bar animation
                        item.style.setProperty('--animation-delay', `${0.5 + index * 0.2}s`);
                        
                    }, index * 200); // 200ms stagger between items
                });
            }
        });
    }, observerOptions);

    // Observe the statistics section
    const statsSection = document.querySelector('.global-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Enhanced interaction effects
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        // Click animation
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect at click position
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(76, 175, 80, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                z-index: 10;
                pointer-events: none;
                animation: ripple 0.6s linear;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Card bounce effect
            this.style.transform = 'translateY(-12px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(46, 125, 50, 0.3)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
        });

        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            const barFill = this.querySelector('.stat-bar-fill');
            
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            }
            
            if (barFill) {
                barFill.style.opacity = '0.25';
            }
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            const barFill = this.querySelector('.stat-bar-fill');
            
            if (icon) {
                icon.style.transform = '';
            }
            
            if (barFill) {
                barFill.style.opacity = '';
            }
        });
    });

    // Add ripple animation styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            0% {
                width: 10px;
                height: 10px;
                opacity: 0.8;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        .stat-item {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyles);

    // Initialize animations if section is already visible
    const checkInitialVisibility = () => {
        const stats = document.querySelector('.global-stats');
        if (stats) {
            const rect = stats.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !stats.classList.contains('animated')) {
                stats.classList.add('animated');
                const items = stats.querySelectorAll('.stat-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, i * 150);
                });
            }
        }
    };

    // Check on load
    setTimeout(checkInitialVisibility, 100);
});