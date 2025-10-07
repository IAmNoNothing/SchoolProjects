// Варіант 23

// 1

{function y(x) {
    return (Math.log(Math.abs(x + 1)) + 5) / (2 * x + 3);
}

// A
// 0.2 <= x <= 0.9, dx = 0.15

let tableBodyA = document.getElementById("A");
let tableBodyB = document.getElementById("B")

const xStart = 0.2;
const xEnd = 0.9;
const dx_A = 0.15;

console.log("A:")
for (let x = xStart; x <= xEnd; x += dx_A) {
    console.log(`x = ${x.toFixed(4)} y = ${y(x).toFixed(4)}`);
    tableBodyA.innerHTML += `<tr><td>${x.toFixed(4)}</td><td>${y(x).toFixed(4)}</td></tr>`;
}

// B
// x >= 5, dx = 0.2, n = 6

const iterationCount = 6;
const dx_B = 0.2;
let x = 5;

console.log("B:")
for (let n = 1; n <= iterationCount; n++, x += dx_B) {
    console.log(`x = ${x.toFixed(4)} y = ${y(x.toFixed(4))}`);
    tableBodyB.innerHTML += `<tr><td>${x.toFixed(4)}</td><td>${y(x).toFixed(4)}</td></tr>`;
} }

// 2, Варіант 23 % 20 + 1 = 4

{let price = prompt("Вкажіть ціну товару");
let tableBody2 = document.getElementById("2");
document.getElementById("price").innerText = `Ціна за одиницю: ${price}`;

for (let mass = 10; mass <= 40; mass += 3) {
    let real_price =  mass * price;
    if (mass > 20) {
        real_price *= 0.95;
    }
    tableBody2.innerHTML += `<tr><td>${mass}</td><td>${real_price}</td></tr>`;
}}

// 3, Варіант 23
// z = log10(5x^3 - y)
// 0 <= x <= 0.5, dx = 0.2, 2.3 <= y <= 5.4, dy = 0.1

function z(x, y) {
    /*
    На жаль жодне з заданих значень не задовольняє умову існування логарифму:
    (5 * Math.pow(x, 3) - y) завжди буде <= 0, при цих значеннях
    */
    return Math.log10(5 * Math.pow(x, 3) - y);
}

const xStart = 0;
const yStart = 2.3;
const dx = 0.2;
const dy = 0.1;
const xEnd = 0.5;
const yEnd = 5.4;
let tableBody3 = document.getElementById("3");

let row = "<tr><td>x\\y</td>";
for (let y = yStart; y <= yEnd; y += dy) {
    row += `<td>${y.toFixed(2)}</td>`
}   
tableBody3.innerHTML += row + "</tr>"

for (let x = xStart; x <= xEnd; x += dx) {
    let row = `<tr><td>${x}</td>`;
    for (let y = yStart; y <= yEnd; y += dy) {
        row += `<td>${z(x, y)}</td>`
    }
    tableBody3.innerHTML += row + "</tr>";
}

for (initalization; condition; postiteration) {
    body
}