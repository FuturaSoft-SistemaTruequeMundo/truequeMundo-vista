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
            <img src="${urlFotos}${it.fotos[0]}" alt="" class="mb-3 text-center" width=100 height=100>
            <p class="card-text ${colorState} state-text">${it.estado}</p>
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
