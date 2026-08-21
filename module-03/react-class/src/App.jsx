import { useLayoutEffect, useRef } from "react";

export default function App() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const width = boxRef.current.getBoundingClientRect().width;

    console.log("Width:", width);
  }, []);

  return (
    <div ref={boxRef}>
      Hello
    </div>
  );
}

// import { useReducer } from "react";
// import "./App.css";

// const initialState = {
//   theme: "light",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "LIGHT":
//       return { ...state, theme: "light" };

//     case "DARK":
//       return { ...state, theme: "dark" };

//     case "BLUE":
//       return { ...state, theme: "blue" };

//     default:
//       return state;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div className={`app ${state.theme}`}>
//       <div className="container">
//         <h1>Theme Changer</h1>

//         <p>
//           Current Theme: <strong>{state.theme}</strong>
//         </p>

//         <div className="buttons">
//           <button onClick={() => dispatch({ type: "LIGHT" })}>
//             Light
//           </button>

//           <button onClick={() => dispatch({ type: "DARK" })}>
//             Dark
//           </button>

//           <button onClick={() => dispatch({ type: "BLUE" })}>
//             Blue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// import { useReducer, useState } from "react";

// function reducer(state, action) {
//   switch (action.type) {
//     case "increment":
//       return state + 1;

//     case "decrement":
//       return state - 1;

//     case "reset":
//       return 0;

//     default:
//       return state;
//   }
// }

// function themeReducer(state, action) {

// }

// export default function App() {
//   const [count, dispatch] = useReducer(reducer, 0);

//   const [theme, themeDispatch] = useReducer(themeReducer, { theme: 'light' })

//   // const [c, setC] = useState(0)

//   console.log(theme)

//   return (
//     <>
//       <p>{count}</p>

//       <button onClick={() => dispatch({ type: "increment" })}>
//         Dark
//       </button>

//       <button onClick={() => dispatch({ type: "decrement" })}>
//         Light
//       </button>

//       <button onClick={() => dispatch({ type: "reset" })}>
//         Reset
//       </button>
//     </>
//   );
// }


// ----------------------------------------------------
// import React from 'react'

// import { useState, useEffect } from "react";

// function App() {
//   const [count, setCount] = useState({
//     firstName: '',
//     lastName: '',
//   });

//   useEffect(() => {
//     document.title = `Count: ${count}`;
//   }, [count]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log("Running...");
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//       console.log("Unmount")
//     };
//   }, []);

//   return (
//     <button onClick={() => setCount(c => c + 1)}>
//       {count}
//     </button>
//   );
// }


// export default App