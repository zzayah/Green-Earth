import React, { useState } from 'react';
import Globe from '../globe comp/Globe';
import Contacts from '../dashboard comp/__contacts/contacts';
import TradingViewWidget from '../dashboard comp/__assets/assets';
import ExpandableFab, { ActionButton } from '../dashboard comp/__toggle/toggle'; // Import the new component

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tradingViewVisible, setTradingViewVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleTradingView = () => {
    setTradingViewVisible(!tradingViewVisible);
  };

  return (
    <div>
      {tradingViewVisible && <TradingViewWidget />}
      {menuVisible && <Contacts showMenu={menuVisible} toggleMenu={toggleMenu} />}
      <Globe />
      <ExpandableFab distance={100}>
        <ActionButton onClick={toggleTradingView} icon={<i className="fa-area-chart"></i>} />
        <ActionButton onClick={toggleMenu} icon={<i className="fas fa-address-book"></i>} />
        <ActionButton onClick={() => alert('Action 3')} icon={<i className="fas fa-arrows-v "></i>} />
        <ActionButton onClick={() => alert('Action 3')} icon={<i className="fa-arrows-v "></i>} />
        <ActionButton onClick={() => alert('Action 3')} icon={<i className="fas fa-envelope"></i>} />

      </ExpandableFab>
    </div>
  );
}

export default App;
