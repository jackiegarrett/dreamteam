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



const addNewCategory = () => {
  event.preventDefault();
  addCategoryToBudgetForm.style.display = "inline";
  if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
    addTransactionForm.style.display = "none";}
}


const unfoldTransactionForm = () => {
  event.preventDefault();
  addTransactionForm.style.display = "inline";
  if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
    addCategoryToBudgetForm.style.display = "none";
  }
}

let addTransactionForm = document.getElementById("addTransactionForm");
let addCategoryToBudgetForm = document.getElementById("addCategoryToBudgetForm");

let expandListButton = document.querySelector("button");
let foodButton = document.getElementById("food");
let groceriesButton = document.getElementById("groceries");
let billsButton = document.getElementById("bills");
let entertainmentButton = document.getElementById("entertainment");

expandListButton.addEventListener("click", addNewCategory);
document.getElementById("row1").addEventListener("click", unfoldTransactionForm)


