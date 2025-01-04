import logo from './logo.svg';
import './App.css';
import SubjectList from './SubjectList'
import Header from './header/Header'
import Filters from './projects/Filters'
import Projects from './projects/Projects'
import {FilterProvider} from "./providers/FilterContext";
import React, { useState } from "react";

  

function App() {
  const [filter, setFilter] = useState("");
  return (
    <>
      
      <div className="overflow-y-auto max-h-screen">
        <div className='sticky top-0 z-0'>
          <Header/>
        </div>
        <FilterProvider>
          <Filters/>
          <Projects/>
        </FilterProvider>
        
      </div>
      

        

      
      
    </>
    
  );
}


export default App;
