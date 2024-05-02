import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customErrors.js";

const camposDeFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    const listaRespuestas = {
        nombre: evento.target.elements["nombre"].value,
        email: evento.target.elements["email"].value,
        identificacion: evento.target.elements["identificacion"].value,
        cuil: evento.target.elements["cuil"].value,
        fecha_nacimiento: evento.target.elements["fecha_nacimiento"].value,
    }

    
    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.href = "./abrir-cuenta-form-2.html";

})


camposDeFormulario.forEach( (campo) =>{
    campo.addEventListener('blur', () => verificarCampo(campo));
    campo.addEventListener('invalid', (evento) => {
        evento.preventDefault();
    })
});


function verificarCampo(campo){

    let mensaje = "";

    campo.setCustomValidity("");

    if(campo.name == "cuil" && campo.value.length >= 11){
        esUnCuil(campo)
    }
    if(campo.name == "fecha_nacimiento" && campo.value != ""){
        esMayorDeEdad(campo);
    }

    // console.log(campo.validity)
     tiposError.forEach( error => {
        if(campo.validity[error]){
            mensaje = mensajes[campo.name][error];
            console.log(mensaje);
        }
     })

     // Se usa parentNode por que no queremos traernos todos los <span> de nuestro formulario, si no al más proximo
     // a el campo correspondiente, por ejemplo al campo nombre o al campo email.
     const mensajeError = campo.parentNode.querySelector('.mensaje-error');
    //  Se usa checkValidity para corroborar que ese campo sea valido o no
     const validarInputCheck = campo.checkValidity();

    //  Si no es valido el mensaje de error en su propiedad textContent, contenga el mensaje personalizado
     if(!validarInputCheck){
        mensajeError.textContent = mensaje;
     }else{ // Y si esto no da falso y da true, entonces que no mande ningun mensaje, por que todo esta ok.
        mensajeError.textContent = "";
     }

     

}