this is a dictionary for the names.

<!-- top part -->

topContainer - the main big container of the top part.it borders with the picture.

topTextContainer - the top text, both "avaliable" and the balance.

monthHeader - an h2 tag, header with the month

topBalance - an h1 tag, the big header with the balance.

boxContainer - a div container that contains the 2 boxes of income and expenses.

incomeBox - the box with the total income.

totalIncome - a span tag, that shows the total income.

expensesBox - the box with the total expenses and percentage.

totalExpenses - a span tag, that presents the total expences

precentage - a span tag that shows the precentage of the totalExpanses out of the totalIncome.

<!-- middle part -->

inputContainer - the middle container, who contains the input form.

inputForm - a form that contains the input for the new expense/income.

typeOfInput - an input of +/-, that decides the type: expense/income. limited to + -, only works with the arrows to the side and not keyboard input.

description - an input of text, the name of the expense/income. needs to be limited to a number of letters - need to decide.

value - an input of text, the value of the expens/income. needs to be limited to positive numbers.

checkMarkIcon - an svg tag, can be changed to different tag if needed. its an icon of the checkmark. when pressed - added the income/expense.

<!-- bottom part -->

bottomContainer - The buttom container, contains all the elements below the inputContainer.

fullTable - containing two parts, income table and expanses table.

<!-- income table part -->

incomeTableContainer - for the head and items in the income table.

incomeTableHead - title of income table.

incomeTableItems - for all description's and value's inside the income table.

<!-- expenses table part -->

expensesTableContainer - for the head and items in the expenses table.

expensesTableHead - title of expenses table.

expensesTableItems - for all description's, value's and percentages inside the income table.

<!-- classes for the table -->

class==>tableRow - for all rows.
class==>description - a class for the income or expanse description.
class==>value - for the income or expanse value.
class==>percentage for percentage of expenses from income.
