class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.score = 0;
  }

  login() {
    console.log(`${this.name} has logged in`);

    return this;
  }

  logout() {
    console.log(`${this.name} has logged out`);

    return this;
  }

  incScore() {
    this.score += 1;

    console.log(`Your current score -> ${this.score}`);

    return this;
  }
}

class Admin extends User {
  constructor(name, email, role) {
    super(name, email);
    this.role = role;
  }
  deleteUser(user) {
    users = users.filter((u) => u.email !== user.email);
  }
}

const userOne = new User("Ahmed", "ahmed@gmail.com");
const userTwo = new User("Ali", "Ali@gmail.com");
const userAdmin = new Admin("admin", "admin@gmail.com", "role");

console.log(userOne);
console.log(userTwo);
console.log(userAdmin);

// --------------------------
// const userOne = new User("Ahmed", "ahmed@gmail.com");
// const userTwo = new User("Ali", "Ali@gmail.com");

// let users = [userOne, userTwo];
// console.log(users);

// const userAdmin = new Admin("admin", "admin@gmail.com");
// userAdmin.deleteUser(userTwo);
// console.log(users);
// console.log(userAdmin);

// console.log(userOne);
// console.log(userTwo);

// const userOne = new User("Ahmed", "ahmed@gmail.com");
// const userTwo = new User("Ali", "Ali@gmail.com");
// const userAdmin = new Admin("admin", "Ali@gmail.com");

// userOne.login().incScore().incScore().incScore()
// // userOne.incScore()
// // userOne.incScore()
// // userOne.incScore()

// console.log(userOne);
// console.log(userTwo);

// ---------------------------------
// const userOne = new User("Ahmed", "ahmed@gmail.com");
// const userTwo = new User("Ali", "Ali@gmail.com");
// userOne.login()
// userOne.logout()
// userTwo.login()
// userTwo.logout()
// console.log(userOne);
// console.log(userTwo);
