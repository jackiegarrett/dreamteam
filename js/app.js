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

const unfoldMoreCategories = () => {
  event.preventDefault();
  let expandListButton = document.querySelector("button")
  expandListButton.addEventListener("click", function(event){
    //first click 
  });
}
