window.onload = function(){

    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var formulario = document.querySelector('#login');

    var validateEmail = function(){
        if(email.validity.valueMissing){
            email.style.borderColor = 'red';
            document.querySelector('#error_email').innerText = 'Debe ingresar un email';
            return false;
        } else {
            if(email.validity.typeMismatch){
                email.style.borderColor = 'red';
                document.querySelector('#error_email').innerText = 'Ingrese un email correcto';
                return false;
            } else {
                email.style.borderColor = '#ced4da';
                document.querySelector('#error_email').innerText = '';
                return true;
            }
        }
    }

    var validatePassword = function(){
        if(password.validity.valueMissing){
            document.querySelector('#error_password').innerText = 'Ingrese una contraseña';
            password.style.borderColor = 'red';
            return false;
        } else {
            document.querySelector('#error_password').innerText = '';
            password.style.borderColor = '#ced4da';
            return true;
        }
    }

    email.onblur = function(){validateEmail();}
    password.onblur = function(){validatePassword();}

    formulario.onsubmit = function(e){
        e.preventDefault();
        
        var status = validateEmail();
        status = validatePassword() && status;

        if(status){
            formulario.submit();
        } else {
            alert('El formulario contiene errores');
        }
    }
}