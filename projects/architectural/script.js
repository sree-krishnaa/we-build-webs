// ==================================================
// CRESTLINE ARCHITECTURE
// INTERACTIONS & ANIMATIONS
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================================
    // ELEMENT REFERENCES
    // ==============================================

    const tocItems = document.querySelectorAll(".toc-item");
    const editorialLayout = document.querySelector(".editorial-layout");


    // ==============================================
    // PAGE LOAD ANIMATIONS
    // ==============================================

    if (typeof gsap !== "undefined") {

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        tl.from(".brand-logo", {
            y: -30,
            opacity: 0,
            duration: 0.8
        })

        .from(".brand-tagline", {
            y: -20,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")

        .from(".image-wrapper", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.2")

        .from(".image-wrapper img", {
            scale: 1.1,
            duration: 1
        }, "-=0.8")

        .from(".intro-label", {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=0.5")

        .from(".intro-title", {
            y: 40,
            opacity: 0,
            duration: 0.7
        }, "-=0.3")

        .from(".intro-text", {
            y: 25,
            opacity: 0,
            duration: 0.7
        }, "-=0.4")

        .from(".toc-item", {
            x: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4
        }, "-=0.4")

        .from(".toc-divider", {
            scaleY: 0,
            transformOrigin: "center",
            duration: 0.6
        }, "-=0.6");
    }


    // ==============================================
    // TABLE OF CONTENT HOVER EFFECTS
    // ==============================================

    if (tocItems.length && typeof gsap !== "undefined") {

        tocItems.forEach(item => {

            item.addEventListener("mouseenter", () => {

                gsap.to(item, {
                    x: 8,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

            item.addEventListener("mouseleave", () => {

                gsap.to(item, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }


    // ==============================================
    // BOOK HOVER EFFECT
    // ==============================================

    if (editorialLayout && window.innerWidth > 1024 &&
        typeof gsap !== "undefined") {

        editorialLayout.addEventListener("mouseenter", () => {

            gsap.to(editorialLayout, {
                rotateY: 2,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 2000
            });

        });

        editorialLayout.addEventListener("mouseleave", () => {

            gsap.to(editorialLayout, {
                rotateY: 0,
                duration: 0.4,
                ease: "power2.out"
            });

        });

    }


    // ==============================================
    // SMOOTH SCROLL NAVIGATION
    // ==============================================

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    // ==============================================
    // MOBILE TOUCH FEEDBACK
    // ==============================================

    if (window.innerWidth <= 768 &&
        typeof gsap !== "undefined") {

        tocItems.forEach(item => {

            item.addEventListener("touchstart", () => {

                gsap.to(item, {
                    scale: 0.97,
                    duration: 0.1
                });

            });

            item.addEventListener("touchend", () => {

                gsap.to(item, {
                    scale: 1,
                    duration: 0.2
                });

            });

        });

    }

});
// ==================================================
// ABOUT SPREAD ANIMATIONS
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================================
    // ELEMENT REFERENCES
    // ==============================================

    const aboutSection = document.querySelector(".about-spread");
    const serviceCards = document.querySelectorAll(".service-card");
    const aboutCard = document.querySelector(".about-card");


    // ==============================================
    // ABOUT PAGE LOAD ANIMATIONS
    // ==============================================

    if (aboutSection && typeof gsap !== "undefined") {

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        tl.from(".about-card", {
            x: -60,
            opacity: 0,
            duration: 0.8
        })

        .from(".about-image", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")

        .from(".timeline-card", {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")

        .from(".mission-title", {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.5")

        .from(".mission-item", {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5
        }, "-=0.4")

        .from(".service-card", {
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.5
        }, "-=0.4")

        .from(".highlight-card", {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.3");
    }


    // ==============================================
    // SERVICE CARD HOVER EFFECTS
    // ==============================================

    if (serviceCards.length && typeof gsap !== "undefined") {

        serviceCards.forEach(card => {

            card.addEventListener("mouseenter", () => {

                gsap.to(card, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector(".service-icon"), {
                    scale: 1.08,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

            card.addEventListener("mouseleave", () => {

                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector(".service-icon"), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }


    // ==============================================
    // ABOUT CARD HOVER EFFECT
    // ==============================================

    if (aboutCard && window.innerWidth > 768 &&
        typeof gsap !== "undefined") {

        aboutCard.addEventListener("mouseenter", () => {

            gsap.to(aboutCard, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        aboutCard.addEventListener("mouseleave", () => {

            gsap.to(aboutCard, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    }


    // ==============================================
    // MOBILE TOUCH FEEDBACK
    // ==============================================

    if (window.innerWidth <= 768 &&
        typeof gsap !== "undefined") {

        serviceCards.forEach(card => {

            card.addEventListener("touchstart", () => {

                gsap.to(card, {
                    scale: 0.98,
                    duration: 0.1
                });

            });

            card.addEventListener("touchend", () => {

                gsap.to(card, {
                    scale: 1,
                    duration: 0.2
                });

            });

        });

    }

});

// ==================================================
// VISION SPREAD ANIMATIONS
// ==================================================

if (document.querySelector(".vision-spread") &&
    typeof gsap !== "undefined") {

    const visionTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    visionTl

    // Vision title
    .from(".vision-title", {
        y: 30,
        opacity: 0,
        duration: 0.8
    })

    // Timeline steps
    .from(".timeline-step", {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5
    }, "-=0.4")

    // Notes
    .from(".note-item", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    }, "-=0.3")

    // Years
    .from(".year-item", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
    }, "-=0.4")

    // Gallery
    .from(".gallery-item", {
        y: 25,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
    }, "-=0.4");
}
// ==================================================
// VISION GALLERY INTERACTIONS
// ==================================================

const galleryItems =
    document.querySelectorAll(".gallery-item");

if (galleryItems.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    galleryItems.forEach(item => {

        const image =
            item.querySelector("img");

        item.addEventListener("mouseenter", () => {

            gsap.to(image, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
            });

        });

        item.addEventListener("mouseleave", () => {

            gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// TIMELINE INTERACTIONS
// ==================================================

const timelineSteps =
    document.querySelectorAll(".timeline-step");

if (timelineSteps.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    timelineSteps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            gsap.to(step, {
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        step.addEventListener("mouseleave", () => {

            gsap.to(step, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// VISION MOBILE FEEDBACK
// ==================================================

if (window.innerWidth <= 768 &&
    typeof gsap !== "undefined") {

    [...galleryItems, ...timelineSteps]
        .forEach(item => {

            item.addEventListener("touchstart", () => {

                gsap.to(item, {
                    scale: 0.98,
                    duration: 0.1
                });

            });

            item.addEventListener("touchend", () => {

                gsap.to(item, {
                    scale: 1,
                    duration: 0.2
                });

            });

        });

}
// ==================================================
// SERVICES SPREAD ANIMATIONS
// ==================================================

if (document.querySelector(".services-spread") &&
    typeof gsap !== "undefined") {

    const servicesTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    servicesTl

    // Title
    .from(".services-title", {
        y: 40,
        opacity: 0,
        duration: 0.8
    })

    // Service entries
    .from(".service-entry", {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    }, "-=0.4")

    // Process timeline
    .from(".process-step", {
        y: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    }, "-=0.3")

    // Image reveal
    .from(".services-image", {
        scaleY: 0,
        transformOrigin: "center top",
        duration: 0.9
    }, "-=0.5")

    // Stats card
    .from(".stats-card", {
        x: 40,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    // Insight card
    .from(".insight-card", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.4");
}
// ==================================================
// SERVICE ENTRY INTERACTIONS
// ==================================================

const serviceEntries =
    document.querySelectorAll(".service-entry");

if (serviceEntries.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    serviceEntries.forEach(entry => {

        entry.addEventListener("mouseenter", () => {

            gsap.to(entry, {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        entry.addEventListener("mouseleave", () => {

            gsap.to(entry, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// PROCESS CARD INTERACTIONS
// ==================================================

const processSteps =
    document.querySelectorAll(".process-step");

if (processSteps.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    processSteps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            gsap.to(step, {
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(step.querySelector(".process-dot"), {
                scale: 1.3,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        step.addEventListener("mouseleave", () => {

            gsap.to(step, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(step.querySelector(".process-dot"), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// STATS CARD INTERACTIONS
// ==================================================

const statCircles =
    document.querySelectorAll(".stat-circle");

if (statCircles.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    statCircles.forEach(circle => {

        circle.addEventListener("mouseenter", () => {

            gsap.to(circle, {
                scale: 1.08,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        circle.addEventListener("mouseleave", () => {

            gsap.to(circle, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// SERVICES MOBILE FEEDBACK
// ==================================================

if (window.innerWidth <= 768 &&
    typeof gsap !== "undefined") {

    [
        ...serviceEntries,
        ...processSteps,
        ...statCircles
    ].forEach(item => {

        item.addEventListener("touchstart", () => {

            gsap.to(item, {
                scale: 0.98,
                duration: 0.1
            });

        });

        item.addEventListener("touchend", () => {

            gsap.to(item, {
                scale: 1,
                duration: 0.2
            });

        });

    });

}
// ==================================================
// CREATIVE WORK SPREAD ANIMATIONS
// ==================================================

if (document.querySelector(".creative-spread") &&
    typeof gsap !== "undefined") {

    const creativeTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    creativeTl

    // Title section
    .from(".creative-label", {
        y: 20,
        opacity: 0,
        duration: 0.5
    })

    .from(".creative-title", {
        y: 40,
        opacity: 0,
        duration: 0.8
    }, "-=0.3")

    .from(".creative-description", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    // Feature image
    .from(".creative-feature-image", {
        scale: 1.05,
        opacity: 0,
        duration: 1
    }, "-=0.6")

    // Featured projects
    .from(".highlight-item", {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    }, "-=0.5")

    // World map
    .from(".map-container", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")

    // Statistics
    .from(".stat-column", {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5
    }, "-=0.4");
}
// ==================================================
// PROJECT HIGHLIGHT INTERACTIONS
// ==================================================

const highlightItems =
    document.querySelectorAll(".highlight-item");

if (highlightItems.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    highlightItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            gsap.to(item, {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        item.addEventListener("mouseleave", () => {

            gsap.to(item, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// FEATURE IMAGE INTERACTION
// ==================================================

const creativeImage =
    document.querySelector(".creative-feature-image img");

if (creativeImage &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    creativeImage.addEventListener("mouseenter", () => {

        gsap.to(creativeImage, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });

    });

    creativeImage.addEventListener("mouseleave", () => {

        gsap.to(creativeImage, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });

    });

}
// ==================================================
// GLOBAL STAT INTERACTIONS
// ==================================================

const statColumns =
    document.querySelectorAll(".stat-column");

if (statColumns.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    statColumns.forEach(stat => {

        stat.addEventListener("mouseenter", () => {

            gsap.to(stat, {
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        stat.addEventListener("mouseleave", () => {

            gsap.to(stat, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// CREATIVE SPREAD MOBILE FEEDBACK
// ==================================================

if (window.innerWidth <= 768 &&
    typeof gsap !== "undefined") {

    [
        ...highlightItems,
        ...statColumns
    ].forEach(item => {

        item.addEventListener("touchstart", () => {

            gsap.to(item, {
                scale: 0.98,
                duration: 0.1
            });

        });

        item.addEventListener("touchend", () => {

            gsap.to(item, {
                scale: 1,
                duration: 0.2
            });

        });

    });

}
// ==================================================
// LEGACY SPREAD ANIMATIONS
// ==================================================

if (document.querySelector(".legacy-spread") &&
    typeof gsap !== "undefined") {

    const legacyTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    legacyTl

    // Core values
    .from(".value-item", {
        y: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    })

    // Editorial block
    .from(".editorial-block", {
        x: -40,
        opacity: 0,
        duration: 0.8
    }, "-=0.3")

    // Left image
    .from(".legacy-image", {
        scale: 1.05,
        opacity: 0,
        duration: 0.8
    }, "-=0.4")

    // Closing banner
    .from(".closing-banner", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.4")

    // Right image
    .from(".perspective-image", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")

    // Expertise cards
    .from(".expertise-card", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
    }, "-=0.5")

    // Metrics
    .from(".metric-item", {
        x: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
    }, "-=0.3")

    // Final note
    .from(".legacy-note", {
        y: 25,
        opacity: 0,
        duration: 0.7
    }, "-=0.2");
}
// ==================================================
// EXPERTISE CARD INTERACTIONS
// ==================================================

const expertiseCards =
    document.querySelectorAll(".expertise-card");

if (expertiseCards.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    expertiseCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// METRIC INTERACTIONS
// ==================================================

const metricCircles =
    document.querySelectorAll(".metric-circle");

if (metricCircles.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    metricCircles.forEach(circle => {

        circle.addEventListener("mouseenter", () => {

            gsap.to(circle, {
                scale: 1.08,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        circle.addEventListener("mouseleave", () => {

            gsap.to(circle, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// LEGACY IMAGE INTERACTIONS
// ==================================================

const legacyImages =
    document.querySelectorAll(
        ".legacy-image img, .perspective-image img"
    );

if (legacyImages.length &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    legacyImages.forEach(image => {

        image.addEventListener("mouseenter", () => {

            gsap.to(image, {
                scale: 1.04,
                duration: 0.5,
                ease: "power2.out"
            });

        });

        image.addEventListener("mouseleave", () => {

            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });

        });

    });

}
// ==================================================
// LEGACY MOBILE FEEDBACK
// ==================================================

if (window.innerWidth <= 768 &&
    typeof gsap !== "undefined") {

    [
        ...expertiseCards,
        ...metricCircles
    ].forEach(item => {

        item.addEventListener("touchstart", () => {

            gsap.to(item, {
                scale: 0.98,
                duration: 0.1
            });

        });

        item.addEventListener("touchend", () => {

            gsap.to(item, {
                scale: 1,
                duration: 0.2
            });

        });

    });

}   
// ==================================================
// CONTACT SPREAD INTERACTIONS & ANIMATIONS
// ==================================================

if (document.querySelector(".contact-spread") &&
    typeof gsap !== "undefined") {

    const contactTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // Initial reveal animations
    contactTl

        .from(".contact-label", {
            y: 20,
            opacity: 0,
            duration: 0.5
        })

        .from(".contact-title", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.3")

        .from(".contact-intro", {
            y: 25,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6
        }, "-=0.4")

        .from(".contact-image", {
            scale: 1.05,
            opacity: 0,
            duration: 0.9
        }, "-=0.5")

        .from(".contact-info h3", {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=0.5")

        .from(".info-item", {
            x: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5
        }, "-=0.4")

        .from(".contact-form", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")

        .from(".form-group", {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.35
        }, "-=0.4")

        .from(".submit-button", {
            scale: 0.9,
            opacity: 0,
            duration: 0.4
        }, "-=0.2");
}


// ==================================================
// FORM FIELD INTERACTIONS
// ==================================================

const formFields = document.querySelectorAll(
    ".contact-form input, .contact-form textarea, .contact-form select"
);

if (formFields.length &&
    typeof gsap !== "undefined") {

    formFields.forEach(field => {

        field.addEventListener("focus", () => {

            gsap.to(field, {
                y: -3,
                duration: 0.25,
                ease: "power2.out"
            });

        });

        field.addEventListener("blur", () => {

            gsap.to(field, {
                y: 0,
                duration: 0.25,
                ease: "power2.out"
            });

        });

    });

}


// ==================================================
// IMAGE HOVER EFFECT
// ==================================================

const contactImage =
    document.querySelector(".contact-image img");

if (contactImage &&
    typeof gsap !== "undefined" &&
    window.innerWidth > 768) {

    contactImage.addEventListener("mouseenter", () => {

        gsap.to(contactImage, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });

    });

    contactImage.addEventListener("mouseleave", () => {

        gsap.to(contactImage, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });

    });

}


// ==================================================
// SUBMIT BUTTON INTERACTION
// ==================================================

const submitButton =
    document.querySelector(".submit-button");

if (submitButton &&
    typeof gsap !== "undefined") {

    submitButton.addEventListener("mouseenter", () => {

        gsap.to(submitButton, {
            y: -3,
            duration: 0.25,
            ease: "power2.out"
        });

    });

    submitButton.addEventListener("mouseleave", () => {

        gsap.to(submitButton, {
            y: 0,
            duration: 0.25,
            ease: "power2.out"
        });

    });

}


// ==================================================
// CONTACT FORM VALIDATION
// ==================================================

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const phone =
            document.getElementById("phone");

        const service =
            document.getElementById("service");

        const message =
            document.getElementById("message");

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !phone.value.trim() ||
            !service.value ||
            !message.value.trim()
        ) {

            alert(
                "Please complete all fields before submitting."
            );

            return;
        }

        alert(
            "Thank you for reaching out to Crestline Architecture. Our team will contact you shortly."
        );

        contactForm.reset();

    });

}


// ==================================================
// MOBILE TOUCH FEEDBACK
// ==================================================

if (window.innerWidth <= 768 &&
    typeof gsap !== "undefined") {

    [
        submitButton,
        ...formFields
    ]
    .filter(Boolean)
    .forEach(item => {

        item.addEventListener("touchstart", () => {

            gsap.to(item, {
                scale: 0.98,
                duration: 0.1
            });

        });

        item.addEventListener("touchend", () => {

            gsap.to(item, {
                scale: 1,
                duration: 0.2
            });

        });

    });

}