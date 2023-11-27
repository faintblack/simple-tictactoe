let squareValue = new Array();
let isX = true;
let gridSize = 3;
let winningCondition = 3;
let winningPattern = new Array();

function checkStraightPattern(x, y, val, type, isReverse) {
  let ref = y;
  let boxChecked = [];

  if (type === "vertical") {
    ref = x;
  }

  let valChecker = true;

  if (isReverse) {
    for (let i = ref; i >= ref - (winningCondition - 1); i--) {
      let source = squareValue[x][i];
      if (type === "vertical") {
        source = squareValue[i][y];
        boxChecked.push([i, y])
      } else {
        boxChecked.push([x, i])
      }
      valChecker = valChecker && source === val;
    }
  } else {
    for (let i = ref; i <= ref + (winningCondition - 1); i++) {
      let source = squareValue[x][i];
      if (type === "vertical") {
        source = squareValue[i][y];
        boxChecked.push([i, y])
      } else {
        boxChecked.push([x, i])
      }
      valChecker = valChecker && source === val;
    }
  }

  if (valChecker) {
    boxChecked.map((val, idx) => {
      document.getElementById(`square-${val[0]}-${val[1]}`).classList.add("winning-square")
    })
    return true;
  }
}

function checkDiagonalPattern(x, y, val, direction) {
  let valChecker = true;
  let boxChecked = [];

  switch (direction) {
    case "bottom-right":
      for (let i = x; i <= x + (winningCondition - 1); i++) {
        valChecker = valChecker && squareValue[i][i] === val;
        boxChecked.push([i, i])
      }
      break;

    case "top-left":
      let j = 0;
      for (let i = x; i >= x - (winningCondition - 1); i--) {
        valChecker = valChecker && squareValue[i][y - j] === val;
        boxChecked.push([i, y - j])
        j++;
      }
      break;

    case "bottom-left":
      let k = 0;
      for (let i = x; i <= x + (winningCondition - 1); i++) {
        valChecker = valChecker && squareValue[i][y - k] === val;
        boxChecked.push([i, y - k])
        k++;
      }
      break;

    case "top-right":
      let l = 0;
      for (let i = x; i >= x - (winningCondition - 1); i--) {
        valChecker = valChecker && squareValue[i][y + l] === val;
        boxChecked.push([i, y + l])
        l++;
      }
      break;

    default:
      break;
  }

  if (valChecker) {
    boxChecked.map((val, idx) => {
      document.getElementById(`square-${val[0]}-${val[1]}`).classList.add("winning-square")
    })
    return true;
  }
}

function checkWinningCondition(x, y, val) {
  // Check horizontal to left
  if (y >= winningCondition - 1) {
    if (checkStraightPattern(x, y, val, "horizontal", true)) {
      return true;
    }
  }

  if (y + (winningCondition - 1) < gridSize) {
    // Check horizontal to right
    if (checkStraightPattern(x, y, val, "horizontal", false)) {
      return true;
    }

    if (x - (winningCondition - 1) >= 0) {
      // Check diagonal to top right
      if (checkDiagonalPattern(x, y, val, "top-right")) {
        return true;
      }
    }
  }

  if (x >= winningCondition - 1) {
    // Check vertical to top
    if (checkStraightPattern(x, y, val, "vertical", true)) {
      return true;
    }

    // Check diagonal to top left
    if (checkDiagonalPattern(x, y, val, "top-left")) {
      return true;
    }
  }

  if (x + (winningCondition - 1) < gridSize) {
    // Check vertical to bottom
    if (checkStraightPattern(x, y, val, "vertical", false)) {
      return true;
    }

    // Check diagonal to bottom right
    if (checkDiagonalPattern(x, y, val, "bottom-right")) {
      return true;
    }

    if (y - (winningCondition - 1) >= 0) {
      // Check diagonal to bottom left
      if (checkDiagonalPattern(x, y, val, "bottom-left")) {
        return true;
      }
    }
  }

  return false;
}

function setValue(row, col) {
  const symbolVal = isX ? "x" : "o";
  const getSquare = document.getElementById(`square-${row}-${col}`);
  getSquare.innerHTML = isX ? "X" : "O";
  getSquare.setAttribute("disabled", true);
  squareValue[row][col] = symbolVal;

  if (checkWinningCondition(row, col, symbolVal)) {
    const getSquareBtn = document.getElementsByClassName("squarebox");
    for (let i = 0; i < getSquareBtn.length; i++) {
      getSquareBtn[i].setAttribute("disabled", true);
    }

    document.getElementById("info").innerHTML = `${
      isX ? "X" : "O"
    } is the winner !`;
    setTimeout(() => {
      alert(`The winner is ${symbolVal} !`);
    }, 100);
  } else {
    isX = !isX;

    document.getElementById("info").innerHTML = `Current player : ${
      isX ? "X" : "O"
    }`;
  }
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
        isX = true;
        document.getElementById("info").innerHTML = "Current player : X";

        document.getElementById("info-parent").style.display = "block";

        const squareContainer = document.getElementById("square-container");
        squareContainer.innerHTML = "";

        let tmpRowVal = new Array();
        for (let i = 0; i < gridSize; i++) {
          let squareRow = document.createElement("div");
          squareRow.setAttribute("class", "squareBoxRowParent");

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

          squareContainer.appendChild(squareRow);
        }
        squareValue = tmpRowVal;
      }

      form.classList.add("was-validated");
    },
    false
  );
})();
