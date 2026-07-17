import { createContext } from "react"
import { useState } from "react"
import MainRouter from "./routes/MainRouter"

function GrandChild(props) {

  return <h1>{props.x}</h1>
}


function Child(props) {

  return <GrandChild x={props.x} />
}

function Parent(props) {

  return <Child x={props.x} />
}


function App() {
  const [x, setX] = useState(0)

  return (
    <>
      <MainRouter />
      {/* <Parent x={x} /> */}
    </>
  )
}

export default App;


