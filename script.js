window.onload = () => {

    const email = document.getElementById("email");
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input");


    for (let i = 0; i < inputs.length; i++) {
        let node = inputs[i];
        node.addEventListener("input", function(event) {
            if (node.id == "confirm-password") {
                let password = document.getElementById("password").value;
                if (node.value != password) {
                    node.setCustomValidity("Passwords must match");
                }
                else {
                    node.setCustomValidity("");
                }
            }
            if (!node.validity.valid) {
                showErrorMessage(node, node.nextElementSibling);
            }
            else {
                node.classList.remove("error");
                node.nextElementSibling.textContent = "";
            }
        });
    }

    form.addEventListener("submit", (event) => {

        if (!form.validity.valid) {
            event.preventDefault();
            showErrorMessage(event);
        }
    });

    function showErrorMessage(input, errorDiv) {
        let errorMessage = "";
        console.log(input.validity);
        if (input.validity.badInput) {
            errorMessage = "Unknown input";
        }
        else if (input.validity.rangeOverflow || input.validity.tooLong) {
            errorMessage = `The max length for ${input.id} is ${input.maxLength}`;
        }
        else if (input.validity.rangeUnderflow || input.validity.tooShort) {
            errorMessage = `The min length for ${input.id} is ${input.minLength}`;
        }
        else if (input.validity.typeMismatch) {
            errorMessage = `Must be a ${input.id}`; 
        }
        else if (input.validity.valueMissing) {
            errorMessage = "Type in " + input.id;
        }
        else if (input.validity.customError){
            errorMessage = input.validationMessage;
        }
        errorDiv.textContent = errorMessage;
        input.classList.add("error");
    }
}