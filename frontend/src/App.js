import React, { useEffect, useState } from 'react'
import Globe from './Globe';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api')

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => setBackendData(data))
  }, []) 
  return (
    <div>
      <h1>Backend Data</h1>
      <ul>
        {backendData.users && backendData.users.map((user, index) => {
          return <li key={index}>{user}</li>
        })}
      </ul>
      <Globe />
    </div>
  )
}

export default App