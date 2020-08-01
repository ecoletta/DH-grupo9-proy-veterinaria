import React from 'react';

/* Importación de componenter */
import SideBar from './SideBar';
import Content from './Content';

function App() {
  return (
    <div className="App" id="wrapper">

      <SideBar />
      
      <Content />
  
    </div>

  );
}

export default App;