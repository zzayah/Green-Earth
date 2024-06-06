import React from 'react'
import PIE_CHART from './chart'
import EIA_COAL from './eia_coal'
import Sandbox from './sandbox-dial/sandbox.js'

const data = [
  { name: "Category 1", value: 10 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 30 },
];

function App() {
  return (
    <div>
      <h1>My Donut Chart</h1>
      <Sandbox width={400} height={400} data={data} />
    </div>
  )
}

// <EIA_COAL />
// <PIE_CHART />
export default App