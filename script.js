//Function: change sketch size based on given arguments
const sketch = document.querySelector("#sketch");
const sketchSize = sketch.clientWidth; // get size of the sketch
function createSketch(container, size) {
  sketch.innerHTML = ""; // reset sketch
  // loop on each row and insert divs accordingly
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const pixels = sketchSize / size; // the appropiate size of a sketch child div
      const newDiv = document.createElement("div");
      newDiv.classList.add("sketch-div"); // "sketch-div" class used for adding event listeners
      newDiv.style.width = `${pixels}px`;
      newDiv.style.height = `${pixels}px`;

      sketch.appendChild(newDiv);
    }
  }
  makeDrawable(); // call function to make the sketch drawable
}

//Change sketch size when slider value changes
const range = document.querySelector("#range");
const rangeValueSpan = document.querySelector("#range-value-span");
range.addEventListener("input", () => {
  createSketch(sketch, range.value);
  rangeValueSpan.textContent = `${range.value}x${range.value}`;
});

// set defualt sketch automatically when website loads
createSketch(sketch, range.value);
rangeValueSpan.textContent = `${range.value}x${range.value}`;

//Function: make sketch drawable by adding event listeners to the child divs
// make sure LMB is clicked to draw
let isMousePressed = false;
document.addEventListener("mousedown", () => {
  isMousePressed = true;
});
document.addEventListener("mouseup", () => {
  isMousePressed = false;
});

let currentColor = "black"; // get current chosen color for drawing [CHANGE LATER]
function makeDrawable() {
  const sketchDivs = document.querySelectorAll(".sketch-div");
  sketchDivs.forEach((div) => {
    div.addEventListener("mouseover", () => {
      if (isMousePressed) {
        div.style.backgroundColor = currentColor;
      }
    });
  });
}
