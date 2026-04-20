// Iterables (arrays, strings, maps, sets)

const arr = [1, 2, 3, 4, 5];

for (const item of arr) {
    console.log(item);
}

console.log("--------------------------------");
// Strings
const str = "Hello";

for (const char of str) {
    console.log(char);
}

console.log("--------------------------------");

// Sets
const set = new Set([1, 2, 3, 4, {name: 'Ali', age: 20}]);
console.log(set)
for (const item of set) {
    console.log(item);
}

console.log("--------------------------------");

// Maps
// Maps are similar to objects, but they are iterable and unique
// const map = new Map([
//     ["apple", 1],
//     ["banana", 2],
//     ["cherry", 3],
// ]);

// console.log(map)

// for (const [key, value] of map) {
//     console.log(key, value);
// }
const map = new Map([
    ["apple", 1],
    ["banana", 2],
    ["cherry", 3],
])

for(const [key, value] of map) {
    // console.log(key, value);
    console.log(key, value);
}

// map.set("orange", 10)
// console.log(map.get("orange"))
// console.log(map)

// map.delete("apple")
// console.log(map)

// map.clear()
// console.log(map)


// cloning
// Cloning objects examples

const obj = {name: 'Ali', age: 20};

// Using spread operator
const copy1 = {...obj};
console.log(copy1);

// Using Object.assign
const copy2 = Object.assign({}, obj);
console.log(copy2);

// Using JSON methods (deep clone)
const copy3 = JSON.parse(JSON.stringify(obj));
console.log(copy3);

// Overriding properties while cloning
const updated = {...obj, name: 'Ahmed', age: 21};
console.log(updated);

// what is deep vs shallow copy
// deep copy is a copy of an array that is not referenced to the original array
// shallow copy is a copy of an array that is referenced to the original array

const user = {
    name: "Umair",
    address: { city: "Karachi" }
  };
  
  const deepCopy = structuredClone(user);
  
  deepCopy.address.city = "Lahore";
  
  console.log(user.address.city); // Karachi (not changed)
  console.log(deepCopy.address.city); // Lahore