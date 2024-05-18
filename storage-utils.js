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
