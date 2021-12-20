let competitors = [];
let errorCount;
let judges = 0;

window.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("myForm");
  let modal = document.getElementById("modal");
  modal.style.display = "block";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  trapFocus(modal);
});

const trapFocus = (element, prevFocusableElement = document.activeElement) => {
  const focusableEls = Array.from(
    element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    )
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let currentFocus = null;

  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  const handleFocus = (e) => {
    e.preventDefault();
    // if the focused element "lives" in your modal container then just focus it
    if (focusableEls.includes(e.target)) {
      currentFocus = e.target;
    } else {
      // you're out of the container
      // if previously the focused element was the first element then focus the last
      // element - means you were using the shift key
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus();
      } else {
        // you previously were focused on the last element so just focus the first one
        firstFocusableEl.focus();
      }
      // update the current focus var
      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true);

  return {
    onClose: () => {
      document.removeEventListener("focus", handleFocus, true);
      prevFocusableElement.focus();
    },
  };
};

function numOfJudges() {
  let numberOfJudges;
  let popupModal = document.getElementById("modal");
  let modalOverlay = document.getElementById("modal-overlay");
  let escores = document.getElementsByClassName("execution");
  numberOfJudges = document.getElementById("judgeOptions");
  judges = numberOfJudges.options[numberOfJudges.selectedIndex].value;

  for (let i = escores.length; i > judges; i--) {
    escores[i - 1].disabled = true;
    escores[i - 1].style.backgroundColor = "grey";
  }

  // synchronizes the fade out with the display being set to none
  setTimeout(function () {
    modalOverlay.style.display = "none";
    popupModal.style.display = "none";
  }, 750);
}

function eScore() {
  let difficulty = parseFloat(document.getElementById("Dscore").value);
  let averageDeductions = 0;
  let escores = document.getElementsByClassName("execution");
  let executionScore = 0;
  let total = 0;

  for (let i = 0; i < escores.length; i++) {
    if (escores[i].disabled === true) {
      escores[i].value = 0;
    }

    total = parseFloat(escores[i].value) + total;
  }

  averageDeductions = parseFloat(total / judges);
  executionScore = parseFloat(10 - averageDeductions);

  // ensures gymnast with no difficulty receives a 0 on execution as well
  if (difficulty === 0) {
    executionScore = 0;
  }

  return executionScore;
}

function validate() {
  errorCount = 0; // resets errorCount when validate function is called
  let arrayOfInputIds = [
    "Name",
    "Ex1",
    "Ex2",
    "Ex3",
    "Ex4",
    "Ex5",
    "Ex6",
    "Dscore",
    "Bonus",
    "Penalty",
  ];

  // if fields are filled input is submitted and athlete score tabulated
  arrayOfInputIds.forEach(errorCheck);
  if (errorCount === 0) addCompetitors();
}

// function adds competitor object to array
function addCompetitors() {
  let competitor = {
    name: document.getElementById("Name").value.toUpperCase(),
    difficultyScore: parseFloat(document.getElementById("Dscore").value),
    executionScore: parseFloat(eScore()),
    bonus: parseFloat(document.getElementById("Bonus").value),
    penalty: parseFloat(document.getElementById("Penalty").value),
    rank: "",
    finalScore: function () {
      // method to return an athlete's final score
      let difficulty = this.difficultyScore;
      let bonusScore = this.bonus;
      let execution = this.executionScore;
      let penaltyScore = this.penalty;
      let finalScore;

      //prevents returning a negative score
      if (difficulty === 0) {
        finalScore = 0;
      } else finalScore = difficulty + execution + bonusScore - penaltyScore;

      // prevents returning a negative score
      if (finalScore <= 0) {
        finalScore = 0;
      }
      return finalScore.toFixed(3);
    },
  };

  /* 
   competitor object is added to array form is reset array is sorted in descending order ranks
   athletes according to finalscore needs to be modified for ties
   array contents displayed in table
  */
  competitors.push(competitor);
  document.getElementById("myForm").reset();
  competitors.sort((a, b) => {
    // if final scores are equal the higher rank is decided based off execution score
    if (b.finalScore() === a.finalScore())
      return b.executionScore - a.executionScore;

    return b.finalScore() - a.finalScore();
  });

  rank();
  loadTableData(competitors);
}

function loadTableData(athletes) {
  let tableBody = document.getElementById("tableData");
  let dataHtml = "";

  for (let athlete of athletes) {
    dataHtml += `<tr><td>${
      athlete.name
    }</td><td>${athlete.difficultyScore.toFixed(
      3
    )}</td><td>${athlete.executionScore.toFixed(3)}</td><td>${
      athlete.bonus
    }</td>
    <td>${athlete.penalty}</td><td>${athlete.finalScore()}</td><td>${
      athlete.rank
    }</td><td><i class="bi bi-trash m-1 garbage" onclick="erase(${
      athlete.rank
    })"></i></td></tr>`;
  }
  tableBody.innerHTML = dataHtml;
}

