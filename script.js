// Elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle para o menu mobile
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

// Fechar menu ao clicar em um item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    });
});

// Mudar estilo do cabeçalho ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'var(--bg-dark)';
        header.style.boxShadow = 'none';
    }
});

// Animação de elementos ao rolar
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Lista de elementos para animar
const animatedElements = [
    ...document.querySelectorAll('.section-title'),
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.about-content'),
    ...document.querySelectorAll('.contact-form'),
    ...document.querySelectorAll('.contact-info')
];

// Adicionar classe inicial e observar elementos
animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-card, .project-card {
        transition-delay: calc(var(--i, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Adicionar delays para elementos em grid
const setDelays = (elements) => {
    elements.forEach((el, index) => {
        el.style.setProperty('--i', index);
    });
};

setDelays(document.querySelectorAll('.skill-card'));
setDelays(document.querySelectorAll('.project-card'));

// Form validation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Aqui você adicionaria a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso! (Simulação)');
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Smooth scroll para âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para o cabeçalho fixo
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar tipografia animada na seção Hero (texto digitado)
const createTypingEffect = () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        const typeText = (element, text, delay = 100) => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, delay);
        };
        
      // Iniciar a digitação após um pequeno delay
setTimeout(() => {
    typeText(heroTitle, titleText, 100);
    
    // Iniciar a digitação do subtítulo após terminar o título
    setTimeout(() => {
        typeText(heroSubtitle, subtitleText, 70);
    }, titleText.length * 100 + 300);
}, 500);
    }
};

// Chamar a função de tipografia quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
    createTypingEffect();
});

// Adicionar efeito parallax na seção hero
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        heroSection.style.backgroundPositionY = `${scrollPos * 0.5}px`;
    });
}

// Habilitar filtro de projetos
const setupProjectFilter = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Se tivéssemos botões de filtro, adicionaríamos lógica aqui
    // Por enquanto, apenas definimos a animação de entrada
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
};

setupProjectFilter();

// Adicionar contador para skills
const animateSkillsProgress = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Adicionar efeito hover para as skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').style.transform = 'scale(1.2)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('i').style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
        });
    });
};

animateSkillsProgress();

// Adicionar timestamp de última atualização no footer
const updateFooterDate = () => {
    const footerText = document.querySelector('footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `© ${currentYear} Reginaldo Castro. Todos os direitos reservados.`;
    }
};

updateFooterDate();

// Detectar tema preferido do sistema e aplicar (caso implementemos modo escuro/claro)
const detectColorScheme = () => {
    // Como já usamos um tema escuro/claro definido, isso seria para uma funcionalidade futura
    // de alternância de temas
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Usuário prefere tema escuro
        document.body.classList.add('dark-theme');
    }
};

// Adicionar lazy loading para imagens
const setupLazyLoading = () => {
    // Para imagens reais, adicionaríamos aqui
    // Como estamos usando placeholders, não é necessário agora
};

// Implementar cache local para dados do usuário no form
const setupFormCache = () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    // Recuperar valores salvos, se existirem
    if (nameInput && emailInput && localStorage.getItem('userName')) {
        nameInput.value = localStorage.getItem('userName');
        emailInput.value = localStorage.getItem('userEmail') || '';
    }
    
    // Salvar valores quando o formulário for enviado
    if (form) {
        form.addEventListener('submit', () => {
            if (nameInput && emailInput) {
                localStorage.setItem('userName', nameInput.value);
                localStorage.setItem('userEmail', emailInput.value);
            }
        });
    }
};

setupFormCache();

// Adicionar botão para voltar ao topo
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTopButton();

// Detectar quando o usuário está prestes a sair da página
window.addEventListener('beforeunload', (e) => {
    // Se o formulário estiver preenchido parcialmente, mostrar confirmação
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (form && nameInput && emailInput && messageInput) {
        if (
            (nameInput.value && !localStorage.getItem('userName')) ||
            (emailInput.value && emailInput.value !== localStorage.getItem('userEmail')) ||
            messageInput.value
        ) {
            // Isto permitirá que o navegador mostre uma confirmação padrão
            e.preventDefault();
            e.returnValue = '';
        }
    }
});

// Registrar Service Worker para funcionalidade offline (se implementada no futuro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Comentado porque não temos um service-worker.js real ainda
        // navigator.serviceWorker.register('/service-worker.js');
    });
}

// Detectar conexão com a internet
window.addEventListener('online', () => {
    console.log('Conexão com a internet restaurada');
    // Poderíamos mostrar uma notificação aqui
});

window.addEventListener('offline', () => {
    console.log('Conexão com a internet perdida');
    // Poderíamos mostrar uma notificação aqui
});

// Inicializar todos os módulos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Já chamamos algumas funções separadamente, mas poderíamos centralizá-las aqui
});