function fetchData(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject("Could not found the resoruce!");
      }
    });

    request.open("GET", url);
    request.send();
  });
}

fetchData("https://jsonplaceholder.typicode.com/users/1")
  .then((data) => {
    console.log(data);

    return fetchData("https://jsonplaceholder.typicode.com/users/2");
  })
  .then((data) => {
    console.log(data);

    return fetchData("https://jsonplaceholder.typicode.com/users/3");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

// ------------------------------------------------------------
// const getSomething = () => {
//   return new Promise((resolve, reject) => {
//     resolve("Success");
//     // reject("Reject");
//   });
// };

// getSomething()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))
//   .finally(() => {
//     console.log("Completed");
//   });

// ------------------------------------------------------
// callback hell
// fetchData("https://jsonplaceholder.typicode.com/users/1", (err, data) => {
//   console.log(data);
//   fetchData("https://jsonplaceholder.typicode.com/users/2", (err, data) => {
//     console.log(data);
//     fetchData("https://jsonplaceholder.typicode.com/users/3", (err, data) => {
//       console.log(data);
//       fetchData("https://jsonplaceholder.typicode.com/users/4", (err, data) => {
//         console.log(data);
//         fetchData(
//           "https://jsonplaceholder.typicode.com/users/3",
//           (err, data) => {
//             console.log(data);
//           },
//         );
//       });
//     });
//   });
// });

// -----------------------
// fetchData("https://jsonplaceholder.typicode.com/users/1", (err, data) => {
//   if (data) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
// });

// fetchData("https://jsonplaceholder.typicode.com/users/2", (err, data) => {
//   if (data) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
// });

// fetchData("https://jsonplaceholder.typicode.com/users/3", (err, data) => {
//   if (data) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
// });

// ------------------------------------------------------
// function fetchData(url, cb) {
//   const request = new XMLHttpRequest();

//   request.addEventListener("readystatechange", () => {
//     if (request.readyState === 4 && request.status === 200) {
//       const data = JSON.parse(request.responseText);
//       cb(undefined, data);
//     } else if (request.readyState === 4) {
//       cb("Could not found the resoruce!", undefined);
//     }
//   });

//   request.open("GET", url);
//   request.send();
// }

// fetchData("https://jsonplaceholder.typicode.com/users", (err, data) => {
//   // console.log("Callback!")
//   if (data) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
//   // console.log(err);
//   // console.log(data);
// });

// fetchData("https://jsonplaceholder.typicode.com/todos");

// -----------------------------------------------
// const request = new XMLHttpRequest();

// request.addEventListener("readystatechange", () => {
//   // console.log(request, request.readyState)

//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request, request.status);
//     const data = JSON.parse(request.responseText);
//     console.log(data);
//   } else if(request.readyState === 4) {
//     console.log("Could not found the resoruce!");
//   }
// });

// request.open("GET", "https://jsonplaceholder.typicode.com/userss");
// request.send();

// --------------------------
// console.log("Start")

// setTimeout(() => {
//     console.log("Timeout!")
// }, 3000)

// console.log("End")

// console.log("A")
// console.log("B")

// // API Call

// let x = 20
// console.log(x)
