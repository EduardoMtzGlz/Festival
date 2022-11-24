
//Primero carga el DOM con contentLoaded, aqui quite function y puse la flecha entre el paréntesis y la llave 
//Primero carga el DOM con contentLoaded, aqui quite function y puse la flecha entre el paréntesis y la llave 
document.addEventListener("DOMContentLoaded", ()=>{
    iniciarApp(); 
});

function iniciarApp(){
    navegacionFija(); 
    crearGaleria();
    scrollNav(); 
}

function navegacionFija(){
    const barra = document.querySelector(".header"); 
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body")
    window.addEventListener("scroll", function(){

        if (sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        }else {
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");

        };
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion_principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria= document.querySelector(".galeria-imagenes"); 

    //Creando el scripting para la creación de la galeria

    for (let i = 1; i <=12; i++) {
        const imagen = document.createElement("picture")
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);       
    }
}

function mostrarImagen(id){
    const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;

    //Creando el overlay con la imagen     
    const overlay= document.createElement("DIV");    
     overlay.appendChild(imagen);
     overlay.classList.add("overlay"); 

    //Crear botom para cerrar el modal

    const cerrarModal = document.createElement("P"); 
    cerrarModal.textContent="X"; 
    cerrarModal.classList.add("botonCerrar"); 
    cerrarModal.onclick=()=>{
        overlay.remove(); 
        const body=document.querySelector("body"); 
        body.classList.remove("fijar-body"); 
    } 
    overlay.appendChild(cerrarModal);


    //Añadiendo el overlay al html
    const body=document.querySelector("body"); 
    body.appendChild(overlay); 
    body.classList.add("fijar-body");  //Para que no se pueda dar scroll  
    
    //Que cuando le den al overlay también se cierre

    overlay.onclick= ()=>{
        overlay.remove();
        const body=document.querySelector("body"); 
        body.classList.remove("fijar-body"); 
    }
}
