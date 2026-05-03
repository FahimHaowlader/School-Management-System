import { useState } from 'react'
import './App.css'
import Hello from '@Global/Hello'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Hello/>
  <p>hello  from principle</p>
    </>
  )
}

export default App
