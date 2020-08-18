window.addEventListener("load", () => {
  console.log("I am talking to you too!!");

  const good = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,30})$/
  );
  const goodE = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const clientErr = document.getElementById("clientErr");

  email.addEventListener("change", (e) => {
    if (email.value.match(goodE)) {
      email.style.backgroundColor = "#1ecc71";
      clientErr.innerHTML = "";
    } else {
      email.style.backgroundColor = "#eb0325";
      clientErr.innerHTML = "Invalid Email!!! Please try again";
    }
  });

  password.addEventListener("change", (e) => {
    if (password.value.length > 4) {
      // if(password.value.match(good)){
      password.style.backgroundColor = "#1ecc71";
      clientErr.innerHTML = "";
    } else {
      password.style.backgroundColor = "#eb0325";
      clientErr.innerHTML =
        "Invalid password!!! A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter!";
    }
  });
});
