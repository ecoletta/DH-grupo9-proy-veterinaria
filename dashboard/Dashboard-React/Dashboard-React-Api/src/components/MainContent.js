import React from 'react';
import ContentRowTop from './ContentRowTop';
import ContentRowBottom from './ContentRowBottom'

function MainContent(){
    return (
            /* <!-- Begin Page Content --> */
            
            <div className="container-fluid">
                
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
                
                <ContentRowTop />
                
                <ContentRowBottom />
            
            </div>


    )
}

export default MainContent;