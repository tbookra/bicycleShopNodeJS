window.addEventListener('load', () =>{
    console.log('I am talking to update file now!!');

const good = new RegExp("^[a-zA-Z0-9]{8,30}$");
const goodE = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const nus = document.getElementById('nus');
const nps = document.getElementById('nps');
const clientErr = document.getElementById('clientErr');


nus.addEventListener('change', e => {
    if(nus.value.match(goodE)) {
        nus.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        nus.style.backgroundColor = '#eb0325';
        clientErr.innerHTML= 'Invalid Email!!! Please try again';
    }
});

nps.addEventListener('change', e => {
    if(nps.value.match(good)){
        nps.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        nps.style.backgroundColor = '#eb0325';
        clientErr.innerHTML = 'Invalid password!!! A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter!'
    }
});
})