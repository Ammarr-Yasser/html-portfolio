// Experience card width animation: expand card when its details are shown
        document.querySelectorAll('#experience .toggle-btn').forEach(button => {
            const targetId = button.getAttribute('data-bs-target');
            const targetEl = document.querySelector(targetId);
            const card = button.closest('.timeline-item');
            if (!targetEl || !card) return;

            targetEl.addEventListener('shown.bs.collapse', () => {
                card.classList.add('expanded');
            });
            targetEl.addEventListener('hidden.bs.collapse', () => {
                card.classList.remove('expanded');
            });
        });

// -------------------
// Split from inline script block
// -------------------

// Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Enhanced navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced typing effect for hero subtitle
        function typeWriter(text, element, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            element.style.opacity = '1';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const subtitle = document.querySelector('.hero .subtitle');
                if (subtitle) {
                    const originalText = subtitle.textContent;
                    typeWriter(originalText, subtitle, 80);
                }
            }, 1000);
        });

        // Enhanced toggle functionality with Bootstrap collapse
        document.querySelectorAll('.toggle-btn').forEach(button => {
            const targetId = button.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.addEventListener('shown.bs.collapse', () => {
                    button.innerHTML = 'Show Less <i class="fas fa-chevron-up ms-2"></i>';
                });
                
                targetElement.addEventListener('hidden.bs.collapse', () => {
                    button.innerHTML = 'Show More <i class="fas fa-chevron-down ms-2"></i>';
                });
            }
        });

        // Floating button hide/show on scroll
        const floatingBtn = document.querySelector('.floating-btn');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300 && floatingBtn) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else if (floatingBtn) {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
        });

        // Add intersection observer for custom animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger section title animation
                    if (entry.target.classList.contains('section-title')) {
                        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .section-title').forEach(el => {
            observer.observe(el);
        });

        // Enhanced navbar active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        function updateActiveNavLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink);
        window.addEventListener('load', updateActiveNavLink);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });

        // Error handling for missing images
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.onerror = function() {
                    this.style.display = 'none';
                    if (this.alt.includes('Logo')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'logo-placeholder';
                        placeholder.textContent = this.alt.split(' ')[0];
                        this.parentNode.replaceChild(placeholder, this);
                    }
                };
            });
        });