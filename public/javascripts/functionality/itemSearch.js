window.addEventListener('load', async () => {
    const itemSearchInp = document.getElementById('itemSearchInp');
    const main = document.getElementById('main');
    const autoCompList = document.getElementById('autoCompList');
    const searchContent = document.getElementById('searchContent');
    let items = await fetch_get("/getCategoryItems/getall");
    let itemsArr = items[0];
    searchContent.hidden = true;
    main.hidden = false;

itemSearchInp.addEventListener('input', async (e) =>{
    try{
        let items2 = await fetch_post("/getCategoryItems/getall",{
            str: e.target.value,
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
                searchContent.innerHTML =` 
            <div class="row row-cols-1 row-cols-md-3">
            ${str}
            </div>`
            };
        
        }
        if(itemSearchInp.value.length>0){
            searchContent.hidden = false;
            main.hidden = true;
                // the auto complete code
                let matches = itemsArr.filter(state => {
                    const regex = new RegExp(`^${itemSearchInp.value}`, 'gi');
                    return state.item_name.match(regex);
                });
                if(matches){
                    outputHTML(matches);
                };
               
        }
        else {
            searchContent.hidden = true;
            main.hidden = false;
            matches = undefined;
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