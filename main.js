"use strict"

document.addEventListener("DOMContentLoaded", ready);

let cells = [];
let currentColor;
const manager = new Manager(getRbgRandomColor());


function ready() {
    let domCells = document.querySelectorAll("td")

    currentColor = document.querySelector("#rgbText");

    for (let i = 0; i < domCells.length; i++) {
        cells[i] = new Cell(domCells[i]);
        cells[i].reference.addEventListener("click", compareAnswer);
        cells[i].reference.addEventListener("mouseenter", (e) =>
            {
         //       cells[i].reference.innerHTML = "Pick this color";
            }
        )

        cells[i].reference.addEventListener("mouseleave", (e) =>
            {
              //  cells[i].reference.innerHTML = "";

            }
        )
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


function compareAnswer() {
    if (this.style.backgroundColor.replace(/\s/g,'') === manager.currentColor) {

        manager.currentColor = getRbgRandomColor();
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


function getRbgRandomColor() {
    let maxNum = 255;

    let r = Math.floor(Math.random() * maxNum);
    let g = Math.floor(Math.random() * maxNum);
    let b = Math.floor(Math.random() * maxNum);
    return "rgb("+ +r + "," + +g + "," + +b + ")";
}

function getRgbSameRandomColor(rgbColor) {
    let regExp = /\D/;
    let rgbNums = rgbColor.split(regExp);
    let seed = 20;
    console.log( Math.floor(Math.random() * seed));

    let r = parseInt( rgbNums[4]) +  (Math.floor(Math.random() * seed));
    let g = parseInt (rgbNums[5]) + Math.floor(Math.random() * seed);
    let b = parseInt(rgbNums[6]) + Math.floor(Math.random() * seed);
    return "rgb("+ +r + "," + +g + "," + +b + ")";

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
            newColor = getRgbSameRandomColor(manager.currentColor);
            console.log(getRgbSameRandomColor(manager.currentColor));
        }

        currentCell.reference.style.backgroundColor = newColor;
        currentCell.color = newColor;
    }
}
