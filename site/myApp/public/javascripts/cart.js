window.onload = function () {
    var favorites = document.querySelectorAll(".addfavorites");
    var productCart = document.querySelectorAll("#productCart");
    var addProducts = document.querySelectorAll(".addToCart");
    var removeFromCart = document.querySelectorAll(".removeFromCart");
    var cart = document.querySelector(".carrito");
    var myCart = document.querySelector("#myCart");
    var payButton = document.querySelector("#pay");

    // ADD PRODUCT TO CART
    function addItem(productId) {
        if (sessionStorage.getItem("cart")) {
            var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

            var index = arrayCart.findIndex(({ id }) => id == productId);

            if (index != -1) {
                // Otro más de (productId)
                arrayCart[index].total += 1;
                sessionStorage.setItem("cart", JSON.stringify(arrayCart));
                return arrayCart[index].total;
            } else {
                // Agregar el producto (productId)
                arrayCart.push({
                    id: productId,
                    total: 1
                });
                sessionStorage.setItem("cart", JSON.stringify(arrayCart));
                return 1;
            }

        } else {
            // Generar la variable cart y agregar el producto (productId)
            var cart = [{
                id: productId,
                total: 1
            }]
            sessionStorage.setItem("cart", JSON.stringify(cart));
            return 1;
        }
    }

    // REMOVE PRODUCT FROM CART
    function removeItem(productId) {
        if (sessionStorage.getItem("cart")) {
            var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

            var index = arrayCart.findIndex(({ id }) => id == productId);

            if (index != -1) {
                // Otro más de (productId)
                if (arrayCart[index].total > 1) {
                    arrayCart[index].total -= 1;
                    sessionStorage.setItem("cart", JSON.stringify(arrayCart));
                    return arrayCart[index].total;
                } else {
                    return 1;
                }
            }
        }
    }

    // UPDATE TOTAL
    function updateTotal() {

        var cartTotal = document.querySelector(".total");
        var productPrice = document.querySelectorAll(".price");
        // var productQuantity = document.querySelectorAll(".quantity");
        var total = 0;

        for (i = 0; i < productPrice.length; i++) {
            total += productPrice[i].value * productPrice[i].parentNode.parentNode.querySelector(".quantity").value;
            // console.log(`iteración ${i}`);
            // console.log(`productPrice[${i}].value = ${productPrice[i].value}`);
            // console.log(productPrice[i].parentNode.parentNode.querySelector(".quantity").value);
        }

        cartTotal.innerHTML = `<h3>TOTAL: ${total}$</h3>`;
    }

    // UPDATE FAVORITES
    function updateFavorites() {

        if (sessionStorage.getItem("favorites")) {
            var arrayFavorites = sessionStorage.getItem("favorites").split(",");

            for (i = 0; i < favorites.length; i++) {
                var productId = favorites[i].parentNode.parentNode.querySelector(".productId").value;

                if (!arrayFavorites.includes(productId)) {
                    favorites[i].innerHTML = `<svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
              </svg>`;

                } else {
                    favorites[i].innerHTML = `<svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>`;
                }
            }
        } else {
            //
        }
    }

    function updateProductCart() {

        if (sessionStorage.getItem("cart")) {
            var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

            for (i = 0; i < productCart.length; i++) {
                var productId = productCart[i].parentNode.parentNode.querySelector(".productId").value;
                var index = arrayCart.findIndex(({ id }) => id == productId);
                if (index >= 0) {
                    productCart[i].innerHTML = arrayCart[index].total;
                    productCart[i].parentNode.parentNode.querySelector(".removeFromCart").style.visibility = "visible";
                    productCart[i].parentNode.parentNode.querySelector("#productCart").style.visibility = "visible";
                } else {
                    productCart[i].parentNode.parentNode.querySelector(".removeFromCart").style.visibility = "hidden";
                    productCart[i].parentNode.parentNode.querySelector("#productCart").style.visibility = "hidden";
                }
            }
        } else {
            //habría que hacer algo
        }
    }

    // UPDATE TOTAL PRODUCTS IN CART
    function updateMyCart() {
        if (sessionStorage.getItem("cart")) {
            var arrayCart = JSON.parse(sessionStorage.getItem("cart"));
            var total = 0;
            for (i = 0; i < arrayCart.length; i++) {
                total += arrayCart[i].total
            }
            if (total != 0) {
                myCart.innerHTML = total;
                myCart.style.display = "inline";
                myCart.previousElementSibling.innerHTML = `<svg width="38px" height="38px" viewBox="0 0 16 16" class="bi bi-cart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>`;
            } else {
                myCart.innerHTML = total;
                myCart.style.display = "none";
                myCart.previousElementSibling.innerHTML = `<svg width="38px" height="38px" viewBox="0 0 16 16" class="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>`;
            }

        } else {
            myCart.style.display = "none";
        }
    }

    // SHOW CART WITH SELECTED PRODUCTS
    async function showCart(arrayCart) {

        var total = 0;

        for (const element of arrayCart) {
            const data = await (await fetch(`http://localhost:3000/api/products/${element.id}`)).json();

            cart.innerHTML += `<article class="row product">
                    <div class="col-lg-2 col-sm-12 product-image">
                        <img src="/img_products/${data.data.image}" alt="Foto del producto">
                    </div>
                    <div class="col-lg-6 col-sm-12 product-description">
                        <h2>${data.data.name} (id: ${element.id})</h2>
                        <p>${data.data.description}</p>
                    </div>
                    <div class="col-lg-2 col-sm-12 product-amount">
                        <div class="btn-group buy-buttons-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary lessProduct">-</button>
                            <button type="button" class="btn btn-secondary">5</button>
                            <button type="button" class="btn btn-secondary moreProduct">+</button>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-12 product-price">
                        <h3>Precio: <data class="price" value="${data.data.price}">${data.data.price}</data></h3>
                        <h4>Cantidad: <data class="quantity" value="${element.total}">${element.total}</data></h4>
                        <data value="${element.id}" class="productId"></data>
                        <a href="#" class="removeProduct">ELIMINAR</a>
                    </div>
                </article>`;

            total += element.total * data.data.price;
        }

        var removeProduct = document.querySelectorAll(".removeProduct");
        var lessProduct = document.querySelectorAll(".lessProduct");
        var moreProduct = document.querySelectorAll(".moreProduct");
        var cartTotal = document.querySelector(".total");

        // Agregar el costo total del carrito
        cartTotal.innerHTML = `<h3>TOTAL: ${total}$</h3>`;

        // Agregar Listener a los liks de eliminar producto del carrito
        for (i = 0; i < removeProduct.length; i++) {
            removeProduct[i].addEventListener("click", function (e) {
                e.preventDefault();

                if (sessionStorage.getItem("cart")) {
                    var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

                    var productId = this.parentNode.querySelector(".productId").value;
                    var index = arrayCart.findIndex(({ id }) => id == productId);

                    arrayCart.splice(index, 1);
                    sessionStorage.setItem("cart", JSON.stringify(arrayCart));
                    this.parentNode.parentNode.remove();

                    updateTotal();
                    updateMyCart();

                } else {
                    alert("no hay productos en el carrito");
                }
            })
        }

        for (i = 0; i < lessProduct.length; i++) {
            lessProduct[i].addEventListener("click", function (e) {
                e.preventDefault();
                var productId = this.parentNode.parentNode.parentNode.querySelector(".productId");
                var total = removeItem(productId.value);  //ME FALTA PASARLE EL ID DEL PRODUCTO
                var quantity = this.parentNode.parentNode.parentNode.querySelector(".quantity");
                console.log(this.parentNode.parentNode.parentNode.querySelector(".quantity"));
                quantity.innerHTML = `${total}`;
                quantity.value = total;
                updateTotal();
                updateMyCart();
            })
        }

        for (i = 0; i < moreProduct.length; i++) {
            moreProduct[i].addEventListener("click", function (e) {
                e.preventDefault();
                var productId = this.parentNode.parentNode.parentNode.querySelector(".productId");
                var total = addItem(productId.value);
                var quantity = this.parentNode.parentNode.parentNode.querySelector(".quantity");
                quantity.innerHTML = `${total}`;
                quantity.value = total;
                updateTotal();
                updateMyCart();
            })
        }

        // PROCESS PAYMENT

        payButton.addEventListener("click", function (e) {
            e.preventDefault();


            if (sessionStorage.getItem("cart")) {
                var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

                if (arrayCart.length != 0) {
                    alert("REALIZAR LA COMPRA");
                    fetch(`http://localhost:3000/cart/pay`, {
                        method: 'POST',
                        body: sessionStorage.getItem("cart"),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            console.log("OK");
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            console.log("NOK");
                        });
                } else {
                    alert('NO HAY NADA EN EL CARRITO');
                }
            } else {
                alert('NO HAY NADA EN EL CARRITO');
            }

        })

    }

    // ACÁ EMPIEZA LA EJECUCIÓN

    updateMyCart();
    updateFavorites();
    updateProductCart();

    // ADD TO FAVORITE
    for (favorite of favorites) {
        favorite.addEventListener('click', function (e) {
            e.preventDefault();

            var productId = this.parentNode.parentNode.querySelector(".productId").value;

            if (sessionStorage.getItem("favorites")) {
                var arrayFavorites = sessionStorage.getItem("favorites").split(",");

                if (arrayFavorites.includes(productId)) {
                    var index = arrayFavorites.indexOf(productId);
                    console.log(index);
                    arrayFavorites.splice(index, 1);
                    sessionStorage.setItem("favorites", arrayFavorites.join(","));
                    this.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                  </svg>`;

                } else {
                    arrayFavorites.push(productId);
                    sessionStorage.setItem("favorites", arrayFavorites.join(","));
                    this.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>`;
                }

            } else {
                sessionStorage.setItem("favorites", productId);
                this.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>`;
            }
        })
    }

    // ADD TO CART
    for (addProduct of addProducts) {
        addProduct.addEventListener("click", function (e) {
            e.preventDefault();

            var productId = this.parentNode.querySelector(".productId").value;
            var total = addItem(productId);
            this.parentNode.querySelector("#productCart").innerHTML = total;
            this.parentNode.querySelector("#productCart").style.visibility = "visible";
            this.parentNode.querySelector(".removeFromCart").style.visibility = "visible";

            updateMyCart();
        })
    }

    // UPDATE CART FROM PRODUCT CARD
    for (element of removeFromCart) {
        element.addEventListener("click", function (e) {
            e.preventDefault();

            var productId = this.parentNode.querySelector(".productId").value;
            var arrayCart = JSON.parse(sessionStorage.getItem("cart"));
            var index = arrayCart.findIndex(({ id }) => id == productId);

            if (arrayCart[index].total == 1) {
                console.log('quitar producto del carrito');
                arrayCart.splice(index, 1);
                sessionStorage.setItem("cart", JSON.stringify(arrayCart));
                this.parentNode.querySelector("#productCart").style.visibility = "hidden";
                this.parentNode.querySelector(".removeFromCart").style.visibility = "hidden";
            } else {
                console.log('quitar un producto del los X productos en carrito');
                var total = removeItem(productId);
                console.log(total);
                var quantity = this.parentNode.querySelector("#productCart");
                quantity.innerHTML = `${total}`;

            }

            updateMyCart();
        })
    }


    // SHOW PRODUCTS IN CART
    if (cart != null) {                                                 // busca si existe el elemento con clase .carrito (revisar si es correto)
        var arrayCart = JSON.parse(sessionStorage.getItem("cart"));

        showCart(arrayCart);    //es una función asíncrona

    }


}