const apiKey = 'dZQhlqU8sVZP4nILiiVCN0Hj7eRu1kPz'


//CAMBIO DE TEMA

let body = document.querySelector("body");

let temaDia= document.getElementById("day");
temaDia.addEventListener('click',function(){
    body.classList.remove('dark');
});

let temaNoche= document.getElementById("night");
temaNoche.addEventListener('click',function(){
    body.classList.add('dark');
});

