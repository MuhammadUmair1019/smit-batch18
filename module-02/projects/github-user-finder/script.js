const usernameInput = document.querySelector("#usernameInput");
const searchBtn = document.querySelector("#searchBtn");

const profileCard = document.querySelector("#profileCard");
const statusText = document.querySelector("#statusText");

const userImg = document.querySelector("#userImg");
const userName = document.querySelector("#userName");
const userBio = document.querySelector("#userBio");

const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const repos = document.querySelector("#repos");

const profileLink = document.querySelector("#profileLink");

async function getGitHubUser() {
  const username = usernameInput.value.trim();

  if (username === "") {
    statusText.innerText = "Please enter a username!";
    profileCard.style.display = "none";
    return;
  }

  try {
    statusText.innerText = "Loading...";
    profileCard.style.display = "none";

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found!");
    }

    const data = await response.json();

    userImg.src = data.avatar_url;
    userName.innerText = data.name ? data.name : data.login;
    userBio.innerText = data.bio ? data.bio : "No bio available";

    followers.innerText = data.followers;
    following.innerText = data.following;
    repos.innerText = data.public_repos;

    profileLink.href = data.html_url;

    profileCard.style.display = "block";
    statusText.innerText = "User loaded successfully!";
  } catch (error) {
    statusText.innerText = error.message;
    profileCard.style.display = "none";
  }
}

searchBtn.addEventListener("click", getGitHubUser);

usernameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getGitHubUser();
  }
});