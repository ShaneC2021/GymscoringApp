let competitors = [];
let errorCount;

function validate() {
  errorCount = 0;                                     // resets errorCount when validate function is called
  let arrayOfInputIds = ["Name","Ex1","Ex2","Ex3","Ex4","Ex5","Ex6","Dscore","Bonus","Penalty"]
  
  
  arrayOfInputIds.forEach(errorCheck);  
  if(errorCount === 0)                                // if fields are filled input is submitted and athlete score tabulated 
  addCompetitors();
                                          
}

function addCompetitors() {   // function adds competitor object to array

  let competitor = {
  name: document.getElementById("Name").value.toUpperCase(),
  dscore: document.getElementById("Dscore").value,
  e1: document.getElementById("Ex1").value,
  e2: document.getElementById("Ex2").value,
  e3: document.getElementById("Ex3").value,
  e4: document.getElementById("Ex4").value,
  e5: document.getElementById("Ex5").value,
  e6: document.getElementById("Ex6").value,
  bonus: document.getElementById("Bonus").value,
  penalty: document.getElementById("Penalty").value, 
 
  finalScore: function() {                    // method to return an athlete's final score
    let difficulty = parseFloat(this.dscore);
    let ex1 = parseFloat(this.e1);
    let ex2 = parseFloat(this.e2);
    let ex3 = parseFloat(this.e3);
    let ex4 = parseFloat(this.e4);
    let ex5 = parseFloat(this.e5);
    let ex6 = parseFloat(this.e6);
  
    let bonusScore = parseFloat(this.bonus);
    let penaltyScore = parseFloat(this.penalty);
    let deductions = ex1 + ex2 + ex3 + ex4 + ex5 + ex6;
    let averageDeductions = deductions / 6;
    let fscore =  difficulty + (10 - averageDeductions) + bonusScore - penaltyScore;
    return fscore.toFixed(3);
  }
};
  
competitors.push(competitor);                                 // competitor object is added to array
document.getElementById("myForm").reset();                    // form is reset 
competitors.sort((a,b) => b.finalScore() - a.finalScore());   // array is sorted in descending order
loadTableData(competitors);                                   // array contents displayed in table
}


function loadTableData(athletes) {
  let tableBody = document.getElementById("tableData");       
  let dataHtml = "";

  for (let athlete of athletes) {  // not particularly fond of the line below I know there is 
                                   // probably a more efficient way to do this rather than have it hard coded in but atm this method makes sense in my head
   dataHtml += `<tr><td>${athlete.name}</td><td>${athlete.dscore}</td><td>${athlete.bonus}</td>
                <td>${athlete.penalty}</td><td>${athlete.finalScore()}</td></tr>`;
  }
   tableBody.innerHTML = dataHtml;
  }
 
function reset() {                                
  let tableBody = document .getElementById("tableData");
  let dataHtml = "";                      
  competitors.length = 0;                                   // empties array
  tableBody.innerHTML = dataHtml;                           // clears table contents
}
  
function errorCheck(string) {                                     // checks for empty form fields 
  if(document.getElementById(string).value === "") {
    document.getElementById(string).style.borderColor = "red";
    errorCount += 1;
}
  else 
  document.getElementById(string).style.borderColor = "";                            
}