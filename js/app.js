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
  if (formEmail === "test@gmail.com" && formPassword === "12345678") {
    window.open("dashboard.html", "_self");
  } else {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").focus();
    document.getElementById("errorMsg").style.display = "block";
  }
};

const unfoldMoreCategoriesForm = () => {
  event.preventDefault();
  addCategoryToBudgetForm.style.display = "inline";
  if (
    addCategoryToBudgetForm.style.display === "inline" &&
    addTransactionForm.style.display === "inline"
  ) {
    addTransactionForm.style.display = "none";
  }
};

const sendNewBudget = () => {
  event.preventDefault();
  for (i = 0; i < budgetArray.length; i++) {
    budgetArray[i]["amount"] = amountBudgeted.value;
  }
  console.log(budgetArray);
  addCategoryToBudgetForm.style.display = "none";
  // form.reset();
};

let newCategory = "";
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

const toggleTransactionPage = (event) => {
  document.getElementById("transactionPageDisplay").style.display = "inline";
};

let selectCategory = "";
//when user selects category
const unfoldTransactionForm = (selectedCategory) => {
  event.preventDefault();
  addTransactionForm.style.display = "inline";
  if (
    addCategoryToBudgetForm.style.display === "inline" &&
    addTransactionForm.style.display === "inline"
  ) {
    addCategoryToBudgetForm.style.display = "none";
  }
  selectCategory = selectedCategory.target.value;
};
// calling unfoldTransactionForm function when user clicks add new category
const AddNewCategory = (selectedCategory) => {
  event.preventDefault();
  newCategory = selectedCategory;
};

const submitData = () => {
  event.preventDefault();
  console.log(selectCategory);
  var dataBaseString = window.localStorage.getItem("listofCategory");
  let database = JSON.parse(dataBaseString);
  if (newCategory) {
    let budgetInput = document.getElementById("budgetInput");
    database.push({
      category: newCategory,
      budget: JSON.parse(budgetInput.value),
      class: `${newCategory.toLowerCase()}-cat`,
      src: `./Assets/${newCategory.toLowerCase()}svg.svg`,
      used: 0,
    });
    window.localStorage.setItem("listofCategory", JSON.stringify(database));
  } else {
    let amountSpent = document.getElementById("amountSpent");
    console.log("database", database);
    var exist = database.filter((x) => x.category == selectCategory);
    console.log("exist", exist);
    exist[0].used = JSON.parse(amountSpent.value);
    window.localStorage.setItem("listofCategory", JSON.stringify(database));
  }
  newCategory = "";
};

const buildHtml = () => {
  console.log("called function");
  let categories = document.getElementById("categories");
  const listofCategory = JSON.parse(
    window.localStorage.getItem("listofCategory")
  );
  console.log("listofCategory", listofCategory);
  for (let i = 0; i < listofCategory.length; i++) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");
    div.classList.add(listofCategory[i].class);
    img.src = listofCategory[i].src;
    img.classList.add("icon");
    span.innerHTML = listofCategory[i].category;
    div.append(img);
    div.append(span);
    categories.append(div);
  }
};

const buildBudgetData = () => {
  const budgetData = {
    TotalBudget: 350,
    listofCategory: [
      {
        category: "Food",
        used: 0,
        budget: 50,
        class: "food-cat",
        src: "./Assets/foodsvg.svg",
      },
      {
        category: "Groceries",
        used: 0,
        budget: 100,
        class: "groceries-cat",
        src: "./Assets/groceriessvg.svg",
      },
      {
        category: "Bills",
        used: 0,
        budget: 150,
        class: "bills-cat",
        src: "./Assets/billssvg.svg",
      },
      {
        category: "Entertainment",
        used: 0,
        budget: 50,
        class: "entertainment-cat",
        src: "./Assets/entertainmentsvg.svg",
      },
    ],
  };
  window.localStorage.setItem(
    "listofCategory",
    JSON.stringify(budgetData.listofCategory)
  );
  window.localStorage.setItem("TotalBudget", 350);
};

const buildHtmlTransaction = () => {
  let addTransactionForm = document.getElementById("addTransactionForm");
  let addCategoryToBudgetForm = document.getElementById(
    "addCategoryToBudgetForm"
  );

  let expandListButton = document.querySelector("button");
  let foodButton = document.getElementById("food");
  let groceriesButton = document.getElementById("groceries");
  let billsButton = document.getElementById("bills");
  let entertainmentButton = document.getElementById("entertainment");

  if (expandListButton) {
    expandListButton.addEventListener("click", addNewCategory);
    document
      .getElementById("row1")
      .addEventListener("click", unfoldTransactionForm);
  }
};
