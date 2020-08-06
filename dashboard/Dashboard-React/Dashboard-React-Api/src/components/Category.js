import React from 'react';

function Category(Props){
    return (
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-info text-white shadow">
                                    <div className="card-body">
                                        {Props.category} ({Props.count})
                                    </div>
                                </div>
                            </div>
                            
    )
}

export default Category;