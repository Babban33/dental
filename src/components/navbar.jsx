import Birac from './birac.svg';
import Betic from './betic.svg';
import SDK from './sdk.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function NavBar(){
  return(
    // <div className="fixed w-full top-0 start-0 border-b">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
    //       <img src={Birac} className="h-10 dark:text-white text-white bg-white" alt="Flowbite Logo"/>
    //       <img src='https://upload.wikimedia.org/wikipedia/en/7/70/Logo_of_G.H._Raisoni_College_of_Engineering_Nagpur.png' className='h-10'/>
    //       <img src={Betic} className='h-10 fill-current text-red-500'/>
    //       <img src={SDK} className='h-10 text-white fill-white'/>
    //       {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
    //     </a>
    //     <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    //       <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
    //         <span className="sr-only">Open main menu</span>
    //         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    //           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
    //         </svg>
    //       </button>
    //     </div>
    //     <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    //       <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
    //         <li>
    //           <a href="/" className="block py-2 px-3 text-gray-800 dark:text-white rounded md:p-0" aria-current="page">Home</a>
    //         </li>
    //         <li>
    //           <a href="/" className="block py-2 px-3 text-gray-800 dark:text-white rounded md:p-0">About Us</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    // <div className="fixed w-full top-0 start-0 border-b">
    //   <div className='hidden md:flex flex-wrap items-center justify-between p-4 max-w-screen-xl mx-auto'>
    //     <a href="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
    //       <img src={Birac} className="h-10 w-10 dark:text-white text-white bg-white" alt="Flowbite Logo"/>
    //       <img src='https://upload.wikimedia.org/wikipedia/en/7/70/Logo_of_G.H._Raisoni_College_of_Engineering_Nagpur.png' className='h-10 w-10 text-white' alt="College Logo"/>
    //     </a>
    //     <div className="flex space-x-4">
    //       <Link to="/" className="dark:text-white text-gray-800">Home</Link>
    //       <Link to="/about" className="dark:text-white text-gray-800">About Us</Link>
    //     </div>
    //     <a href="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
    //       <img src={Betic} className="h-10 w-10 dark:text-white text-white bg-white" alt="Flowbite Logo"/>
    //       <img src={SDK} className='h-10 w-10 text-white' alt="SDK Logo"/>
    //     </a>
    //   </div>
    // </div>
    <div className="fixed w-full top-0 left-0 border-b dark:bg-white">
      <div className='hidden md:flex items-center justify-between px-6 py-2 max-w-screen-xl mx-auto'>

        <a href="/" className='flex items-center space-x-8'>
          <img src={Birac} className="h-16 w-16" alt="Birac Logo"/>
          <img src='https://upload.wikimedia.org/wikipedia/en/7/70/Logo_of_G.H._Raisoni_College_of_Engineering_Nagpur.png' className='h-12' alt="College Logo"/>
        </a>

        <div className="flex space-x-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/about" className="hover:text-indigo-600">About Us</Link>
        </div>

        <a href="/" className='flex items-center space-x-8'>
          <img src={Betic} className="h-12" alt="Betic Logo"/>
          <img src={SDK} className='h-12 w-12' alt="SDK Logo"/>
        </a>
      </div>
    </div>
  )
}

export default NavBar;