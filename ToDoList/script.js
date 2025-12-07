const cardTemplate = document.getElementById("card-template");
const main = document.getElementById("main");
const cardButton = document.getElementById("add-card-button");

cardButton.addEventListener("click", () => {
    main.insertBefore(cardTemplate.content.cloneNode(true), cardButton);
});