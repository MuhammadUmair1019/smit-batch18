const userImg = document.querySelector("#userImg");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userCountry = document.querySelector("#userCountry");
const btn = document.querySelector("#btn");
const statusText = document.querySelector("#statusText");

async function getRandomUser() {
  try {
    statusText.innerText = "Loading user...";
    btn.disabled = true;

    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const user = data.results[0];

    userImg.src = user.picture.large;
    userName.innerText = `${user.name.first} ${user.name.last}`;
    userEmail.innerText = user.email;
    userCountry.innerText = user.location.country;

    statusText.innerText = "User loaded successfully!";
    btn.disabled = false;
  } catch (error) {
    statusText.innerText = "Something went wrong. Try again!";
    btn.disabled = false;
    console.log(error);
  }
}

btn.addEventListener("click", getRandomUser);

getRandomUser();