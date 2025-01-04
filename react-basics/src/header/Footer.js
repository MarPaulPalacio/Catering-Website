import React, {useEffect, useContext} from 'react';
import FileContext from "../providers/FileContext";


function FooterMain() {

  const { saveFile, setSaveFile } = useContext(FileContext);

  const saveFileFunction = () => {
    setSaveFile("Saved")
  }
  return (
    <>
      <div className='fixed bottom-0 flex w-full h-20 items-center justify-center'>
        <div className='flex w-11/12 h-12 xl:space-x-96 lg:space-x-64 md:space-x-32 sm:space-x-20 space-x-16 justify-center items-center rounded-lg'>
          <button class=" text-darkest border border-darkest hover:text-[#ffffe4] hover:bg-dark hover:underline active:text-white active:underline text-2xl w-6/12 bg-[#f5f5f5] shadow-custom-shadow rounded-xl h-10">Open File</button>
          <button onClick = {saveFileFunction} class=" text-darkest border border-darkest hover:text-[#ffffe4] hover:bg-dark hover:underline active:text-white active:underline text-2xl w-6/12 bg-[#f5f5f5] shadow-custom-shadow rounded-xl h-10">Save File</button>
        </div>
      </div>
      
    </>
    
  );
}

export default FooterMain;
