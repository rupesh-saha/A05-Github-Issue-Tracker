document.getElementById("sign-btn")
  .addEventListener("click", ()=>{
    const usernameInput = document.getElementById("username-input");
    const userVal = usernameInput.value;
    console.log(userVal);

    const passwordInput = document.getElementById("password-input");
    const passVal = passwordInput.value;
    console.log(passVal);

    if ( userVal === "admin" && passVal === "admin123" ) {
      alert("Login Success");
      window.location.assign("./home.html");
    }
    else {
      alert("Wrong Credentials");
    }
   
})