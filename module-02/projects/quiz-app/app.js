const correctAnswers = ["c", "a", "a", "a"];

const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  const totalQuestions = correctAnswers.length;
  const scorePerQuestion = 100 / totalQuestions;

  // Collect user answers dynamically based on the total number of questions
  const userAnswers = [];
  for (let i = 1; i <= totalQuestions; i++) {
    userAnswers.push(form[`q${i}`].value);
  }

  console.log("scorePerQuestion", scorePerQuestion);
  // Check answers and calculate score
  for (let i = 1; i <= userAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score += scorePerQuestion;
    }
  }

  // Round score to avoid floating point issues
  score = Math.round(score);

  // Show result on page
  scrollTo(0, 0);
  // Animation
  let output = 0;
  const timer = setInterval(() => {
    result.querySelector("span").textContent = `${output}%`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
  result.classList.remove("d-none");
});

// const correctAnswers = ["c", "a", "b", "d"];

// const form = document.querySelector(".quiz-form");
// const result = document.querySelector(".result");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   let score = 0;

//   const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

//   // check answers
// Check answers and calculate score
//   for (let i = 1; i <= userAnswers.length; i++) {
//     if (userAnswers[i] === correctAnswers[i]) {
//       score += 25;
//     }
//   }

//   // show result on page
//   scrollTo(0, 0);
//   // animation
//   let output = 0;
//   const timer = setInterval(() => {
//     result.querySelector("span").textContent = `${output}%`;
//     if (output === score) {
//       clearInterval(timer);
//     } else {
//       output++;
//     }
//   }, 10);
//   result.classList.remove("d-none");
// });

// let number = 4.6;
// let roundedNumber = Math.round(number);

// console.log(roundedNumber);
