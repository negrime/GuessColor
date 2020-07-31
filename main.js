"use strict"

document.addEventListener("DOMContentLoaded", ready);

let cells = [];
let currentColor;
const manager = new Manager(getRandomColor());


function ready() {
    let domCells = document.querySelectorAll("td")


    currentColor = document.querySelector("h1");

    for (let i = 0; i < domCells.length; i++) {
        cells[i] = new Cell(domCells[i]);
        cells[i].reference.onclick = CompareAnswer;
        console.log(cells[i].reference)
    }
    changeBackgroundColor();

    setInterval(changeBackgroundColor, 10000)

    SetCellsColor();
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = manager.currentColor;
    currentColor.innerText = manager.currentColor;
}


function CompareAnswer() {
    if (this.style.backgroundColor.replace(/\s/g,'') === hexToRGB(manager.currentColor)) {

        manager.currentColor = getRandomColor();
        changeBackgroundColor();
        SetCellsColor();
    }
}

function hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    return "rgb("+ +r + "," + +g + "," + +b + ")";
}


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
}


function SetCellsColor() {
    let rndIndex = Math.floor(Math.random() * cells.length);
    console.log(rndIndex);

    for (let i = 0; i < cells.length; i++) {
        let currentCell = cells[i];
        let newColor;
        if (i === rndIndex)
        {
            newColor = manager.currentColor;
        }
        else
        {
            newColor = getRandomColor();
        }

        currentCell.reference.style.backgroundColor = newColor;
        currentCell.color = newColor;
    }
}
