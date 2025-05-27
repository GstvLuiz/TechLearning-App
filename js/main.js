// ===== INICIALIZAÇÃO DAS FUNÇÕES =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyHeader();
    initCursosFiltro();
    initFaqAccordion();
    initDepoimentosSlider();
    initAnimations();
});

// ===== NAVEGAÇÃO MOBILE =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                if (this.classList.contains('active')) {
                    hamburger.style.transform = 'rotate(45deg)';
                    hamburger.style.backgroundColor = 'transparent';
                    hamburger.style.transition = 'var(--transition-normal)';
                    
                    hamburger.style.before = 'transform: rotate(45deg) translate(5px, 5px)';
                    hamburger.style.after = 'transform: rotate(-45deg) translate(5px, -5px)';
                } else {
                    hamburger.style.transform = 'rotate(0)';
                    hamburger.style.backgroundColor = 'var(--primary)';
                }
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    document.addEventListener('click', function(event) {
        if (navList.classList.contains('active') && 
            !navList.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ===== HEADER FIXO COM SCROLL =====
function initStickyHeader() {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px';
            header.style.padding = '0.5rem 0';
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
            header.style.padding = '1rem 0';
        }
    });
}

// ===== FILTRO DE CURSOS =====
function initCursosFiltro() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const cursosCards = document.querySelectorAll('.curso-card');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            filtroBtns.forEach(b => b.classList.remove('active'));
            
            this.classList.add('active');
            
            const filtro = this.getAttribute('data-filter');
            
            cursosCards.forEach(card => {
                if (filtro === 'todos') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-categoria') === filtro) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===== ACORDEÃO DE FAQ =====
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        question.addEventListener('click', function() {
         
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => {
                i.classList.remove('active');
                const iAnswer = i.querySelector('.faq-answer');
                const iIcon = i.querySelector('.faq-icon i');
                
                if (iAnswer) {
                    iAnswer.style.maxHeight = '0';
                }
                
                if (iIcon) {
                    iIcon.className = 'fas fa-plus';
                }
            });
            
            if (!isActive) {
                item.classList.add('active');
                
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
                
                if (icon) {
                    icon.className = 'fas fa-minus';
                }
            }
        });
    });
    
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstIcon = firstItem.querySelector('.faq-icon i');
        
        firstItem.classList.add('active');
        
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
        
        if (firstIcon) {
            firstIcon.className = 'fas fa-minus';
        }
    }
}

// ===== SLIDER DE DEPOIMENTOS =====
function initDepoimentosSlider() {
    const slider = document.querySelector('.depoimentos-slider');
    if (!slider) return;
    
    const wrapper = slider.querySelector('.depoimentos-wrapper');
    const cards = slider.querySelectorAll('.depoimento-card');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dots = slider.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = cards.length;
    
    updateSlider();
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
       
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
 
    slider.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    wrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    wrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
           
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
           
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
    }
}

// ===== ANIMAÇÕES AO SCROLL =====
function initAnimations() {

    const animatedElements = document.querySelectorAll('.section-header, .curso-card, .step, .beneficio-card, .depoimento-card, .faq-item');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    function handleScroll() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('fade-in')) {
                el.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    const pulseElements = document.querySelectorAll('.hero-cta .btn-primary, .cursos-cta .btn-primary, .cta-final .btn-primary');
    pulseElements.forEach(el => {
        el.classList.add('pulse');
    });
}

// ===== SMOOTH SCROLL PARA LINKS DE ANCORAGEM =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== VALIDAÇÃO DO FORMULÁRIO =====
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            
            showFormError(emailInput, 'Por favor, insira um e-mail válido.');
            return;
        }
        
        this.classList.add('submitting');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
            this.classList.remove('submitting');
            this.classList.add('submitted');
            this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Obrigado por se cadastrar!</h3><p>Enviamos um e-mail com instruções para começar.</p></div>';
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(inputElement, message) {

    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    inputElement.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = message;
    inputElement.parentElement.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.remove();
        inputElement.classList.remove('error');
    }, 3000);
}

// ===== PLACEHOLDER PARA IMAGENS =====

document.addEventListener('DOMContentLoaded', function() {
   
    const logoImg = document.querySelector('.logo-img');
    if (logoImg && logoImg.tagName !== 'IMG') {
        logoImg.innerHTML = 'TL';
    }
    
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && heroImg.tagName !== 'IMG') {
        heroImg.innerHTML = 'App Preview';
    }
    
    const avatarImgs = document.querySelectorAll('.avatar-img');
    avatarImgs.forEach((img, index) => {
        if (img && img.tagName !== 'IMG') {
            const initials = ['CS', 'AO', 'MS'];
            img.innerHTML = initials[index] || 'U';
        }
    });
});
