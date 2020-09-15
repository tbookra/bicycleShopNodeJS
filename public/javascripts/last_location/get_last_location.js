window.addEventListener("load", async () => {
  try {
    const last_location = document.getElementById("last_location");
    let user = await fetch_get("/getUsers");
   
    let lastItem = localStorage.getItem(user.email); // this is the item_id
    lastItem = await fetch_post("/getCategoryItems/get_item_by_id", {item_id: lastItem });
    let str = "";
    let lastItem_length = lastItem.length;
    for (let i = 0; i < lastItem_length; i++) {
      str += `
            <div class="col mb-4">
        <div class="card h-100">
        <p class="card-text hebrew" >האם אתה עדיין מעוניין לקנות את זה?</p>
          <img src="${lastItem[i].img_url}" class="card-img-top" alt="item">
          <div class="card-body">
            <h5 class="card-title">${lastItem[i].item_name}</h5>
            <p class="card-text">price: ${lastItem[i].unit_price}$</p>
            <p class="card-text"><a href="/${lastItem[i].category}/${lastItem[i].item_id}">Buy now </a></p>
          </div>
        </div>
      </div>
            `;
    }
    last_location.innerHTML = str;
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
