// revealing the x mark when hovering above a expenses TableRow
//not working just an idea
let xMarkElemList = document.querySelectorAll(".xMark");
let expensesRowElemList = document.querySelectorAll(
  "#expensesTableContainer .tableRow"
);

// not working - cant use a method on expensesRowElemList[i]
//needs to figure out how to make an array of elements
//and run on the array not on the nodeList
console.log(expensesRowElemList);
for (let i in expensesRowElemList) {
  let expensesRowElem = expensesRowElemList[i];
  let xMarkElem = xMarkElemList[i];
  console.log(expensesRowElem[i]);
  expensesRowElem[i].addEventListener("mouseover", function () {
    xMarkElem[i].style.display = "block";
    xMarkElem[i].style.fill = "#ff4f3f";
    xMarkElem[i].style = "grid-template-columns: 55% 45%;";
  });
  expensesRowElem[i].addEventListener("mouseout", function () {
    xMarkElem[i].style.display = "none";
    expensesRowElem[i].style = "grid-template-columns: 60% 40%;";
  });
}
