import { useState } from "react";

// sync (memory <=> ui) => state 
function StateInReact() {
    let [counter, setCounter] = useState(1);

    const increment = () => {
        setCounter(counter + 1)
    }

    const decrement = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    return (
        <div>
            <h1>Counter</h1>

            <button disabled={false} onClick={decrement}>-</button>
            {counter}
            <button onClick={increment}>+</button>
        </div>
    )
}


export default StateInReact;



// ------------------------------------------------
// sync (memory <=> ui) => state
// let x = 10;
// x = 20;

// let [y, setY] = useState(10)
// console.log(y)

// // y = 20; // not valid
// setY(20) // valid

// function App() {
//   const [name, setName] = useState("Muhammad")
//   const [array, setArray] = useState([1, 2, 3])

//   console.log(array)

//   function updateName() {
//     setName("Muhammad Ahmed")
//   }

//   return (
//     <div>

//       <h1> Hello, {name}</h1>
//       <button onClick={updateName}>Update </button>
//     </div>
//   )
// }

// export default App;

// function App() {
//   let name = "Muhammad"

//   function updateName() {
//     name = "Muhammad Ahmed"

//     console.log(name)
//   }

//   return (
//     <div>

//       <h1> Hello, {name}</h1>
//       <button onClick={updateName}>Update </button>
//     </div>
//   )
// }

// export default App;