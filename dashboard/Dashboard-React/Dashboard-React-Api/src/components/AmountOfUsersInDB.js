import React, {Component} from 'react';

class AmountOfUsersInDB extends Component {
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
            cifra: data.meta.count
        }
    )

    componentDidMount(){
        console.log("Me monte")
        this.apiCall("http://localhost:3000/api/users/", this.mostrarDatos)
    }

    render(){
        console.log("Estoy renderizando")
        return(
            <div className="col-md-4 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1"> {this.state.titulo}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cifra}</div>
                        </div>
                        <div className="col-auto">
                            {this.state.icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }

}



/*function AmountOfUsersInDB(props){
    return(
        <div className="col-md-4 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">{props.titulo}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.cifra}</div>
                        </div>
                        <div className="col-auto">
                            {props.icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}*/

export default AmountOfUsersInDB;