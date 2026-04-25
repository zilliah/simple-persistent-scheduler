const errorContainer = document.querySelector(".error-message");

export function displayError(str) {
    let errorNode = document.createElement("p");
    errorNode.textContent = str;
    errorContainer.appendChild(errorNode);
}

export function clearErrors() {
    errorContainer.querySelectorAll("p").forEach(n => n.remove());
}

export function validateDurationInput(node) {
    if (!node.checkValidity()) node.classList.add("input-error");
    else node.classList.remove("input-error");
}