import { useState } from "react";

function ReactInput() {
    const [user, setUser] = useState({
        name: '',
        city: ''
    })


    function updateInput({ target: { name, value } }) {
        setUser({ ...user, [name]: value })
    }

    return (
        <>
            <label >Name: </label>
            <input type="text" name="name" value={user.name} onChange={updateInput} />
            <br />
            <br />
            <label >City: </label>
            <input type="text" name="city" value={user.city} onChange={updateInput} />
            <p>You type : {name}</p>
        </>
    )
}


export default ReactInput;

// function ReactInput() {
//   const [user, setUser] = useState({
//     name: '',
//     city: ''
//   })


//   function updateInput({ target: { name, value } }) {
//     if (name === "name") {
//       setUser({ ...user, name: value })
//     } else {
//       setUser({ ...user, city: value })

//     }
//   }

//   return (
//     <>
//       <label >Name: </label>
//       <input type="text" name="name" value={user.name} onChange={updateInput} />
//       <br />
//       <br />
//       <label >City: </label>
//       <input type="text" name="city" value={user.city} onChange={updateInput} />
//       <p>You type : {name}</p>
//     </>
//   )
// }


// export default ReactInput;

// function ReactInput() {
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");

//   function updateInput({ target: { name, value } }) {
//     (name === "name") ? setName(value) : setCity(value)
//   }

//   return (
//     <>
//       <label >Name: </label>
//       <input type="text" name="name" value={name} onChange={updateInput} />
//       <br />
//       <br />
//       <label >City: </label>
//       <input type="text" name="city" value={city} onChange={updateInput} />
//       <p>You type : {name}</p>
//     </>
//   )
// }


// export default ReactInput;

// function ReactInput() {
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");

//   function updateInput(e) {
//     (e.target.name === "name") ? setName(e.target.value) : setCity(e.target.value)
//   }

//   return (
//     <>
//       <label >Name: </label>
//       <input type="text" name="name" value={name} onChange={updateInput} />
//       <br />
//       <br />
//       <label >City: </label>
//       <input type="text" name="city" value={city} onChange={updateInput} />
//       <p>You type : {name}</p>
//     </>
//   )
// }


// export default ReactInput;

// function ReactInput() {
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");

//   function updateInput(e) {
//     if (e.target.name === "name") {
//       setName(e.target.value)
//     } else {
//       setCity(e.target.value)
//     }
//   }

//   return (
//     <>
//       <label >Name: </label>
//       <input type="text" name="name" value={name} onChange={updateInput} />
//       <br />
//       <br />
//       <label >City: </label>
//       <input type="text" name="city" value={city} onChange={updateInput} />
//       <p>You type : {name}</p>
//     </>
//   )
// }


// export default ReactInput;

// -------------------------------------------------------
// function ReactInput() {
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");


//   function updateName(e) {
//     setName(e.target.value)
//   }

//   function updateCity(e) {
//     setCity(e.target.value)
//   }

//   return (
//     <>
//       <label >Name: </label>
//       <input type="text" value={name} onChange={updateName} />
//       <br />
//       <br />
//       <label >City: </label>
//       <input type="text" value={city} onChange={updateCity} />
//       <p>You type : {name}</p>
//     </>
//   )
// }


// export default ReactInput;
