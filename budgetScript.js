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
function init() {
  // a function that loads the page.
  // if localStorage doesn't exist - it creats it as empty arrays and updates all variables as 0.
  // if it does exist, load the data from localStorage and update all the variables.
  // at the end it prints the page.
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
function print() {
  // a function that prints the entire board after initializing.
  // prints the board based on the arrays.
  document.querySelector("#monthHeader").innerText = updateDate();
  //print the income List
  let incomeList = document.querySelector("#incomeTableItems");
  for (let index = 0; index < incomeArr.length; index++) {
    let incomRowObj = incomeArr[index];
    let desc = incomRowObj.desc;
    let value = parseFloat(incomRowObj.value).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
  // Print the expensesList
  let expensesList = document.querySelector("#expensesTableItems");
  for (let index = 0; index < expensesArr.length; index++) {
    const expensesRowObj = expensesArr[index];
    let desc = expensesRowObj.desc;
    let value = parseFloat(expensesRowObj.value).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    let row = document.createElement("div");
    let id = `expensesRow${index + 1}`;
    let rawValue = expensesRowObj.value; //value before ".toLocaleString()"
    let prec = Math.floor(((rawValue * -1) / totalExpenses) * 100);
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
function colorRows() {
  // a function that runs on the .tableRow elements in each list and change the bkg color for every second line
  if (incomeArr.length > 0) {
    let incomeList = document.querySelectorAll(".incomeRow");
    for (let i = 0; i < incomeList.length; i++) {
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
function updateLocalStorage() {
  // a function that updates the local storage.
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
function updateTotal() {
  // a function that updates the total balance, total income and total expenses
  // it runs on a loop for ecery array and sums the total.
  totalBalance = 0.0;
  totalExpenses = 0.0;
  totalIncome = 0.0;
  for (let exp of expensesArr) {
    totalExpenses -= parseFloat(exp.value);
  }
  for (let inc of incomeArr) {
    totalIncome += parseFloat(inc.value);
  }
  //update the total balance
  totalBalance = totalIncome + totalExpenses;
  updateTitles();
}
function updateTitles() {
  totalBalance = parseFloat(totalBalance);
  totalExpenses = parseFloat(totalExpenses);
  totalIncome = parseFloat(totalIncome);
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
    document.querySelector(
      "#topBalance"
    ).innerText = `${totalBalance.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    document.querySelector("#headerPrecentage").innerText = `${Math.floor(
      ((totalExpenses * -1) / (totalExpenses * -1 + totalIncome)) * 100
    )}%`;
  } else if (totalBalance > 0) {
    document.querySelector(
      "#topBalance"
    ).innerText = `+ ${totalBalance.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    document.querySelector("#headerPrecentage").innerText = `${Math.floor(
      ((totalExpenses * -1) / (totalExpenses * -1 + totalIncome)) * 100
    )}%`;
  } else {
    document.querySelector("#topBalance").innerText = `+ 0.00`;
    document.querySelector("#headerPrecentage").innerText = `100%`;
  }
}
function updateDate() {
  // a function that gets the date title.
  // it gets the current year, and current monthNumber.
  // the month number is a index as 0 = january and so on
  // it gets the month name from an array' by thr month index.
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
function addToList() {
  // the function adds the item to the list (DOM) after the array has been updated.
  let domList, desc, value, row, id;

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
    let prec = Math.floor(((rawValue * -1) / totalExpenses) * 100);
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
  updateTotal();
  updateTitles();
  colorRows();
}
function revealX(id) {
  // a function to reveal the X mark when the mouseover the tableRow element.
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#X${id}`);
  XmarkElem.style.display = "block";
  tableRowElem.style.gridTemplateColumns = "55% 45%";
  tableRowElem.style.transition = "all 0.8s";
}
function hideX(id) {
  // a function to hide the X mark when the mouseout the tableRow element.
  let tableRowElem = document.querySelector(`#${id}`);
  let XmarkElem = document.querySelector(`#X${id}`);
  XmarkElem.style.display = "none";
  tableRowElem.style.transition = "all 0.8s"; // Ensure transition is applied correctly
  tableRowElem.style.gridTemplateColumns = "60% 40%";
}
function deleteItem(id) {
  // the function called when user press on Xmark.
  // it gets the id of the tableRow element that the Xmark is in.
  //first it updates the array, and then the DOM.
  let tableRowElem = document.querySelector(`#${id}`);
  let itemDesc = document.querySelector(`#${id} .description`).innerText;
  let itemValue = document.querySelector(`#${id} .value`).innerText;
  let valueIndex, obj;
  //updates array
  if (itemValue.indexOf("+") != -1) {
    // if there is '+' in the string, its positive. and we need to get rid of that '+'.
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
  //updates DOM
  tableRowElem.remove();

  updateLocalStorage();
  updateTotal();
  updateTitles();
  colorRows();
}
function validateDescription() {
  let inputValue = descriptionElem.value.trim();
  let err = document.querySelector("#err");

  if (inputValue == null || inputValue.length < 1) {
    err.innerText = "enter valid description.";
    err.style.display = "block";
    return false;
  } else {
    err.style.display = "none";
    return true;
  }
}
function validateValue() {
  let valueInput = valueElem.value.trim();
  let err = document.querySelector("#err");
  if (valueInput == null || valueInput.length < 1) {
    err.innerText = "enter valid value.";
    err.style.display = "block";
    return false;
  } else {
    err.style.display = "none";
    return true;
  }
}
function openMsg(event) {
  // called when the first 'delete history' (#msg) btn is called.
  // changes the display of the popUp div to 'block' (default = none)
  event.preventDefault(); // to prevent the default event. for somereason without this line the popUp is collapsing.
  document.querySelector("#msg").style.display = "block";
}
function closeMsg() {
  // changes the display of the popUp div back to 'none'
  document.querySelector("#msg").style.display = "none";
}
function deleteHistory() {
  // the function being called on the second 'delete history' btn, in the popUp.
  // it resets the variables, updates the local storage to empty arrays and updates the DOM.
  // at the end, ofcourse, closes the popUp.
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
  // event listener for the change of the '+' and '-'.
  // changes the global symbol and color variables.
  // adds and removes classes 'blue' and 'red' based on the symbol.
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
  // event listener for the #value input. when the enter key is pressed and value is onfocus.
  addToArr();
});
init();
