// global variables
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

// // functions

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
