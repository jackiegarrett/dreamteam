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

window.onload = () => {
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
var myVinyls = {
  "transport": 20,
  "Groceries": 20,
  "Bills": 20,
  "Entertainment": 20,
  "Food": 20,
};
let balanceArray = {
  "groceries": [
    {
      amount: '50'
    },
    {
      amount: '5'
    },
    {
      amount: '50'
    }
  ],
  "bills": [
    {
      amount: '50'
    },
    {
      amount: '5'
    },
  ]
}
// groceries budget = 200 - 105 = 95
// bills budget = 100 - 55 =
const pieChart = (options) => {
  let canvas = options.canvas;
  let ctx = canvas.getContext("2d");
  let colors = options.colors;
  console.log('canvas', canvas.width / 2)
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
  pieChart({
    canvas: document.getElementById("myCanvas"),
    data: myVinyls,
    colors: ["#ff0000","#fde23e", "#f16e23", "#57d9ff", "#937e88"],
  });
};
}


expandListButton.addEventListener("click", unfoldMoreCategoriesForm);

// Overlay/Modal hidden until list item is clicked
document.querySelectorAll('.category').addEventListener('click', function() {
  document.querySelector('.dark-overlay').style.display = 'block';
});


// Cancel dismisses Overlay/Modal
document.querySelector('#remove-button-cancel').addEventListener('click', function() {
  document.querySelector('.dark-overlay').style.display = 'none';
});


// When list item is clicked,

//On submit, category and weekly budget get input get logged to dashboard && icon gets added to the top list in a new row above the button to be viewed on default during next  || OR on submit, transaction amount spent gets logged to appropriate pre-existing category on dashboard