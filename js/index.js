let squareValue = new Array();
let isX = true;
let gridSize = 3;
let winningCondition = 3;
let winningPattern = new Array();

function setValue(row, col) {
  const getSquare = document.getElementById(`square-${row}-${col}`);
  getSquare.innerHTML = isX ? "X" : "O";
  getSquare.setAttribute("disabled", true);
  squareValue[row][col] = isX ? "x" : "o";
  isX = !isX;

  document.getElementById("info").innerHTML = `Current player : ${
    isX ? "X" : "O"
  }`;

  // Cek winning pattern
  // If win show modal with reset button
}

(() => {
  "use strict";

  const form = document.getElementById("setup-form");

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        gridSize = document.getElementById("gridSize").value;
        winningCondition = document.getElementById("winningCondition").value;

        let tmpRowVal = new Array();
        for (let i = 0; i < gridSize; i++) {
          let squareRow = document.createElement("div");
          squareRow.setAttribute("class", "row");

          let tmpColVal = new Array();
          for (let j = 0; j < gridSize; j++) {
            tmpColVal.push("");

            let squareBtn = document.createElement("button");
            squareBtn.setAttribute("id", `square-${i}-${j}`);
            squareBtn.setAttribute("type", "button");
            squareBtn.setAttribute("onclick", `setValue(${i}, ${j})`);
            squareBtn.setAttribute(
              "class",
              "btn btn-outline-secondary btn-lg squarebox"
            );

            squareRow.appendChild(squareBtn);
          }

          tmpRowVal.push(tmpColVal);

          const squareContainer = document.getElementById("square-container");
          squareContainer.appendChild(squareRow);
        }
        squareValue = tmpRowVal;
      }

      form.classList.add("was-validated");
    },
    false
  );
})();
