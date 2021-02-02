window.addEventListener("load", () => {
  const good = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,30})$/
  );
  const password = document.getElementById("password");
  const clientErr = document.getElementById("clientErr");

  password.addEventListener("change", (e) => {
    if (password.value.match(good)) {
      password.style.backgroundColor = "#1ecc71";
      clientErr.innerHTML = "";
    } else {
      password.style.backgroundColor = "#eb0325";
      clientErr.innerHTML =
        "Invalid password!!! A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter!";
    }
  });
});
