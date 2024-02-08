//Function: create sketch and resize when range input value's change
const sketch = document.querySelector("#sketch");
const rangeInput = document.querySelector("#range-input");

function createSketch(rows, cols) {
  sketch.innerHTML = ""; // reset sketch
  // make and add all cells to the sketch
  for (let i = 0; i < rows * cols; i++) {
    const div = document.createElement("div");
    div.classList.add("sketch-cell");
    sketch.appendChild(div);
  }
  // make css vars with the number of rows and columns
  sketch.style.setProperty("--grid-rows", rows);
  sketch.style.setProperty("--grid-cols", cols);

  makeDrawable(); // call function to make the sketch drawable
}

createSketch(rangeInput.value, rangeInput.value); // call function when page loads to create initial sketch

// call function when range input's value changes (and change range value span's value)
const rangeInputText = document.querySelector("#range-input-text");
rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`; // set the initial range span's value when page loads
rangeInput.addEventListener("input", () => {
  // call createSketch function with range input value as argument and change range span's value
  rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`;
  createSketch(rangeInput.value, rangeInput.value);
});

//Section: change/toggle modes
let mode = "brush";

// function: reset/deselect all modes
function resetToggled() {
  mode = undefined;
  eraser.classList.remove("toggle");
  rgbBtn.classList.remove("toggle");
}

// event listeners: toggle chosen mode
const colorInput = document.querySelector("#color-input");
const eraser = document.querySelector("#eraser");
const rgbBtn = document.querySelector("#rgb-btn");

colorInput.addEventListener("input", () => {
  resetToggled();
  mode = "brush";
});
colorInput.addEventListener("click", () => {
  resetToggled();
  mode = "brush";
});

eraser.addEventListener("click", () => {
  resetToggled();
  eraser.classList.add("toggle");
  mode = "eraser";
});

rgbBtn.addEventListener("click", () => {
  resetToggled();
  rgbBtn.classList.add("toggle");
  mode = "rgb";
});

// function: get random colors for RGB mode
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
        switch (mode) {
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
      switch (mode) {
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

//Section: trash and downlaod button
// Trash button
const trash = document.querySelector("#trash");
trash.addEventListener("click", () => {
  createSketch(rangeInput.value, rangeInput.value);
});

// Download button
const download = document.querySelector("#download");
