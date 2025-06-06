     // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Hamburger menu toggle
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const closeSidebar = document.getElementById('close-sidebar');

        function toggleSidebar() {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
        }

        function closeSidebarMenu() {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        hamburger.addEventListener('click', toggleSidebar);
        closeSidebar.addEventListener('click', closeSidebarMenu);
        sidebarOverlay.addEventListener('click', closeSidebarMenu);

        // Close sidebar when clicking on menu items
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', closeSidebarMenu);
        });

        // Carousel functionality
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
            this.reset();
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.staff-card, .feature-item, .group-item, .contact-item').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for statistics (if needed)
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            updateCounter();
        }

        // Particle background effect (optional enhancement)
        function createParticles() {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particles';
            particleContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            `;
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(125, 211, 252, 0.3);
                    border-radius: 50%;
                    animation: float ${5 + Math.random() * 10}s infinite linear;
                    left: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 5}s;
                `;
                particleContainer.appendChild(particle);
            }
            
            document.body.appendChild(particleContainer);
        }

      
        document.head.appendChild(style);

        // Initialize particles
        createParticles();

        // Loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect on page load
        setTimeout(() => {
            const heroTitle = document.querySelector('.slide-content h2');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 100);
            }
        }, 1000);