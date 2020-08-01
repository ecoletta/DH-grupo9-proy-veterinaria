import React, {Component} from 'react';


//Aca se definio el componente en modo class con estados y se hace un fetch a una url que me pasa cifra entre otras cosas
//despues levanto esa info, la pongo seteo en un estado y la utilizo en mi componente.
class AmountOfProductsInDB2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cifra: props.cifra,
            titulo: props.titulo,
            icon: props.icon
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
            cifra: data.meta.countProducts
        }
    )

    componentDidMount(){
        console.log("Me monte")
        this.apiCall("http://localhost:3001/api/products/", this.mostrarDatos)
    }

    render(){
        console.log("Estoy renderizando")
        return(
            <div className="col-md-4 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1"> {this.state.titulo} </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cifra}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }

}

/*
function AmountOfProductsInDB(props){
    return(
        <div className="col-md-4 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1"> {props.titulo} </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.cifra}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
*/

export default AmountOfProductsInDB2;