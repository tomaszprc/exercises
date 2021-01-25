const inputElement = document.querySelector(".input-js");

inputElement.addEventListener("keyup", function(e) {
    if (e.key == "Enter")
    {
        this.blur();
    }
});

inputElement.addEventListener("focusout", function(){
    inputChangeToText(this)
});

function textChangeToInput(element) {
    element.addEventListener("click", function() {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.classList.add("input-js");
        inputElement.value = element.textContent;

        this.replaceWith(inputElement);
        inputElement.focus();
        
        inputElement.addEventListener("focusout", () => inputChangeToText(inputElement));
        inputElement.addEventListener("keyup", (e) => e.key == "Enter" ? inputElement.blur() : '');
    })
}

function inputChangeToText(element) {
    let inputLength = element.value.length;
    let inputValue = element.value;
    let textElement = document.createElement("span");
    textElement.classList.add("text-js");
    textElement.innerHTML = inputValue;

    if (inputLength > 0) 
    {
        element.replaceWith(textElement);
        textChangeToInput(textElement);
    }
}