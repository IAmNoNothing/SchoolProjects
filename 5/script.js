/*
const D = [2.2, -3.3, 2.1, -3.0, -7.1, -5.1, 0];

for (let i = 0; i < D.length; i += 2) {
    if (D[i] < 0) {
        console.log(`Індекс ${i}, Значення ${D[i]}`);
    }
}

// частина 1
const A = [6.0, 4.3, 2.2, 1.3, 1.0, 0.1];
const B = [-5.3, 1.2, -0.1, -4.3, 1.0, 6.1];
// let C = A.concat(B).sort((a, b) => a - b);
// console.log(C);
// дякую програмістам за стандартну бібліотеку 🫡

// частина 2
const y = [3.2, -6.3, 2.1, 3.2, 5.6, -3.1, 2.1, 4.3];
let sum = y.reduce((a, b) => a + b, 0);
let left = y.map(x => (x - 6) ** 2).reduce((a, b) => a + b, 0);
// let result = left / sum;
// console.log(result);
// знову дякую програмістам за стандартну бібліотеку 🫡

let C = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = C.toReversed();
*/


let Z = [7.5, 5.2, 3.8, 1.1, 10.0, 2.4, 4.7, 6.3, 7.8, 8.0];
console.log(Z);
let result = Z.map((x, i) => [x, i]).filter(x => x[0] > Z[0]);
result.forEach(x => console.log(`Індекс ${x[1]}, Значення ${x[0]}`));
// ще раз подякую програмістам за стандартну бібліотеку 🫡

function bubbleSort(arr) {
    let n = arr.length;
    let sorted = arr.slice();
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

let sortedZ = bubbleSort(Z);
console.log('Відсортований масив:', sortedZ);