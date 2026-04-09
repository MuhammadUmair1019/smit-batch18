// method
const user = {
  name: "Umair",
  greet: () => {
    console.log(this); // undefined
  }
};

user.greet()



// ----------------------------------------------
// const userOne = {
//   name: "Umair",
//   age: 20,
//   greet: function (x, y) {
//     console.log("Hello", x, y);
//     console.log(this.name);
//   },
// };

// const userTwo = {
//   name: "Ali",
//   age: 40,
// };

// userOne.greet.call(userTwo, 2, 4)
// userOne.greet.apply(userTwo, [2, 4])
// let fn =  userOne.greet.bind(userTwo)
// fn(2, 4)

// userOne.greet(2, 4)

// userOne.greet.call(userTwo);

// greet.call()

// userOne.greet()

// console.log(userOne);
// console.log(userTwo);

// greet();
// user.greet();
// console.log(user);

// ------------------------------------------------
// const user = {
//   name: "Umair",
//   age: 20,
//   greet: function () {
//     console.log("Hello", this);
//   },
// };

// user.greet();

// console.log(window)
// console.log(this)
// console.log(user.greet)

// ---------------------------------------

// let user = {
//   "full name": "Ahmed Ali",
//   name: "Ahmed",
//   age: 22,
// };

// console.log(user["full name"]);

// let obj = new Object()

// obj.name = "Ali"

// console.log(obj)

// ------------------------------
// let user = {
//   name: "Ahmed",
//   age: 22,
// };

// let keys = Object.keys(user)
// let values = Object.values(user)

// console.log(keys)
// console.log(values)

// for(let u of keys) {
//     console.log(u, user[u])
// }

// for(let u of user) {
//     console.log(u)
// }

// ----------------------------------
// let arr = [2, 3, 4, 5];

// for(let x of arr) {
//     console.log(x)
// }

// let fullName = "Muhammad Umair";

// for(let name of fullName) {
//     console.log(name)
// }

// for(let i=0; i < arr.length; i++) {
//     console.log(arr[i])
// }
