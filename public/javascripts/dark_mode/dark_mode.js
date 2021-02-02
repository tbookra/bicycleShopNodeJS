window.addEventListener("load", async () => {
  try {
    const dark_mode_btn = document.getElementById("dark_mode_btn");
    const bright_mode_btn = document.getElementById("bright_mode_btn");

    let dark_mode_clicked;
    let user = await fetch_get("/getUsers/with_anonumus");
    // if just loggged in
    if (user == "anonumus") {
      localStorage.removeItem("mode_user");
      // if(localStorage.getItem('mode')){
      dark_mode_clicked = localStorage.getItem("mode");
      // }
    } else {
      // there is a user
      dark_mode_clicked = localStorage.getItem("mode_user");
    }

    if (dark_mode_clicked) {
      if (dark_mode_clicked == "dark") {
        document.documentElement.setAttribute("mode-theme", "dark");
      } else {
        if (dark_mode_clicked == "bright") {
          document.documentElement.setAttribute("mode-theme", "light");
        }
      }
    } else {
      if (user.dark_mode) {
        document.documentElement.setAttribute("mode-theme", "dark");
      } else {
        document.documentElement.setAttribute("mode-theme", "light");
      }
    }

    dark_mode_btn.addEventListener("click", () => {
      console.log("dark clicked");
      if (user == "anonumus") {
        localStorage.setItem("mode", "dark");
      } else {
        localStorage.setItem("mode_user", "dark");
      }
      document.documentElement.setAttribute("mode-theme", "dark");
    });

    bright_mode_btn.addEventListener("click", () => {
      console.log("bright clicked");
      if (user == "anonumus") {
        localStorage.setItem("mode", "light");
      } else {
        localStorage.setItem("mode_user", "light");
      }
      document.documentElement.setAttribute("mode-theme", "light");
    });
  } catch (e) {
    console.log(e);
  }
});

function fetch_get(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      // console.log(err)
      throw err;
    });
}
function fetch_post(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
}
