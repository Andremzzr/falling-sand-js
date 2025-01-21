const canvas = document.getElementById("canvas-game");
const ctx = canvas.getContext("2d")
let currentColor = 'rgb(255,0,0)'; 

function createGrid(rows, cols) {
    let grid = []
    for (let i = 0; i < rows; i++) {
        grid.push(
            Array(cols).fill(0)
        )
        
    }
    return grid
}

function drawGrid(grid) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] != 0) {
                ctx.fillStyle = grid[i][j];
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
            } 

            // ctx.strokeStyle = 'gray';
            // ctx.lineWidth = 0.5;
            // ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}
function gridState(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = createGrid(rows, cols); 

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] != 0) { // If the current cell contains sand

                // If it is not on the last row
                if(i < rows - 1) {
                    //Check if there's no cell bellow it 
                    if ( !grid[i + 1][j] ) {
                        newGrid[i + 1][j] = grid[i][j]
                    } else {
                        // Diagonals
                        const leftDiag = grid[i + 1][j - 1]
                        const rightDiag = grid[i + 1][j + 1]

                        // If some of the diagonals doesnt exist, it will slip to
                        if( !leftDiag && j - 1 > 0) {
                            newGrid[i + 1][j - 1] = grid[i][j]
                        } else if ( !rightDiag && j + 1 < cols) {
                            newGrid[i + 1][j + 1] = grid[i][j]
                        } else {
                            // If none of the diagonals is free, the sand cell will remain on the current position
                            newGrid[i][j] = grid[i][j]
                        }
                    }

                } else {
                    newGrid[i][j] = grid[i][j]
                }

            }
        }
    }

    return newGrid;
}


let cellSize = 10;
const canvasWidth = 600; // Should be divisible by cellSize
const canvasHeight = 400; // Should be divisible by cellSize

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const rows = canvasHeight / cellSize;
const cols = canvasWidth / cellSize;

let grid = createGrid(rows, cols);


let lastHue = 0; // Initialize the hue value

function getNextRainbowColor() {
    // Increment the hue value to move along the rainbow
    lastHue = (lastHue + 1) % 360; // Ensure the hue stays in the range 0-359

    // Convert HSV to RGB
    const rgb = hsvToRgb(lastHue, 1, 1); // Full saturation and value

    // Return the color in CSS RGB format
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// Helper function to convert HSV to RGB
function hsvToRgb(h, s, v) {
    let r, g, b;

    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

currentColor = getNextRainbowColor();

setInterval(() => {
    currentColor = getNextRainbowColor();
}, 100); // Update every 100ms

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; 
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX / cellSize);
    const y = Math.floor((event.clientY - rect.top) * scaleY / cellSize);
    if (x <= cols && y <= rows ) {
        grid[y][x] = currentColor;
    }
});

console.log(grid.length, grid[0].length)
setInterval(() => {
    drawGrid(grid)
    grid = gridState(grid)
}, 60)
