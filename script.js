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
}
// call function when page loads to create initial sketch
createSketch(rangeInput.value, rangeInput.value);

// call function when range input's value changes (and change range value span's value)
const rangeInputText = document.querySelector("#range-input-text");
rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`; // set the initial text when page loads
rangeInput.addEventListener("input", () => {
  rangeInputText.textContent = `${rangeInput.value}x${rangeInput.value}`;
  // call createSketch function with range input value as argument
  createSketch(rangeInput.value, rangeInput.value);
});
