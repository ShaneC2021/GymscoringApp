let competitors = [];

function addCompetitors() {

let competitor = {
 Name: document.getElementById("Name").value,
 Dscore: document.getElementById("Dscore").value,
 E1:document.getElementById("Ex1").value,
 E2:document.getElementById("Ex2").value,
 E3:document.getElementById("Ex3").value,
 E4:document.getElementById("Ex4").value,
 E5:document.getElementById("Ex5").value,
 E6:document.getElementById("Ex6").value,
 Bonus:document.getElementById("Bonus").value,
 Penalty:document.getElementById("Penalty").value, 
 Rank: function(){},
 
 FinalScore: function() {  // method to return an athlete's final score
    let difficulty = parseFloat(this.Dscore);
    let e1 =parseFloat(this.E1);
    let e2 =parseFloat (this.E2);
    let e3 =parseFloat (this.E3);
    let e4 =parseFloat(this.E4);
    let e5 =parseFloat(this.E5);
    let e6 =parseFloat(this.E6);
  
    let bonus = parseFloat(this.Bonus);
    let penalty = parseFloat(this.Penalty);
  
    let deductions = (e1+e2+e3+e4+e5+e6)/6;
  
    let finalScore =  difficulty + (10 - deductions) + bonus - penalty;
  
    return finalScore;
  }
};

competitors.push(competitor); // adds competitor object to the array

// for debugging console.log(JSON.stringify(competitor));
//document.getElementById("FinalScore").value = competitors[0].FinalScore();

document.getElementById("myForm").reset();

// All code below this point are for ideas and debugging purposes but it's all working at this point yay me


addtableRow(competitors, "Name");// adds a table row to display an athlete's scores and rank accepts competitor object as argument
                                // currently it just adds the name
}


 function addtableRow(array, key) { //array property and array passed to function as arguments
  let i = array.length;             //keeps track of number of competitors
  
  let name = array[i-1][key];    //current competitor gets printed to the table
   
   let table = document.getElementsByTagName("table")[0];
   let newRow = table.insertRow(1);
   let cel1 = newRow.insertCell(0);
 //  let cel2 = newRow.insertCell(1);  will be for the other categories headings like score and rank
 //  let cel3 = newRow.insertCell(2);

   cel1.innerHTML = name;
 }