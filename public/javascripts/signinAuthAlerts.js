window.addEventListener('load', () =>{
    console.log('I am talking to you too!!');

const good = new RegExp("^[a-zA-Z0-9]{8,30}$");
const goodE = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const newusername = document.getElementById('newusername');
const newpassword = document.getElementById('newpassword');
const clientErr = document.getElementById('clientErr');


newusername.addEventListener('change', e => {
    if(newusername.value.match(goodE)) {
        newusername.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        newusername.style.backgroundColor = '#eb0325';
        clientErr.innerHTML= 'Invalid Email!!! Please try again';
    }
});

newpassword.addEventListener('change', e => {
    if(newpassword.value.match(good)){
        newpassword.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        newpassword.style.backgroundColor = '#eb0325';
        clientErr.innerHTML = 'Invalid password!!! A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter!'
    }
});
})