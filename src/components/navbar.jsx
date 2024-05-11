import React from 'react';
import Birac from './birac.png';
import Betic from './betic.jpg';
import SDK from './sdk.png';
import College from './college.png';

function NavBar() {
  return (
    <div className="flex justify-center -mb-16">
      <div className='flex items-center space-x-4 p-4'>
        <img src={Betic} alt="Betic Logo" className="h-16" />
        <img src={SDK} alt="SDK Logo" className="h-16" />
        <img src={Birac} alt="BIRAC Logo" className="h-16" />
        <img src={College} alt="GHRCE Logo" className='h-16' />
      </div>
    </div>
  );
}

export default NavBar;