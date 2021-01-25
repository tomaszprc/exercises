const colorsList = ["red", "blue", "yellow", "white", "orange", "green", "pink", "purple", "violet", "black"];
const inputElement = document.querySelector('.input-js');
const listElement = document.querySelector('.list-js');
const resetElement = document.querySelector('.clear-query-js');

for (let i = 0; i < colorsList.length; i++)
{
    let element = document.createElement("li");
    element.textContent = colorsList[i];
    listElement.appendChild(element);

    element.addEventListener("click", function(){
        return this.style.color = "green";
    })
}

resetElement.addEventListener("click", () => {
    inputElement.value = "";
    let colors = Array.from(listElement.querySelectorAll('li'));
    colors.map(color => color.classList.remove('hide'));
})

inputElement.addEventListener("input", (e) => {
    let currentQuery = e.target.value.toLowerCase();
    let colors = Array.from(listElement.querySelectorAll('li'));
    
    colors.map((color) => {
        if (!color.textContent.toLowerCase().includes(currentQuery))
        {
           return color.classList.add('hide')
        }
        else {
            return color.classList.remove('hide');
        }
    })

    let activeColors = colors.filter((color) => {
        return !color.classList.contains('hide');
    })

    if (activeColors.length == 1)
    {
        document.title = activeColors[0].textContent;
    }
})
