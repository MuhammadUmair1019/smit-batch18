// const secretNumber = Math.floor(Math.random() * 10) + 1;

// let attempts = 0;
// let maxAttempts = 3;
// let guess;

// alert("Number Guessing Game");
// alert("You have 3 attempts to guess a number between 1 and 10.");

// while (attempts < maxAttempts) {
//   guess = prompt(
//     `Attempt  ${attempts + 1}  of  ${maxAttempts}  \nEnter your guess:`,
//   );

//   if (guess === null) {
//     alert("Game cancelled by user.");
//     break;
//   }

//   guess = Number(guess);
//   attempts++;

//   if (guess === secretNumber) {
//     alert(
//       "Correct guess.\n" +
//         "You guessed the number in " +
//         attempts +
//         " attempt(s).",
//     );
//     break;
//   } else if (guess > secretNumber) {
//     alert("Incorrect. Your guess is too high.");
//   } else if (guess < secretNumber) {
//     alert("Incorrect. Your guess is too low.");
//   } else {
//     alert("Invalid input. Please enter a number.");
//   }

//   if (attempts === maxAttempts) {
//     alert(
//       "Game over.\n" +
//         "You have used all attempts.\n" +
//         "The correct number was: " +
//         secretNumber,
//     );
//   }
// }

//  const secretNumber = Math.floor(Math.random() * 10) + 1;
// const secretNumber = 4;
// let guess = null;
// let count = 0;
// let totalAttempt = 0;
// let totalCount = 3;

// while (guess !== secretNumber) {
//   guess = Number(prompt("Guess a number between 1 and 10"));

//   count ++;
//   console.log(guess);
//   if (guess > secretNumber) {
//     alert("Too high! Try again.");
//   } else if (guess < secretNumber) {
//     alert("Too low! Try again.");
//   } else if (guess === secretNumber) {
//     alert("Correct! You guessed the number!");

//     break;
//   } else {
//     alert("Please enter a valid number.");
//   }
//   totalAttempt--;
//   console.log(count);

// }

// let count = 0;
// let secretNumber = 5;
// let guess = 0;

// while(guess !== secretNumber)
// {
//     guess = +prompt("Enter any number with 1-10");
//     count++;
//     if (guess > secretNumber && count < 5) {
//         alert("Too large Number")
//     }
//     else if ( guess < secretNumber && count < 5){
//         alert("Too Small")
//     }
//     else if (guess === secretNumber) {
//         alert("Congrats! You've Enter Secret Number")
//     }
//     else{
//         alert("Game over!")
//     }
// }

///------------------
// let winNumber = 4;

// let userInput = +prompt("Please enter your number! (1 to 10)");
// let userGuess = 0;

// while (userInput !== winNumber) {}

// if (userInput === winNumber) {
//   alert("You won!");
// } else {
//   alert("You loss!");
// }

// console.log(userInput);

// -----------------------------------------
// let i = 0;

// while (i <= 3) {
//   console.log(i);
//   i++;
// }

// for(let i=0; i< 10; i++) {
//     console.log(i)
// }

// ----------------------------------
// console.log(Math.ceil(7.4))
// console.log(Math.round(7.4))
// console.log(Math.floor(7.8))

// let num = 4.1222
// console.log(num.toFixed(1))

// ------------------------------------------
// let random = Math.random() * 10
// console.log(Math.floor(random) + 1)

//  const secretNumber = Math.floor(Math.random() * 10) + 1;
//   let guess = null;

//   while (guess !== secretNumber) {
//     guess = Number(prompt("Guess a number between 1 and 10"));

//     if (guess > secretNumber) {
//       alert("Too high! Try again.");
//     } else if (guess < secretNumber) {
//       alert("Too low! Try again.");
//     } else if (guess === secretNumber) {
//       alert("Correct! You guessed the number!");
//     } else {
//       alert("Please enter a valid number.");
//     }
//   }
