window.onload = function(){
    var nombre = document.querySelector('#name');
    var apellido = document.querySelector('#apellido');
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var confirmarPassword = document.querySelector('#confirmarPassword');
    var file = document.querySelector('#imgUser');
    var formulario = document.querySelector('#userform');

    const validFile = /(\.jpg|\.jpeg|\.png|\.gif)$/g;
    const validPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    var validateNombre = function(){
        if(nombre.validity.valueMissing){
            document.querySelector('#error_nombre').innerText = 'Debe ingresar el nombre';
            nombre.style.borderColor = 'red';
            return false;
        } else{
            if(nombre.value.length < 2){
                document.querySelector('#error_nombre').innerText = 'El nombre tiene que tener más de 3 caracteres';
                nombre.style.borderColor = 'red';
                return false;
            } else {
                document.querySelector('#error_nombre').innerText = '';
                nombre.style.borderColor = '#ced4da';
                return true;
            }
        }
    }

    var validateApellido = function(){
        if(apellido.validity.valueMissing){
            document.querySelector('#error_apellido').innerText = 'Debe ingresar el apellido';
            apellido.style.borderColor = 'red';
            return false;
        } else {
            if(apellido.value.length < 2){
                document.querySelector('#error_apellido').innerText = 'El apellido tiene que tener más de 3 caracteres';
                apellido.style.borderColor = 'red';
                return false;
            } else {
                document.querySelector('#error_apellido').innerText = '';
                apellido.style.borderColor = '#ced4da';
                return true;
            }
        }
    }

    var validateEmail = function(){
        if(email.validity.valueMissing){
            email.style.borderColor = 'red';
            document.querySelector('#error_email').innerText = 'Debe ingresar un email';
            return false;
        }else{
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
            if(validPass.test(password.value)){
                document.querySelector('#error_password').innerText = '';
                password.style.borderColor = '#ced4da';
                return true;
            } else {
                document.querySelector('#error_password').innerText = 'La contraseña debe tener al menos 8 caracteres, un número, una mayúscula y un caracter especial';
                password.style.borderColor = 'red';
                return false;
            }
        }
    }

    var validateRepassword = function(){
        if(password.validity.valueMissing){
            document.querySelector('#error_ConfirmarPassword').innerText = 'Vuelva a ingresar la contraseña';
            confirmarPassword.style.borderColor = 'red';
            return false;
        }else{
            if(confirmarPassword.value != password.value){
                document.querySelector('#error_ConfirmarPassword').innerText = 'Las contraseñas no concuerdan';
                confirmarPassword.style.borderColor = 'red';
                return false;
            }else {
                document.querySelector('#error_ConfirmarPassword').innerText = '';
                confirmarPassword.style.borderColor = '#ced4da';
                return true;
            }
        }

    }

    var validateFile = function() {
        if(file.validity.valueMissing){
            file.style.borderColor = 'red';
            document.querySelector('#error_img').innerText = 'Debe agregar una imagen';
            return false;
        }else {
            if(validFile.test(file.value)){
                file.style.borderColor = '#ced4da';
                document.querySelector('#error_img').innerText = '';
                return true;    
            } else {
                file.style.borderColor = 'red';
                document.querySelector('#error_img').innerText = 'El formato del archivo debe ser JPG, JPEG, PNG o GIF';
                return false;
            }
        }
    }

    nombre.onblur = function(){validateNombre();}
    apellido.onblur = function(){validateApellido();}
    email.onblur = function(){validateEmail();}
    password.onblur = function(){validatePassword();}
    confirmarPassword.onblur = function(){validateRepassword();}

    formulario.onsubmit = function(e){
        e.preventDefault();

        var status = validateNombre();
        status = validateApellido() && status;
        status = validateEmail() && status;
        status = validatePassword() && status;
        status = validateRepassword() && status;
        status = validateFile() && status;

        if(status){
            formulario.submit();
        } else {
            alert('El formulario contiene errores');
        }
    }

}