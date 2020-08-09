window.addEventListener('load', () =>{
  console.log('loaded', token)
})

function fetch_post(url = ``, data = {}, token_id = "") {
    console.log("tokenHddr", token_id);
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        token: token,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((response) => response.json()); // parses response to JSON
  }
  

  
//   const handleClick = async (event) => {
//     try {
//       token = await fetch_post("/auth");
//       token = token.token;
//       console.log(token);
//     } catch (e) {
//       console.log(e);
//     }
//   };
  
//   const handleClick1 = async (event) => {
//     try {
//       let req = { token: token };
//       let data = await fetch_post("/users", req);
//       console.log(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
  
  const fetchToken = async (url, {}, token) => {
    try {
      let req = { token: token };
      let data = await fetch_post(url, {}, token);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

