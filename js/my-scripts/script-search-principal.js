const cantItems = 15;
let cont = 0;
let HTMLString = [];
let cTot = 0;
let cPar = 0;

const searcher = document.getElementById('btnSearcher');
searcher.addEventListener('click', searcherGetPrincipal);

const txtEnter = document.getElementById('txtSearcher');
const countryEnter = document.getElementById('countrySearcher');
const cityEnter = document.getElementById('citySearcher');

txtEnter.addEventListener('keyup', validarEnter);
countryEnter.addEventListener('keyup', validarEnter);
cityEnter.addEventListener('keyup', validarEnter);

function validarEnter(event){
    if (event.keyCode === 13)
        searcherGetPrincipal();
}

function searcherGetPrincipal(){
    searcherGet(document.getElementById('txtSearcher').value, document.getElementById('countrySearcher').value, document.getElementById('citySearcher').value, 'RESULTADOS');
}

async function searcherGet(texto, country, city, titleText){
    document.getElementById('titlePrincipal').innerHTML = titleText;

    let sectPrincipal = document.getElementById('sectionPrincipal');
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
        "pais": country,
        "ciudad": city,
        "nombreProducto": texto
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

        return (`<article class="card">
        <div class="card-body">
            <h5 class="card-title">${it.nombreProducto}</h5>
            <p class="card-text" style="height: 80px;">${it.descripcion}</p>
            <p class="card-text ${colorState} state-text">${it.estado}</p>
            <div class="d-flex flex-row justify-content-center mb-3">
                <button href="#modalProduct${cont}" ${statusProduct} class="btn btn-primary btn-bkg" data-toggle="modal" onclick="updateViews(${it.visitas})">Truequear</button>
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
                            <!-- <div><h3 class="text-primary">Contactar</h3></div> -->
                            <div class="anchor d-flex flex-row justify-content-center">
                                <a href="mailto:${it.email}" class="btn btn-info mr-1 btn-contact"><i class="far fa-envelope"></i> Email</a>
                                <a href="https://wa.me/51${it.celular}?text=Me%20gustar%C3%ADa%20obtener%20tu%20servicio%20o%20producto" target="_blank" class="btn btn-success ml-1 btn-contact"><i class="fab fa-whatsapp"></i> Whatsapp</a>        
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
}

const btnMore = document.getElementById('btnWatchMore');

btnMore.addEventListener('click', loadMoreProducts);

function loadMoreProducts(){
    const sectPrincipal = document.getElementById('sectionPrincipal');
    let i=0;

    if(cTot - 1 == cPar)
        cTot--;

    if(cPar == cTot){
        alert("No more items!!!");
        cont = 0;
        HTMLString = [];
        cTot = 0;
        cPar = 0;
    }   
    else{
        while(cPar<cTot){
            if(i<cantItems){
                sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString[cPar];
                i++;
                cPar++;
            }
        }
    }
}

searcherGetPrincipalFirst();