const chosenBorderColor = "#111";
const notChosenBorderColor = "rgba(0, 0, 0, 0)";

let chosen = document.getElementById("default-chosen-color");

const redInputRange = document.getElementById("input-range-red");
const greenInputRange = document.getElementById("input-range-green");
const blueInputRange = document.getElementById("input-range-blue");

const redInputNumber = document.getElementById("R");
const greenInputNumber = document.getElementById("G");
const blueInputNumber = document.getElementById("B");

const hexInput = document.getElementById("hex");

onColorClick(chosen, 14);

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => parseInt(x).toString(16).padStart(2, "0")).join("");
};

function strToRgb(str) {
    return str.match(/\d+/g).map(x => parseInt(x));
}

function onColorClick(element) {
    chosen.style.borderColor = notChosenBorderColor;
    chosen = element;
    chosen.style.borderColor = chosenBorderColor;

    document.getElementsByTagName("html")[0].style.backgroundColor = chosen.style.backgroundColor;

    let backgroundColor = chosen.style.backgroundColor;
    let color = strToRgb(backgroundColor);

    redInputRange.value = color[0];
    greenInputRange.value = color[1];
    blueInputRange.value = color[2];

    redInputNumber.value = color[0];
    greenInputNumber.value = color[1];
    blueInputNumber.value = color[2];

    hexInput.value = rgbToHex(color[0], color[1], color[2]);
    hexInput.style.color = "#000";
}

function inputRangeChange(element, rgbindex) {
    let rgb = strToRgb(chosen.style.backgroundColor);
    rgb[rgbindex] = element.value;
    chosen.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    onColorClick(chosen);
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
    }

    if (hex.length !== 6) {
        hexInput.style.color = "#f00";
        return;
    }

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    hexInput.style.color = "#000";
    return [r, g, b];
}

redInputRange.onchange = () => { inputRangeChange(redInputRange, 0) };
greenInputRange.onchange = () => { inputRangeChange(greenInputRange, 1) };
blueInputRange.onchange = () => { inputRangeChange(blueInputRange, 2) };

redInputNumber.onchange = () => { inputRangeChange(redInputNumber, 0) };
greenInputNumber.onchange = () => { inputRangeChange(greenInputNumber, 1) };
blueInputNumber.onchange = () => { inputRangeChange(blueInputNumber, 2) };

hexInput.onchange = () => {
    let rgb = hexToRgb(hexInput.value);
    if (rgb === undefined) return;
    chosen.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    onColorClick(chosen);
};