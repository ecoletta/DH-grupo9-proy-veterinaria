window.onload = function() {

    var name = document.querySelector('#name');
    var stock = document.querySelector('#stock');
    var price = document.querySelector('#price');
    var discount = document.querySelector('#discount');
    var file = document.querySelector('#img');
    var description = document.querySelector('#description');
    var formulario = document.querySelector('#formulario');

    const validFIle = /(\.jpg|\.jpeg|\.png|\.gif)$/g;

    var validateName = function(){
        if(name.validity.valueMissing){
            name.style.borderColor = 'red';
            document.querySelector('#error_name').innerText = 'Debe ingresar el nombre del producto';
            return false;
        } else {
            if(name.value.length < 5){
                document.querySelector('#error_name').innerText = 'El nombre debe tener al menos 5 caracteres';
                name.style.borderColor = 'red';
                return false;
            } else {
                document.querySelector('#error_name').innerText = '';
                name.style.borderColor = '#ced4da';
                return true;
            }
        }
    }

    var validatePrice = function(){
        if(price.validity.valueMissing){
            price.style.borderColor = 'red';
            document.querySelector('#error_price').innerText = 'Debe ingresar un valor';
            return false;
        } else {
            document.querySelector('#error_price').innerText = '';
            price.style.borderColor = '#ced4da';
            return true;
        }
    }

    var validateStock = function(){
        if(stock.validity.valueMissing){
            stock.style.borderColor = 'red';
            document.querySelector('#error_stock').innerText = 'Debe ingresar un valor';
            return false;
        } else {
            document.querySelector('#error_stock').innerText = '';
            stock.style.borderColor = '#ced4da';
            return true;
        }
    }

    var validateDiscount = function(){
        if(discount.validity.valueMissing){
            discount.style.borderColor = 'red';
            document.querySelector('#error_discount').innerText = 'Debe ingresar un valor';
            return false;
        } else {
            document.querySelector('#error_discount').innerText = '';
            discount.style.borderColor = '#ced4da';
            return true;
        }
    }

    var validateDescription = function(){
        if(description.validity.valueMissing){
            description.style.borderColor = 'red';
            document.querySelector('#error_description').innerText = 'Debe ingresar la descripción del producto';
            return false;
        } else {
            if(description.value.length < 20){
                description.style.borderColor = 'red';
                document.querySelector('#error_description').innerText = 'La descrición tiene que tener al menos 20 caracteres';
                return false;
            } else {
                document.querySelector('#error_description').innerText = '';
                description.style.borderColor = '#ced4da';
                return true;   
            }
        }
    }

    var validateFile = function() {
        if(file.validity.valueMissing){
            file.style.borderColor = 'red';
            document.querySelector('#error_img').innerText = 'Debe agregar una imagen';
            return false;
        } else {
            if(validFIle.test(file.value)){
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

    name.onblur = function(){validateName();}
    stock.onblur = function(){validateStock();}
    price.onblur = function(){validatePrice();}
    discount.onblur = function(){validateDiscount();}
    description.onblur = function(){validateDescription();}

    formulario.onsubmit = function(e) {
        e.preventDefault();

        var status = validateName();
        status = validateStock() && status;
        status = validatePrice() && status;
        status = validateDiscount() && status;
        status = validateDescription() && status;
        status = validateFile() && status;

        if(status){
            formulario.submit();
        } else {
            alert('El formulario contiene errores');
        }
    }

}