function CreateUser(name, email) {
  this.name = name; 
  this.email = email;
}

CreateUser.prototype.login = function () {
  console.log("Log in!");
};

CreateUser.prototype.logout = function () {
  console.log("logout in!");
};

const userOne = new CreateUser("Ahmed", "Ahmed@gmail.com");
const userTwo = new CreateUser("Ali", "Ali@gmail.com");

console.log(userOne);
console.log(userTwo);

// --------------------------------------------
// function CreateUser2(name, email) {
//   this.name = name;
//   this.email = email;
// }

// // empty obj
// // this -> empty obj
// // return -> this
// const user = new CreateUser2("Ali", "Ali@gmail.com");
// console.log(user)

// --------------------------------------------------
// function user(name, email) {
//   return { name, email };
// }

// if (user.prototype) {
//     console.log("Yes");
// } else {
//     console.log("NO")
// }

// console.log(user.prototype);

// user.prototype.abc = "test";

// console.log(user.prototype);
// console.log(user("Ahmed", "ahmed@gmail.com"))

// const userMethods = {
//   register: function () {
//     console.log("Register!");
//   },
//   login: function () {
//     console.log("Log in!");
//   },
//   logout: function () {
//     console.log("Log out!");
//   },
// };

// function createUser(name, email) {
//   const user = Object.create(userMethods);
//   user.name = name;
//   user.email = email;

//   return user;
// }

// const userOne = createUser("Ahmed", "Ahmed@gmail.com");
// const userTwo = createUser("Ali", "Ali@gmail.com");

// console.log(userOne);
// console.log(userTwo);

// ---------------------------------------------------------
// const obj1 = {
//   key1: "Value 1",
//   key2: "Value 2",
// };

// const obj2 = Object.create(obj1)
// obj2.key3 = "value3"

// console.log(obj1)
// console.log(obj2)
// // const obj2 = {
// //   key3: "Value 3",
// // };

// console.log(obj1.key1);
// console.log(obj2.key1);

// -----------------------------------------------------------------
// function createUser(name, email) {
//   const user = {
//     name: name,
//     email: email,
//     login: function () {
//       console.log("Log in!");
//     },
//     logout: function () {
//       console.log("Log out!");
//     },
//   };

//   return user;
// }

// const userOne = createUser("Ahmed", "Ahmed@gmail.com");
// const userTwo = createUser("Ali", "Ali@gmail.com");

// console.log(userOne);
// console.log(userTwo);

// const userOne = {
//   name: "Ahmed",
//   email: "ahmed@gmail.com",
//   login: function () {
//     console.log("Log in!");
//   },
//   logout: function () {
//     console.log("Log out!");
//   },
// };

// -----------------------------------------------------------
// const userOne = {
//   name: "Ahmed",
//   email: "ahmed@gmail.com",
//   login: function () {
//     console.log("Log in!");
//   },
//   logout: function () {
//     console.log("Log out!");
//   },
// };

// const userTwo = {
//   name: "Ali",
//   email: "Ali@gmail.com",
//   login: function () {
//     console.log("Log in!");
//   },
//   logout: function () {
//     console.log("Log out!");
//   },
// };

// userOne.login();
// userOne.logout();
