// const cantItems = 15;
// let cont = 0;
// let HTMLString = [];
// let cTot = 0;
// let cPar = 0;

const searcherMed = document.getElementById('btnSearcherMed');

searcherMed.addEventListener('click', searcherGetMed);

async function searcherGetMed(){
    document.getElementById('titlePrincipal').innerHTML = "RESULTS"

    const texto = document.getElementById('txtSearcherMed');
    const country = document.getElementById('countrySearcherMed');
    const city = document.getElementById('citySearcherMed');
    const sectPrincipal = document.getElementById('sectionPrincipal');
    sectPrincipal.innerHTML = "";
    cont = 0;
    cTot = 0, cPar=0;
    HTMLString = [];

    let colorState = '';
    let statusProduct = '';

    const urlBase = 'https://truequeprueba.herokuapp.com/';
    const url = urlBase + 'events/all';
    
    const dataDetails = {
        method: 'POST',
        body: JSON.stringify({
        "pais": country.value,
        "ciudad": city.value,
        "nombreProducto": texto.value
        }),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    const response = await fetch(url, dataDetails);
    const data = await response.json();

    data.forEach((item) => {
        HTMLString[cTot] = itemTemplate(item);
        if(cTot<cantItems){
            sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString[cTot];
            cPar = cTot;
        }
        
        cTot++;
    })

    function itemTemplate(it){
        const urlFotos = 'https://truequeprueba.herokuapp.com/Public/uploads/';
        cont++;

        if(it.estado == 'disponible'){
            colorState = 'text-success';
            statusProduct = '';
        }
        else{
            if(it.estado == 'truequeado'){
                colorState = 'text-danger';
                statusProduct = "disabled = 'true'";
            }
        }

        let likes = "0"; //it.visitas
        likes = parseInt(likes);

        return (`<article class="card">
        <div class="card-body">
            <h5 class="card-title">${it.nombreProducto}</h5>
            <p class="card-text" style="height: 80px;">${it.descripcion}</p>
            <p class="card-text ${colorState} state-text">${it.estado}</p>
            <div class="d-flex flex-row justify-content-center mb-3">
                <button href="#modalProduct${cont}" ${statusProduct} class="btn btn-primary btn-bkg" data-toggle="modal" onclick="updateViews(${likes})">Contact to truequer</button>
                <!--START modalProduct-->
                <div class="modal fade" tabindex="-1" role="dialog" id="modalProduct${cont}">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">${it.nombreProducto}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body d-flex flex-column align-items-center">
                            <img src="${urlFotos}${it.fotos[0]}" alt="" class="mb-3" width=300 height=300>
                            <p>${it.descripcion}</p>
                        </div>
                        <div class="modal-footer">
                            <!-- <div><h3 class="text-primary">Contact</h3></div> -->
                            <div class="anchor d-flex flex-row justify-content-center">
                                <a href="mailto:${it.email}" class="btn btn-info mr-1 btn-contact">Email</a>
                                <a href="https://wa.me/51${it.celular}?text=Me%20gustar%C3%ADa%20obtener%20tu%20servicio%20o%20producto" target="_blank" class="btn btn-success ml-1 btn-contact">Whatsapp</a>        
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <!--modalProduct-->
            </div>
        </div>
    </article>`)
    }

    document.getElementById('btnWatchMore').style.display = 'flex';
    document.getElementById('btnWatchMoreOnly').style.display = 'none';
    document.getElementById('btnAddProduct').style.display = 'none';

    function updateViews(xLikes){
        let x2Likes = parseInt(xLikes);
    
        console.log("antes" + x2Likes);
    
        x2Likes = x2Likes + 1;
    
        console.log("despues" + x2Likes);
    
            const dataDetails = {
                method: 'POST',
                body: JSON.stringify({
                "email": dataUserLogged.email,
                "codigo": it.codigo,
                "nombre": it.nombre,
                "tipo": it.tipo,
                "categoria": it.categoria,
                "condicion": it.condicion,
                "estado": it.estado,
                "descripcion": it.descripcion,
                "visitas": it.visitas,
                "file": []
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
                };     

            fetch('https://truequeprueba.herokuapp.com/events/update_producto', dataDetails)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console(data);
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }
}

const btnMoreMed = document.getElementById('btnWatchMore');

btnMoreMed.addEventListener('click', loadMoreProductsMed);

function loadMoreProductsMed(){
    const sectPrincipal = document.getElementById('sectionPrincipal');
    let i=0;

    if(cTot - 1 == cPar)
        cTot--;

    if(cPar == cTot){
        // alert("No more items!!!");
        cont = 0;
        HTMLString = [];
        cTot = 0;
        cPar = 0;
    }   
    else{
        while(cPar<cTot){
            if(i<cantItems){
                sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString[cPar+i];
                i++;
                cPar++;
            }
        }
    }
}

