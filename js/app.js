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

// let form = document.querySelector("form");
// let amountSpent = document.getElementById("amountSpent");
// let addTransactionForm = document.getElementById("addTransactionForm");
// let balanceArray = [];

// let amountBudgeted = document.getElementById("budgetInput");
// let addCategoryToBudgetForm = document.getElementById("addCategoryToBudgetForm");
// let expandListButton = document.querySelector("button");
// let budgetArray = [];

// const unfoldTransactionForm = (event) => {
//   event.preventDefault();
//   balanceArray.push({
//     category:event.target.id
//   })
//   addTransactionForm.style.display = "inline";
//   if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
//     addCategoryToBudgetForm.style.display = "none";
//   }
// }

// //Each time I enter a new transaction, the value in all objects is updated to equal the most recent one.
// const sendNewTransaction = () => {
//   event.preventDefault();
//   for (i = 0; i < balanceArray.length; i++) {
//   balanceArray[i]["amount"] = amountSpent.value;
//   }
//   console.log(balanceArray);
//   //Form doesn't clear automatically
//   form.reset();
//   }

// //Submit button needs sendBudget + addBudgetCategory needs to separate

// const unfoldMoreCategoriesForm = () => {
//   event.preventDefault();
//   addCategoryToBudgetForm.style.display = "inline";
//   if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
//     addTransactionForm.style.display = "none";}
// }

// const addBudgetCategory = (event) => {
//   event.preventDefault();
//   budgetArray.push({
//     category:event.target.id
//   });
// }

// const sendNewBudget = () => {
//   event.preventDefault();
//   for (i = 0; i < budgetArray.length; i++) {
//     budgetArray[i]["amount"] = amountBudgeted.value;
//     };
//   console.log(budgetArray);
//   form.reset();
// }

// expandListButton.addEventListener("click", unfoldMoreCategoriesForm);

//On submit, category and weekly budget get input get logged to dashboard && icon gets added to the top list in a new row above the button to be viewed on default during next  || OR on submit, transaction amount spent gets logged to appropriate pre-existing category on dashboard

const addNewCategory = () => {
  event.preventDefault();
  addCategoryToBudgetForm.style.display = "inline";
  if (
    addCategoryToBudgetForm.style.display === "inline" &&
    addTransactionForm.style.display === "inline"
  ) {
    addTransactionForm.style.display = "none";
  }
};

var selectedText = "";

//when user selects category
const unfoldTransactionForm = (selectedCategory) => {
  event.preventDefault();
  addTransactionForm.style.display = "inline";
  //if (addCategoryToBudgetForm.style.display === "inline" && addTransactionForm.style.display === "inline") {
  //    addCategoryToBudgetForm.style.display = "none";
  //}
  console.log(selectedCategory);
  selectedText = selectedCategory;
  var dataBaseString = window.localStorage.getItem("budgetAppData");
  let database = JSON.parse(dataBaseString);
  var exist = database.listofCategory.findIndex(
    (x) => x.category == selectedText
  );
  if (exist != -1) {
    document.getElementById("budgetInput").value =
      database.listofCategory[exist].budget;
  } else {
    document.getElementById("budgetInput").value = 0;
  }
};
// calling unfoldTransactionForm function when user clicks add new category
const AddNewCategory = (selectedCategory) => {
  //event.preventDefault();
  //addTransactionForm.style.display = "inline";
  //console.log(selectedCategory);
  //selectedText = selectedCategory;
  unfoldTransactionForm(selectedCategory);
};

let addTransactionForm = document.getElementById("addTransactionForm");
let addCategoryToBudgetForm = document.getElementById(
  "addCategoryToBudgetForm"
);

let expandListButton = document.querySelector("button");
let foodButton = document.getElementById("food");
let groceriesButton = document.getElementById("groceries");
let billsButton = document.getElementById("bills");
let entertainmentButton = document.getElementById("entertainment");

//expandListButton.addEventListener("click", addNewCategory);
//document.getElementById("row1").addEventListener("click", unfoldTransactionForm)

const submitData = () => {
  //if category not selected
  if (selectedText == "" || selectedText == null) {
    alert("select category");
  } else {
    var amount = document.getElementById("amountSpent").value;
    var budget = document.getElementById("budgetInput").value;
    if (amount && amount >= 0) {
      var dataBaseString = window.localStorage.getItem("budgetAppData");
      let database = JSON.parse(dataBaseString);
      var exist = database.listofCategory.findIndex(
        (x) => x.category == selectedText
      );
      if (exist != -1) {
        var num1 = parseFloat(database.listofCategory[exist].used) || 0;
        var num2 = parseFloat(amount) || 0;
        var floatBudget = parseFloat(budget) || 0;
        if (num1 + num2 > floatBudget) {
          alert("Out of budget");
        } else {
          database.listofCategory[exist].used = num1 + num2;
          database.listofCategory[exist].budget = floatBudget;
          window.localStorage.setItem(
            "budgetAppData",
            JSON.stringify(database)
          );
          document.getElementById("amountSpent").value = 0;
        }
      } else {
        var iconNew = document.getElementById(selectedText.toLowerCase());
        if (iconNew != null) {
          console.log(iconNew);
          let newCat = {};
          newCat.budget =
            parseFloat(document.getElementById("budgetInput").value) || 0;
          newCat.category = selectedText;
          //common class added in css
          newCat.class = "commonCategory";
          newCat.src = iconNew.getAttribute("src");
          newCat.used =
            parseFloat(document.getElementById("amountSpent").value) || 0;
          if (newCat.used > newCat.budget) {
            alert("out of budget");
            return;
          }
          console.log(newCat);
          database.listofCategory.push(newCat);
          window.localStorage.setItem(
            "budgetAppData",
            JSON.stringify(database)
          );
          document.getElementById("budgetInput").value = 0;
        } else {
          alert("Invalid Category");
        }
      }
    } else {
      alert("Enter Amount");
    }
  }
};
