window.addEventListener("load", async () => {
  const itemSearchInp = document.getElementById("itemSearchInp");
  const main = document.getElementById("main");
  const autoCompList = document.getElementById("autoCompList");
  const pageUpBtn = document.getElementById("pageUpBtn");
  const pageDownBtn = document.getElementById("pageDownBtn");
  const pagesShowUp = document.getElementById("pagesShowUp");

  const LIMIT = 9;
  let sort = "asc";
  let stingDiv = "";

  main.hidden = false;
  pagesShowUp.hidden = true;
  autoCompList.hidden = true;

  sortBtn.onclick = async (e) => {
    main.hidden = true;
    pagesShowUp.hidden = false;
    autoCompList.hidden = false;
    if (sort === "asc") {
      sort = "desc";
    } else {
      sort = "asc";
    }
    stingDiv = "";
    let sortedArr = await fetch_post("/getCategoryItems/getsort", {
      category: "child",
      sort: sort,
    });
    sortedArr = sortedArr[0];
    console.log("sortedArr", sortedArr);
    let l1 = sortedArr.length;
    for (let i = 0; i < l1; i++) {
      stingDiv += `
            <div class="col mb-4">
            <div class="card h-100">
              <img src="${sortedArr[i].img_url}" class="card-img-top" alt="item">
              <div class="card-body">
                <h5 class="card-title">${sortedArr[i].item_name}</h5>
                <p class="card-text">price: ${sortedArr[i].unit_price}$</p>
                <p class="card-text"><a href="/${sortedArr[i].category}/${sortedArr[i].item_id}">Buy now </a></p>
              </div>
            </div>
          </div>
            `;
    }
    pagesShowUp.innerHTML = stingDiv;
    //  location.href = 'http://localhost:3029/child';
  };

  try {
    let items = await fetch_get("/getCategoryItems/getchild");
    let itemsArr = items[0];
    let category_length = itemsArr.length;

    itemSearchInp.addEventListener("input", async (e) => {
      try {
        // items show up on search input
        let items2 = await fetch_post("/getCategoryItems", {
          str: e.target.value,
          category: "child",
        });
        let search_length = items2.length;
        console.log("category_length", category_length);
        console.log("search_length", search_length);
        console.log("e.target.value", e.target.value);
        if (e.target.value) {
          main.hidden = true;
          pagesShowUp.hidden = false;
          autoCompList.hidden = false;
        } else {
          console.log("null");
          items2 = await fetch_post("/child", {
            limit: LIMIT,
            offset: offset,
            sort: sort,
          });
        }
        let l2 = items2.length;
        console.log("l2", l2);
        let str = "";

        for (let i = 0; i < l2; i++) {
          str += `
                    <div class="col mb-4">
                <div class="card h-100">
                  <img src="${items2[i].img_url}" class="card-img-top" alt="item">
                  <div class="card-body">
                    <h5 class="card-title">${items2[i].item_name}</h5>
                    <p class="card-text">price: ${items2[i].unit_price}$</p>
                    <p class="card-text"><a href="/${items2[i].category}/${items2[i].item_id}">Buy now </a></p>
                  </div>
                </div>
              </div>
                    `;
        }
        main.innerHTML = str;

        if (l2 > 0) {
          main.hidden = false;
          pagesShowUp.hidden = true;
          autoCompList.hidden = false;

          let matches;
          if (category_length == search_length) {
            matches = 0;
          } else {
            matches = items2;
          }

          outputHTML(matches);
        } else {
          matches = [];
          autoCompList.innerHTML = "";
        }

        // the auto complete code
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }

  let offset = 0;

  pageUpBtn.onclick = async (event) => {
    let items = await fetch_get("/getCategoryItems/getchild");
    items = items[0];

    main.hidden = true;
    pagesShowUp.hidden = false;
    autoCompList.hidden = false;
    stingDiv = "";

    if (offset + LIMIT > items.length) {
      offset = offset + 0;
    } else {
      offset = offset + LIMIT;
    }

    console.log(offset, LIMIT);
    let itemsArr = await fetch_post("/child", {
      limit: LIMIT,
      offset: offset,
      sort: sort,
    });
    let itemsCount = itemsArr.length;
    for (let i = 0; i < itemsCount; i++) {
      stingDiv += `
    <div class="col mb-4">
    <div class="card h-100">
      <img src="${itemsArr[i].img_url}" class="card-img-top" alt="item">
      <div class="card-body">
        <h5 class="card-title">${itemsArr[i].item_name}</h5>
        <p class="card-text">price: ${itemsArr[i].unit_price}$</p>
        <p class="card-text"><a href="/${itemsArr[i].category}/${itemsArr[i].item_id}">Buy now </a></p>
      </div>
    </div>
  </div>
    `;
      pagesShowUp.innerHTML = stingDiv;
    }
  };

  pageDownBtn.onclick = async (event) => {
    if (offset == 0) {
      console.log("cannot go down here");
    } else {
      main.hidden = true;
      pagesShowUp.hidden = false;
      autoCompList.hidden = false;

      stingDiv = "";

      offset = offset - LIMIT;
      let itemsArr = await fetch_post("/child", {
        limit: LIMIT,
        offset: offset,
        sort: sort,
      });
      let itemsCount = itemsArr.length;
      for (let i = 0; i < itemsCount; i++) {
        stingDiv += `
            <div class="col mb-4">
            <div class="card h-100">
              <img src="${itemsArr[i].img_url}" class="card-img-top" alt="item">
              <div class="card-body">
                <h5 class="card-title">${itemsArr[i].item_name}</h5>
                <p class="card-text">price: ${itemsArr[i].unit_price}$</p>
                <p class="card-text"><a href="/${itemsArr[i].category}/${itemsArr[i].item_id}">Buy now </a></p>
              </div>
            </div>
          </div>
            `;
        pagesShowUp.innerHTML = stingDiv;
      }
    }
  };
});

const outputHTML = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
        <h4><a href="/${match.category}/${match.item_id}">${match.item_name} </a><span
        class="text-secondary">${match.category}</span></h4>
        <small>price: ${match.unit_price}</small></div>
        `
      )
      .join("");
    autoCompList.innerHTML = html;
  } else {
    autoCompList.innerHTML = "";
  }
};

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
