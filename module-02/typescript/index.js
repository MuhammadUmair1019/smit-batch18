"use strict";
function add(x) {
    return x;
}
add("2");
add(2);
add(true);
add([2, 3, 4]);
// function add(x: number): number {
//   return x;
// }
// add("2");
// function identity<T>(value: T): T {
//   return value;
// }
// console.log(identity(42)); // 42
// console.log(identity<string>("Hello")); // Hello
// ----------------------------------------------------------------------
// class BankAccount {
//   public owner: string;
//   public balance: number;
//   protected accountType: string;
//   readonly accountId: string;
//   constructor(
//     owner: string,
//     balance: number,
//     accountType: string,
//     accountId: string
//   ) {
//     this.owner = owner;
//     this.balance = balance;
//     this.accountType = accountType;
//     this.accountId = accountId;
//   }
//   public deposit(amount: number): void {
//     this.balance += amount;
//   }
//   private getBalance(): number {
//     return this.balance;
//   }
// }
// class ChildClass extends BankAccount {
//   getAccountType() {}
// }
// const account = new BankAccount("Ali", 1000, "Savings", "ACC123");
// const account2 = new ChildClass("Ali", 1000, "Savings", "ACC123");
// account.accountType;
// account.balance ❌ Error (private)
// account.deposit(500);
// class Person {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
//   greet(): void {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   }
// }
// const umair = new Person("Umair", 26);
// umair.greet();
// interface User {
//   name: string;
//   age: number;
//   greet(this: User): void;
// }
// const user: User = {
//   name: "Umair",
//   age: 26,
//   greet() {
//     console.log(`Hello, I am ${this.name}`);
//   },
// };
// user.greet(); // Hello, I am Umair
// ----------------------------------------------------------------------
// const enum Roles {
//   Admin = "ADMIN",
//   User = "USER",
//   Guest = "GUEST",
// }
// let role: Roles = Roles.Admin;
// console.log(role); // "ADMIN"
// const enum Direction {
//   Up, // 0
//   Down, // 1
//   Left, // 2
//   Right, // 3
// }
// let move: Direction = Direction.Up;
// console.log(move); // 0
// interface Dictionary {
//   [key: string]: string;
// }
// let colors: Dictionary = {
//   red: "#FF0000",
//   green: "#00FF00",
// };
// // Type: Union (can be one value OR another)
// type Status = "success" | "error" | "loading";
// // Type: Primitive alias
// type ID = string | number;
// // Type: Tuple
// type Point = [number, number];
// const currentStatus: Status = "success";
// const userId: ID = 101;
// const coordinates: Point = [40.7128, -74.006];
// -----------------------------------------------------
// // Interface: Using 'extends'
// interface Animal {
//   name: string;
// }
// interface Dog extends Animal {
//   bark(): void;
// }
// // Type: Using '&' (Intersection)
// type Vehicle = {
//   wheels: number;
// };
// type Car = Vehicle & {
//   model: string;
// };
// // Interface: Merging works automatically
// interface User {
//   name: string;
// }
// interface User {
//   age: number; // This safely adds 'age' to the existing User interface
// }
// const worker: User = { name: "Alice", age: 30 };
// // // Type Alias: This throws a duplicate identifier error
// type Customer = { name: string };
// type Customer = { age: number }; // ❌ Error: Duplicate identifier 'Customer'.
//
// --------------------------------------------------------------------------
// interface Person {
//   name: string;
// }
// interface Employee extends Person {
//   emId: number;
// }
// let employee: Employee = {
//   name: "Ali",
//   emId: 22,
// };
// ---------------------------------------------------------------------------
// interface User {
//   readonly id: number;
//   name: string;
//   age: number;
//   isPass?: boolean;
// }
// let user: User = {
//   id: 101,
//   name: "Ali",
//   age: 26,
//   isPass: true,
// };
// let user2: User = {
//   id: 102,
//   name: "Ali",
//   age: 26,
// };
// user.id = 103;
// console.log(user.id);
// let user: { name: string; age: number } = {
//   name: "Ali",
//   age: 26,
// };
// ---------------------------------------------------
// let marks: number[] = [2, 4, 5];
// let marks: Array<number> = [2, 4, 5];
// let names: string[] = ["Ahmed", "Ali", "Zubair"];
// let passStudents: boolean[] = [true, false, true];
// let students: [{ name: string; marks: number; isPass: boolean }] = [
//   { name: "Ali", marks: 100, isPass: true },
// ];
// --------------------------------------------------------------------
// function add(a: number, b: number): number {
//   return a + b;
// }
// add(2, 3);
// let marks: number[] = [50, 60, 70];
// let marks2: Array<number> = [50, 60, 70];
// console.log(marks);
// Primitive types
// let fullName: string = "Muhammad Ali";
// let marks: number = 20;
// let isPass: boolean = true;
// let notDefine: null = null;
// let undefine: undefined = undefined;
// let x: any = 20;
// x = "Ali";
