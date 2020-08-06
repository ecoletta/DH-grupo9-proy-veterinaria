import React, {Component} from 'react';
import Category from './Category';
//import { render } from '@testing-library/react';


class CategoriesInDB extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category:[]
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
        category: data.meta.countByCategory
    }
)

componentDidMount(){
    console.log("Me monte")
    this.apiCall("http://localhost:3000/api/products/", this.mostrarDatos)
}

    render(){
        console.log("Estoy renderizando Categories");
        console.log(this.state.category)
        return(
            <div className="col-lg-6 mb-4">						
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                    </div>
                <div className="card-body">
                    <div className="row">
                        {this.state.category.map((elem,index) => (
                            <Category count={elem.count} category={elem.category} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
/*function CategoriesInDB(){

    return (
        <div className="col-lg-6 mb-4">						
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <Category />
                            <Category />
                            <Category />
                            <Category />
                            <Category />
                            <Category />
                        </div>
                    </div>
                </div>
        </div>
    )
} */

export default CategoriesInDB;