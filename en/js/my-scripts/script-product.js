const loadMyProducts = document.getElementById('btnLoadMyProducts');

loadMyProducts.addEventListener('click', loadUserProducts);

async function loadUserProducts(){
    const urlBase = 'https://truequeprueba.herokuapp.com/';
    const url = urlBase + 'events/buscar_productoUsuario';
    const HTMLmyProducts = document.getElementById('modalBodyProducts');
    let HTMLString = '';
    HTMLmyProducts.innerHTML = HTMLString;
    let cont = 0;

    const dataDetails = {
        method: 'POST',
        body: JSON.stringify({
        "email": dataUserLogged.email,
        "nombreProducto": "",
        "tipo": "",
        "categoria": "",
        "estado": ""
        }),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    console.log(dataDetails);

    const response = await fetch(url, dataDetails);
    console.log(response);
    const data = await response.json();
    console.log(data);

    function itemTemplate(it){
        const urlFotos = 'https://truequeprueba.herokuapp.com/Public/uploads/';
        cont++;
        return (`<article class="card">
        <div class="card-body">
            <h5 class="card-title">${it.nombreProducto}</h5>
            <p class="card-text" style="height: 100px;">${it.descripcion}</p>
            <img src="${urlFotos}${it.fotos[0]}" alt="" class="mb-3" width=50>
            <div class="d-flex flex-row justify-content-center mb-3">
                <a href="" class="btn btn-info mr-1 btn-contact">Editar</a>
                <a href="" target="_blank" class="btn btn-success ml-1 btn-contact">Save</a>
            </div>
        </div>
    </article>`)
    }

    data.forEach((item) => {
        HTMLString = itemTemplate(item);
        HTMLmyProducts.innerHTML = HTMLmyProducts.innerHTML + HTMLString;
    })
}