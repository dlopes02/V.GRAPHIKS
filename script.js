(function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    const time = document.querySelector(".status-time");
    const revealItems = document.querySelectorAll(".reveal");
    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 24);
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const open = nav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(open));
        });
        nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }));
    }

    if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (event) => {
            dot.style.left = `${event.clientX}px`;
            dot.style.top = `${event.clientY}px`;
            ring.style.left = `${event.clientX}px`;
            ring.style.top = `${event.clientY}px`;
            dot.style.opacity = "1";
            ring.style.opacity = "1";
        });
        document.querySelectorAll("[data-cursor]").forEach((element) => {
            element.addEventListener("mouseenter", () => ring.classList.add("active"));
            element.addEventListener("mouseleave", () => ring.classList.remove("active"));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });
    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
        observer.observe(item);
    });

    if (time) {
        const updateTime = () => {
            time.textContent = new Date().toLocaleTimeString("pt-PT", { hour12: false });
        };
        updateTime();
        window.setInterval(updateTime, 1000);
    }

    const languageToggle = document.querySelector("#language-toggle");
    let activeLanguage = localStorage.getItem("site-language") || "pt";
    const translations = {
        pt: {
            nav: ["Trabalhos", "Serviços", "Estúdio", "Contacto"],
            heroKicker: "Laboratório visual independente",
            heroTitle: "Ideias que<br><em>não ficam</em><br>quietas<span>.</span>",
            heroDescription: "Criamos identidades, experiências e imagens para marcas que preferem abrir o próprio caminho.",
            heroButton: "Explorar trabalho",
            sectionLabels: ["01 / Trabalho selecionado", "02 / Competências", "03 / Notas do estúdio", "04 / Começar uma conversa"],
            workIntro: "Uma seleção de sistemas visuais, interfaces e mundos que construímos.",
            servicesIntro: "Do primeiro rabisco ao último pixel, damos forma ao que ainda não existe.",
            projects: [["Marca / 2024", "Identidade<br><i>Bauhaus</i>"], ["Digital / 2024", "The <i>Furnish</i>"], ["Produto / 2023", "SaaS<br><i>Dashboard</i>"], ["Identidade / 2024", "<i>Surfari</i>"]],
            services: [["Universos de marca", "Identidades com personalidade, sistemas que resistem ao tempo e marcas impossíveis de ignorar."], ["Experiências digitais", "Websites e produtos digitais onde cada interação tem um motivo para existir."], ["Histórias visuais", "Campanhas, imagens e conteúdos que transformam atenção em ligação."]],
            aboutIntro: "Não seguimos tendências. Procuramos tensão, ritmo e clareza.",
            aboutTitle: "Design não é decoração.<br><strong>É direção.</strong>",
            aboutText: "Somos um estúdio independente que transforma estratégia em sinais visuais com energia própria. Trabalhamos entre a precisão e o acidente, entre a função e o desejo.",
            stats: ["projetos", "parcerias", "anos a criar"],
            contactKicker: "04 / Começar uma conversa",
            contactTitle: "Vamos fazer<br><i>barulho.</i>",
            gmail: "Abrir mensagem no Gmail",
            switchLabel: "Mudar para inglês"
        },
        en: {
            nav: ["Work", "Services", "Studio", "Contact"],
            heroKicker: "Independent visual laboratory",
            heroTitle: "Ideas that<br><em>refuse to</em><br>stay quiet<span>.</span>",
            heroDescription: "We create identities, experiences and images for brands that prefer to carve their own path.",
            heroButton: "Explore work",
            sectionLabels: ["01 / Selected work", "02 / Capabilities", "03 / Studio notes", "04 / Start a conversation"],
            workIntro: "A selection of visual systems, interfaces and worlds we have built.",
            servicesIntro: "From the first sketch to the final pixel, we give shape to what does not exist yet.",
            projects: [["Branding / 2024", "Bauhaus<br><i>Identity</i>"], ["Digital / 2024", "The <i>Furnish</i>"], ["Product / 2023", "SaaS<br><i>Dashboard</i>"], ["Identity / 2024", "<i>Surfari</i>"]],
            services: [["Brand worlds", "Identities with personality, systems built to last and brands impossible to ignore."], ["Digital experiences", "Websites and digital products where every interaction has a reason to exist."], ["Visual stories", "Campaigns, images and content that turn attention into connection."]],
            aboutIntro: "We do not follow trends. We look for tension, rhythm and clarity.",
            aboutTitle: "Design is not decoration.<br><strong>It is direction.</strong>",
            aboutText: "We are an independent studio turning strategy into visual signals with an energy of their own. We work between precision and accident, function and desire.",
            stats: ["projects", "partnerships", "years creating"],
            contactKicker: "04 / Start a conversation",
            contactTitle: "Let’s make<br><i>noise.</i>",
            gmail: "Open a Gmail message",
            switchLabel: "Switch to Portuguese"
        }
    };

    function applyLanguage(language) {
        const copy = translations[language];
        if (!copy) return;
        activeLanguage = language;
        document.documentElement.lang = language;
        document.querySelectorAll(".site-nav a").forEach((link, index) => {
            link.lastChild.textContent = copy.nav[index];
        });
        document.querySelector(".kicker").textContent = copy.heroKicker;
        document.querySelector(".hero h1").innerHTML = copy.heroTitle;
        document.querySelector(".hero-description").textContent = copy.heroDescription;
        document.querySelector(".magnetic-button span").textContent = copy.heroButton;
        document.querySelector("#work .eyebrow").textContent = copy.sectionLabels[0];
        document.querySelector("#services .eyebrow").textContent = copy.sectionLabels[1];
        document.querySelector("#about .eyebrow").textContent = copy.sectionLabels[2];
        document.querySelector("#contact .eyebrow").textContent = copy.sectionLabels[3];
        document.querySelector("#work .section-top p").textContent = copy.workIntro;
        document.querySelector("#services .section-top p").textContent = copy.servicesIntro;
        document.querySelectorAll(".work-card").forEach((card, index) => {
            card.querySelector(".tag").textContent = copy.projects[index][0];
            card.querySelector("h2").innerHTML = copy.projects[index][1];
        });
        document.querySelectorAll(".service").forEach((service, index) => {
            service.querySelector("h3").textContent = copy.services[index][0];
            service.querySelector("p").textContent = copy.services[index][1];
        });
        document.querySelector("#about .section-top p").textContent = copy.aboutIntro;
        document.querySelector(".manifesto-copy > p").innerHTML = copy.aboutTitle;
        document.querySelector(".manifesto-side > p").textContent = copy.aboutText;
        document.querySelectorAll(".stats small").forEach((label, index) => {
            label.textContent = copy.stats[index];
        });
        document.querySelector("#contact .eyebrow").textContent = copy.contactKicker;
        document.querySelector("#contact h2").innerHTML = copy.contactTitle;
        document.querySelector(".contact-link").firstChild.textContent = `${copy.gmail} `;
        languageToggle.textContent = language === "pt" ? "PT / EN" : "EN / PT";
        languageToggle.setAttribute("aria-label", copy.switchLabel);
        localStorage.setItem("site-language", language);
    }

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            applyLanguage(activeLanguage === "pt" ? "en" : "pt");
            if (nav) {
                nav.classList.remove("active");
                menuToggle?.setAttribute("aria-expanded", "false");
            }
        });
        applyLanguage(activeLanguage);
    }
})();
