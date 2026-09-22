(function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("main-nav");
    const languageToggle = document.getElementById("languageToggle");
    const contactForm = document.getElementById("contactForm");
    const formLoadedAt = Date.now();
    const minSubmitDelay = 3500;
    const submitCooldown = 60000;

    function getStoredValue(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function setStoredValue(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            return false;
        }
        return true;
    }

    const translations = {
        pt: {
            navHome: "Início",
            navServices: "Serviços",
            navPortfolio: "Portfólio",
            navAbout: "Sobre",
            navContact: "Contacto",
            heroEyebrow: "Design studio independente",
            heroTitle: "Identidades visuais, websites e conteúdo digital com presença.",
            heroSubtitle: "A V.GRAPHIKS cria marcas, interfaces e peças visuais com estética forte, detalhe técnico e foco em resultados.",
            ctaGetStarted: "Pedir orçamento",
            ctaViewWork: "Ver trabalhos",
            servicesEyebrow: "O que fazemos",
            servicesTitle: "Serviços para marcas que querem parecer tão boas quanto trabalham.",
            service1Title: "Identidade Visual",
            service1Text: "Logótipos, paletas, tipografia e sistemas visuais preparados para crescer com a marca.",
            service2Title: "Web Design",
            service2Text: "Sites responsivos, rápidos e com uma experiência clara em desktop e mobile.",
            service3Title: "Conteúdo Digital",
            service3Text: "Peças para redes sociais, campanhas, banners e materiais visuais consistentes.",
            service4Title: "UI/UX",
            service4Text: "Interfaces pensadas para conversão, leitura fácil e navegação sem atrito.",
            portfolioEyebrow: "Portfólio",
            portfolioTitle: "Projetos recentes com acabamento visual forte.",
            portfolioIntro: "Uma seleção de conceitos e trabalhos digitais para mostrar o estilo, ritmo e detalhe da V.GRAPHIKS.",
            portfolio1Tag: "Website",
            portfolio1Title: "E-commerce Visual",
            portfolio1Text: "Experiência de compra moderna com layout limpo e destaque para produto.",
            portfolio2Tag: "Interface",
            portfolio2Title: "Dashboard SaaS",
            portfolio2Text: "Painel de dados com leitura rápida e hierarquia visual bem definida.",
            portfolio3Tag: "Mobile",
            portfolio3Title: "App Concept",
            portfolio3Text: "Ecrãs mobile com navegação simples e estética premium.",
            aboutEyebrow: "Sobre",
            aboutTitle: "Design com personalidade, estrutura e intenção.",
            aboutPara1: "A V.GRAPHIKS é um estúdio criativo focado em transformar ideias em presenças digitais memoráveis.",
            aboutPara2: "Cada projeto junta estratégia visual, composição cuidada e execução técnica para criar uma marca que se percebe em segundos.",
            stat1Label: "Projetos",
            stat2Label: "Clientes",
            stat3Label: "Prémios",
            contactEyebrow: "Contacto",
            contactTitle: "Tens uma ideia? Vamos dar-lhe forma.",
            contactSubtitle: "Conta-nos o que precisas e respondemos com uma proposta clara.",
            contactNameLabel: "Nome",
            contactEmailLabel: "Email",
            contactMessageLabel: "Mensagem",
            contactNamePlaceholder: "O teu nome",
            contactEmailPlaceholder: "teu@email.com",
            contactMessagePlaceholder: "Fala-nos sobre o projeto",
            ctaSendMessage: "Enviar mensagem",
            footerCopy: "© 2026 V.GRAPHIKS. Todos os direitos reservados.",
            footerOwner: "Diogo \"Jiggls\" Duarte é o proprietário da V.GRAPHIKS.",
            notificationError: "Preenche todos os campos, por favor.",
            notificationSpam: "Por segurança, tenta enviar novamente daqui a pouco.",
        },
        en: {
            navHome: "Home",
            navServices: "Services",
            navPortfolio: "Portfolio",
            navAbout: "About",
            navContact: "Contact",
            heroEyebrow: "Independent design studio",
            heroTitle: "Visual identities, websites and digital content with presence.",
            heroSubtitle: "V.GRAPHIKS creates brands, interfaces and visual assets with strong aesthetics, technical detail and a results-focused mindset.",
            ctaGetStarted: "Request a quote",
            ctaViewWork: "View work",
            servicesEyebrow: "What we do",
            servicesTitle: "Services for brands that want to look as good as they work.",
            service1Title: "Visual Identity",
            service1Text: "Logos, palettes, typography and visual systems built to grow with the brand.",
            service2Title: "Web Design",
            service2Text: "Responsive, fast websites with a clear experience across desktop and mobile.",
            service3Title: "Digital Content",
            service3Text: "Social posts, campaigns, banners and consistent visual materials.",
            service4Title: "UI/UX",
            service4Text: "Interfaces designed for conversion, easy reading and frictionless navigation.",
            portfolioEyebrow: "Portfolio",
            portfolioTitle: "Recent projects with a sharp visual finish.",
            portfolioIntro: "A selection of digital concepts and work showing the style, pace and detail of V.GRAPHIKS.",
            portfolio1Tag: "Website",
            portfolio1Title: "Visual E-commerce",
            portfolio1Text: "Modern shopping experience with clean layout and strong product focus.",
            portfolio2Tag: "Interface",
            portfolio2Title: "SaaS Dashboard",
            portfolio2Text: "Data panel with fast scanning and clear visual hierarchy.",
            portfolio3Tag: "Mobile",
            portfolio3Title: "App Concept",
            portfolio3Text: "Mobile screens with simple navigation and a premium feel.",
            aboutEyebrow: "About",
            aboutTitle: "Design with personality, structure and intention.",
            aboutPara1: "V.GRAPHIKS is a creative studio focused on turning ideas into memorable digital presences.",
            aboutPara2: "Every project brings together visual strategy, careful composition and technical execution to create a brand people understand in seconds.",
            stat1Label: "Projects",
            stat2Label: "Clients",
            stat3Label: "Awards",
            contactEyebrow: "Contact",
            contactTitle: "Got an idea? Let's give it shape.",
            contactSubtitle: "Tell us what you need and we will reply with a clear proposal.",
            contactNameLabel: "Name",
            contactEmailLabel: "Email",
            contactMessageLabel: "Message",
            contactNamePlaceholder: "Your name",
            contactEmailPlaceholder: "you@email.com",
            contactMessagePlaceholder: "Tell us about the project",
            ctaSendMessage: "Send message",
            footerCopy: "© 2026 V.GRAPHIKS. All rights reserved.",
            footerOwner: "Diogo \"Jiggls\" Duarte owns V.GRAPHIKS.",
            notificationError: "Please fill in every field.",
            notificationSpam: "For security, please try again in a moment.",
        }
    };

    function currentLanguage() {
        return getStoredValue("siteLanguage") || document.documentElement.lang || "pt";
    }

    function translatePage(lang) {
        const copy = translations[lang] || translations.pt;
        document.documentElement.lang = lang;
        setStoredValue("siteLanguage", lang);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const value = copy[element.dataset.i18n];
            if (value !== undefined) {
                element.textContent = value;
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const value = copy[element.dataset.i18nPlaceholder];
            if (value !== undefined) {
                element.placeholder = value;
            }
        });

        if (languageToggle) {
            languageToggle.textContent = lang === "pt" ? "PT / EN" : "EN / PT";
            languageToggle.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para Português");
        }

        if (hamburger) {
            hamburger.setAttribute("aria-label", lang === "pt" ? "Abrir menu" : "Open menu");
        }

    }

    function closeMenu() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    }

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            translatePage(currentLanguage() === "pt" ? "en" : "pt");
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            hamburger.classList.toggle("active", isActive);
            hamburger.setAttribute("aria-expanded", String(isActive));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    function showNotification(message, type) {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        window.setTimeout(() => {
            notification.remove();
        }, 3200);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const copy = translations[currentLanguage()] || translations.pt;
            const honeypot = contactForm.querySelector('input[name="_honey"]');
            const lastSubmit = Number(getStoredValue("lastContactSubmit") || 0);
            const submittedTooFast = Date.now() - formLoadedAt < minSubmitDelay;
            const submittedTooOften = Date.now() - lastSubmit < submitCooldown;

            if ((honeypot && honeypot.value.trim()) || submittedTooFast || submittedTooOften) {
                showNotification(copy.notificationSpam, "error");
                return;
            }

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                showNotification(copy.notificationError, "error");
                return;
            }

            const nameField = contactForm.elements.name;
            const emailField = contactForm.elements.email;
            const messageField = contactForm.elements.message;
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();
            nameField.value = name;
            emailField.value = email;
            messageField.value = message;

            if (!name || !email || !message || !contactForm.checkValidity()) {
                contactForm.reportValidity();
                showNotification(copy.notificationError, "error");
                return;
            }

            contactForm.querySelector('[name="_subject"]').value = `Novo contacto V.GRAPHIKS - ${name}`;
            setStoredValue("lastContactSubmit", String(Date.now()));
            HTMLFormElement.prototype.submit.call(contactForm);
        });
    }

    const revealItems = document.querySelectorAll(".service-card, .portfolio-item, .about-copy, .contact-form");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observer.observe(item);
        });
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const style = document.createElement("style");
    style.textContent = ".is-visible{opacity:1!important;transform:translateY(0)!important;}";
    document.head.appendChild(style);

    translatePage(currentLanguage());
})();
