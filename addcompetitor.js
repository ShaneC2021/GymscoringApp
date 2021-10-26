let competitors = [];

function validate() {
  
  let errorCount = 0;
  if(document.getElementById("Name").value ==="") {                   // if form field is empty  form field border is highlighted red
  document.getElementById("Name").style.borderColor = "red";       
  errorCount += 1;                                                   // errorCounter is incremented
}
  else 
    document.getElementById("Name").style.borderColor = "";          

  if(document.getElementById("Dscore").value ==="") {
    document.getElementById("Dscore").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Dscore").style.borderColor = "";

  if(document.getElementById("Bonus").value === "") {
    document.getElementById("Bonus").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Bonus").style.borderColor = "";

  if(document.getElementById("Penalty").value === "") {
    document.getElementById("Penalty").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Penalty").style.borderColor = "";

  if(document.getElementById("Ex1").value === "") {
    document.getElementById("Ex1").style.borderColor = "red";
    errorCount += 1;

}
  else 
    document.getElementById("Ex1").style.borderColor = "";
       
  if(document.getElementById("Ex2").value === "") {
    document.getElementById("Ex2").style.borderColor = "red";
}
   else 
   document.getElementById("Ex2").style.borderColor = "";

  if(document.getElementById("Ex3").value === "") {
    document.getElementById("Ex3").style.borderColor = "red";
    errorCount += 1;
}
  else 
   document.getElementById("Ex3").style.borderColor = "";

  if(document.getElementById("Ex4").value ==="") {
    document.getElementById("Ex4").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Ex4").style.borderColor = "";
  if(document.getElementById("Ex5").value === "") {
    document.getElementById("Ex5").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Ex5").style.borderColor = "";
               
  if(document.getElementById("Ex6").value === "") {
    document.getElementById("Ex6").style.borderColor = "red";
    errorCount += 1;
}
  else 
    document.getElementById("Ex6").style.borderColor = "";
  
    if(errorCount === 0) {                                 // if fields ar filled input is submitted and athlete score tabulated 
    addCompetitors();
  }                                        
}


function addCompetitors() {   // function adds competitor object to array

  
  let competitor = {
  name: document.getElementById("Name").value,
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
competitors.sort((a,b) => b.finalScore() - a.finalScore());   // array is sorted in descnding order
loadTableData(competitors);                                   // array contents displayed in table
}


function loadTableData(athletes) {
  let tableBody = document.getElementById("tableData");       
  let dataHtml = "";

  for (let athlete of athletes) {  // not particularly fond of the line below I know there is probably a more efficient way to do this rather than have it hard coded in but atm this method makes sense in my head
   dataHtml += `<tr><td>${athlete.name}</td><td>${athlete.dscore}</td><td>${athlete.bonus}</td><td>${athlete.penalty}</td><td>${athlete.finalScore()}</td></tr>`;
  }
   tableBody.innerHTML = dataHtml;
  }
 
function reset() {                                
  let tableBody = document .getElementById("tableData");
  let dataHtml = "";                      
  competitors.length = 0;                                   // empties array
  tableBody.innerHTML = dataHtml;                           // clears table contents
}
  