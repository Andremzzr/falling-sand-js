const canvas = document.getElementById("canvas-game");
const ctx = canvas.getContext("2d")

const cellSize = 10;

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

            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function gridState(grid) {
    const newGrid = createGrid(grid.length, grid[0].length)

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                if (i < grid.length - 1) {
                    if( grid[i + 1][j] ) {
                        newGrid[i][j] = 1
                    }
                    else {
                        newGrid[i + 1][j] =1 
                    }
                }
                else if(i == grid.length - 1) {
                    newGrid[i][j] = 1
                }
            } 
        }
    }

    return newGrid
}


const rows = 30
const cols = 20

let grid = createGrid(rows, cols)

canvas.addEventListener('mousehover', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; 
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX / cellSize);
    const y = Math.floor((event.clientY - rect.top) * scaleY / cellSize);
    if (x <= cols && y <= rows ) {
        grid[y][x] = 1;
    }
});

console.table(grid)
setInterval(() => {
    drawGrid(grid)
    grid = gridState(grid)
}, 50)
