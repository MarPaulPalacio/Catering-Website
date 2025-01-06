import React, { useState } from "react";
import './App.css';
import Footer from './header/Footer';
import Filters from './projects/Filters';
import Projects from './projects/Projects';
import { FilterProvider } from "./providers/FilterContext";
import { FileProvider } from "./providers/FileContext";
import { PopupProvider } from "./providers/PopupProvider";

function App() {

  return (
    <div className="overflow-y-auto h-screen">
      <FileProvider>
        <FilterProvider>
          <PopupProvider>
            <div className="z-20">
              <Filters />
              <Projects />
            </div>
          </PopupProvider>
        </FilterProvider>
        <Footer />
      </FileProvider>
    </div>
  );
}

export default App;
