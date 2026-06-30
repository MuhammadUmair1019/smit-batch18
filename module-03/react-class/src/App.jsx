import React from 'react'
import Hello from './components/Hello'
import User from './components/User';
import Button from './components/Button';

function App() {

  const items = ["apple" , "mango" , "orange"];

  function handleClick(){
    alert("Button Clicked!");
  }
  return (
    <div>

    {/* <Hello name="Bilal" />
    <Hello name="Abdul Mohid" />
    <Hello name="Hasnain" />
    <Hello name="Hassan" /> */}

    {/* <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>

    <User name="Hafeez" age={27} city="Karachi" /> */}

    <Button onClick={handleClick} />



    </div>
  )
}

export default App