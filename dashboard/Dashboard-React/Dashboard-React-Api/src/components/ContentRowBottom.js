import React from 'react';
import LastProductInDB from './LastProductInDB';
import CategoriesInDB from './CategoriesInDB';

function ContentRowBottom(){
    return (
        <div className="row">
            
            {/* <!-- Last Product in DB --> */}
            <LastProductInDB />

            {/* <!-- Categories in DB --> */}
            <CategoriesInDB />

        </div>
    )
}

export default ContentRowBottom;