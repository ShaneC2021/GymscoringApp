
let competitors = [];
let error = [];

function addCompetitors() {   // function adds competitor object to array

  // let dscore = document.getElementById("Dscore").value;
  // let e1 = document.getElementById("Ex1").value;
  // let e2 = document.getElementById("Ex2").value;
  // let e3 = document.getElementById("Ex3").value;
  // let e4 = document.getElementById("Ex4").value;
  // let e5 = document.getElementById("Ex5").value;
  //  let e6 = document.getElementById("Ex6").value;
  //  let bonus = document.getElementById("Bonus").value;
  //  let penalty= document.getElementById("Penalty").value; 
  // let name = document.getElementById("Name").value;
  
  validate();           // returns 0 if ny of the form fields are empty

  if(validate() === 0) {    // if validation fails user is prompted to fill in empty fields , form is not submitted
   addCompetitors();
  }

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

  competitors.push(competitor);
  document.getElementById("myForm").reset();
  addTableRow(competitor);

}

function addTableRow(obj) {              
  let i = competitors.length;             //keeps track of number of competitors
  let name = obj.name;                    //current competitor gets printed to the table
  let dscore = obj.dscore;
  let fscore = obj.finalScore();
  let bonus = obj.bonus;
  let penalty = obj.penalty;
  
  let table = document.getElementsByTagName("table")[0];
  let newRow = table.insertRow(1);
  let cel1 = newRow.insertCell(0);
  let cel2 = newRow.insertCell(1);  
  let cel3 = newRow.insertCell(2);
  let cel4 = newRow.insertCell(3);
  let cel5 = newRow.insertCell(4);
   
  cel1.innerHTML = name;
  cel2.innerHTML = dscore;
  cel3.innerHTML = bonus;
  cel4.innerHTML = penalty;
  cel5.innerHTML = fscore;
}

function validate() {
  let errorCount = 0;
  if(document.getElementById("Name").value ==="") {                   // if form field is empty  form field border is highlighted red
    document.getElementById("Name").style.borderColor = "red";       
    errorCount += 1;                                                 // errorCounter is incremented
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
    
  if(errorCount !== 0)                                           // if there is an error in any field function returns 0;
    return 0;         
}

