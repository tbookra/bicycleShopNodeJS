window.addEventListener('load', async () => {
    const itemSearchInp = document.getElementById('itemSearchInp');
    const main = document.getElementById('main');
    const autoCompList = document.getElementById('autoCompList');
    const pageUpBtn = document.getElementById('pageUpBtn');
    const pageDownBtn = document.getElementById('pageDownBtn');
    const pagesShowUp = document.getElementById('pagesShowUp');

    const LIMIT = 9;
    let sort = 'asc';

    main.hidden = false;
    pagesShowUp.hidden = true;
    autoCompList.hidden = true;

    sortBtn.onclick = (e) =>{
        if(sort === 'asc'){
            sort = 'desc';
        } else {
            sort = 'asc'
        }
        console.log(sort)
       }

    try{

        let items = await fetch_get("/getCategoryItems/getchild");
        let itemsArr = items[0];
        let items2
    
itemSearchInp.addEventListener('input', async (e) =>{
    try{ // items show up on search input

        if(e.target.value){
            main.hidden = true;
            pagesShowUp.hidden = false;
            autoCompList.hidden = false;

                items2 = await fetch_post("/getCategoryItems",{
                str:e.target.value,
                category:'child'
            })
        } else {
                console.log('null');
                items2 = await fetch_post('/child',{
                    limit: LIMIT,
                    offset: offset,
                    sort:sort
                });
            };
            let l2 = items2.length;
            let str = "";
            if(l2>0){
                for (let i =0; i < l2; i++){ 
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
                    `
                main.innerHTML = str;
                }
        }
         // the auto complete code
        if(itemSearchInp.value.length>0){
            main.hidden = false;
            pagesShowUp.hidden = true;
            autoCompList.hidden = false;

            let matches = itemsArr.filter(item => {
                const regex = new RegExp(`^${itemSearchInp.value}`, 'gi');
                return item.item_name.match(regex);
            });
            outputHTML(matches);
    }
    else {
        matches = [];
        autoCompList.innerHTML = '';
    }
  
    } catch(e){
        console.log(e)
    }
   
})
}catch(e){
    console.log(e)
};

let offset = 0;
let stingDiv = '';

pageUpBtn.onclick = async (event) => {

main.hidden = true;
pagesShowUp.hidden = false;
autoCompList.hidden = false;
stingDiv = '';

offset = offset + LIMIT;
console.log(offset ,LIMIT);
let itemsArr = await fetch_post('/child',{
    limit: LIMIT,
    offset: offset,
    sort:sort
});
let itemsCount = itemsArr.length;
for (let i = 0; i < itemsCount; i++){
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
     if(offset == 0){
        console.log('cannot go down here');
    } else {
        main.hidden = true;
        pagesShowUp.hidden = false;
        autoCompList.hidden = false;

        stingDiv = '';
        offset = offset - LIMIT;
        let itemsArr = await fetch_post('/child',{
            limit: LIMIT,
            offset: offset,
            sort:sort
        });
        let itemsCount = itemsArr.length;
        for (let i = 0; i < itemsCount; i++){
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
}
});

const outputHTML = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
        <h4>${match.item_name} <span
        class="text-primary">${match.category}</span></h4>
        <small>price: ${match.unit_price}</small></div>
        `).join('');
        autoCompList.innerHTML = html;
    }
}

function fetch_get(url) {
    return fetch(url).then(
        response => response.json()
    ).catch(err => {
        // console.log(err)
        throw err
    })
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
        .then(response => response.json()) 
        .catch(err => {
            throw err
        });
}