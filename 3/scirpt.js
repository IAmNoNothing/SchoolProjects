/*
Завдання 1:

Варіант 23 % 11 + 1 = 2

Дано три числа x, y, z, які задають довжини сторін деякого трикутника. 
Перевірити, чи буде даний трикутник рівнобедреним.    
*/
{
    let x = 3, y = 4, z = 3;

    if (x == y || y == z || z == x) {
        console.log("Рівнобедрений");
    } else {
        console.log("Не рівнобедрений");
    }
}
/*
Завдання 2:
*/

{
    let y, x;
    if (x <= -1) {
        y = Math.pow(Math.sin(x), 2);
    } else if (-1 < x && x < 0) {
        y = Math.sqrt(-x);
    } else if (x > 1) {
        y = x - Math.log10(x);
    }
    console.log(`При x = ${x}, y = ${y}`);
}

/*
Завдання 3:
*/

{
    let mx = Math.sqrt(Math.PI);
    let my = Math.sqrt(3);
    let r = 2;

    if (Math.hypot(mx, my) <= r && mx >= 0) {
        console.log("Точка знаходиться в межах фігури");
    } else {
        console.log("Точка знаходиться поза фігурою");
    }
}
