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
  let database = JSON.parse(window.localStorage.getItem("listofCategory"));
  let amountSpent = document.getElementById("amountSpent");
  console.log("database", database);
  var exist = database.filter((x) => x.category == selectCategory);
  console.log("exist", exist);
  exist[0].used += JSON.parse(amountSpent.value);
  window.localStorage.setItem("listofCategory", JSON.stringify(database));
};

const buildHtml = () => {
  let categories = document.getElementById("categories");
  const listofCategory = JSON.parse(
    window.localStorage.getItem("listofCategory")
  );
  console.log("listofCategory", listofCategory);
  let totalUsed = 0;
  let totalBudget = 0;
  for (let i = 0; i < listofCategory.length; i++) {
    let used = parseFloat(listofCategory[i].used);
    let budget = parseFloat(listofCategory[i].budget);
    totalUsed += used;
    totalBudget += budget;
    let div = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let spanColor = document.createElement("span");
    let spanPush = document.createElement("span");
    div.classList.add(listofCategory[i].class);
    img.src = listofCategory[i].src;
    img.classList.add("icon");
    span.innerHTML = listofCategory[i].category;
    spanPush.classList.add("push");
    spanPush.innerHTML = "$" + listofCategory[i].used.toFixed(2) + " /";
    spanColor.classList.add("color");
    spanColor.innerHTML = "$" + listofCategory[i].budget.toFixed(2);
    div.append(img);
    div.append(span);
    div.append(spanPush);
    div.append(spanColor);
    categories.append(div);
    if (used >= budget) {
      span.style.color = "red";
      spanPush.style.color = "red";
      spanColor.style.color = "red";
    }
  }
  document.getElementById("totalBudgetAvailable").innerHTML =
    "$" + (totalBudget - totalUsed).toFixed(2);
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

// const deleteFunction = (categoryName) => {
//   console.log(categoryName);
//   let database = JSON.parse(window.localStorage.getItem("listofCategory"));
//   let clickedCategoryIndex = database.listofCategory.findIndex(
//     (x) => x.category == categoryName
//   );
//   console.log(clickedCategoryIndex);
// };
