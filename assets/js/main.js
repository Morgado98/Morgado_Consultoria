/**
 * Morgado Consultoria - Main JavaScript File
 * Organized, modular, and professional structure
 *
 * Sections:
 * 1. Initialization
 * 2. Theme Toggle
 * 3. Navbar Scroll Effects
 * 4. Back to Top Button
 * 5. Contact Form
 * 6. Smooth Scroll
 * 7. Scroll Animations (IntersectionObserver)
 * 8. Terminal Effects
 * 9. Parallax Effects
 * 10. FAQ Toggle
 * 10.5. Process Tabs Toggle
 * 11. Project Modals
 * 12. Cookie Consent
 * 13. Utility Functions
 */

// ============================================================================
// 1. INITIALIZATION
// ============================================================================

/**
 * Initialize Lucide Icons on page load
 * Called at the start and whenever DOM changes occur
 */
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize icons on page load
initializeLucideIcons();


// ============================================================================
// 2. THEME TOGGLE
// ============================================================================

/**
 * Theme Toggle Functionality
 * Allows users to switch between dark and light modes
 * Persists preference in localStorage
 */

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Restore saved theme preference or default to 'dark'
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

/**
 * Update theme icon based on current theme
 * @param {string} theme - Current theme ('dark' or 'light')
 */
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        initializeLucideIcons();
    }
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Initialize theme on load
initializeTheme();


// ============================================================================
// 3. NAVBAR SCROLL EFFECTS
// ============================================================================

/**
 * Navbar Scroll Effect
 * Adds 'scrolled' class to navbar when user scrolls past threshold
 */

const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle placeholder
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        console.log('Mobile menu clicked');
        // Add mobile menu functionality here
    });
}


// ============================================================================
// 4. BACK TO TOP BUTTON
// ============================================================================

/**
 * Back to Top Button Functionality
 * Shows button when user scrolls past 300px and scrolls smoothly to top
 */

const backToTop = document.getElementById('backToTop');

if (backToTop) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top smoothly
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ============================================================================
// 5. CONTACT FORM
// ============================================================================

/**
 * Contact Form Handling
 * Collects form data and provides user feedback
 */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Send form data to Formspree
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                // Error
                const data = await response.json();
                alert('❌ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.');
                console.error('Form submission error:', data);
            }
        } catch (error) {
            // Network error
            alert('❌ Erro de conexão. Por favor, verifique sua internet e tente novamente.');
            console.error('Network error:', error);
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}


// ============================================================================
// 6. SMOOTH SCROLL
// ============================================================================

/**
 * Smooth Scroll for Anchor Links
 * Provides smooth scrolling when clicking links with hash anchors
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ============================================================================
// 7. SCROLL ANIMATIONS (IntersectionObserver)
// ============================================================================

/**
 * Intersection Observer Configuration
 * Triggers animations when elements enter viewport
 */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Unobserve after animation to improve performance
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Initialize scroll animations for various elements
 * Applies staggered animation delays based on element index
 */

// Animate sections
document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('fade-in-up');
    section.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(section);
});

// Animate service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});

