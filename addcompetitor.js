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

////////////

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

////////////////////////

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

  modalOverlay.classList.toggle("closed");
  popupModal.classList.toggle("closed");

  // synchronizes the fade out with the display being set to none
  setTimeout(function () {
    modalOverlay.style.display = "none";
    popupModal.style.display = "none";
  }, 750);
}

function eScore() {
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
  executionScore = 10 - averageDeductions;
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
      let finalScore = difficulty + execution + bonusScore - penaltyScore;
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
  competitors.sort((a, b) => b.finalScore() - a.finalScore());
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
    }</td></tr>`;
  }
  tableBody.innerHTML = dataHtml;
}

/* 
    clears table and form resets form fields to neutral state
    empties array clears table contents
  */
function reset() {
  let form = document.getElementById("myForm");
  let tableBody = document.getElementById("tableData");
  let input = document.getElementsByTagName("input");

  competitors.length = 0;
  tableBody.innerHTML = "";

  // resets input border color to neutral state

  for (let i = 0; i < input.length; i++) {
    input[i].style.borderColor = " rgb(46, 6, 29)";
  }
  form.reset();
}
// if form field is empty border changes to blue and error counter is incremented
function errorCheck(string) {
  if (
    document.getElementById(string).value === "" &&
    document.getElementById(string).disabled === false
  ) {
    document.getElementById(string).style.borderColor = "blue";
    errorCount += 1;
  } else document.getElementById(string).style.borderColor = "";
}

// ranks competitors using their index in the array after it has been sorted
function rank() {
  for (let i = 0; i < competitors.length; i++) {
    competitors[i].rank = competitors.indexOf(competitors[i]) + 1;
  }
}

//added  stopWatch    I know more global variables probably a better way to do this
let stopTime = true;
let milicounter = 0;
let secondsCounter = 0;
let minuteCounter = 0;
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let myTimer;

function begin() {
  if (stopTime === true) {
    stopTime = false;
    myTimer = setInterval(function () {
      milicounter += 1;
      secondsCounter += 1;

      if (secondsCounter < 10) seconds.innerText = `0${secondsCounter}`;
      else document.getElementById("seconds").innerText = secondsCounter;

      if (secondsCounter === 60) {
        secondsCounter = 0;
        minuteCounter += 1;
        seconds.innerText = `0${secondsCounter}`;
      }

      if (minuteCounter < 10)
        document.getElementById("minutes").innerText = `0${minuteCounter}`;
      else document.getElementById("minutes").innerText = minuteCounter;
    }, 1000);
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
    seconds.innerText = "00";
  }
}

