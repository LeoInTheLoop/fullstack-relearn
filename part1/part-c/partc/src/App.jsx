// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'
const App = () => {

  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(500),
    1000
  )


  return (
    <div>{counter}</div>
  )
}

export default App


