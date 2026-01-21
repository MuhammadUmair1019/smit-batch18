/*************************************************
 * JavaScript Memory + Variables (Lecture Notes)
 *
 * Topics:
 * 1. Primitive vs Non-Primitive
 * 2. Stack vs Heap Memory
 * 3. var vs let vs const
 *************************************************/


// Digram link
// https://excalidraw.com/#json=8fe6x7aFK95HWLHYcM5_Z,X8RPu0IH-MxD4j4dGLoH1w

/* =================================================
   STACK vs HEAP MEMORY (IMPORTANT CONCEPT)
================================================= */

/*
STACK MEMORY
- Stores primitive values
- Stores function call execution
- Fast access
- Each variable gets its own copy

HEAP MEMORY
- Stores non-primitive values (objects, arrays, functions)
- Stores references (addresses)
- Slower than stack
- Multiple variables can point to SAME memory
*/


/* =================================================
   NON-PRIMITIVE (Reference Type)
   object, array, function
================================================= */

let obj1 = { name: 'Ahmed', age: 20 };
let obj2 = obj1; // same HEAP reference

/*
Memory:
obj1 ──► 0x101 (heap) { name: 'Ahmed', age: 20 }
obj2 ──► 0x101 (same heap object)
*/

obj2.age = 40;

console.log(obj1); // { name: 'Ahmed', age: 40 }
console.log(obj2); // { name: 'Ahmed', age: 40 }

/*
WHY?
Because both variables point to the SAME heap memory.
Changing one affects the other.
*/


/* =================================================
   PRIMITIVE (Value Type)
   number, string, boolean, null, undefined, symbol
================================================= */

let x = 10;
let y = x;

/*
Memory:
x = 10 (stack)
y = 10 (stack — separate copy)
*/

y = 20;

console.log(x); // 10
console.log(y); // 20

/*
WHY?
Primitive values are COPIED, not referenced.
*/


/* =================================================
   const with NON-PRIMITIVE
================================================= */

const arr = [4, 5, 6];

/*
Memory:
arr ──► 0x201 (heap) [4, 5, 6]
*/

arr[0] = 10; // ✅ allowed (mutating heap data)
// arr = [10, 20]; ❌ NOT allowed (changing reference)

console.log(arr); // [10, 5, 6]

/*
IMPORTANT:
const means:
- Reference cannot change
- Data inside CAN change (for objects/arrays)
*/


/* =================================================
   let with NON-PRIMITIVE
================================================= */

let array1 = [2, 3, 4];
array1[0] = 10;     // allowed
array1 = [50];      // allowed (new reference)

console.log(array1); // [50]


/* =================================================
   var with NON-PRIMITIVE
================================================= */

var array2 = [2, 3, 4];
array2[0] = 10;
var array2 = [50]; // re-declare allowed

console.log(array2); // [50]


/* =================================================
   PRIMITIVE + var / let / const
================================================= */

/* ---------- const ---------- */
// Cannot re-declare
// Cannot update

const a = 10;
// a = 20;       ❌ error
// const a = 30; ❌ error

console.log('const:', a);


/* ---------- let ---------- */
// Cannot re-declare
// Can update

let b = 100;
b = 40;

console.log('let:', b);


/* ---------- var ---------- */
// Can re-declare
// Can update

var c = 10;
var c = 20;
c = 30;

console.log('var:', c);


/* =================================================
   SUMMARY (VERY IMPORTANT FOR INTERVIEWS)
================================================= */

/*
PRIMITIVE:
- Stored in STACK
- Passed by VALUE
- Independent copies

NON-PRIMITIVE:
- Stored in HEAP
- Passed by REFERENCE
- Shared memory

const:
- No re-assign
- Safer
- Use by default

let:
- Re-assign allowed
- Block scoped

var:
- Function scoped
- Re-declare allowed
- Avoid using
*/
