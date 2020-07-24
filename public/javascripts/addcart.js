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
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
       
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((response) => response.json()); // parses response to JSON
  }

window.addEventListener('load', async () => {

console.log('loaded');

});

// let product = undefined;
const handleDeleteClick = async (event) => {
   
   
    try {
       
    let item = event.originalTarget.offsetParent.id.substr(1);
    console.log('item' ,item);
    let data = await fetch_post("/shopping",{order:item});
     console.log('data' ,data);
    } catch (e) {
      console.log(e);
    }
  };
    
