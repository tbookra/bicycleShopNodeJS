window.addEventListener('load', async () => {
    let itemSearchInp = document.getElementById('itemSearchInp');
    let main = document.getElementById('main');
    let autoCompList = document.getElementById('autoCompList');
    let items = await fetch_get("/getItems");
    let itemsArr = items[0];

itemSearchInp.addEventListener('input', async (e) =>{
    try{
        let filtered_item_arr = await itemsArr.filter(item=>item.item_name.startsWith(e.target.value));
        let l1 = filtered_item_arr.length;
        let str = "";
        if(l1>0){
            for (let i =0; i < l1; i++){
                str += `
                <div>${filtered_item_arr[i].item_name}</div>
                <div class="card bg-dark text-white">
        <img src="${filtered_item_arr[i].img_url}" class="card-img" alt="item">
        <div class="card-img-overlay">
            <h5 class="card-title">${filtered_item_arr[i].item_name}</h5>
            <p class="card-text"><${filtered_item_arr[i].unit_price}</p>
            <p class="card-text"><a href="/${filtered_item_arr[i].category}/${filtered_item_arr[i].item_id}">Buy now </a></p>
        </div>
    </div>
                `
            main.innerHTML = str;
            };
        
        }
        if(itemSearchInp.value.length>0){
                // the auto complete code
                let matches = itemsArr.filter(state => {
                    const regex = new RegExp(`^${itemSearchInp.value}`, 'gi');
                    return state.item_name.match(regex);
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