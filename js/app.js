const visibility = () => {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

const login = (event) => {
  event.preventDefault();
  document.getElementById("errorMsg").style.display = "none";
  let formEmail = document.getElementById("email").value;
  let formPassword = document.getElementById("password").value;
  console.log();
  if (formEmail === "raihan2345@gmail.com" && formPassword === "12345678") {
    window.open("https://www.google.com/", "_self");
  } else {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").focus();
    document.getElementById("errorMsg").style.display = "block";
  }
};

let form = document.querySelector("form");
let amountSpent = document.getElementById("amountSpent");
let addTransactionForm = document.getElementById("addTransactionForm");
let balanceArray = [];

let amountBudgeted = document.getElementById("budgetInput");
let addCategoryToBudgetForm = document.getElementById("addCategoryToBudgetForm");
let expandListButton = document.querySelector("button");
let budgetArray = [];

const unfoldTransactionForm = (event) => {
  event.preventDefault();
  balanceArray.push({
    category:event.target.id
  })
  addTransactionForm.style.display = "inline";
  if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
    addCategoryToBudgetForm.style.display = "none";
  }
}

//Each time I enter a new transaction, the value in all objects is updated to equal the most recent one. 
const sendNewTransaction = () => {
  event.preventDefault();
  for (i = 0; i < balanceArray.length; i++) {
  balanceArray[i]["amount"] = amountSpent.value;
  }
  console.log(balanceArray);
  //Form doesn't clear automatically
  form.reset();
  }

//Submit button needs sendBudget + addBudgetCategory needs to separate

const unfoldMoreCategoriesForm = () => {
  event.preventDefault();
  addCategoryToBudgetForm.style.display = "inline";
  if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
    addTransactionForm.style.display = "none";}
}

const addBudgetCategory = (event) => {
  event.preventDefault();
  budgetArray.push({
    category:event.target.id
  });
}

const sendNewBudget = () => {
  event.preventDefault();
  for (i = 0; i < budgetArray.length; i++) {
    budgetArray[i]["amount"] = amountBudgeted.value;
    };
  console.log(budgetArray);
  form.reset();
}

expandListButton.addEventListener("click", unfoldMoreCategoriesForm);

//On submit, category and weekly budget get input get logged to dashboard && icon gets added to the top list in a new row above the button to be viewed on default during next  || OR on submit, transaction amount spent gets logged to appropriate pre-existing category on dashboard