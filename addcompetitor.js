let competitors = [];
let errorCount;
let judges = 0;

window.addEventListener('DOMContentLoaded', () => {
 document.getElementById("modal").style.display = "block";
});

function numOfJudges () {
  let numberOfJudges ;
  let popupModal = document.getElementById("modal");
  let modalOverlay=document.getElementById("modal-overlay");
  
  numberOfJudges = document.getElementById("judgeOptions");
  judges = numberOfJudges.options[numberOfJudges.selectedIndex].value;
 
  function disableInputs() {
    let escores = document.getElementsByClassName("execution");
    for( let i = escores.length; i > judges; i--)
    escores[i-1].disabled = true;
  }
  
  disableInputs();

  function fadeModals() {
    modalOverlay.classList.toggle("closed");
    popupModal.classList.toggle("closed");
  }
  
  fadeModals();

  // synchronizes the fade out with the display being set to none
  setTimeout(function() {
    modalOverlay.style.display = "none";
    popupModal.style.display = "none";
  }, 1000);
}

function eScore() {
  let averageDeductions = 0;
  let escores = document.getElementsByClassName("execution");
  let executionScore = 0;
  
  function deductions() {
    let total = 0;

    for (let i = 0; i < escores.length; i++) {
      if (escores[i].disabled === true)
        escores[i].value = 0;

      total = parseFloat(escores[i].value) + total;
    }
    return total;
  }
    
  averageDeductions = parseFloat(deductions() / judges);
  executionScore = (10 - averageDeductions); 
  return executionScore;
}
 

function validate() {
  errorCount = 0;       // resets errorCount when validate function is called
  let arrayOfInputIds = ["Name","Ex1","Ex2","Ex3","Ex4","Ex5","Ex6","Dscore","Bonus","Penalty"]
  
  // if fields are filled input is submitted and athlete score tabulated
  arrayOfInputIds.forEach(errorCheck);  
  if(errorCount === 0)                                 
  addCompetitors();
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
  finalScore: function() {                    // method to return an athlete's final score
    let difficulty = this.difficultyScore;
    let bonusScore = this.bonus;
    let execution = this.executionScore;
    let penaltyScore = this.penalty;
    let finalScore = difficulty + execution + bonusScore - penaltyScore;
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
competitors.sort((a,b) => b.finalScore() - a.finalScore());   
rank();                                                       
loadTableData(competitors);                                  
}


function loadTableData(athletes) {
  let tableBody = document.getElementById("tableData");       
  let dataHtml = "";

  for (let athlete of athletes) {  
   dataHtml += `<tr><td>${athlete.name}</td><td>${athlete.difficultyScore}</td><td>${athlete.executionScore}</td><td>${athlete.bonus}</td>
    <td>${athlete.penalty}</td><td>${athlete.finalScore()}</td><td>${athlete.rank}</td></tr>`;
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
  
  for ( let i = 0; i < input.length; i++) {                
    input[i].style.borderColor = "";
  }
  form.reset();    
}
   // if form field is empty border changes to red and error counter is incremented
function errorCheck(string) {                                     
  if((document.getElementById(string).value === "") && (document.getElementById(string).disabled ===false )) {     
    document.getElementById(string).style.borderColor = "red";
    errorCount += 1;
  }
  else 
  document.getElementById(string).style.borderColor = "";                            
}

// ranks competitors using their index in the array after it has been sorted
function rank () {
 for (let i = 0; i < competitors.length; i++ ) {
   competitors[i].rank = competitors.indexOf(competitors[i]) + 1;  
  }
}