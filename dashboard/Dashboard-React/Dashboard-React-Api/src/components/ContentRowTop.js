import React from 'react';
import ProductsInDB from './ProductsInDB';
//import AmountOfProductsInDB from './AmountOfProductsInDB';
import AmountOfProductsInDB2 from './AmountOfProductsInDB2';
import AmountOfUsersInDB from './AmountOfUsersInDB';

function ContentRowTop(){

    //const valores = A COMPLETAR LOS PROPS EN UN ARRAY ACA Y RECORRERLOS CON MAP

    return (
        <div className="row">
        {/* <!-- Products in DB --> */}
    <ProductsInDB titulo='PRODUCTOS EN BASE DE DATOS' cifra='0' color='--blue' icon={<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>} />

        {/* <!-- $$$ of all products in DB --> */}
    <AmountOfProductsInDB2 titulo='CATEGORIAS EN BASE DE DATOS' cifra='0' color='--green' icon={<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>}  />

        {/* <!-- Amount of users in DB --> */}
    <AmountOfUsersInDB titulo='USERS QUANTITY' cifra='0' color='--yellow' icon={<i className="fas fa-user-check fa-2x text-gray-300"></i>} />
    </div>
    )
}

export default ContentRowTop;