function createGrid(height, width) {
    let grid = []
    for (let i = 0; i < height; i++) {
        let row = []
        for (let j = 0; j < width; j++) {
            row.push(Math.random() < 0.5) // either true or false
        }
        grid.push(row)
    }
    return grid
}

function drawGrid(grid) {
    pass
}

function updateGrid(grid, row, col) {
    // Mutates the grid by toggling (row, col) and all neighboring cells.
    gridHeight = grid.length
    gridWidth = grid[0].length
    const VECS = [[0, 0], [0, 1], [1, 0], [0, -1], [-1, 0]]
    for (const vec of VECS) {
        const newRow = row + vec[0]
        const newCol = col + vec[1]
        if (newRow >= 0 && newCol >= 0 && newRow < gridHeight && newCol < gridWidth) {
            grid[newRow][newCol] = !grid[newRow][newCol]
        }
    }
    return grid
}

function updateCell(cellIndex) {
    const cells = document.querySelectorAll("img")
    pass
}