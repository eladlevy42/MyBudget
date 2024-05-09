// global variables

let symbol = "+";
let expansesCount = 0;
let incomeCount = 0;
let expensesArr = [];
let incomeArr = [];
let totalExpenses = 0;
let totalBalance = 0;
let totalIncome = 0;
let symbolElem = document.getElementById("typeOfInput");
let descriptionElem = document.getElementById("description");
let valueElem = document.getElementById("value");
let checkmarkElem = document.querySelector(".fa-check-circle");

// // functions
// function init(){
//   if(localStorage.getItem(''))
// }
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

function print() {
  document.querySelector("#monthHeader").innerText = getTitle();
  if (totalBalance < 0) {
    document.querySelector("#topBalance").innerText = `- ${totalBalance}`;
  } else {
    document.querySelector("#topBalance").innerText = `+ ${totalBalance}`;
  }
  document.querySelector("#totalIncome").innerText = `+ ${totalIncome}`;
  document.querySelector("#totalExpenses").innerText = `- ${totalExpenses}`;
  document.querySelector("headerPrecentage").innerText = Math.floor(
    (totalExpenses / totalBalance) * 100
  );
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
    obj = { description: itemDesc, value: itemValue };
    valueIndex = incomeArr.indexOf(obj);
    incomeArr.splice(valueIndex, 1);
    incomeCount--;
  } else {
    obj = { description: itemDesc, value: itemValue };
    valueIndex = expensesArr.indexOf(obj);
    incomeArr.splice(valueIndex, 1);
    expansesCount--;
  }
  tableRowElem.remove();
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

// making sure Input is longer than 2 characters
function validateDescription() {
  let inputValue = descriptionElem.value.trim();
  if (inputValue.length > 1) {
    console.log("Input is longer than 2 characters");
    return true;
  } else {
    alert("description must be longer then one character");
    return false;
  }
}
// making sure value is higher than 0.
function validateValue() {
  let valueInput = valueElem.value.trim();
  if (valueInput >= 0) {
    console.log("value is higher than 0.");
    return true;
  } else {
    alert("value must be higher than 0.");
    return false;
  }
}

function addToArr() {
  if (validateDescription() &&validateValue()) {
    let tableRowObject = {desc: descriptionElem.value , value: valueElem.value}
    symbol = symbolElem.value 
    if (symbol === "+") {
      incomeArr.push(tableRowObject) 
      console.log(incomeArr)
    }
    else{
      expensesArr.push(tableRowObject)
      console.log(expensesArr)
    }
    updateTotal()
  }
}
