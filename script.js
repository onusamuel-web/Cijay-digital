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