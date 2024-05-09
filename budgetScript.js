// global variables

let symbol = "+";
let expansesCount,
  incomeCount,
  expensesArr,
  incomeArr,
  expensesArrJson,
  incomeArrJson,
  totalExpenses,
  totalBalance,
  totalIncome;
let symbolElem = document.getElementById("typeOfInput");
let descriptionElem = document.getElementById("description");
let valueElem = document.getElementById("value");
let checkmarkElem = document.querySelector(".fa-check-circle");

// // functions
function init() {
  if (
    localStorage.getItem("expensesArr") == null ||
    localStorage.getItem("incomeArr") == null
  ) {
    localStorage.setItem("incomeArr", "[]");
    localStorage.setItem("expensesArr", "[]");
    expensesArrJson = "[]";
    incomeArrJson = "[]";
    expensesArr = [];
    incomeArr = [];
    totalBalance = 0.0;
    totalExpenses = 0.0;
    totalIncome = 0.0;
    expansesCount = 0.0;
    incomeCount = 0.0;
  } else {
    expensesArrJson = localStorage.getItem("expensesArr");
    incomeArrJson = localStorage.getItem("incomeArr");
    expensesArr = JSON.parse(expensesArrJson);
    incomeArr - JSON.parse(incomeArrJson);
    incomeCount = incomeArr.length;
    expansesCount = expensesArr.length;
    updateTotal();
  }
  print();
}
function updateTotal() {
  // a function that updates the total balance, total income and total expenses
  totalBalance = 0.0;
  totalExpenses = 0.0;
  totalIncome = 0.0;
  for (let exp of expensesArr) {
    totalExpenses -= parseFloat(exp.value);
  }
  for (let inc of incomeArr) {
    totalIncome += parseFloat(inc.value);
  }
  totalBalance = totalIncome + totalExpenses;
}
function getTitle() {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[monthIndex];
  const year = currentDate.getFullYear();
  return `Avaliable Budget in ${monthName} ${year}:`;
}
function updateLocalStorage() {
  incomeArrJson = JSON.stringify(incomeArr);
  expensesArrJson = JSON.stringify(expensesArr);
  localStorage.setItem("expensesArr", expensesArrJson);
  localStorage.setItem("incomeArr", incomeArrJson);
}
function addToList() {
  let domList, desc, value, row, rowElem, id;
  if (symbol == "+") {
    domList = document.querySelector("#incomeTableItems");
    desc = incomeArr[incomeArr.length - 1].description;
    value = incomeArr[incomeArr.length - 1].value;
    incomeCount++;
    id = `incomeRow${incomeCount}`;
    row = `<div class="tableRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">+${value}</span>
                  <i class="fa-regular fa-circle-xmark xMark" onclick = 'deleteItem(${id})'></i>
              </div>
            </div>`;
  } else {
    domList = document.querySelector("#expensesTableItems");
    desc = expensesArr[expensesArr.length - 1].description;
    value = expensesArr[expensesArr.length - 1].value;
    expansesCount++;
    id = `expensesRow${expansesCount}`;
    row = `<div class="tableRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">${value}</span>
                  <i class="fa-regular fa-circle-xmark xMark" onclick = 'deleteItem(${id})'></i>
              </div>
            </div>`;
  }
  domList.innerHTML = row;
  rowElem = document.querySelector(`#${id}`);
  rowElem.addEventListener("mouseover", revealX(id, color));
  rowElem.addEventListener("mouseout", hideX(id));
}
function updateTitles() {
  // function that updates the titles DOM
  document.querySelector("#expensesBox span").innerText = totalExpenses;
  document.querySelector("#incomeBox span").innerText = `+${totalIncome}`;
  if (totalBalance < 0) {
    document.querySelector("#topBalance").innerText = `${totalBalance}`;
    document.querySelector("headerPrecentage").innerText = `${Math.floor(
      ((totalExpenses * -1) / totalBalance) * 100
    )}`;
  } else if (totalBalance > 0) {
    document.querySelector("#topBalance").innerText = `+ ${totalBalance}`;
    document.querySelector("headerPrecentage").innerText = Math.floor(
      (totalExpenses / totalBalance) * 100
    );
  } else {
    document.querySelector("#topBalance").innerText = `+ 0`;
    document.querySelector("headerPrecentage").innerText = "0";
  }
}
function print() {
  document.querySelector("#monthHeader").innerText = getTitle();
  updateTitles();
}
function revealX(id, color) {
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#${id} .xMark`);
  XmarkElem.style.display = "block";
  XmarkElem.style.fill = color;
  tableRowElem.style += "grid-template-columns 55% 45%";
}

function hideX(id) {
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#${id} .xMark`);
  XmarkElem.style.display = "none";
  tableRowElem.style += "grid-template-columns 60% 40%";
}

function colorOutline(id) {
  document.querySelector(`#${id}`).style.outline = color;
}

function deleteItem(id) {
  let tableRowElem = document.querySelector(`#${id}`);
  let itemDesc = document.querySelector(`#${id} .description`).innerText;
  let itemValue = document.querySelector(`#${id} .value`).innerText;
  let valueIndex, obj;
  if (itemValue.indexOf("+") != -1) {
    itemValue.splice(itemValue.indexOf("+"), 1);
    obj = { desc: itemDesc, value: itemValue };
    valueIndex = incomeArr.indexOf(obj);
    incomeArr.splice(valueIndex, 1);
    incomeCount--;
  } else {
    obj = { desc: itemDesc, value: itemValue };
    valueIndex = expensesArr.indexOf(obj);
    incomeArr.splice(valueIndex, 1);
    expansesCount--;
  }
  tableRowElem.remove();
  updateLocalStorage();
}

// changing the class of the element based on the symbol (+||-)
// therefor changing the input outline ('blue'||'red')
symbolElem.addEventListener("change", function () {
  symbol = symbolElem.value;
  const colorClass = symbol === "+" ? "blue" : "red";
  symbolElem.classList.remove("red", "blue");
  descriptionElem.classList.remove("red", "blue");
  valueElem.classList.remove("red", "blue");
  symbolElem.classList.add(colorClass);
  descriptionElem.classList.add(colorClass);
  valueElem.classList.add(colorClass);
  const checkMarkcolorClass = symbol === "+" ? "checkmarkBlue" : "checkmarkRed";
  checkmarkElem.classList.remove("checkmarkRed", "checkmarkBlue");
  checkmarkElem.classList.add(checkMarkcolorClass);
});
