const projectForm = document.getElementById("projectForm");
const formMessage = document.getElementById("formMessage");

if (projectForm) {

    projectForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = projectForm.querySelector(".submit-project");

        submitButton.disabled = true;
        submitButton.innerHTML = "SENDING...";

        try {

            const response = await fetch(projectForm.action, {
                method: "POST",
                body: new FormData(projectForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                formMessage.textContent =
                    "Your project request has been sent successfully. We'll be in touch soon.";

                formMessage.classList.add("success");

                projectForm.reset();

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'SEND PROJECT REQUEST <span>↗</span>';

            } else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'SEND PROJECT REQUEST <span>↗</span>';

            }

        } catch (error) {

            formMessage.textContent =
                "Unable to send your request. Please check your internet connection and try again.";

            submitButton.disabled = false;

            submitButton.innerHTML =
                'SEND PROJECT REQUEST <span>↗</span>';

        }

    });

}
/* ========================================
   MOBILE SCROLL CARD EFFECT
======================================== */

const scrollCards = document.querySelectorAll(
    ".service-card, .process-step, .why-item, .featured-project"
);

function updateMobileCardEffect() {

    if (window.innerWidth > 800) {
        scrollCards.forEach(card => {
            card.classList.remove("is-visible");
        });
        return;
    }

    const screenCenter = window.innerHeight / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    scrollCards.forEach(card => {

        const rect = card.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            return;
        }

        const cardCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(screenCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }

    });

    scrollCards.forEach(card => {
        card.classList.remove("is-visible");
    });

    if (closestCard) {
        closestCard.classList.add("is-visible");
    }
}

window.addEventListener("scroll", updateMobileCardEffect);
window.addEventListener("resize", updateMobileCardEffect);

updateMobileCardEffect();
/* ========================================
   MOBILE NAVIGATION
======================================== */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle && navLinks) {

    mobileMenuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
        });

    });
}