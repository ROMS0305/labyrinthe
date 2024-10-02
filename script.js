// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas dimensions
const width = Math.min(window.innerWidth * 0.9, 600);
canvas.width = width;
canvas.height = width;

// Dimensions du labyrinthe
const cellSize = canvas.width / 15;  // 15x15 grille
const mazeWidth = 15;
const mazeHeight = 15;

let player = {
    x: 0,
    y: 0
};

// Position de la sortie
const exit = {
    x: mazeWidth - 1,
    y: mazeHeight - 1
};

// Labyrinthe plus compliqué
const maze = [
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0]
];

// Dessiner le labyrinthe
function drawMaze() {
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#333';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#fff';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// Dessiner le joueur
function drawPlayer() {
    ctx.fillStyle = '#28a745';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

// Vérifier si elle a gagné
function checkWin() {
    if (player.x === exit.x && player.y === exit.y) {
        document.getElementById('message').innerText = "Bravo ! Tu es sortie du labyrinthe... et si on se retrouvait dans la vraie vie autour d’un verre pour fêter ça ? 🎉";
        window.removeEventListener('keydown', movePlayer);
    }
}

// Déplacer le joueur avec les flèches
function movePlayer(event) {
    const key = event.key;

    switch (key) {
        case 'ArrowUp':
            if (player.y > 0 && maze[player.y - 1][player.x] === 0) {
                player.y--;
            }
            break;
        case 'ArrowDown':
            if (player.y < mazeHeight - 1 && maze[player.y + 1][player.x] === 0) {
                player.y++;
            }
            break;
        case 'ArrowLeft':
            if (player.x > 0 && maze[player.y][player.x - 1] === 0) {
                player.x--;
            }
            break;
        case 'ArrowRight':
            if (player.x < mazeWidth - 1 && maze[player.y][player.x + 1] === 0) {
                player.x++;
            }
            break;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    checkWin();
}

// Initialiser le jeu
function initGame() {
    drawMaze();
    drawPlayer();
    document.getElementById('message').innerText = "";
    window.addEventListener('keydown', movePlayer);
}

// Lancement du jeu
window.onload = initGame;
