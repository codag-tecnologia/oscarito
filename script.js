// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});



// Simple Carousel
class SimpleCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.autoPlayInterval = null;
        this.autoPlayDuration = 4000;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // Add click events to arrows
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover - aplicar a todo o container do carrossel
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.isPaused = true;
                this.pauseAutoPlay();
            });
            carousel.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.startAutoPlay();
            });
        }
    }
    
    goToSlide(slideIndex) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = slideIndex;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        // Sempre limpar o interval anterior antes de criar um novo
        this.pauseAutoPlay();
        
        // Só iniciar se não estiver pausado
        if (!this.isPaused) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDuration);
        }
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        // Pequeno delay para evitar conflitos
        setTimeout(() => {
            this.startAutoPlay();
        }, 100);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se os elementos existem antes de inicializar
    if (document.querySelector('.carousel-container')) {
        new SimpleCarousel();
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about, .menu-category, .gallery-item, .contact-item, .reservation-form');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Formulário agora usa Formspree - sem JavaScript necessário
// O formulário envia automaticamente para bymatheusmoraes@gmail.com

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8f9fa';
        this.style.padding = '1rem';
        this.style.borderRadius = '8px';
        this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.padding = '0 0 1.5rem 0';
    });
});

// Social media links functionality
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        
        // In a real application, these would be actual social media URLs
        const socialUrls = {
            facebook: 'https://facebook.com/oscaritorestaurante',
            instagram: 'https://instagram.com/oscaritorestaurante',
            twitter: 'https://twitter.com/oscaritorestaurante',
            whatsapp: 'https://wa.me/557141131306'
        };
        
        if (socialUrls[platform]) {
            window.open(socialUrls[platform], '_blank');
        } else {
            alert(`Link para ${platform} em breve!`);
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-placeholder');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add current date as minimum for date input
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('data');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Add form success handling for Formspree redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        alert('Reserva enviada com sucesso! Entraremos em contato em breve.');
        // Remove the success parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Contact information click handlers
document.querySelectorAll('.contact-item').forEach(item => {
    const icon = item.querySelector('i');
    const text = item.querySelector('p');
    
    if (icon && text) {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', () => {
            if (icon.classList.contains('fa-phone')) {
                window.location.href = 'tel:+5511123456789';
            } else if (icon.classList.contains('fa-envelope')) {
                window.location.href = 'mailto:contato@oscaritorestaurante.com.br';
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                window.open('https://maps.google.com/?q=Rua+das+Flores+123+Centro+São+Paulo', '_blank');
            }
        });
    }
});

// Add typing effect to hero title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #c0392b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Handle Formspree form submission with custom confirmation
function handleFormspreeSubmission(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validação básica
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const data = formData.get('data');
    const horario = formData.get('horario');
    const pessoas = formData.get('pessoas');
    
    if (!nome || !email || !telefone || !data || !horario || !pessoas) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    // Validação de data (não pode ser no passado)
    const selectedDate = new Date(data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Por favor, selecione uma data futura para a reserva.');
        return false;
    }
    
    // Mostra loading no botão
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    // Envia para o Formspree
    fetch('https://formspree.io/f/xkgzbgey', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Sucesso - exibe modal de confirmação
            showConfirmationModal();
            form.reset();
        } else {
            // Erro na resposta
            alert('Erro ao enviar reserva. Tente novamente.');
        }
    })
    .catch(error => {
        // Erro de rede
        console.error('Erro:', error);
        alert('Erro ao enviar reserva. Verifique sua conexão e tente novamente.');
    })
    .finally(() => {
        // Restaura o botão
        button.textContent = originalText;
        button.disabled = false;
    });
    
    return false;
}

// Função para exibir o modal de confirmação
function showConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    const gifElement = document.getElementById('check-gif');
    
    modal.classList.add('show');
    
    // Força o GIF a recarregar para executar do início
    const timestamp = Date.now();
    gifElement.src = 'https://i.gifer.com/7efs.gif?t=' + timestamp;
    
    // Cria uma nova imagem para detectar quando o GIF termina
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    
    let hasReplaced = false;
    
    // Substitui por imagem estática após o tempo da animação
    setTimeout(() => {
        if (!hasReplaced) {
            hasReplaced = true;
            // Substitui por uma imagem PNG estática de check verde
            gifElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ1IiBmaWxsPSIjMjdhZTYwIi8+CjxwYXRoIGQ9Ik0yNSA1MCA0MCA2NSA3NSAzMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
        }
    }, 2000); // Ajuste o tempo conforme a duração do seu GIF
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        closeConfirmationModal();
    }, 5000);
}

// Função para fechar o modal de confirmação
function closeConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('show');
}

// Variáveis para o modal de zoom
let currentZoom = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

// Função para abrir o modal de zoom da imagem
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.add('show');
    
    // Reset zoom and position
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// Função para fechar o modal de zoom
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('show');
}

// Funções de zoom
function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.2, 5);
    updateImageTransform();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.2, 0.5);
    updateImageTransform();
}

function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// Atualizar transformação da imagem
function updateImageTransform() {
    const modalImage = document.getElementById('modal-image');
    modalImage.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
}

// Adicionar funcionalidade de arrastar
function initImageDrag() {
    const modalImage = document.getElementById('modal-image');
    
    modalImage.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events para dispositivos móveis
    modalImage.addEventListener('touchstart', startDragTouch);
    document.addEventListener('touchmove', dragTouch);
    document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
    if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        e.preventDefault();
    }
}

function startDragTouch(e) {
    if (currentZoom > 1) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - startY;
        e.preventDefault();
    }
}

function drag(e) {
    if (isDragging && currentZoom > 1) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    }
}

function dragTouch(e) {
    if (isDragging && currentZoom > 1) {
        const touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        updateImageTransform();
        e.preventDefault();
    }
}

function endDrag() {
    isDragging = false;
}

// Inicializar funcionalidades do modal quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar event listeners aos menu-items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.menu-image img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
    
    // Inicializar funcionalidade de arrastar
    initImageDrag();
    
    // Fechar modal ao clicar fora da imagem
    document.getElementById('image-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});