/* 
    clears table and form resets form fields to neutral state
    empties array clears table contents
  */
function clearFields() {
  let tableBody = document.getElementById("tableData");
  let modal = document.getElementById("confirmation");
  let clearTableModal = document.getElementById("clearTableModal");

  if (tableBody.innerHTML === "") {
    clearTableModal.style.display = "block";
    setTimeout(function () {
      clearTableModal.style.display = "none";
      choice.value = "";
    }, 1500);
    return 0;
  }
  modal.style.display = "block";
  trapFocus(modal);
}

function reset() {
  let tableBody = document.getElementById("tableData");
  let input = document.getElementsByTagName("input");

  competitors.length = 0;
  tableBody.innerHTML = "";

  // resets input border color to neutral state

  for (let i = 0; i < input.length; i++) {
    input[i].style.borderColor = " rgb(46, 6, 29)";
  }
}

function confirm() {
  let tableBody = document.getElementById("tableData");
  let modal = document.getElementById("confirmation");
  let choice = document.getElementById("choice");
  let selection = choice.options[choice.selectedIndex].value;

  if (selection === "Yes")
    setTimeout(function () {
      modal.style.display = "none";
      choice.value = "";
      competitors.length = 0;
      tableBody.innerHTML = "";
    }, 750);
  else
    setTimeout(function () {
      modal.style.display = "none";
      choice.value = "";
    }, 750);
}

// if form field is empty border changes to blue and error counter is incremented
function errorCheck(string) {
  if (
    document.getElementById(string).value === "" &&
    document.getElementById(string).disabled === false
  ) {
    document.getElementById(string).style.borderColor = "orange";
    errorCount += 1;
  } else document.getElementById(string).style.borderColor = "";
}

// ranks competitors using their index in the array after it has been sorted
   
function rank() {
  for (let i = 0; i < competitors.length; i++) {
    competitors[i].rank = competitors.indexOf(competitors[i]) + 1;
  }

  if (competitors.length >= 2) {
    for (let i = 1; i < competitors.length; i++) {
      // updates the rankings based on if there are ties
      // tie is broken by higher Escore 

      if (
        competitors[i].finalScore() === competitors[i - 1].finalScore() &&
        competitors[i].executionScore === competitors[i - 1].executionScore
      ) {
        competitors[i].rank = competitors[i - 1].rank;
      }
    }
  }
}

//added stopWatch I know more global variables probably a better way to do this
let stopTime = true;
let splitCounter = 0;
let secondsCounter = 0;
let minuteCounter = 0;
let split = document.getElementById("splitSecond");
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let myTimer;

function begin() {
  if (stopTime === true) {
    stopTime = false;
    myTimer = setInterval(function () {
      splitCounter += 1;

      if (splitCounter < 10) {
        split.innerText = `0${splitCounter}`;
      } else split.innerText = splitCounter;

      if (splitCounter === 100) {
        splitCounter = 0;
        split.innerText = `0${splitCounter}`;
        secondsCounter += 1;
      }

      if (secondsCounter < 10) seconds.innerText = `0${secondsCounter}`;
      else seconds.innerText = secondsCounter;

      if (secondsCounter === 60) {
        secondsCounter = 0;
        minuteCounter += 1;
        seconds.innerText = `0${secondsCounter}`;
      }

      if (minuteCounter < 10) minutes.innerText = `0${minuteCounter}`;
      else minutes.innerText = minuteCounter;
    }, 10);
  }
}

function stopTimer() {
  if (stopTime === false) {
    stopTime = true;
    clearInterval(myTimer);
  }
}

function clearTimer() {
  if (stopTime === true) {
    secondsCounter = 0;
    minuteCounter = 0;
    splitCounter = 0;
    split.innerText = "00";
    seconds.innerText = "00";
    minutes.innerText = "00";
  }
}

function erase(ranking) {
  let indexOfAthlete = ranking - 1;
  let tableBody = document.getElementById("tableData");

  tableBody.innerHTML = ""; //clear table body

  /* delete object at given index in array
     update rank of items in array
     update table based on new array
  */

  competitors.splice(indexOfAthlete, 1);
  if (competitors.length === 0) {
    loadTableData(competitors);
  } else {
   // competitors.sort((a, b) => b.finalScore() - a.finalScore());
   competitors.sort((a, b) => {
    // if final scores are equal the higher rank is decided based off execution score
    if (b.finalScore() === a.finalScore())
      return b.executionScore - a.executionScore;

    return b.finalScore() - a.finalScore();
  });
    rank();
    loadTableData(competitors);
  }
}
