
import './App.css';
import Footer from './header/Footer'
import Filters from './projects/Filters'
import Projects from './projects/Projects'
import {FilterProvider} from "./providers/FilterContext";
import {FileProvider} from "./providers/FileContext"
import React, { useState } from "react";

  

function App() {
  const [filter, setFilter] = useState("");
  return (
    <>
      
      <div className="overflow-y-auto h-screen">
        <FileProvider>

        
          <div className='z-20'>
          <FilterProvider>
            <Filters/>
            <Projects/>
          </FilterProvider>
          </div>
            <Footer/>
        </FileProvider>
      </div>
      

        

      
      
    </>
    
  );
}


export default App;
