window.addEventListener("load", async () => {
  let item_id = document.getElementById("item_id");
  let user = await fetch_get("/getUsers");
  localStorage.setItem(user.email, item_id.innerText);
});

function fetch_get(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      // console.log(err)
      throw err;
    });
}
