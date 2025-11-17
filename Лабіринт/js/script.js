const mazeArray = [
    [1,0,1,1,1],
    [1,0,0,0,1],
    [1,1,1,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
];

const maze25 = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
[1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
[1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1],
[1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
[1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1],
[1,0,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1],
[1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
[1,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1],
[1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
[1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
[1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1],
[1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
[1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1],
[1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1],
[1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
[1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
[0,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const maze = generateMaze(25, 25);

let startPoint = null;
let endPoint = null;

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});

function generateMaze(width, height) {
    const maze = Array.from({length: height}, () => Array(width).fill(1));

    function carve(x, y) {
        maze[y][x] = 0;

        const dirs = [[0, -2],[2, 0],[0, 2],[-2, 0]];
        shuffle(dirs);

        for (let [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (ny > 0 && ny < height && nx > 0 && nx < width && maze[ny][nx] === 1) {
                maze[y + dy/2][x + dx/2] = 0;
                carve(nx, ny);
            }
        }
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    const startX = Math.floor(Math.random() * Math.floor(width/2)) * 2 + 1;
    const startY = Math.floor(Math.random() * Math.floor(height/2)) * 2 + 1;

    carve(startX, startY);
    return maze;
}

function renderMaze(array) {
    const maze = document.getElementById('maze');
    maze.style.gridTemplateColumns = `repeat(${array[0].length}, 32px)`;

    let i = 0;
    array.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.classList.add(cell === 1 ? 'wall' : 'path');
            div.id = i;
            
            div.addEventListener("mousedown", event => {
                if (event.target.classList.contains('wall')) return;
                if (event.button == 0 && !event.target.classList.contains('end')) {
                    if (startPoint) {
                        startPoint.classList.remove('start');
                    }
                    event.target.classList.add('start');
                    startPoint = event.target;
                }
                if (event.button == 2 && !event.target.classList.contains('start')) {
                    if (endPoint) {
                        endPoint.classList.remove('end');
                    }
                    event.target.classList.add('end');
                    endPoint = event.target;
                }

                if (endPoint != null && startPoint != null) {
                    solveMaze(array);
                }
            });

            maze.appendChild(div);
            i++;
        });
    });

}

async function solveMaze(array) {
    if (!startPoint || !endPoint) return;
    const solveIndex = ++currentSolveIndex;

    document.querySelectorAll('.visited').forEach(el => el.classList.remove('visited'));
    document.querySelectorAll('.visiting').forEach(el => el.classList.remove('visiting'));

    let dir = [0, 1];
    let pos = idToPos(array, startPoint.id);

    let start = idToPos(array, startPoint.id);
    const end = idToPos(array, endPoint.id);

    let current = startPoint;
    current.classList.add('visiting');

    while (!current.classList.contains('end')) {
        if (solveIndex !== currentSolveIndex) return;

        const next = step(array, pos, dir);

        pos = next.pos;
        dir = next.dir;

        const id = posToId(array, pos[0], pos[1]);
        current.classList.remove('visiting');
        current.classList.add('visited');
        current = document.getElementById(id);
        current.classList.add('visiting');

        await new Promise(r => setTimeout(r, 50));
    }
}

let currentSolveIndex = 0;

function step(m, pos, dir) {
    let right = turnRight(dir);
    if (canMove(m, pos, right)) {
        pos = move(pos, right);
        return { pos, dir: right };
    }

    if (canMove(m, pos, dir)) {
        pos = move(pos, dir);
        return { pos, dir };
    }

    let left = turnLeft(dir);
    if (canMove(m, pos, left)) {
        pos = move(pos, left);
        return { pos, dir: left };
    }

    let back = turnLeft(turnLeft(dir));
    pos = move(pos, back);
    return { pos, dir: back };
}

function move(pos, dir) {
    return [pos[0] + dir[0], pos[1] + dir[1]];
}

function canMove(m, pos, dir) {
    return !isWall(m, pos[0] + dir[0], pos[1] + dir[1]);
}

function turnLeft(dir) {
    return [-dir[1], dir[0]];
}

function turnRight(dir) {
    return [dir[1], -dir[0]];
}

function inBounds(m, x, y) {
    return x >= 0 && x < m[0].length && y >= 0 && y < m.length;
}

function isWall(m, x, y) {
    if (!inBounds(m, x, y)) {
        return true;
    }
    return m[y][x] == 1;
}

function idToPos(m, i) {
    return [i % m[0].length, Math.floor(i / m.length)];
}

function posToId(m, x, y) {
    return y * m[0].length + x;
}

renderMaze(maze);