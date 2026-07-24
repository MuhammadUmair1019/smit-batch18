import React from "react";
import Welcome from "./components/Welcome"
import { Button } from "@/components/ui/button";
import { AppSidebar } from "./components/app-sidebar";
import MainDashboard from "./pages/dashboard";


function App() {
  let name1 = "Ali"
  let name2 = "Zubair"
  let name3 = "Hasham"

  return (
    <div>
      {/* <AppSidebar /> */}
      <MainDashboard />

      {/* <Header /> */}
      {/* <Hero /> */}
      {/* <Button variant="outline" size="xs">Click Me</Button>
      <Button variant="secondary" size="sm">Click Me</Button>
      <Button variant="destructive" size="lg">Click Me</Button>
      <Button variant="ghost">Click Me</Button>
      <Button variant="link">Click Me</Button> */}
      {/* <Footer /> */}
      {/* <Welcome name={name1} /> */}
      {/* <Welcome name={name2} /> */}
      {/* <Welcome name={name3} /> */}
    </div>
  )
}

export default App;

// import React from "react";

// function sum(a, b) {
//   return a + b;
// }

// sum(2, )

// function App() {
//   let x = 0;

//   return (
//     <div>
//       <h1>Hello, World {x ? 20 : 30}</h1>
//       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet odio distinctio quasi tempora eos in iusto magni expedita optio dignissimos, corrupti error magnam dolorem nulla adipisci totam iure dolores consequuntur?</p>
//     </div>
//   )
// }

// export default App;