// global variables

let symbol = "+";
let expensesCount,
  incomeCount,
  expensesArr,
  incomeArr,
  expensesArrJson,
  incomeArrJson,
  totalExpenses,
  totalBalance,
  totalIncome;
let blue = "#2ea6af";
let red = "#ff4f3f";
let color = blue;
let symbolElem = document.getElementById("typeOfInput");
let descriptionElem = document.getElementById("description");
let valueElem = document.getElementById("value");
let checkmarkElem = document.querySelector(".fa-check-circle");

// // functions
init();
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
    expensesCount = 0.0;
    incomeCount = 0.0;
  } else {
    expensesArrJson = localStorage.getItem("expensesArr");
    expensesArr = JSON.parse(expensesArrJson);
    incomeArrJson = localStorage.getItem("incomeArr");
    expensesArr = JSON.parse(expensesArrJson);
    incomeArr = JSON.parse(incomeArrJson);
    if (incomeArr == undefined) {
      incomeArr = [];
    }
    incomeCount = incomeArr.length;

    if (expensesArr == undefined) {
      expensesArr = [];
    }
    expensesCount = expensesArr.length;
    updateTotal();
    if (incomeArr.length > 0 || expensesArr.length > 0) {
      document.querySelector("#btnDeleteWrap").style.display = "flex";
    } else {
      document.querySelector("#btnDeleteWrap").style.display = "none";
    }
  }
  print();
}
function updateTotal() {
  // a function that updates the total balance, total income and total expenses
  totalBalance = 0.0;
  totalExpenses = 0.0;
  totalIncome = 0.0;
  for (let exp of expensesArr) {
    totalExpenses -= roundToTwoDecimalPlaces(exp.value);
    totalExpenses = roundToTwoDecimalPlaces(totalExpenses);
  }
  for (let inc of incomeArr) {
    totalIncome += roundToTwoDecimalPlaces(inc.value);
    totalIncome = roundToTwoDecimalPlaces(totalIncome);
  }
  totalBalance = roundToTwoDecimalPlaces(totalIncome + totalExpenses);
  updateTitles();
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
  if (incomeArr.length > 0 || expensesArr.length > 0) {
    document.querySelector("#btnDeleteWrap").style.display = "flex";
  } else {
    document.querySelector("#btnDeleteWrap").style.display = "none";
  }
}
function addToList() {
  let domList, desc, value, row, id, even;

  if (symbol == "+") {
    color = blue;
    domList = document.querySelector("#incomeTableItems");
    desc = incomeArr[incomeArr.length - 1].desc;
    value = parseFloat(incomeArr[incomeArr.length - 1].value).toLocaleString(
      "en",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    ); // Format with commas
    incomeCount++;
    id = `incomeRow${incomeCount}`;
    row = `<div class="tableRow incomeRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">+ ${value}</span>
                  <i class="fa-regular fa-circle-xmark xMark" onclick = "deleteItem('${id}')" id ='X${id}' style = 'display: none'></i>
          </div>  </div>`;
  } else {
    color = red;
    domList = document.querySelector("#expensesTableItems");
    desc = expensesArr[expensesArr.length - 1].desc;
    value = parseFloat(
      expensesArr[expensesArr.length - 1].value
    ).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); // Format with commas
    let rawValue = expensesArr[expensesArr.length - 1].value;
    expensesCount++;
    let prec = Math.floor(((rawValue * -1) / totalBalance) * 100);
    id = `expensesRow${expensesCount}`;
    row = `<div class="tableRow expensesRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">${value}</span> <span class ='precentage'>${prec}%</span>
                <i class="fa-regular fa-circle-xmark xMark" onclick = "deleteItem('${id}')" id ='X${id}' style = 'display: none'></i>
            </div></div>`;
  }
  const newRow = document.createElement("div");
  newRow.innerHTML = row;
  newRow.querySelector(`#${id}`).addEventListener("mouseover", function () {
    revealX(id, color);
  });
  newRow.querySelector(`#${id}`).addEventListener("mouseout", function () {
    hideX(id, color);
  });
  domList.appendChild(newRow);
  document.querySelector("#description").value = "";
  document.querySelector("#value").value = "";
  colorRows();
}

function revealX(id, color) {
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#X${id}`);
  XmarkElem.style.display = "block";
  tableRowElem.style.gridTemplateColumns = "55% 45%";
}

