//Function: create sketch and resize when range input value's change
const sketch = document.querySelector("#sketch");
const rangeInput = document.querySelector("#range-input");

function createSketch(cols) {
  sketch.innerHTML = ""; // reset sketch
  // make and add all cells to the sketch
  for (let i = 0; i < cols * cols; i++) {
    const cell = document.createElement("img");
    cell.src = "";
    cell.classList.add("sketch-cell");
    sketch.appendChild(cell);
  }
  // make css vars with the number of rows and columns
  sketch.style.setProperty("--grid-cols", cols);

  makeDrawable(); // call function to make the sketch drawable
}

createSketch(rangeInput.value); // call function when page loads to create initial sketch

// call function when range input's value changes (and change range value span's value)
const rangeInputText = document.querySelector("#range-input-text");
rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`; // set the initial range span's value when page loads
rangeInput.addEventListener("input", () => {
  // call createSketch function with range input value as argument and change range span's value
  rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`;
  createSketch(rangeInput.value);
});

//Section: change/toggle paint modes
let paintMode = "brush";

// function: reset/deselect all paint modes
function resetToggled() {
  paintMode = undefined;
  eraser.classList.remove("toggle");
  rgbBtn.classList.remove("toggle");
}

// event listeners: toggle chosen paint mode
const colorInput = document.querySelector("#color-input");
const eraser = document.querySelector("#eraser");
const rgbBtn = document.querySelector("#rgb-btn");

colorInput.addEventListener("input", () => {
  resetToggled();
  paintMode = "brush";
});
colorInput.addEventListener("click", () => {
  resetToggled();
  paintMode = "brush";
});

eraser.addEventListener("click", () => {
  resetToggled();
  eraser.classList.add("toggle");
  paintMode = "eraser";
});

rgbBtn.addEventListener("click", () => {
  resetToggled();
  rgbBtn.classList.add("toggle");
  paintMode = "rgb";
});

// function: get random colors for RGB paint mode
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

//Function: make sketch drawable
// make sure LMB is pressed to draw
let isMousePressed = false;
document.addEventListener("mousedown", () => {
  isMousePressed = true;
});
document.addEventListener("mouseup", () => {
  isMousePressed = false;
});

function makeDrawable() {
  const sketchDivs = document.querySelectorAll(".sketch-cell");
  sketchDivs.forEach((cell) => {
    // PC part
    cell.addEventListener("mouseover", () => {
      if (isMousePressed) {
        switch (paintMode) {
          case "brush":
            cell.style.backgroundColor = colorInput.value;
            break;
          case "eraser":
            cell.style.backgroundColor = sketch.style.backgroundColor;
            break;
          case "rgb":
            cell.style.backgroundColor = getRandomColor();
            break;
        }
      }
    });
    // makes sure the cell that got clicked on first gets painted
    cell.addEventListener("mousedown", () => {
      switch (paintMode) {
        case "brush":
          cell.style.backgroundColor = colorInput.value;
          break;
        case "eraser":
          cell.style.backgroundColor = sketch.style.backgroundColor;
          break;
        case "rgb":
          cell.style.backgroundColor = getRandomColor();
          break;
      }
    });
    // Mobile part
    // DO LATER
  });
}

//Section: trash button
const trash = document.querySelector("#trash");
trash.addEventListener("click", () => {
  createSketch(rangeInput.value);
});

//Section: download button
const download = document.querySelector("#download");

download.addEventListener("click", () => {
  html2canvas(sketch).then(function (canvas) {
    // copy sketch to canvas
    const image = canvas.toDataURL("image/png");
    // download sketch as png image
    const link = document.createElement("a");
    link.href = image;
    link.download = `${new Date().toJSON()}.png`;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  });
});
