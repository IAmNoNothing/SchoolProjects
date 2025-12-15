const cardTemplate = document.getElementById("card-template");
const main = document.getElementById("main");
let cardButton = document.getElementById("add-card-button");

function save() {
    localStorage.setItem("data", JSON.stringify(getCardData()));
}

cardButton.addEventListener("click", () => {
    main.insertBefore(cardTemplate.content.cloneNode(true), cardButton);
    save();
});

function onCardRemoved(img) {
    img.parentElement.parentElement.remove();
    save();
}

function getCardData() {
    let result = [];
    for (const child of main.children) {
        if (child.id != "add-card-button") {
            const name = child.querySelector(".name").value;
            const description = child.querySelector(".description").value;
            result.push([name, description]);
        }
    }
    return result;
}

function setCardData(data) {
    main.innerHTML = '';

    data.forEach(([name, description]) => {
        const node = cardTemplate.content.cloneNode(true);
        node.querySelector(".name").value = name;
        node.querySelector(".description").value = description;
        main.appendChild(node);
    });

    main.appendChild(cardButton);
}

const data = localStorage.getItem("data");

if (data !== null) {
    setCardData(JSON.parse(data));
}