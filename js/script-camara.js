
const mostrarBloquesGrabación = () => {
    document.getElementById('grabar-guifos').hidden = false;
    document.getElementById('bloque-instrucciones').hidden = true;
};

const getStreamAndRecord = () => {
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                width: 800,
                height: 448
            }
        })
        .then(comenzarGrabacion);
};

const comenzarGrabacion = stream => {
    video.srcObject = stream;
    video.play();

    document.getElementById('boton-grabando').hidden = false;
    document.getElementById('boton-frenar-grabacion').hidden = false;
    document.getElementById('boton-camara').hidden = true;
    document.getElementById('boton-capturar').hidden = true;
    document.getElementById('barra-colores-chequeo').style.display = 'none';
    document.getElementById('barra-colores-captura').style.display = 'block';
    document.getElementById('barra-tiempo').hidden= false;


    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('started');
        }
    });
    recorder.startRecording();
};

const frenarGrabacion = async () => {
    
    document.getElementById('boton-repetir').style.display= "inline-block";
    document.getElementById('boton-subir-gif').hidden = false;
    document.getElementById('boton-grabando').hidden = true;
    document.getElementById('boton-frenar-grabacion').hidden = true;
    document.getElementById('barra-colores-vista').style.display = 'block';
    document.getElementById('barra-colores-captura').style.display = 'none';
    document.getElementById('video').hidden= true;
    document.getElementById('img').hidden= false;

    recorder.stopRecording();

    let blob= recorder.getBlob();
    const imagen= document.getElementById('img');
    const objURL= URL.createObjectURL(blob);
    imagen.src= objURL;
    imagen.setAttribute("width", "800")
    imagen.setAttribute("height", "434");
    let contenedor = document.getElementById("video-wrap");
    contenedor.appendChild(imagen);
    console.log('vista previa')
        
    //COPIAR EN EL PORTAPAPELES EL GIF QUE OBTUVE
    let botonCopiar= document.getElementById("copiar-enlace");
    botonCopiar.setAttribute("url", objURL)
    navigator.clipboard.writeText(objURL);
 
    //DESCARGAR EL GIF QUE OBTUVE
    let a= document.getElementById("descarga")
    a.setAttribute("href", objURL);  
};


const mostrarGuifo= async () => {
    
    document.getElementById("boton-repetir").style.display= "none";
    document.getElementById("boton-cancel").style.display="none";
    document.getElementById("boton-subir-gif").hidden=true;
    document.getElementById("barra-tiempo").style.display="none";
    document.getElementById("barra-colores-vista").style.display="none";
    document.getElementById("barra-colores-subir").style.display="block";
    document.getElementById("boton-cancel").hidden=false;
    document.getElementById("globo").hidden=false;
    document.getElementById("parrafo-subir").style.display="block";
    document.getElementById("parrafo-tiempo").style.display="block";
    document.getElementById("img").style.display="none";
    document.getElementById("fondo-blanco").hidden=false;
    document.getElementsByClassName("barra").hidden=false;

    //GENERANDO ARCHIVO PARA SUBIR 
    let form= new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    form.append('apiKey', apiKey)
    console.log(form.get('file'))
    subirAGhipy(form);
}

async function subirAGhipy(form) {
    fetch('https://upload.giphy.com/v1/gifs?' + 'api_key=' + apiKey, {
       method: 'POST',
       body: form,
       mode: "cors"
   }) .then (async function(response){
       if (response.ok) {
           let jSON= await response.json();
           console.log(jSON)
           return jSON
       } else {
           throw "Error en la llamada";
       }
       
   }) .then (datos =>{
       let gifId= datos.data.id;
       let gifs = JSON.parse(localStorage.getItem('url')) || [];
       gifs.push(`https://media1.giphy.com/media/${gifId}/giphy.gif?cid=52afa79a31b48e99d4268c4cc71df9dcbf8f8b3c9db10a07&rid=giphy.gif`);
       localStorage.setItem("url", JSON.stringify(gifs));

       gifs.forEach (misGuifos);
    });
    setTimeout("visualizarGuifo()", 3000)
}

function misGuifos (mostrar) {
    let contenedorGeneral= document.getElementById("contenedor-misgifs");
    let miGif= document.createElement('img');
    miGif.classList.add('miGif');
    miGif.style.marginLeft="25px";
    miGif.style.marginBottom= "25px";
    miGif.src= mostrar;
    console.log(mostrar);
    contenedorGeneral.appendChild(miGif);
    }


const visualizarGuifo= async () => {
    document.getElementById("bloque-mostrar-gif").hidden=false;
    document.getElementById("grabar-guifos").hidden=true;
    let imagen= document.getElementById("img");
    imagen.style.display= "block";
    let contenedor2= document.getElementById("enmarcar-gif");
    contenedor2.appendChild(imagen);
    imagen.setAttribute("width", "365")
    imagen.setAttribute("height", "191");
    document.getElementById("ultimo-bloque").hidden=false;
};

window.onload = () => {
    const grabar = document.getElementById('boton-comenzar');
    const capturar = document.getElementById('boton-capturar');
    const botonListo = document.getElementById('boton-frenar-grabacion');
    const botonSubir= document.getElementById('boton-subir-gif');

    grabar.addEventListener('click', mostrarBloquesGrabación);
    capturar.addEventListener('click', getStreamAndRecord);
    botonListo.addEventListener('click', frenarGrabacion);
    botonSubir.addEventListener('click', mostrarGuifo);
};