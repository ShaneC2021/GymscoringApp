"use strict";

var competitors = [];
var errorCount;
var judges = 0;
var drawing = false;
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("myForm");
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  trapFocus(modal);
}); ////////////

var trapFocus = function trapFocus(element) {
  var prevFocusableElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.activeElement;
  var focusableEls = Array.from(element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var currentFocus = null;
  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  var handleFocus = function handleFocus(e) {
    e.preventDefault(); // if the focused element "lives" in your modal container then just focus it

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
      } // update the current focus var


      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true);
  return {
    onClose: function onClose() {
      document.removeEventListener("focus", handleFocus, true);
      prevFocusableElement.focus();
    }
  };
}; ////////////////////////


function numOfJudges() {
  var numberOfJudges;
  var popupModal = document.getElementById("modal");
  var modalOverlay = document.getElementById("modal-overlay");
  var escores = document.getElementsByClassName("execution");
  numberOfJudges = document.getElementById("judgeOptions");
  judges = numberOfJudges.options[numberOfJudges.selectedIndex].value;

  for (var i = escores.length; i > judges; i--) {
    escores[i - 1].disabled = true;
    escores[i - 1].style.backgroundColor = "grey";
  }

  modalOverlay.classList.toggle("closed");
  popupModal.classList.toggle("closed"); // synchronizes the fade out with the display being set to none

  setTimeout(function () {
    modalOverlay.style.display = "none";
    popupModal.style.display = "none";
  }, 750);
}

function eScore() {
  var averageDeductions = 0;
  var escores = document.getElementsByClassName("execution");
  var executionScore = 0;
  var total = 0;

  for (var i = 0; i < escores.length; i++) {
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

  var arrayOfInputIds = ["Name", "Ex1", "Ex2", "Ex3", "Ex4", "Ex5", "Ex6", "Dscore", "Bonus", "Penalty"]; // if fields are filled input is submitted and athlete score tabulated

  arrayOfInputIds.forEach(errorCheck);
  if (errorCount === 0) addCompetitors();
} // function adds competitor object to array


function addCompetitors() {
  var competitor = {
    name: document.getElementById("Name").value.toUpperCase(),
    difficultyScore: parseFloat(document.getElementById("Dscore").value),
    executionScore: parseFloat(eScore()),
    bonus: parseFloat(document.getElementById("Bonus").value),
    penalty: parseFloat(document.getElementById("Penalty").value),
    rank: "",
    finalScore: function finalScore() {
      // method to return an athlete's final score
      var difficulty = this.difficultyScore;
      var bonusScore = this.bonus;
      var execution = this.executionScore;
      var penaltyScore = this.penalty;
      var finalScore = difficulty + execution + bonusScore - penaltyScore;
      return finalScore.toFixed(3);
    }
  };
  /* 
   competitor object is added to array form is reset array is sorted in descending order ranks
   athletes according to finalscore needs to be modified for ties
   array contents displayed in table
  */

  competitors.push(competitor);
  document.getElementById("myForm").reset();
  competitors.sort(function (a, b) {
    return b.finalScore() - a.finalScore();
  });
  rank();
  loadTableData(competitors);
}

function loadTableData(athletes) {
  var tableBody = document.getElementById("tableData");
  var dataHtml = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = athletes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var athlete = _step.value;
      dataHtml += "<tr><td>".concat(athlete.name, "</td><td>").concat(athlete.difficultyScore.toFixed(3), "</td><td>").concat(athlete.executionScore.toFixed(3), "</td><td>").concat(athlete.bonus, "</td>\n    <td>").concat(athlete.penalty, "</td><td>").concat(athlete.finalScore(), "</td><td>").concat(athlete.rank, "</td></tr>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  tableBody.innerHTML = dataHtml;
}
/* 
    clears table and form resets form fields to neutral state
    empties array clears table contents
  */


function reset() {
  var form = document.getElementById("myForm");
  var tableBody = document.getElementById("tableData");
  var input = document.getElementsByTagName("input");
  competitors.length = 0;
  tableBody.innerHTML = ""; // resets input border color to neutral state

  for (var i = 0; i < input.length; i++) {
    input[i].style.borderColor = " rgb(46, 6, 29)";
  }

  form.reset();
} // if form field is empty border changes to blue and error counter is incremented


function errorCheck(string) {
  if (document.getElementById(string).value === "" && document.getElementById(string).disabled === false) {
    document.getElementById(string).style.borderColor = "orange";
    errorCount += 1;
  } else document.getElementById(string).style.borderColor = "";
} // ranks competitors using their index in the array after it has been sorted


function rank() {
  for (var i = 0; i < competitors.length; i++) {
    competitors[i].rank = competitors.indexOf(competitors[i]) + 1;
  }
} //added  stopWatch    I know more global variables probably a better way to do this


var stopTime = true;
var milicounter = 0;
var secondsCounter = 0;
var minuteCounter = 0;
var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var myTimer;

function begin() {
  if (stopTime === true) {
    stopTime = false;
    myTimer = setInterval(function () {
      milicounter += 1;
      secondsCounter += 1;
      if (secondsCounter < 10) seconds.innerText = "0".concat(secondsCounter);else document.getElementById("seconds").innerText = secondsCounter;

      if (secondsCounter === 60) {
        secondsCounter = 0;
        minuteCounter += 1;
        seconds.innerText = "0".concat(secondsCounter);
      }

      if (minuteCounter < 10) document.getElementById("minutes").innerText = "0".concat(minuteCounter);else document.getElementById("minutes").innerText = minuteCounter;
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

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = 200;
var context = canvas.getContext("2d");
context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);
var drawColor = "black";
var drawWidth = "5";
var isDrawing = false;
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  event.preventDefault();
}

function draw(event) {
  if (isDrawing) {
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

  event.preventDefault();
}

function stop(event) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }

  event.preventDefault();
}

function changeColor(element) {
  drawColor = element.style.background;
}

function clearCanvas() {
  context.fillStyle = "green";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
}