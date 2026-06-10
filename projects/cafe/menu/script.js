/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle("scrolled", window.scrollY > 50);

}, { passive: true });


/* =========================
   MOBILE NAVIGATION
========================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

        const isOpen = navToggle.classList.toggle("active");

        navLinks.classList.toggle("active");

        // Lock background scroll when drawer is open
        document.body.style.overflow = isOpen ? "hidden" : "";

        navToggle.setAttribute("aria-expanded", isOpen);

    });

    // Close drawer when a link is tapped
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape" && navLinks.classList.contains("active")) {

            navToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
            navToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* =========================
   FAVORITE ITEM PULSE
========================= */

document.querySelectorAll(".favorite").forEach(item => {

    item.addEventListener("mouseenter", () => {
        item.classList.add("pulse");
    });

    item.addEventListener("animationend", () => {
        item.classList.remove("pulse");
    });

});


/* =========================
   VIDEO PLAYBACK — INTERSECTION GATED
========================= */

const menuVideo = document.querySelector(".menu-video video");

if (menuVideo) {

    const videoObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                menuVideo.play().catch(() => {});
            } else {
                menuVideo.pause();
            }

        });

    }, { threshold: 0.1 });

    videoObserver.observe(menuVideo);

}


/* =========================
   REDUCED MOTION — PAUSE VIDEO
========================= */

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && menuVideo) {

    menuVideo.pause();

}


/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});