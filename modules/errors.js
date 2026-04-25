const errorContainer = document.querySelector(".error-message");

export function displayError(str) {
    let errorNode = document.createElement("p");
    errorNode.textContent = str;
    errorContainer.appendChild(errorNode);
}

export function clearErrors() {
    errorContainer.querySelectorAll("p").forEach(n => n.remove());
}

export function validateTaskNameInput(node) {
    //todo set string length input limit + show errors

}

export function validateDurationInput(node) {
    const durationInputErrorMessage = "Hours and minutes must be a whole number from 0 - 360. Numbers outside this range will be rounded to the closet valid number.";
    if (!node.checkValidity()){
        node.classList.add("input-error");

        // display error message for invalid input
        const displayedErrorMessages = [];
        errorContainer.childNodes.forEach(el => displayedErrorMessages.push(el.textContent));
        if (!displayedErrorMessages.includes(durationInputErrorMessage)) displayError(durationInputErrorMessage);

        //todo scroll to node OR errormessage? on small screens
    }
    else {
        node.classList.remove("input-error");
    }
}