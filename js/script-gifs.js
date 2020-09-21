let flecha= document.getElementById("flecha");
flecha.style.display= "inline-block";
flecha.style.position= "absolute";
flecha.style.marginTop= "40px";
flecha.style.marginLeft= "30px";

let gifs = JSON.parse(localStorage.getItem('url')) || [];
gifs.forEach (misGuifos);

function misGuifos (mostrar) {
    let contenedorGeneral= document.getElementById('contenedor-misgifs');
    let miGif= document.createElement('img');
    miGif.classList.add('miGif');
    miGif.style.marginLeft="50px";
    miGif.style.marginBottom= "25px";
    miGif.src= mostrar;
    console.log(mostrar);
    contenedorGeneral.appendChild(miGif);
}