import React from 'react';
import Birac from './birac.png';
import Betic from './betic.jpg';
import SDK from './sdk.png';
import College from './college.png';
import { isMobile } from 'react-device-detect';

function NavBar() {
  const logoSize = isMobile ? 'h-10' : 'h-16';

  return (
    <div className="flex justify-center items-center -mb-16">
      <div className='flex items-center space-x-4 p-4'>
        <img src={College} alt="GHRCE Logo" className={logoSize} />
        <img src={Birac} alt="BIRAC Logo" className={logoSize} />
        <img src={SDK} alt="SDK Logo" className={logoSize} />
        <img src={Betic} alt="Betic Logo" className={logoSize} />
      </div>
    </div>
  );
}

export default NavBar;