function hideX(id) {
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#X${id}`);
  XmarkElem.style.display = "none";
  tableRowElem.style.gridTemplateColumns = "60% 40%";
}
function colorRows() {
  if (incomeArr.length > 0) {
    let incomeList = document.querySelectorAll(".incomeRow");
    for (let i = 0; i < incomeList.length; i++) {
      console.log(i);
      if (i % 2 == 1) {
        incomeList[i].style.backgroundColor = "rgb(245, 240, 245)";
      } else {
        incomeList[i].style.backgroundColor = "#FFFFFF";
      }
    }
  }
  if (expensesArr.length > 0) {
    let expensesList = document.querySelectorAll(".expensesRow");
    for (let j = 0; j < expensesList.length; j++) {
      if (j % 2 == 1) {
        expensesList[j].style.backgroundColor = "rgb(245, 240, 245)";
      } else {
        expensesList[j].style.backgroundColor = "#FFFFFF";
      }
    }
  }
}
function updateTitles() {
  // function that updates the titles DOM
  document.querySelector("#totalExpenses").innerText =
    totalExpenses.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  document.querySelector(
    "#totalIncome"
  ).innerText = `+${totalIncome.toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  if (totalBalance < 0) {
    document.querySelector("#topBalance").innerText = `${Math.round(
      totalBalance
    ).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    document.querySelector("#headerPrecentage").innerText = `${Math.round(
      ((totalExpenses * -1) / totalBalance) * 100
    )}%`;
  } else if (totalBalance > 0) {
    document.querySelector("#topBalance").innerText = `+ ${Math.round(
      totalBalance
    ).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    document.querySelector("#headerPrecentage").innerText = `${Math.round(
      ((totalExpenses * -1) / totalBalance) * 100
    )}%`;
  } else {
    document.querySelector("#topBalance").innerText = `+ 0`;
    document.querySelector("#headerPrecentage").innerText = `100%`;
  }
}
function print() {
  document.querySelector("#monthHeader").innerText = getTitle();
  updateTitles();
  console.log("print");
  let incomeList = document.querySelector("#incomeTableItems");
  for (let index = 0; index < incomeArr.length; index++) {
    let incomRowObj = incomeArr[index];
    let desc = incomRowObj.desc;
    let value = parseFloat(incomRowObj.value).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); // Format with commas
    let row = document.createElement("div");
    let id = `incomeRow${index + 1}`;
    row.innerHTML = `<div class="tableRow incomeRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">+ ${value}</span>
                  <i class="fa-regular fa-circle-xmark xMark" id = 'X${id}' onclick = 'deleteItem("${id}")'style = 'display: none'></i>
              </div>
            </div>`;
    incomeList.appendChild(row);

    row.addEventListener("mouseover", function () {
      revealX(id, blue);
    });
    row.addEventListener("mouseout", function () {
      hideX(id, blue);
    });
  }
  let expensesList = document.querySelector("#expensesTableItems");
  for (let index = 0; index < expensesArr.length; index++) {
    const expensesRowObj = expensesArr[index];
    let desc = expensesRowObj.desc;
    let value = parseFloat(expensesRowObj.value).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); // Format with commas
    let row = document.createElement("div");
    let id = `expensesRow${index + 1}`;
    let rawValue = expensesRowObj.value; //value before ".toLocaleString()"
    let prec = Math.floor(((rawValue * -1) / totalBalance) * 100);
    row.innerHTML = `<div class="tableRow expensesRow" id="${id}">
            <span class="description">${desc}</span>
              <div class="itemPricePrec">
                <span class="value">${value}</span> <span class ='precentage'>${prec}%</span>
                <i class="fa-regular fa-circle-xmark xMark" onclick = "deleteItem('${id}')" id ='X${id}' style = 'display: none'></i>
            </div></div>`;
    expensesList.appendChild(row);
    row.addEventListener("mouseover", function () {
      revealX(id, red);
    });
    row.addEventListener("mouseout", function () {
      hideX(id, red);
    });
  }
  colorRows();
}
function colorOutline(id) {
  document.querySelector(`#${id}`).style.outline = color;
}
function roundToTwoDecimalPlaces(number) {
  return Math.round(number * 100) / 100;
}

function deleteItem(id) {
  let tableRowElem = document.querySelector(`#${id}`);
  let itemDesc = document.querySelector(`#${id} .description`).innerText;
  let itemValue = document.querySelector(`#${id} .value`).innerText;

  let valueIndex, obj;
  if (itemValue.indexOf("+") != -1) {
    itemValue.replace(new RegExp("\\+", "g"), "");
    obj = { desc: itemDesc, value: itemValue };
    valueIndex = incomeArr.indexOf(obj);
    incomeArr.splice(valueIndex, 1);
    incomeCount--;
  } else {
    obj = { desc: itemDesc, value: itemValue };
    valueIndex = expensesArr.indexOf(obj);
    expensesArr.splice(valueIndex, 1);
    expensesCount--;
  }
  tableRowElem.remove();
  updateLocalStorage();
  updateTotal();
  updateTitles();
  colorRows();
}

// making sure Input is longer than 2 characters
function validateDescription() {
  let inputValue = descriptionElem.value.trim();
  let err = document.querySelector("#err");

  if (inputValue == null || inputValue.length < 1) {
    err.innerText = "enter longer description.";
    err.style.display = "block";
    return false;
  } else {
    err.style.display = "none";
    return true;
  }
}
// making sure value is higher than 0.
function validateValue() {
  let valueInput = valueElem.value.trim();
  let err = document.querySelector("#err");
  if (valueInput == null || valueInput.length < 1) {
    err.innerText = "enter longer value.";
    err.style.display = "block";
    return false;
  } else {
    err.style.display = "none";
    return true;
  }
}
function openMsg(event) {
  event.preventDefault(); // Prevents the default form submission behavior
  document.querySelector("#msg").style.display = "block";
}

function closeMsg() {
  document.querySelector("#msg").style.display = "none";
}
function addToArr() {
  if (validateDescription() && validateValue()) {
    let tableRowObject = {
      desc: descriptionElem.value,
      value: valueElem.value,
    };
    symbol = symbolElem.value;
    if (symbol == "+") {
      incomeArr.push(tableRowObject);
    } else {
      expensesArr.push(tableRowObject);
    }

    updateLocalStorage();
    updateTotal();
    addToList();
  }
}
function deleteHistory() {
  incomeArr = [];
  expensesArr = [];
  incomeArrJson = "[]";
  expensesArrJson = "[]";
  localStorage.setItem("expensesArr", expensesArrJson);
  localStorage.setItem("incomeArr", incomeArrJson);
  updateLocalStorage();
  document.querySelector("#incomeTableItems").innerHTML = "";
  document.querySelector("#expensesTableItems").innerHTML = "";
  closeMsg();
  updateTotal();
  updateTitles();
}
//event listeners
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
document.querySelector("#value").addEventListener("keyEnter", function () {
  addToArr();
});