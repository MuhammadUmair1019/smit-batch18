import Result from "./components/Result";

let studetns = [
  {
    id: 101,
    name: "Ali",
    marks: 80,
    color: "green",
  },
  {
    id: 105,
    name: "Zubair",
    marks: 40,
    color: "red",
  },
  {
    id: 104,
    name: "Ahmed",
    marks: 100,
    color: "green",
  },
];

function App() {
  return (
    <>
      {studetns.map((student) => (
        <Result
          key={student.id}
          marks={student.marks}
          name={student.name}
          color={student.color}
        />
      ))}
    </>
  );
}

export default App;

// let names = ["Ali", "Zubair", "Ahmed"];
// let marks = [80, 70, 40];

// marks.map((m) => m + 10);
// names.map((n) => <li> {n}</li>);

// names = [<li>Ali</li>, <li>Zubair</li>];

// function App() {
//   let marks = [80, 70, 40];
//   let names = ["Ali", "Zubair", "Ahmed", "Mujtaba"];

//   let elemets = [<li>item 1</li>, <li>item 2</li>];

//   return (
//     <>
//       <ul>
//         {names.map((n) => (
//           <li>{n}</li>
//         ))}
//         {/* {[<li>Ali</li>, <li>Zubair</li>]} */}
//         {/* <li>Item 1</li>
//         <li>Item 2</li> */}
//       </ul>
//       <Result marks={marks[0]} name={names[0]} />
//       <Result marks={marks[1]} name={names[1]} />
//       <Result marks={marks[2]} name={names[2]} />
//     </>
//   );
// }

// export default App;

// function App() {
//   let marks = [80, 70, 40];
//   let names = ["Ali", "Zubair", "Ahmed"];

//   return (
//     <>
//       <Result marks={marks[0]} name={names[0]} />
//       {/* <Pass marks={marks[1]} name={names[1]} /> */}
//       {/* <Pass marks={marks[2]} name={names[2]} />
//       {/* {marks.map((m) => {
//         if (m > 50) {
//           return <Pass marks={m} />;
//         } else {
//           return <Fail marks={m} />;
//         }
//       })} */}
//     </>
//   );
// }

// export default App;

// import Pass from "./components/Pass";
// import Fail from "./components/Fail";

// function App() {
//   let marks = 80;

//   if (marks > 50) {
//     return <Pass marks={marks} color="green" />;
//   } else {
//     return <Fail />;
//   }
// }

// export default App;
