//START Obtain values email and name
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let values = {};

for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    values[tmparr[0]] = tmparr[1];
}

const dataEmail = values['email'];
let dataName = values['name'].split ("%20");
dataName = dataName[0];
//END Obtain values

const ddUsername = document.getElementById('userDropdown');

ddUsername.innerHTML = `${dataName} <i class="fas fa-user-circle"></i>`;

let dataUserLogged = {
    'id': '',
    'lName': '',
    'cellular': '',
    'city': '',
    'code': '',
    'creationUser': '',
    'address': '',
    'email': '',
    'state': '',
    'dateBirth': '',
    'fName': '',
    'country': '',
    'password': '',
    'sex': '',
    'phone': '',
    'lastLogin': ''
}

const dataDetails = {
    method: 'POST',
    body: JSON.stringify({
    "email": dataEmail
    }),
    headers:{
        'Content-Type': 'application/json',
    }
    };     

fetch('https://truequeprueba.herokuapp.com/events/buscar_usuario', dataDetails)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    //console.log(myJson);
    dataUserLogged.id = myJson._id,
    dataUserLogged.fName = myJson.nombre;
    dataUserLogged.lName = myJson.apellido;
    dataUserLogged.email = myJson.email;
    dataUserLogged.password = myJson.password;
    dataUserLogged.phone = myJson.telefono;
    dataUserLogged.cellular = myJson.celular;
    dataUserLogged.dateBirth = myJson.fechaNacimiento;
    dataUserLogged.country = myJson.pais;
    dataUserLogged.city = myJson.ciudad;
    dataUserLogged.code = myJson.codigo;
    dataUserLogged.creationUser = myJson.creacionUsuario;
    dataUserLogged.state = myJson.estado;
    dataUserLogged.sex = myJson.sexo;
    dataUserLogged.lastLogin = myJson.ultimoLogin;

    loadNotifications();

    searcherGetPrincipalFirst();
  })
  .catch(function(error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  });

const cantItems = 15;
let cont = 0;
let HTMLString = [];
let cTot = 0;
let cPar = 0;
