import React from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';
import Footer from './Footer';

function Content(){
    return (

        /* <!-- Content Wrapper --> */
		<div id="content-wrapper" className="d-flex flex-column">
            
            <NavBar />

            <MainContent />

            <Footer />

        </div>

    )
}

export default Content;