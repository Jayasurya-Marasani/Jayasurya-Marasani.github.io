const footerCopyright = document.querySelector(".copyright");
if (footerCopyright) {
    footerCopyright.textContent = `© ${new Date().getFullYear()} Jayasurya Marasani.`;
}

// Enhance compact navigation; links remain accessible if JavaScript is unavailable.
const navbar = document.querySelector("#all-links");
const menuToggle = navbar?.querySelector(".nav-toggle");
const menuLinks = navbar?.querySelector("#navigation-links");
if (navbar && menuToggle && menuLinks) {
    const compactLayout = window.matchMedia("(max-width: 1024px)");
    let menuOpen = false;
    const setMenuOpen = (open, returnFocus = false) => {
        menuOpen = compactLayout.matches && open;
        menuToggle.setAttribute("aria-expanded", String(menuOpen));
        menuToggle.setAttribute("aria-label", menuOpen ? "Close navigation" : "Open navigation");
        menuLinks.hidden = compactLayout.matches && !menuOpen;
        if (returnFocus) menuToggle.focus();
    };
    navbar.classList.add("menu-ready");
    setMenuOpen(false);
    menuToggle.addEventListener("click", () => setMenuOpen(!menuOpen));
    menuLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("click", (event) => {
        if (menuOpen && !navbar.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuOpen) setMenuOpen(false, true);
    });
    navbar.addEventListener("focusout", (event) => {
        if (menuOpen && event.relatedTarget && !navbar.contains(event.relatedTarget)) {
            setMenuOpen(false);
        }
    });
    compactLayout.addEventListener("change", () => {
        const focused = document.activeElement;
        if (compactLayout.matches && menuLinks.contains(focused)) {
            menuToggle.focus();
        } else if (!compactLayout.matches && focused === menuToggle) {
            menuLinks.querySelector('[aria-current="page"]')?.focus();
        }
        setMenuOpen(false);
    });
}

// Content stays visible without JavaScript, observer support or motion permission.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!motionPreference.matches && "IntersectionObserver" in window) {
    const elements = document.querySelectorAll(
        ".portfolio-site .portrait, .portfolio-site .bio-col, "
        + ".portfolio-site .page-heading, .portfolio-site .content-card, "
        + ".portfolio-site .skill-group, .portfolio-site .publication, "
        + ".portfolio-site .contact-links"
    );
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
        }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element, index) => {
        element.dataset.reveal = "";
        element.style.setProperty("--reveal-delay", `${Math.min(index * 60, 180)}ms`);
        element.classList.add("reveal-pending");
        observer.observe(element);
    });

    motionPreference.addEventListener("change", (event) => {
        if (!event.matches) return;
        observer.disconnect();
        elements.forEach((element) => {
            element.classList.remove("reveal-pending", "reveal-visible");
        });
    });
}
