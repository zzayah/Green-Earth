import React, { useState } from 'react';
import Globe from '../globe comp/Globe';
import Contacts from '../__contacts/contacts';
import TradingViewWidget from '../dashboard comp/__assets/assets';
import ExpandableFab, { ActionButton } from '../dashboard comp/__toggle/toggle'; // Import the new component

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tradingViewVisible, setTradingViewVisible] = useState(false);

  return (
    <div>
      <Globe />
    </div>
  );
}

export default App;
