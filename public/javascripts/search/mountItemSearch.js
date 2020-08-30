window.addEventListener('load', async () => {
    let itemSearchInp = document.getElementById('itemSearchInp');
    let main = document.getElementById('main');
    let autoCompList = document.getElementById('autoCompList');
    let items = await fetch_get("/getCategoryItems/getmountain");
    let itemsArr = items[0];

itemSearchInp.addEventListener('input', async (e) =>{
    try{
        let items2 = await fetch_post("/getCategoryItems",{
            str:e.target.value,
            category:'mountain'
        });
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
        if(itemSearchInp.value.length>0){
            // the auto complete code
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