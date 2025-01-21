const canvas = document.getElementById("canvas-game");
const ctx = canvas.getContext("2d")

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
            if (grid[i][j]) {
                ctx.fillStyle = "white";
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
            if (grid[i][j]) { // If the current cell contains sand

                // If it is not on the last row
                if(i < rows - 1) {
                    //Check if there's no cell bellow it 
                    if ( !grid[i + 1][j] ) {
                        newGrid[i + 1][j] = 1
                    } else {
                        // Diagonals
                        const leftDiag = grid[i + 1][j - 1]
                        const rightDiag = grid[i + 1][j + 1]

                        // If some of the diagonals doesnt exist, it will slip to
                        if( !leftDiag && j - 1 > 0) {
                            newGrid[i + 1][j - 1] = 1
                        } else if ( !rightDiag && j + 1 < cols) {
                            newGrid[i + 1][j + 1] = 1
                        } else {
                            // If none of the diagonals is free, the sand cell will remain on the current position
                            newGrid[i][j] = 1
                        }
                    }

                } else {
                    newGrid[i][j] = 1
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

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; 
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX / cellSize);
    const y = Math.floor((event.clientY - rect.top) * scaleY / cellSize);
    if (x <= cols && y <= rows ) {
        grid[y][x] = 1;
    }
});

console.log(grid.length, grid[0].length)
setInterval(() => {
    drawGrid(grid)
    grid = gridState(grid)
}, 60)
