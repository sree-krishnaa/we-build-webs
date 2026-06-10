/* =========================
   ELEMENTS
========================= */

const navbar      = document.querySelector(".navbar");
const navToggle   = document.querySelector(".nav-toggle");
const navLinks    = document.querySelector(".nav-links");
const navItems    = document.querySelectorAll(".nav-links a");
const sections    = document.querySelectorAll("section[id]");


/* =========================
   MOBILE NAVIGATION
========================= */

navToggle.addEventListener("click", () => {

    const isOpen = navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Prevent background scroll when drawer open
    document.body.style.overflow = isOpen ? "hidden" : "";

    // Accessibility
    navToggle.setAttribute("aria-expanded", isOpen);
});


/* =========================
   CLOSE MOBILE MENU ON LINK CLICK
========================= */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
        navToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================
   CLOSE MOBILE MENU ON ESC
========================= */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
        navToggle.setAttribute("aria-expanded", "false");
    }

});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

}, { passive: true });


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */

function updateActiveNav(){

    let current = "";

    sections.forEach(section => {

        const sectionTop    = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ){
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll(){

    revealElements.forEach(element => {

        const revealTop  = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(revealTop < windowHeight - 80){
            element.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll, { passive: true });
revealOnScroll();


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e){

        const existing = this.querySelector(".ripple");
        if(existing) existing.remove();

        const circle   = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius   = diameter / 2;

        // Support both mouse and touch events
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        circle.style.width  =
        circle.style.height = `${diameter}px`;

        circle.style.left = `${clientX - this.getBoundingClientRect().left - radius}px`;
        circle.style.top  = `${clientY - this.getBoundingClientRect().top  - radius}px`;

        circle.classList.add("ripple");
        this.appendChild(circle);

        setTimeout(() => circle.remove(), 700);

    });

});


/* =========================
   ABOUT SECTION REVEAL
========================= */

const aboutSection = document.querySelector(".about-section");

if(aboutSection){

    new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }

        });

    }, { threshold: 0.15 }).observe(aboutSection);

}


/* =========================
   VALUE CARD TILT — DESKTOP ONLY
========================= */

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {

    document.querySelectorAll(".value-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect    = card.getBoundingClientRect();
            const rotateY = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
            const rotateX = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;

        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });

}


/* =========================
   VIDEO PLAYBACK
========================= */

document.querySelectorAll("video").forEach(video => {

    // Only attempt autoplay on videos that are visible
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        });

    }, { threshold: 0.1 });

    observer.observe(video);

});


/* =========================
   MENU CARDS STAGGER REVEAL
========================= */

const menuCards   = document.querySelectorAll(".menu-card");
const menuSection = document.querySelector(".menu-preview");

if(menuSection && menuCards.length){

    new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                menuCards.forEach((card, i) => {

                    setTimeout(() => {
                        card.classList.add("show");
                    }, i * 100);

                });

                obs.unobserve(entry.target);

            }

        });

    }, { threshold: 0.1 }).observe(menuSection);

}


/* =========================
   MENU BUTTON RIPPLE
========================= */

const menuButton = document.querySelector(".menu-btn");

if(menuButton){

    menuButton.addEventListener("click", function(e){

        const existing = this.querySelector(".ripple");
        if(existing) existing.remove();

        const rect   = this.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ripple.style.width  =
        ripple.style.height = `${size}px`;

        ripple.style.left = `${clientX - rect.left - size / 2}px`;
        ripple.style.top  = `${clientY - rect.top  - size / 2}px`;

        ripple.classList.add("ripple");
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

    });

}


/* =========================
   GALLERY POLAROID REVEAL
========================= */

const polaroids      = document.querySelectorAll(".polaroid");
const gallerySection = document.querySelector(".gallery-section");

if(gallerySection && polaroids.length){

    new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                polaroids.forEach((p, i) => {
                    setTimeout(() => p.classList.add("show"), i * 60);
                });

                obs.unobserve(entry.target);

            }

        });

    }, { threshold: 0.05 }).observe(gallerySection);

}


/* =========================
   LIGHTBOX
========================= */

const lightbox        = document.querySelector(".gallery-lightbox");
const lightboxImage   = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeLightbox   = document.querySelector(".lightbox-close");

function hideLightbox(){

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

}

polaroids.forEach(polaroid => {

    polaroid.addEventListener("click", () => {

        const img = polaroid.querySelector("img");

        lightboxImage.src     = img.src;
        lightboxImage.alt     = img.alt;
        lightboxCaption.textContent = polaroid.dataset.caption;

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

    });

});

if(closeLightbox){
    closeLightbox.addEventListener("click", hideLightbox);
}

lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox) hideLightbox();
});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape" && lightbox.classList.contains("active")){
        hideLightbox();
    }

});


/* =========================
   OUTLET CARDS REVEAL
========================= */

const outletCards = document.querySelectorAll(".outlet-card");

if(outletCards.length){

    const outletObserver = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                outletCards.forEach((card, i) => {

                    card.style.setProperty("--delay", `${i * 80}ms`);

                    setTimeout(() => card.classList.add("show"), i * 80);

                });

                obs.unobserve(entry.target);

            }

        });

    }, { threshold: 0.05 });

    outletObserver.observe(outletCards[0]);

}


/* =========================
   OUTLET CARD ACTIVE STATE
========================= */

outletCards.forEach(card => {

    card.addEventListener("click", () => {

        outletCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

    });

});


/* =========================
   FOOTER REVEAL
========================= */

const footerContainer = document.querySelector(".footer-container");

if(footerContainer){

    new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }

        });

    }, { threshold: 0.05 }).observe(footerContainer);

}


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            // Account for sticky header height
            const headerH = document.querySelector("header").offsetHeight;
            const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

            window.scrollTo({ top: targetY, behavior: "smooth" });

        }

    });

});


/* =========================
   CONTACT CARDS REVEAL
========================= */

const contactCards = document.querySelectorAll(".contact-card");

if(contactCards.length){

    const contactObserver = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                contactCards.forEach((card, i) => {

                    setTimeout(() => {
                        card.classList.add("show");
                    }, i * 60);

                });

                obs.unobserve(entry.target);

            }

        });

    }, { threshold: 0.05 });

    contactObserver.observe(contactCards[0]);

}


/* =========================
   MAP WRAPPER REVEAL
========================= */

const mapWrapper = document.querySelector(".map-wrapper");

if(mapWrapper){

    new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }

        });

    }, { threshold: 0.05 }).observe(mapWrapper);

}


/* =========================
   PREFER REDUCED MOTION
========================= */

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

    document.documentElement.style.scrollBehavior = "auto";

    document.querySelectorAll("video").forEach(v => v.pause());

}