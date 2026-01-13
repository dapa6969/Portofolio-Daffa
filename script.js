// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1000);
});

// Kursor Kustom (Desktop only)
if (window.matchMedia("(min-width: 769px)").matches) {
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Outline dengan delay untuk efek smooth
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
        
        // Efek hover pada elemen interaktif
        const interactiveElements = document.querySelectorAll("a, button, .cta-button, .nav-link, .skill-showcase-item, .portfolio-card, .certificate-item, .social-link, .interest-item, .contact-item, .view-certificate-btn");
        
        interactiveElements.forEach(element => {
            element.addEventListener("mouseenter", () => {
                cursorDot.classList.add("hover");
                cursorOutline.classList.add("hover");
            });
            
            element.addEventListener("mouseleave", () => {
                cursorDot.classList.remove("hover");
                cursorOutline.classList.remove("hover");
            });
        });
    });
}

// Menu Mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Tutup menu mobile saat klik link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = '';
    }));

    // Tutup menu jika klik di luar
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.style.overflow = '';
        }
    });
}

// Animasi scroll untuk navbar
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    
    if (window.scrollY > 50) {
        navbar.style.padding = "0.8rem 0";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
    } else {
        navbar.style.padding = "1.2rem 0";
        navbar.style.boxShadow = "none";
    }
});

// Animasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Animasi hero elements dengan stagger effect
    const heroElements = [
        document.querySelector(".hero-name"),
        document.querySelector(".title-decoration"),
        document.querySelector(".hero-subtitle"),
        document.querySelector(".hero-description"),
        ...document.querySelectorAll(".hero-cta .cta-button")
    ];
    
    heroElements.forEach((el, index) => {
        if (el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            
            setTimeout(() => {
                el.style.transition = "opacity 1s ease, transform 1s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 300 * index);
        }
    });
    
    // Animasi floating elements
    const floatingElements = document.querySelectorAll(".floating-element");
    floatingElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px) scale(0.8)";
        
        setTimeout(() => {
            el.style.transition = "opacity 1s ease, transform 1s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
        }, 800 + (index * 200));
    });
    
    // Animasi effect circles
    const circles = document.querySelectorAll(".effect-circle");
    circles.forEach((circle, index) => {
        circle.style.opacity = "0";
        
        setTimeout(() => {
            circle.style.transition = "opacity 2s ease";
            circle.style.opacity = "1";
        }, 1000 + (index * 300));
    });
    
    // Animasi section elements dengan Intersection Observer
    const sections = document.querySelectorAll("section:not(#home)");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animasi untuk section yang berbeda
                if (section.id === 'about') {
                    animateAboutSection(section);
                } else if (section.id === 'skills') {
                    animateSkillsSection(section);
                } else if (section.id === 'portfolio') {
                    animatePortfolioSection(section);
                } else if (section.id === 'certificates') {
                    animateCertificatesSection(section);
                } else if (section.id === 'contact') {
                    animateContactSection(section);
                }
                
                observer.unobserve(section);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Animasi statistik dengan counter
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const isPlus = originalText.includes('+');
        const value = parseInt(originalText.replace('+', ''));
        
        if (!isNaN(value)) {
            stat.textContent = '0' + (isPlus ? '+' : '');
            
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(stat, value, isPlus);
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statObserver.observe(stat);
        }
    });
});

// Fungsi animasi untuk setiap section
function animateAboutSection(section) {
    const elements = section.querySelectorAll('.about-title, .about-text, .passion-stat, .interest-item');
    elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        
        setTimeout(() => {
            el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 100 * index);
    });
}

function animateSkillsSection(section) {
    const items = section.querySelectorAll('.skill-showcase-item');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px) scale(0.9)";
        
        setTimeout(() => {
            item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0) scale(1)";
        }, 100 * index);
    });
}

function animatePortfolioSection(section) {
    const cards = section.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px) rotateX(10deg)";
        
        setTimeout(() => {
            card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0) rotateX(0)";
        }, 200 * index);
    });
}

function animateCertificatesSection(section) {
    const items = section.querySelectorAll('.certificate-item');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        
        setTimeout(() => {
            item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 150 * index);
    });
}

function animateContactSection(section) {
    const items = section.querySelectorAll('.contact-item, .social-link, .contact-stat');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-30px)";
        
        setTimeout(() => {
            item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
        }, 100 * index);
    });
}

// Fungsi animasi counter
function animateCounter(element, target, isPlus = false) {
    let current = 0;
    const increment = target / 30; // 30 frame
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (isPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (isPlus ? '+' : '');
        }
    }, 40);
}

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");
if (backToTopButton) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = "1";
            backToTopButton.style.visibility = "visible";
        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.visibility = "hidden";
        }
    });
    
    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Download CV button effect
const downloadBtn = document.querySelector('a[download]');
if (downloadBtn) {
    downloadBtn.addEventListener("click", function(e) {
        // Tambah efek visual saat mengklik download
        this.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            this.style.transform = "";
        }, 300);
        
        // Cek jika file tidak ada
        const cvFile = this.getAttribute("href");
        if (cvFile === "cv.pdf") {
            fetch(cvFile)
                .then(response => {
                    if (!response.ok) {
                        e.preventDefault();
                        showAlert("File CV belum diupload. Silakan buat file PDF bernama 'cv.pdf' dan letakkan di folder yang sama dengan file HTML.", "error");
                    }
                })
                .catch(() => {
                    e.preventDefault();
                    showAlert("File CV belum diupload. Silakan buat file PDF bernama 'cv.pdf' dan letakkan di folder yang sama dengan file HTML.", "error");
                });
        }
    });
}

// Alert function
function showAlert(message, type = "info") {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#e63946' : '#1d3557'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease;
    `;
    
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    `;
    
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    });
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
    
    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Image error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (this.classList.contains('profile-image')) {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231d3557"/><text x="200" y="200" font-family="Arial" font-size="24" fill="%23e63946" text-anchor="middle" dy=".3em">Daffa Putra Adristi</text></svg>';
            } else if (this.classList.contains('project-image')) {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231d3557"/><text x="200" y="150" font-family="Arial" font-size="20" fill="%23e63946" text-anchor="middle" dy=".3em">Project Image</text></svg>';
            }
        });
    });
});

// Touch device optimizations
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');
    
    // Improve touch feedback
    const touchElements = document.querySelectorAll('.cta-button, .skill-showcase-item, .portfolio-card, .certificate-item, .interest-item, .contact-item, .social-link');
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Add touch-active styles
const style = document.createElement('style');
style.textContent = `
    .touch-device .touch-active {
        opacity: 0.8;
        transform: scale(0.98) !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            -webkit-overflow-scrolling: touch;
        }
        
        .cta-button, .view-certificate-btn {
            min-height: 44px;
            min-width: 44px;
        }
    }
`;
document.head.appendChild(style);

// Initialize dengan animasi tambahan
setTimeout(() => {
    // Add subtle animation to hero image on load
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.style.animation = 'float 6s ease-in-out infinite';
    }
}, 2000);

// Handle orientation change
let portrait = window.matchMedia("(orientation: portrait)");
portrait.addListener(function(mql) {
    if (mql.matches) {
        // Portrait orientation
        console.log('Portrait orientation');
    } else {
        // Landscape orientation
        console.log('Landscape orientation');
        // Adjust any landscape-specific styles if needed
    }
});