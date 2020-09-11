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

// const unfoldMoreCategoriesForm = () => {
//   event.preventDefault();
//   addCategoryToBudgetForm.style.display = "inline";
//   if (
//     addCategoryToBudgetForm.style.display === "inline" &&
//     addTransactionForm.style.display === "inline"
//   ) {
//     addTransactionForm.style.display = "none";
//   }
// };

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
  // addTransactionForm.style.display = "inline";
  // if (
  //   addCategoryToBudgetForm.style.display === "inline" &&
  //   addTransactionForm.style.display === "inline"
  // ) {
  //   addCategoryToBudgetForm.style.display = "none";
  // }
  selectCategory = selectedCategory.target.value;
};
// calling unfoldTransactionForm function when user clicks add new category
const AddNewCategory = (selectedCategory) => {
  event.preventDefault();
  newCategory = selectedCategory;
};

const submitData = () => {
  let categoryAndColor = [
    { category: "food", color: "#ff2f64" },
    { category: "groceries", color: "#13d3d5" },
    { category: "bills", color: "#5087ec" },
    { category: "entertain", color: "#ffbf46" },
  ];

  event.preventDefault();
  console.log(selectCategory);
  let database = JSON.parse(window.localStorage.getItem("listofCategory"));
  if (newCategory) {
    let budgetInput = document.getElementById("budgetInput");
    database.push({
      category: newCategory,
      budget: JSON.parse(budgetInput.value),
      class: `${newCategory.toLowerCase()}-cat`,
      src: `./Assets/${newCategory.toLowerCase()}svg.svg`,
      used: 0,
      color: categoryAndColor.filter(
        (where) => where.category === newCategory.toLowerCase()
      )[0].color,
    });
    window.localStorage.setItem("listofCategory", JSON.stringify(database));
  } else {
    let amountSpent = document.getElementById("amountSpent");
    console.log("database", database);
    var exist = database.filter((x) => x.category == selectCategory);
    console.log("exist", exist);
    exist[0].used += JSON.parse(amountSpent.value);
    console.log(database);
    window.localStorage.setItem("listofCategory", JSON.stringify(database));
  }
  newCategory = "";

  alert("Your transaction has been added.");
  window.location = "dashboard.html";
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
    spanPush.innerHTML = "$" + listofCategory[i].used.toFixed(2) + "/";
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

  drawIt();
};

const buildBudgetData = () => {
  const budgetData = {
    TotalBudget: 350,
    //color attribute
    listofCategory: [
      {
        category: "Food",
        used: 0,
        budget: 50,
        class: "food-cat",
        src: "./Assets/foodsvg.svg",
        color: "#ff2f64",
      },
      {
        category: "Groceries",
        used: 0,
        budget: 100,
        class: "groceries-cat",
        src: "./Assets/groceriessvg.svg",
        color: "#13d3d5",
      },
      {
        category: "Bills",
        used: 0,
        budget: 150,
        class: "bills-cat",
        src: "./Assets/billssvg.svg",
        color: "#5087ec",
      },
      {
        category: "Entertainment",
        used: 0,
        budget: 50,
        class: "entertainment-cat",
        src: "./Assets/entertainmentsvg.svg",
        color: "#ffbf46",
      },
    ],
  };
  window.localStorage.setItem(
    "listofCategory",
    JSON.stringify(budgetData.listofCategory)
  );
  window.localStorage.setItem("TotalBudget", 350);
};

// const buildHtmlTransaction = () => {
//   let addTransactionForm = document.getElementById("addTransactionForm");
//   let addCategoryToBudgetForm = document.getElementById(
//     "addCategoryToBudgetForm"
//   );

//   let expandListButton = document.querySelector("button");
//   let foodButton = document.getElementById("food");
//   let groceriesButton = document.getElementById("groceries");
//   let billsButton = document.getElementById("bills");
//   let entertainmentButton = document.getElementById("entertainment");

//   if (expandListButton) {
//     expandListButton.addEventListener("click", addNewCategory);
//     document.querySelector(".row");
//     // .addEventListener("click", unfoldTransactionForm);
//   }
// };

//Pie chart code
const drawPieSlice = (
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
};
//myVinyls is the array that is being referenced in 288. Will have to change to reflect dashboard data.
var amountUsedData = {};

// groceries budget = 200 - 105 = 95
// bills budget = 100 - 55 =
const pieChart = (options) => {
  let canvas = options.canvas;
  let ctx = canvas.getContext("2d");
  let colors = options.colors;
  console.log("canvas", canvas.width / 2);
  var total_value = 0;
  var color_index = 0;
  for (var categ in options.data) {
    var val = options.data[categ];
    total_value += val;
  }
  var start_angle = 0;
  for (categ in options.data) {
    val = options.data[categ];
    let slice_angle = (2 * Math.PI * val) / total_value;
    drawPieSlice(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width / 2, canvas.height / 2),
      start_angle,
      start_angle + slice_angle,
      colors[color_index % colors.length]
    );
    start_angle += slice_angle;
    color_index++;
  }
};
const drawIt = () => {
  let listofCategory = JSON.parse(
    window.localStorage.getItem("listofCategory")
  );
  let colorArray = [];

  for (cat in listofCategory) {
    amountUsedData[listofCategory[cat].category.toLowerCase()] =
      listofCategory[cat].used;
    colorArray.push(listofCategory[cat].color);
  }
  console.log(colorArray);
  pieChart({
    canvas: document.getElementById("myCanvas"),
    //Update the variable from which it is drawn and make the colors match the Zeplin colors. How to make the color/difference match up?
    data: amountUsedData,
    colors: colorArray,
  });
};
