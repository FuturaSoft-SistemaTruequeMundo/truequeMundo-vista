document.getElementById("linkLogo").addEventListener("click", reloadPage);

function reloadPage(){
  window.location.href = "/index.html";

  const texto = '';
  const country = '';
  const city = '';

  cont = 0;
  HTMLString = [];
  cTot = 0;
  cPar = 0;
  
  searcherGet(texto, country, city, 'VISTOS RECIENTEMENTE');
}