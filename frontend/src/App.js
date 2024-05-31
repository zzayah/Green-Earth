import React, { useEffect, useState } from 'react'
import Globe from './Globe';

function App() {

  const [backendData, setBackendData] = useState([{}])

  return (
    <div>
      <Globe />
    </div>
  )
}

export default App