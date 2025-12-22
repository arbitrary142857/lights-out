/* ======
STARTING THE GAME
====== */

const btn = document.querySelector("button")
btn.addEventListener("click", clickButton)
let grid

function clickButton(event) {
    const height = Number(document.getElementById("height").value)
    const width = Number(document.getElementById("width").value)

    if (Number.isInteger(height) && height >= 1 && height <= 10 &&
        Number.isInteger(width) && width >= 1 && width <= 10) {
            event.preventDefault()
            removeWarning()
            grid = createGrid(height, width)
            drawGrid(grid)
    }
    else {
        addWarning()
    }
}

function removeWarning() {
    const form = document.querySelector("form")
    if (form.querySelector(".warning-text")) {
        form.removeChild(form.querySelector(".warning-text"))
    }
}

function addWarning() {
    const form = document.querySelector("form")
    if (!form.querySelector(".warning-text")) {
        const warning = document.createElement("p")
        warning.innerText = "Grid height and width must be positive integers less than or equal to 10."
        warning.classList.add("warning-text")
        form.appendChild(warning)
    }
}

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
    console.log("drawing grid...")

    // Removing current lights...
    const lightGrid = document.querySelector(".wrapper")
    let removedLight = lightGrid.querySelector("img")
    while (removedLight) {
        lightGrid.removeChild(removedLight)
        removedLight = lightGrid.querySelector("img")
    }

    // Adding new lights....
    lightGrid.style.setProperty("--columns", grid[0].length)
    lightGrid.style.setProperty("--rows", grid.length)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const addedLight = document.createElement("img")
            if (grid[i][j]) {
                addedLight.src = "images/on-light.png"
                addedLight.alt = "on"
                addedLight.classList.add("light")
            }
            else {
                addedLight.src = "images/off-light.png"
                addedLight.alt = "off"
                addedLight.classList.add("light")
            }
            lightGrid.appendChild(addedLight)
        }
    }

    // Adding event listeners to all lights...
    let lights = document.querySelectorAll("img")
    for (let i = 0; i < lights.length; i++) {
        const col = i % grid[0].length
        const row = (i - col) / grid[0].length
        lights[i].addEventListener("click", () => {
            updateGrid(row, col)
            drawGrid(grid)
        })
    }
}

/* ======
UPDATING THE GAME
====== */

function updateGrid(row, col) {
    let gridHeight = grid.length
    let gridWidth = grid[0].length
    const VECS = [[0, 0], [0, 1], [1, 0], [0, -1], [-1, 0]]
    for (const vec of VECS) {
        const newRow = row + vec[0]
        const newCol = col + vec[1]
        if (newRow >= 0 && newCol >= 0 && newRow < gridHeight && newCol < gridWidth) {
            grid[newRow][newCol] = !grid[newRow][newCol]
        }
    }
}