// Animate portfolio cards
document.querySelectorAll('.portfolio-card').forEach((card, index) => {
    card.classList.add('scale-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});

// Animate stat items
document.querySelectorAll('.stat-item').forEach((stat, index) => {
    stat.classList.add('fade-in-up');
    stat.style.transitionDelay = `${index * 0.15}s`;
    scrollObserver.observe(stat);
});

// Animate result cards
document.querySelectorAll('.result-card').forEach((card, index) => {
    card.classList.add('scale-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});


// ============================================================================
// 8. TERMINAL EFFECTS
// ============================================================================

/**
 * Terminal Typing Effect
 * Applies staggered animation delays to terminal lines
 */

const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.3}s`;
});


// ============================================================================
// 9. PARALLAX EFFECTS
// ============================================================================

/**
 * Parallax Effect
 * Moves background orbs based on mouse position
 */

const parallaxOrb1 = document.getElementById('parallaxOrb1');
const parallaxOrb2 = document.getElementById('parallaxOrb2');

if (parallaxOrb1 || parallaxOrb2) {
    document.addEventListener('mousemove', (e) => {
        const moveX1 = (e.clientX / window.innerWidth - 0.5) * 50;
        const moveY1 = (e.clientY / window.innerHeight - 0.5) * 50;

        const moveX2 = (e.clientX / window.innerWidth - 0.5) * -30;
        const moveY2 = (e.clientY / window.innerHeight - 0.5) * -30;

        if (parallaxOrb1) {
            parallaxOrb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
        }

        if (parallaxOrb2) {
            parallaxOrb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        }
    });
}


// ============================================================================
// 10. FAQ TOGGLE
// ============================================================================

/**
 * FAQ Accordion Functionality
 * Allows users to expand/collapse FAQ items
 * Only one item can be open at a time
 */

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }

        // Reinitialize icons
        initializeLucideIcons();
    });
});


// ============================================================================
// 10.5. PROCESS TABS TOGGLE
// ============================================================================

/**
 * Process Tabs Functionality
 * Allows users to switch between Database and Development process views
 */

const processTabs = document.querySelectorAll('.process-tab');
const processContents = document.querySelectorAll('.process-content-wrapper');

processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const processType = tab.getAttribute('data-process');

        // Remove active from all tabs and contents
        processTabs.forEach(t => t.classList.remove('active'));
        processContents.forEach(c => c.classList.remove('active'));

        // Add active to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`process-${processType}`).classList.add('active');

        // Reinitialize icons after content change
        initializeLucideIcons();
    });
});


// ============================================================================
// 11. PROJECT MODALS
// ============================================================================

/**
 * Project Details Database
 * Contains detailed information for each project modal
 */

const projectDetails = {
    database1: {
        title: 'Arquitetura de Alta Disponibilidade',
        content: `
            <h3>Sobre o Projeto</h3>
            <p>Implementação completa de solução de alta disponibilidade para instituição financeira, utilizando SQL Server AlwaysOn Availability Groups com configuração multi-site.</p>

            <h3>Desafios</h3>
            <p>A empresa enfrentava downtime frequente que impactava diretamente suas operações críticas. Era necessária uma solução robusta que garantisse continuidade de negócios mesmo em caso de falhas de hardware ou desastres.</p>

            <h3>Solução Implementada</h3>
            <ul>
                <li>Configuração de AlwaysOn Availability Groups com 3 réplicas síncronas</li>
                <li>Implementação de failover automático em menos de 30 segundos</li>
                <li>Configuração de réplica de leitura para balanceamento de carga</li>
                <li>Monitoramento 24/7 com alertas proativos</li>
                <li>Documentação completa e treinamento da equipe</li>
            </ul>

            <h3>Resultados</h3>
            <p><strong>99.99% de uptime alcançado</strong> - A empresa não teve mais downtime não planejado desde a implementação, resultando em economia de milhões em perdas operacionais.</p>

            <div class="modal-tags">
                <span class="modal-tag">SQL Server 2019</span>
                <span class="modal-tag">AlwaysOn AG</span>
                <span class="modal-tag">Windows Server 2019</span>
                <span class="modal-tag">WSFC</span>
                <span class="modal-tag">Multi-site</span>
            </div>
        `
    },
    database2: {
        title: 'Plano de Disaster Recovery',
        content: `
            <h3>Sobre o Projeto</h3>
            <p>Desenvolvimento e implementação de estratégia completa de Disaster Recovery para grande empresa de e-commerce, garantindo RTO de 15 minutos e RPO de 5 minutos.</p>

            <h3>Desafios</h3>
            <p>A empresa não possuía um plano formal de DR. Em caso de desastre, poderia perder dias de dados e ficar offline por tempo indeterminado, com impacto financeiro catastrófico.</p>

            <h3>Solução Implementada</h3>
            <ul>
                <li>Análise de impacto nos negócios (BIA)</li>
                <li>Definição de RTO/RPO para cada sistema crítico</li>
                <li>Implementação de backup automatizado com replicação geográfica</li>
                <li>Configuração de site secundário com infraestrutura ativa</li>
                <li>Testes trimestrais de failover completo</li>
                <li>Runbooks detalhados para cenários de desastre</li>
            </ul>

            <h3>Resultados</h3>
            <p><strong>RTO de 15 minutos</strong> - A empresa agora tem garantia de continuidade de negócios mesmo em cenários catastróficos, com todos os processos documentados e testados.</p>

            <div class="modal-tags">
                <span class="modal-tag">Disaster Recovery</span>
                <span class="modal-tag">SQL Server</span>
                <span class="modal-tag">Log Shipping</span>
                <span class="modal-tag">Backup Strategy</span>
                <span class="modal-tag">Azure Site Recovery</span>
            </div>
        `
    },
    web1: {
        title: 'Website Institucional Responsivo',
        content: `
            <h3>Sobre o Projeto</h3>
            <p>Desenvolvimento de site institucional moderno e totalmente responsivo para empresa de engenharia civil, com integração ao CRM e sistema de gerenciamento de propostas.</p>

            <h3>Desafios</h3>
            <p>O site antigo era desatualizado, não responsivo e não convertia visitantes em leads qualificados. A empresa precisava de uma presença digital profissional que refletisse a qualidade de seus serviços.</p>

            <h3>Solução Implementada</h3>
            <ul>
                <li>Design moderno e profissional focado em conversão</li>
                <li>Desenvolvimento com React + Node.js para máxima performance</li>
                <li>Otimização SEO completa (on-page e técnico)</li>
                <li>Integração com CRM para captura automática de leads</li>
                <li>Sistema de gestão de portfólio de projetos</li>
                <li>Formulários inteligentes com qualificação de leads</li>
                <li>Google Analytics e heatmaps para otimização contínua</li>
            </ul>

            <h3>Resultados</h3>
            <p><strong>300% de aumento em conversões</strong> - O novo site triplicou a geração de leads qualificados, com taxa de conversão passando de 1.2% para 3.8%.</p>

            <div class="modal-tags">
                <span class="modal-tag">React</span>
                <span class="modal-tag">Node.js</span>
                <span class="modal-tag">SEO</span>
                <span class="modal-tag">Responsive Design</span>
                <span class="modal-tag">CRM Integration</span>
                <span class="modal-tag">Google Analytics</span>
            </div>
        `
    },
    system1: {
        title: 'Dashboards Estratégicos com BI',
        content: `
            <h3>Sobre o Projeto</h3>
            <p>Desenvolvimento de solução completa de Business Intelligence com dashboards estratégicos integrados ao ERP, proporcionando visão 360º do negócio em tempo real.</p>

            <h3>Desafios</h3>
            <p>A empresa tinha dados espalhados em múltiplos sistemas e planilhas, dificultando a tomada de decisões estratégicas. Relatórios eram gerados manualmente, consumindo horas de trabalho.</p>

            <h3>Solução Implementada</h3>
            <ul>
                <li>Modelagem de Data Warehouse dimensional (Star Schema)</li>
                <li>ETL automatizado para integração de múltiplas fontes</li>
                <li>Dashboards interativos com Metabase/Power BI</li>
                <li>KPIs estratégicos em tempo real</li>
                <li>Alertas automáticos para métricas críticas</li>
                <li>Análise preditiva para projeções de vendas</li>
                <li>Mobile-friendly para acesso executivo</li>
            </ul>

            <h3>Resultados</h3>
            <p><strong>Decisões 5x mais rápidas</strong> - Executivos agora têm acesso instantâneo a KPIs críticos, reduzindo o tempo de geração de relatórios de 8 horas para segundos.</p>

            <div class="modal-tags">
                <span class="modal-tag">Business Intelligence</span>
                <span class="modal-tag">Data Warehouse</span>
                <span class="modal-tag">Metabase</span>
                <span class="modal-tag">SQL Server</span>
                <span class="modal-tag">ETL</span>
                <span class="modal-tag">Data Analytics</span>
            </div>
        `
    }
};

/**
 * Open project modal with details
 * @param {string} projectId - The ID of the project to display
 */
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const project = projectDetails[projectId];
    if (project) {
        modalTitle.textContent = project.title;
        modalBody.innerHTML = project.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        initializeLucideIcons();
    }
}

/**
 * Close project modal
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
const projectModal = document.getElementById('projectModal');
if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target.id === 'projectModal') {
            closeModal();
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/**
 * Portfolio Filter Functionality
 * Filters portfolio cards based on selected category
 */

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.portfolio-card');

        // Show/hide cards based on filter
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'slideInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// ============================================================================
// 12. COOKIE CONSENT
// ============================================================================

/**
 * Cookie Consent Management
 * Shows consent banner and handles user preferences
 */

/**
 * Show cookie consent banner if not previously accepted/declined
 */
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        setTimeout(() => {
            const cookieElement = document.getElementById('cookieConsent');
            if (cookieElement) {
                cookieElement.classList.add('show');
            }
        }, 2000);
    }
}

/**
 * Accept cookies and initialize analytics
 */
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const cookieElement = document.getElementById('cookieConsent');
    if (cookieElement) {
        cookieElement.classList.remove('show');
    }
    console.log('Cookies accepted - Analytics initialized');
    // TODO: Initialize Google Analytics or other tracking here
}

/**
 * Decline cookies
 */
function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const cookieElement = document.getElementById('cookieConsent');
    if (cookieElement) {
        cookieElement.classList.remove('show');
    }
    console.log('Cookies declined');
}

// Show cookie consent on page load
showCookieConsent();


// ============================================================================
// 13. UTILITY FUNCTIONS
// ============================================================================

/**
 * Lazy Loading for Images
 * Uses IntersectionObserver to load images when they enter viewport
 */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all lazy-loaded images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Enhanced Counter Animation with Better Detection
 * Animates numbers when they become visible
 */

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');

            // Extract number and suffix (like %, +, etc)
            const text = entry.target.textContent.trim();
            const numberMatch = text.match(/[\d.]+/);
            const suffix = text.replace(/[\d.]/g, '').trim();

            if (numberMatch) {
                const endValue = parseFloat(numberMatch[0]);
                const isDecimal = numberMatch[0].includes('.');

                animateCounterValue(entry.target, 0, endValue, 2000, suffix, isDecimal);
            }
        }
    });
}, { threshold: 0.3 });

/**
 * Enhanced animate value function
 */
function animateCounterValue(element, start, end, duration, suffix = '', isDecimal = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = easeOutQuart * (end - start) + start;

        if (isDecimal) {
            element.textContent = value.toFixed(2) + suffix;
        } else {
            element.textContent = Math.floor(value) + suffix;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe result numbers for counter animation
document.querySelectorAll('.result-number, .stat-number').forEach(numberElement => {
    counterObserver.observe(numberElement);
});

/**
 * Update Copyright Year
 * Sets current year in footer
 */

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

/**
 * Reinitialize Lucide icons after dynamic content is loaded
 * Useful for AJAX content or dynamically added elements
 */

setTimeout(() => {
    initializeLucideIcons();
}, 100);
