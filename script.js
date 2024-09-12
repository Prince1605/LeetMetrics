document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-card");

  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username Should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username ");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to Fetch The Username");
      }
      const parsedData = await response.json();
      console.log("Logging data :", parsedData);
      displayUserData(parsedData);
    } catch (error) {
      statsContainer.innerHTML = `<p>No Data Found</p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(parsedData) {
    const totalEasyQues = parsedData.totalEasy;
    const totalMediumQues = parsedData.totalMedium;
    const totalHardQues = parsedData.totalHard;

    // const SolvedTotalQuestion = parsedData.totalSolved;
    const SolvedTotalEasyQuestion = parsedData.easySolved;
    const SolvedTotalMediumQuestion = parsedData.mediumSolved;
    const SolvedTotalHardQuestion = parsedData.hardSolved;

    updateProgress(
      SolvedTotalEasyQuestion,
      totalEasyQues,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      SolvedTotalMediumQuestion,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      SolvedTotalHardQuestion,
      totalHardQues,
      hardLabel,
      hardProgressCircle
    );

    // Optionally update additional stats, for example:
    cardStatsContainer.innerHTML = `
         <p>Total Solved: ${parsedData.totalSolved}</p>
         <p>Acceptance Rate: ${parsedData.acceptanceRate}%</p>
         <p>Ranking: ${parsedData.ranking}</p>
     `;
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("Loggin username :", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }

    //from here new code

      // Add the 'animate' class to the button
      searchButton.classList.add('animate');

      // Remove the 'animate' class after animation ends
      searchButton.addEventListener('animationend', function () {
          searchButton.classList.remove('animate');
      }, { once: true });
  });
});
