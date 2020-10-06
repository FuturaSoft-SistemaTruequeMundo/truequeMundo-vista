let dataLogin;

const btnLogin = document.getElementById('btnSubmitLogin');

btnLogin.addEventListener('click', submitDataLogin);

async function submitDataLogin(){
    let email = document.getElementById('frmEmailLogin');
    let password = document.getElementById('frmPasswordLogin');

    let validation = validateFields(email.value, password.value);

    if(validation == 'ok'){
        let url = 'https://truequeprueba.herokuapp.com/login';

        const dataDetails = {
            method: 'POST',
            body: JSON.stringify({
            "user": email.value,
            "pass": password.value
            }),
            headers:{
                'Content-Type': 'application/json',
            }
            };     

        const response = await fetch(url, dataDetails);
        
        const data = await response.json();
        
        messageToUserLogin(data);
    }
    else{
        alert('Please fill all blank spaces');
    }
}

function validateFields(email, pass){
    if(email=='' || pass=='')
        return 'error';
    else
        return 'ok';
}

function messageToUserLogin(data){
    let aviso = document.getElementById('pAviso');
    if(data.message == 'Validado'){
        // alert("Acceso correcto");
        aviso.style.color = 'green';
        aviso.innerHTML = 'Correct password</br>Redirecting...';
        setTimeout(10000);
        window.location.href = "./html/principal.html"+"?"+"email="+data.email+"&"+"name="+data.nombre;
    }
    else{
        // alert("Acceso incorrecto");
        aviso.style.color = 'red';
        aviso.innerHTML = 'Incorrect password';
    }
}