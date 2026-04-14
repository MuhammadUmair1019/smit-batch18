function fetchData(url) {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      console.log(data);
    } else if (request.readyState === 4) {
      console.log("Could not found the resoruce!");
    }
  });

  request.open("GET", url);
  request.send();
}

fetchData("https://jsonplaceholder.typicode.com/users");
fetchData("https://jsonplaceholder.typicode.com/todos");

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
