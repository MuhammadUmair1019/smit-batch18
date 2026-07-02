// --------------------------------------------------------------------
import React from "react";
// import  sum  from './utils/calc'
// import { mul } from './utils/calc'
// import sum, { mul } from './utils/calc'
// import { sum, mul, sub } from './utils/calc'

import Pass from "./components/Pass";
import Fail from "./components/Fail";

function App() {
    let name = "Ahmed";
    let marks = 0;

    return <>{marks > 50 ? <Pass marks={marks} /> : <Fail marks={marks} />}</>;
}

// function Pass() {
//   return (
//     <div>
//       <h3 style={{ color: 'green' }}>Pass</h3>
//       <p>Ali you have a long way to go!</p>
//     </ div>
//   )
// }

// function Fail() {
//   return (
//     <div>
//       <h3 style={{ color: 'red' }}>Fail</h3>
//       <p>Better luck next time :( </p>
//     </ div>
//   )
// }

// function App() {
//   let marks = 60;

//   return (
//     <>
//       <h3>Marks : {marks}</h3>
//       {marks > 50 ? <Pass /> : <Fail />}
//     </>
//   )
// }

// function App() {
//   let marks = 60;

//   if (marks > 50) {
//     return (
//       <div>
//         <h3>Marks : {marks}</h3>
//         <Pass />
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         <h3>Marks : {marks}</h3>
//         <Fail />
//       </div>
//     )
//   }

// }

// function App() {
//   let marks = 40;

//   return (
//     <>
//       <h3>Marks : {marks}</h3>
//       <h3 style={{ color: 'green' }}>Pass</h3>
//       <p>Ali your marks is {marks}</p>
//       <h3 style={{ color: 'red' }}>Fail</h3>
//       <p>Ahmed your marks is {marks}</p>
//       <p>Better luck next time :( </p>
//     </>
//   )

// }

// function App() {
//   let x = 40;

//   return (
//     <>
//       <h1>Hello, React</h1>
//       <p>sum = {sum(2, 4)}</p>
//       <p>mul = {mul(2, 4)}</p>
//       <p>sub = {sub(5, 4)}</p>
//     </>
//   )

// }

// function sum(a, b) {
//   return a + b;
// }

// function mul(a, b) {
//   return a * b;
// }

// function App() {
//   let x = 40;

//   console.log(x)

//   return (
//     <>
//       <h1>Hello, React</h1>
//       <p>x = {x}</p>
//       <p>x = {x + 10}</p>
//       <p>x = {x > 30 ? 100 : 200}</p>
//       <p>sum = {sum(2, 4)}</p>
//     </>
//   )

// }

// component -> render ui
// function App() {
//   return (
//     <React.Fragment>
//       <h1>Hello, World</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, totam!</p>
//     </React.Fragment>
//   )
// }

// function App() {
//   return (
//     <>
//       <h1>Hello, World</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, totam!</p>
//     </>
//   )
// }

// function App() {
//   return (
//     <div>
//       <h1>Hello, World</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, totam!</p>
//     </div>
//   )
// }

// function App() {
//   return (
//     React.createElement("h1", null, "Hello Wolrd")
//   )
// }

export default App;
