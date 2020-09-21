//ENDPOINT DE GIPHY

async function getFromGiphy(endPoint) {
    let gif = await fetch(endPoint);
    console.log(gif);
    let json = await gif.json();
    console.log(json);
    return json;
}

//BUSQUEDAS

function searchSomething() {
    let search= document.getElementById("search").value;
    document.getElementById('contenedor-busqueda-similar').hidden= true;
    getFromGiphy('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
    .then(showSearch)
    .catch(function (error) {
        console.log('Error', error);
    });

  //BOTONES DE BUSQUEDAS 

    let boton= document.createElement ('button');
    boton.classList.add('boton-guardado');
    let nombreGuardado= search;
    nombreGuardado= document.createElement('p');
    let botonFinal= nombreGuardado.innerHTML= ('#' + search);
    nombreGuardado.classList.add('nombre-gif');
    boton.appendChild(nombreGuardado);
    document.getElementById('botones-busquedas').appendChild(boton)

    let arraySearch = JSON.parse(localStorage.getItem('search')) || [];
    arraySearch.push(botonFinal).innerHTML;
    localStorage.setItem("search", JSON.stringify(arraySearch));
}
document.getElementById("boton-buscar").addEventListener("click", searchSomething)

function showSearch(giphy) {
    let contenedor = document.createElement('div');
    
    for (let i = 0; i < 15; i++) {
        let bloqueBusqueda = document.createElement('div');
        bloqueBusqueda.classList.add('bloque-busquedas');
        let gif = document.createElement('img');
        gif.src = giphy.data[i].images.original.url;
        gif.classList.add('gif-busqueda');
        bloqueBusqueda.appendChild(gif);
        contenedor.appendChild(bloqueBusqueda);
    }
    document.getElementById('busquedas').innerHTML = contenedor.innerHTML;
}

//BARRA OCULTA Y BOTON BUSCAR

let search= document.getElementById("search");
search.addEventListener('keydown',function () {
    document.getElementById('contenedor-busqueda-similar').hidden= false;
    document.getElementById('boton-buscar').setAttribute('class', 'boton-buscar-activado');
    document.getElementById('lupa-negra').hidden=false;
    document.getElementById('lupa-blanca').style.display= "block";
});
    
search.addEventListener("keyup",function(event){
    if (event.keyCode === 13) {
        searchSomething();
    }
})

//SUGERENCIAS

function searchRandom() {
    getFromGiphy('https://api.giphy.com/v1/gifs/random?api_key=dZQhlqU8sVZP4nILiiVCN0Hj7eRu1kPz&tag=&rating=G')
    .then(showRandom)
    .catch(function (error) {
        console.log('Error', error);
    });
}

function showRandom (random){
    let bloqueSugerencia = document.createElement('div');
    bloqueSugerencia.classList.add('bloque-sugerencias');
    let bloqueTitulo= document.createElement ('div');
    bloqueTitulo.classList.add('barra-color-random')

    let gif = document.createElement('img');   
    gif.src = random.data.images.original.url;
    gif.classList.add('gif-sugerencia');
    let titleGif= document.createElement('p');
    titleGif.classList.add('titulo');
    titleGif.innerHTML='#' + random.data.title;
    titleGif.style.overflow="hidden";

    let cerrarDiv= document.createElement('div');
    cerrarDiv.classList.add('cerrar-div');

    let cerrar= document.createElement('img');
    cerrar.src= "assets/button3.svg";
    
    bloqueSugerencia.appendChild(gif);
    document.getElementById('contenedor-sugerencias').appendChild(bloqueSugerencia); 
    bloqueTitulo.appendChild(titleGif);
    document.getElementById('barra-colores-sugerencias').appendChild(bloqueTitulo);
    bloqueTitulo.innerHTML= titleGif.innerHTML;
    
    document.getElementById('barra-colores-sugerencias').appendChild(cerrarDiv);
    cerrarDiv.appendChild(cerrar);

    //REEMPLAZAR GIFS

    let botonReemplazo= document.createElement('button');
    botonReemplazo.classList.add('ver-mas');
    bloqueSugerencia.appendChild(botonReemplazo);
    botonReemplazo.innerHTML= 'Ver más...'

    cerrar.addEventListener('click', function(){
        bloqueSugerencia.style.display="none";
        bloqueTitulo.style.display="none";
        cerrarDiv.style.display="none";
        searchRandom();
    })

    botonReemplazo.addEventListener('click', function(){
        bloqueSugerencia.style.display="none";
        bloqueTitulo.style.display="none";
        cerrarDiv.style.display="none";
        searchRandom();
    })
}

searchRandom();
searchRandom();
searchRandom();
searchRandom();

//TENDENCIAS

function searchTendences() {
    getFromGiphy('https://api.giphy.com/v1/gifs/trending?api_key=dZQhlqU8sVZP4nILiiVCN0Hj7eRu1kPz&limit=25')
        .then(showTendences)
        .catch(function (error) {
            console.log('Error', error);
        });
}

function showTendences (tendences) {
    for (let i = 0; i < 15; i++) {
        let bloqueTendencia = document.createElement('div');
        bloqueTendencia.classList.add('bloque-tendencias');
        let bloqueTitulo2= document.createElement ('div');
        bloqueTitulo2.classList.add('barra-color-tendencia');

        let gif = document.createElement('img');
        gif.src = tendences.data[i].images.original.url
        gif.classList.add('gif-tendencia');
        let titleGif2= document.createElement('p');
        titleGif2.classList.add('titulo2');
        titleGif2.innerHTML= '#' + tendences.data[i].title;
        
        bloqueTendencia.appendChild(gif);
        document.getElementById('contenedor-tendencias').appendChild(bloqueTendencia);

        bloqueTitulo2.appendChild(titleGif2);      
        bloqueTitulo2.innerHTML= titleGif2.innerHTML;

        gif.addEventListener("mouseover",function(){
            bloqueTendencia.appendChild(bloqueTitulo2);
        });
    }
}
searchTendences();
