const myProducts = document.getElementById('btnMyProducts');

myProducts.addEventListener('click', myProductsGet);

async function myProductsGet(){
    document.getElementById('btnWatchMore').style.display = 'none';
    document.getElementById('btnWatchMoreOnly').style.display = 'none';
    document.getElementById('btnAddProduct').style.display = 'flex';
    document.getElementById('btnAddService').style.display = 'flex';
    document.getElementById('titlePrincipal').innerHTML = "MY PRODUCTS"

    const sectPrincipal = document.getElementById('sectionPrincipal');
    sectPrincipal.innerHTML = "";
    let c = 0;

    const urlBase = 'https://truequeprueba.herokuapp.com/';
    const url = urlBase + 'events/buscar_productoUsuario';
    
    const dataDetails = {
        method: 'POST',
        body: JSON.stringify({
        "email": dataUserLogged.email,
        "fk_usuario": dataUserLogged.email,
        "nombreProducto": "",
        "tipo": "",
        "categoria": "",
        "estado": ""
        }),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    const response = await fetch(url, dataDetails);
    const data = await response.json();

    if(data.length == 0)
        alert("You don't have any products yet");
    else{
        data.forEach((item) => {
            HTMLString = itemTemplate(item);
            sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString;
        })

        function itemTemplate(it){
            const urlFotos = 'https://truequeprueba.herokuapp.com/Public/uploads/';
            c++;
            let selDisp = '';
            let selTrue = '';

            if(it.estado == 'disponible'){
                selDisp = 'selected';
            }
            else{
                selTrue = 'selected';
            }
            
            return (`<article class="card">
            <div class="card-body">
                <h5 class="card-title">${it.nombreProducto}</h5>
                <p class="card-text" style="height: 100px;">${it.descripcion}</p>
                <div class="d-flex justify-content-center">
                    <img src="${urlFotos}${it.fotos[0]}" alt="" class="mb-3" height=100 width=100>
                </div>
                <div class="d-flex flex-row justify-content-center mb-3">
                    <a href="#modalProduct${c}" class="btn btn-primary btn-bkg" data-toggle="modal">Edit product</a>
                    <!--START modalProduct-->
                    <div class="modal fade" tabindex="-1" role="dialog" id="modalProduct${c}">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">${it.nombreProducto}</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body d-flex flex-column">
                                <div class="d-flex">
                                    <label for="editProductCode" class="label-style">Code:</label>
                                    <input type="text" class="tam-data mb-3" disabled id="editProductCode" value="${it.codigo}">
                                </div>
                                <div class="d-flex">
                                    <label for="editProductName" class="label-style">Name:</label>
                                    <input type="text" class="tam-data mb-3" required id="editProductName" value="${it.nombreProducto}">
                                </div>
                                <div class="d-flex">
                                    <label for="editProductType" class="label-style">Type:</label>
                                    <input type="text" class="tam-data mb-3" required disabled id="editProductType" value="${it.tipo}">
                                </div>
                                <div class="d-flex">
                                    <label for="editProductCategory" class="label-style">Category:</label>
                                    <input type="text" class="tam-data mb-3" required disabled id="editProductCategory" value="${it.categoria}">
                                </div>
                                <div class="d-flex">
                                    <label for="editProductCondition" class="label-style">Condition:</label>
                                    <input type="text" class="tam-data mb-3" required disabled id="editProductCondition" value="${it.condicion}">
                                </div>
                                <div class="d-flex">
                                    <label for="editProductState" class="label-style">Physical state:</label>
                                        <select class="tam-data mb-3" required id="editProductState">
                                            <option value="disponible" ${selDisp}>Disponible</option>
                                            <option value="truequeado" ${selTrue}>Truequeado</option>
                                        </select>
                                </div>
                                <div class="d-flex">
                                    <label for="editProductDescription" class="label-style">Description:</label>
                                    <textarea required rows="4" class="tam-data mb-3" id="editProductDescription">${it.descripcion}</textarea>
                                </div>
                                <div class="d-flex">
                                    <label for="editProductPhoto" class="label-style">Photo:</label>
                                    <input type="file" required id="editProductPhoto" class="tam-data mb-3">
                                </div>
                            </div>
                            <div class="modal-footer"> 
                                <div class="anchor d-flex justify-content-center">
                                    <button class="btn btn-success" id="btnSaveProduct">Save changes</button>        
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
    
        const saveProduct = document.getElementById('btnSaveProduct');
        saveProduct.addEventListener('click', saveDataProduct);
    
        async function saveDataProduct(){
            let productCode = document.getElementById('editProductCode');
            let productName = document.getElementById('editProductName');
            let productType = document.getElementById('editProductType');
            let productCategory = document.getElementById('editProductCategory');
            let productCondition = document.getElementById('editProductCondition');
            let productState = document.getElementById('editProductState');
            let productDescription = document.getElementById('editProductDescription');
            let productPhoto = document.getElementById('editProductPhoto');
    
            const url = 'https://truequeprueba.herokuapp.com/events/update_producto';
    
            const dataDetails = {
                method: 'POST',
                body: JSON.stringify({
                "email": dataUserLogged.email,
                "codigo": productCode.value,
                "nombre": productName.value,
                "tipo": productType.value,
                "categoria": productCategory.value,
                "condicion": productCondition.value,
                "estado": productState.value,
                "descripcion": productDescription.value,
                "foto": productPhoto.value
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
                };     
            
            const response = await fetch(url, dataDetails);
            const data = await response.text();

            console.log(data)
    
            if(data == "ok")
                alert("Product data is updated");
            else
                alert("Error updating product data");
        }
    }

    cont = 0;
    HTMLString = [];
    cTot = 0;
    cPar = 0;
}

