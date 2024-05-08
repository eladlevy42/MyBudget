let symbol = "+";
let expansesCount = 0;
let incomeCount = 0;
const red = "#ff4f3f";
const blue = "#2ea6af";
let expensesArr = [];
let incomeArr = [];
let totalExpenses = 0;
let totalBalance = 0;
let totalIncome = 0;
let color = blue;
let symbolElem = document.getElementById("typeOfInput");
let descriptionElem = document.getElementById("description");
let valueElem = document.getElementById("value");

// changing the color variable based on the symbol (+||-)
// changing the input outline based of the chosen symbol (+||-)
symbolElem.addEventListener("change", function () {
  symbol = symbolElem.value;
  if (symbol == "+") {
    color = blue;
    symbolElem.classList.add("blue")
    descriptionElem.classList.add("blue")
    symbolElem.classList.add("blue")
  } else {
    color = red;
    symbolElem.classList.add("red")
    descriptionElem.classList.add("red")
    valueElem.classList.add("red")
  }
  console.log(color);
});

// document.getElementById("typeOfInput").style.outline = color;
// symbolElem.style.outline = color;
