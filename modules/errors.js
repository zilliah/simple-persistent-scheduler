const errorContainer = document.querySelector(".error-message");

export function displayError(str) {
    let errorNode = document.createElement("p");
    errorNode.textContent = str;
    errorContainer.appendChild(errorNode);
}

export function clearErrors() {
    errorContainer.querySelectorAll("p").forEach(n => n.remove());
}

// ok it appears I don't actually need this bc browsers will prevent/cut off text input past max length
// but it also is sometimes not super consistent? so idk
// haven't tested this bc i can't without doing hacky things
// so idk, maybe revisit this at another time
// will force conversion and check length in readPageSchedule() though
export function validateTaskNameInput(node) {
    //todo set string length input limit + show errors
    const textInputErrorMessage = "Task name too long: must be 200 characters or less. Extra characters will be removed.";
    if (!node.checkValidity()){
        console.log("invalid node!")
        node.classList.add("input-error");
        // display error message for invalid input
        if (!checkForExistingMessage(errorContainer, textInputErrorMessage)) displayError(textInputErrorMessage);

        //TODO scroll to node OR errormessage? on small screens
    }
    else {
        node.classList.remove("input-error");
        console.log("valid node")
    }

    // TODO next: cut off extra length in processing
}

export function validateDurationInput(node) {
    const durationInputErrorMessage = "Hours and minutes must be a whole number from 0 - 360. Numbers outside this range will be rounded to the closet valid number.";
    if (!node.checkValidity()){
        node.classList.add("input-error");
        if (!checkForExistingMessage(errorContainer, durationInputErrorMessage)) displayError(durationInputErrorMessage);
        //TODO scroll to node OR errormessage? on small screens
    }
    else {
        node.classList.remove("input-error");
    }
}

//check if ps in error box have an existing matching error message
//returns boolean
function checkForExistingMessage(errorContainer, message) {
    let displayedErrorMessages = [];
    errorContainer.childNodes.forEach(el => displayedErrorMessages.push(el.textContent));
    return displayedErrorMessages.includes(message);
}