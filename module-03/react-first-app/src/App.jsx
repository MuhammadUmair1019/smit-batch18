import TaskSolutions from "./Tasks/TaskSolutions";


function App() {
  return <TaskSolutions />
}

export default App;

// ----------------------------------------------------------------------
// products.map(p => any expression)

// import ProductInfo from "./components/ProductInfo";

// products.filter(p => boolean expression)
// let products = [
//   {
//     id: 101,
//     title: "LED",
//     price: 4000,
//     status: true,
//   },
//   {
//     id: 102,
//     title: "Mobile",
//     price: 2000,
//     status: false,
//   },
//   {
//     id: 103,
//     title: "Laptop",
//     price: 20000,
//     status: true,
//   },
// ]


// 1) Show all products by sorting on price (low high)
// 2) Show only those products whose price is greater than 45000, sorted by price (high to low)
// 3) Show all products after increasing their price by 10%.
// 4) Show all products whose name starts with 'a' or 'A'
// 5) Show top 3 most expensive products
// 6) Show all products with price labeled as (Below average or Above average)


// 3) Show all products after increasing their price by 10%.
// function App() {



//   return (
//     <>
//       <h1>Stock Details</h1>
//       <div>
//         {products.map((product) => (
//           <ProductInfo key={product.id} product={{ ...product, price: product.price * 1.10 }} />
//         ))}
//       </div>
//     </>
//   )
// }

// export default App;
// 3) Show all products after increasing their price by 10%.
// function App() {



//   return (
//     <>
//       <h1>Stock Details</h1>
//       <div>
//         {products.map(p => ({ ...p, price: p.price * 1.10 })).map((product) => (
//           <ProductInfo key={product.id} product={product} />
//         ))}
//       </div>
//     </>
//   )
// }

// export default App;

// function App() {
//   let products = [
//     {
//       id: 101,
//       title: "LED",
//       price: 4000,
//       status: true,
//     },
//     {
//       id: 102,
//       title: "Mobile",
//       price: 2000,
//       status: false,
//     },
//     {
//       id: 103,
//       title: "Laptop",
//       price: 20000,
//       status: true,
//     },
//   ]

//   let marks = [10, 20, 30]

//   let mMarks = marks.map(m => {
//     if (m > 10) {
//       return m + 10;
//     }
//   })

//   console.log(mMarks)


//   let filterProducts = products.filter(product => product.status)

//   return (
//     <>
//       <h1>Stock Details</h1>
//       <div>
//         {products.map(product => {
//           if (product.status) {
//             return (
//               <div>
//                 <h3>Title: {product.title}</h3>
//                 <h4>Price: {product.price}</h4>
//                 <p>{product.status ? "Available" : "Not Available"}</p>
//                 <hr />
//               </div>
//             )
//           }
//         })}
//       </div>
//     </>
//   )
// }

// export default App;

// function App() {
//   let products = [
//     {
//       id: 101,
//       title: "LED",
//       price: 4000,
//       status: true,
//     },
//     {
//       id: 102,
//       title: "Mobile",
//       price: 2000,
//       status: false,
//     },
//     {
//       id: 103,
//       title: "Laptop",
//       price: 20000,
//       status: true,
//     },
//   ]

//   let filterProducts = products.filter(product => product.status)

//   return (
//     <>
//       <h1>Stock Details</h1>
//       <div>
//         {products.filter(product => product.status).map(product => (
//           <div>
//             <h3>Title: {product.title}</h3>
//             <h4>Price: {product.price}</h4>
//             <p>{product.status ? "Available" : "Not Available"}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default App;


// function App() {
//   let products = [true, false, true]

//   return (
//     <>
//       <h1>Stock Details</h1>
//       <ul>
//         {products.map(p => <li>{p ? "Available" : "Not Available"}</li>)}
//       </ul>
//     </>
//   )
// }

// export default App;

// function App() {
//   let products = [2000, 3000, 4000]

//   return (
//     <>
//       <h1>Stock Details</h1>
//       <ul>
//         {products.map(p => <li>{p}</li>)}
//       </ul>
//     </>
//   )
// }

// export default App;

// function App() {
//   let products = ['LED', 'Laptop', 'Airpod']

//   return (
//     <>
//       <h1>Stock Details</h1>
//       <ul>
//         {
//           products.map(p => {
//             return (
//               <li>{p}</li>
//             )
//           })
//         }

//       </ul>
//     </>
//   )
// }

// export default App;

// function App() {
//   let products = ['LED', 'Laptop', 'Airpod']
//   let mProducts = [<li>LED</li>, <li>Laptop</li>, <li>Airpod</li>]

//   return (
//     <ul>
//       {mProducts}
//       <li>{products[0]}</li>
//       <li>{products[1]}</li>
//       <li>{products[2]}</li>
//     </ul>
//   )
// }

// export default App;

// import Result from "./components/Result";

// let studetns = [
//   {
//     id: 101,
//     name: "Ali",
//     marks: 80,
//     color: "green",
//   },
//   {
//     id: 105,
//     name: "Zubair",
//     marks: 40,
//     color: "red",
//   },
//   {
//     id: 104,
//     name: "Ahmed",
//     marks: 100,
//     color: "green",
//   },
// ];

// function App() {
//   return (
//     <>
//       {studetns.map((student) => (
//         <Result
//           key={student.id}
//           marks={student.marks}
//           name={student.name}
//           color={student.color}
//         />
//       ))}
//     </>
//   );
// }

// export default App;

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
