import React, {Component} from 'react';
const product_dummy  = require ('../assets/images/product_dummy.svg');


class LastProductInDB extends Component{
    constructor(props){
        super(props);
        this.state = {
            product:[]

        }
    }

    apiCall(url,consecuencia){
        fetch(url)
            .then( response => response.json())
            .then (data => consecuencia(data))
            .catch( error => console.log(error))
    }

    mostrarDatos = (data) =>
    this.setState(
        {
            product: data.data[data.data.length - 1]
        }
    )

    componentDidMount(){
        console.log("Me monte")
        this.apiCall("http://localhost:3000/api/products/", this.mostrarDatos)
    }

    render(){
        console.log("Estoy renderizando ultimo componente");
        console.log(this.state.product);
        return(
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo producto en base de datos</h6>
                    </div>
                    <div className="card-body">
                        <p>{this.state.product.name}</p>
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 25 + 'rem'}} src={product_dummy} alt="dummy" />
                        </div>
                        <p>{this.state.product.description}</p>
                        <a target="_blank" rel="nofollow" href={"http://localhost:3000/products/" +this.state.product.id}>View product detail</a>
                    </div>
                </div>
            </div>
        )
    }
}


/*function LastProductInDB(){
    return(
        <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo producto en base de datos</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 25 + 'rem'}} src={product_dummy} alt="dummy" />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa exercitationem ratione?</p>
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
    )
}
*/
export default LastProductInDB;