let editId = '';
const visibility = () => {
  let x = document.getElementById("password");
  const visibleYes = document.getElementById('visible-yes');
  const visibleNo = document.getElementById('visible-no');

  if (x.type === "password") {
    visibleNo.style.display = 'none';
    visibleYes.style.display = 'block';
    x.type = "text";
  } else {
    x.type = "password";
    visibleYes.style.display = 'none';
    visibleNo.style.display = 'block';
  }
};

const login = (event) => {
  event.preventDefault();
  document.getElementById("errorMsg").style.display = "none";
  let formEmail = document.getElementById("email").value;
  let formPassword = document.getElementById("password").value;
  if (formEmail === "test@gmail.com" && formPassword === "12345678") {
    window.open("dashboard.html", "_self");
  } else {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").focus();
    document.getElementById("errorMsg").style.display = "block";
  }
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

const preventDefault = () => {
  event.preventDefault();
}

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
    var exist = database.filter((x) => x.category == selectCategory);
    exist[0].used += JSON.parse(amountSpent.value);
    window.localStorage.setItem("listofCategory", JSON.stringify(database));
  }

  newCategory = "";
  window.location = "dashboard.html";
};

const buildHtml = () => {
  let categories = document.getElementById("categories");
  const listofCategory = JSON.parse(
    window.localStorage.getItem("listofCategory")
  );
  if(!listofCategory || listofCategory==null)
  {
    buildBudgetData();
  }
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
    div.classList.add('category');
    div.setAttribute('id', listofCategory[i].class);
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

  if (totalUsed === 0) {
    document.querySelector(".food-cat").style.marginLeft = "32px";
    document.querySelector(".groceries-cat").style.marginLeft = "32px";
    document.querySelector(".bills-cat").style.marginLeft = "32px";
    document.querySelector(".entertainment-cat").style.marginLeft = "32px";
    document.getElementById("pageWrapper").style.paddingBottom = "600px";

  } else {
    document.getElementById("donutContainer").style.display = "inline";
    document.getElementById("myCanvas").style.display = "inline";
  }

  document.getElementById("totalBudgetAvailable").innerHTML =
    "$" + (totalBudget - totalUsed).toFixed(2);

  drawIt();

  /**
   * Modal hidden until list item is clicked
   * This needs to be in the buildHtml function because the elements need to be rendered before the document can find them
   */
  document.querySelectorAll('.category').forEach((item) => {
    item.addEventListener('click', function() {
      const updatedBudget = document.querySelector('#budgetAmount');
      updatedBudget.value = '';
      document.querySelector('.dark-overlay').style.display = 'block';
      editId = item.getAttribute('id');
      const form = document.querySelector('#editBudgetForm');
      form.addEventListener('submit', updateBudget);
    });
  });

  /**
   * Cancel button dismisses Modal
   * This needs to be in the buildHtml function because the elements need to be rendered before the document can find them
   */
  document.querySelector('#cancel-new-budget').addEventListener('click', function() {
    document.querySelector('.dark-overlay').style.display = 'none';
  });
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

const getLocalstorageData=()=>{
  return JSON.parse(
    window.localStorage.getItem("listofCategory")
  );
}

const loadCategory=()=>{
  let listofCategory=getLocalstorageData();
  let rowsOfButtons=document.getElementById('rowsOfButtons');
  for (let i = 0; i < listofCategory.length; i++) {
    let rowdiv = document.createElement("div");
    let img = document.createElement("INPUT");
    img.classList.add('categorylist');
    img.setAttribute("type", "image");
    img.src = listofCategory[i].src;
    img.value=listofCategory[i].category;
    rowdiv.classList.add("row");

    let lbl = document.createElement("label");
    lbl.innerHTML=listofCategory[i].category;
    if(listofCategory[i].used<listofCategory[i].budget){
      img.setAttribute("onclick", "unfoldTransactionForm(event)");
      img.classList.add('activeCategoryImage');
    }
    else{
      img.setAttribute("onclick", "preventDefault()");
      img.classList.add('disabledImage');
      lbl.style.color = "red";
    }
    rowdiv.appendChild(img);
    rowdiv.appendChild(lbl);
    rowsOfButtons.appendChild(rowdiv);
  }  
}


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

var amountUsedData = {};

const pieChart = (options) => {
  let canvas = options.canvas;
  let ctx = canvas.getContext("2d");
  let colors = options.colors;

  canvas.width = 250;
  canvas.height = 250;

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

  if (options.doughnutHoleSize2){
    drawPieSlice(
        ctx,
        canvas.width/2,
        canvas.height/2,
        options.doughnutHoleSize2 * Math.min(canvas.width/2,canvas.height/2),
        0,
        2 * Math.PI,
        "#ffffff",
    );
  }

  if (options.doughnutHoleSize){
    drawPieSlice(
        ctx,
        canvas.width/2,
        canvas.height/2,
        options.doughnutHoleSize * Math.min(canvas.width/2,canvas.height/2),
        0,
        2 * Math.PI,
        "#ffffff",
        ctx.globalAlpha = .5,
    );
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

  pieChart({ 
    canvas: document.getElementById("myCanvas"),
    data: amountUsedData,
    colors: colorArray,
    doughnutHoleSize:0.5,
    doughnutHoleSize2: 0.4
  });
};

const updateBudget = () => {
  const modal = document.querySelector('.dark-overlay');
  const lineItemBudget = document.querySelector(`#${editId} > .color`);
  const lineItemSpent = document.querySelector(`#${editId} > .push`);
  const updatedBudget = document.querySelector('#budgetAmount');
  const totalElement = document.querySelector('#totalBudgetAvailable');
  preventDefault();
  // pull down local storage object
  const database = JSON.parse(window.localStorage.getItem("listofCategory"));
  // find the object in the array that has the class that matches the id param
  const match = database.findIndex(item => item.class === editId);
  // update object
  database[match].budget = parseInt(updatedBudget.value, 10);
  // update line item in html
  lineItemBudget.innerHTML = `$${parseInt(updatedBudget.value, 10).toFixed(2)}`;
  // update total in html
  let total = 0;
  for (let i = 0; i < database.length; i++) {
    total += (database[i].budget - database[i].used);
  }
  if (total > 0) {
    totalElement.innerHTML = `$${parseInt(total, 10).toFixed(2)}`;
  } else {
    totalElement.innerHTML = '$0.00';
  }
  
  // change color if necessary
  if (database[match].budget < database[match].used) {
    lineItemBudget.style.color = 'red';
    lineItemSpent.style.color = 'red';
  } else {
    lineItemBudget.style.color = '#999';
    lineItemSpent.style.color = 'gray';
  }
  // push local storage back up
  window.localStorage.setItem("listofCategory", JSON.stringify(database));
  // close modal
  modal.style.display = 'none';
}
