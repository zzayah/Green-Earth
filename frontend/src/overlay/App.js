import React, { useEffect, useState } from 'react'
import Globe from '../globe comp/Globe';
import Contacts from '../dashboard comp/__contacts/contacts';
import TradingViewWidget from '../dashboard comp/__assets/assets';

function App() {

  const [backendData, setBackendData] = useState([{}])

  // start __contacts 
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  // end contacts

  return (
    <div>
      <TradingViewWidget />
      <Contacts showMenu={menuVisible} toggleMenu={toggleMenu} />
      <Globe />
    </div>
  )
}

export default App