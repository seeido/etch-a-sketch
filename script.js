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

  makeDrawable(); // automatically call function to make the sketch drawable
}

createSketch(rangeInput.value, rangeInput.value); // call function when page loads to create initial sketch

// call function when range input's value changes (and change range value span's value)
const rangeInputText = document.querySelector("#range-input-text");
rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`; // set the initial range span's value when page loads
rangeInput.addEventListener("input", () => {
  rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`;
  // call createSketch function with range input value as argument
  createSketch(rangeInput.value, rangeInput.value);
});

//Function: make sketch drawable by adding event listeners to the child divs

// get the color to draw with
const colorInput = document.querySelector("#color-input");
let currentColor = colorInput.value; // set initial color when webpage loads
colorInput.addEventListener("input", () => {
  currentColor = colorInput.value;
});

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
  sketchDivs.forEach((div) => {
    // PC part
    div.addEventListener("mouseover", () => {
      if (isMousePressed) {
        div.style.backgroundColor = currentColor;
      }
    });
    // makes sure the div that got clicked on first gets painted
    div.addEventListener("mousedown", () => {
      div.style.backgroundColor = currentColor;
    });
    // Mobile part
    // DO LATER
  });
}
