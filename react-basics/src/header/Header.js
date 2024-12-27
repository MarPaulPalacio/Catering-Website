import React from 'react';



function HeaderMain() {
  return (
    <>
      <div className='flex w-full h-20 items-center justify-center'>
        <div className='flex w-11/12 h-12 xl:space-x-96 lg:space-x-64 md:space-x-32 sm:space-x-20 space-x-16 justify-center items-center rounded-lg bg-darkest '>
          <button class=" text-general-light hover:text-white hover:underline active:text-white active:underline">Projects</button>
          <button class="bg-dark">image here</button>
          <button class=" text-general-light hover:text-white hover:underline active:text-white active:underline">Company</button>
        </div>
      </div>
      
    </>
    
  );
}

export default HeaderMain;
