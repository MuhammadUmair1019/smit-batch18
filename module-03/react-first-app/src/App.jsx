import React from "react";

function sum(a, b) {
  return a + b;
}

// component -> render ui
function App() {
  return (
    <React.Fragment>
      <h1>Hello, World</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, totam!</p>
    </React.Fragment>
  )
}

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