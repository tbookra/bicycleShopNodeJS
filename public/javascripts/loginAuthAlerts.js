window.addEventListener('load', () =>{
    console.log('I am talking to you!!');

const good = new RegExp("^[a-zA-Z0-9]{8,30}$");
const goodE = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const username = document.getElementById('username');
const password = document.getElementById('password');
const clientErr = document.getElementById('clientErr');


username.addEventListener('change', e => {
    if(username.value.match(goodE)) {
        username.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        username.style.backgroundColor = '#eb0325';
        clientErr.innerHTML= 'Invalid Email!!! Please try again';
    }
});

password.addEventListener('change', e => {
    if(password.value.match(good)){
        password.style.backgroundColor = '#1ecc71';
        clientErr.innerHTML = ''
    } else {
        password.style.backgroundColor = '#eb0325';
        clientErr.innerHTML = 'Invalid password!!! A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter!'
    }
});
})