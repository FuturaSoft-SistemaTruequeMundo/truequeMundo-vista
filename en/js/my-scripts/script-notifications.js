async function loadNotifications(){
    const itemNotifications= document.getElementById('contentLikesDropdown');
    itemNotifications.innerHTML = "";
    let HTMLStringNotifications = "";

    const urlBase = 'https://truequeprueba.herokuapp.com/';
    const url = urlBase + 'events/buscar_productoUsuario';
    
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

    const response = await fetch(url, dataDetails);
    const data = await response.json();

    let totNotific = 0;

    function itemTemplate(it){
        return (`<a class="d-flex justify-content-between dropdown-item" style="width: 220px" href="#"><p>${it.nombreProducto}</p><p><i class="fas fa-eye"></i> ${it.visitas}</p></a>`)
    }

    data.forEach((item) => {
        let nNotific = parseInt(item.visitas);
        if(nNotific > 0){
            totNotific = totNotific + nNotific;
            HTMLStringNotifications = HTMLStringNotifications + itemTemplate(item);
        } 
    })

    document.getElementById('likesDropdown').innerHTML = totNotific + " <i class='fas fa-bell'></i>";

    if(totNotific == 0)
        HTMLStringNotifications = `<a class="dropdown-item" href="#">No Notifications</a>`;
    
    itemNotifications.innerHTML = HTMLStringNotifications;
}
