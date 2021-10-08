// all of these functions do the same thing - write it once and use function parameters to make it dynamic
// update addAthletes() to leverage this single function
function addInput(containerId, placeholder, id) {
  let container = document.getElementById(containerId);
  let input = document.createElement("input");
  
  input.type = "text";
  input.name = "";
  input.placeholder = placeholder;
  input.size = "1";
  input.id = id
  
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
}

function addE1() { // adds E1 input box to display 
  let E1 = document.getElementById("Ex1");
  let input = document.createElement("input");
  
  input.type = "text";
  input.name = "";
  input.placeholder = "E1";
  input.size = "1";
  // these IDs will conflict if you have more than 1 competitor
  // better to use an outer div/id for each athlete and find the related items
  // ex. document.querySelectorAll('#athlete1 input')
  input.id = "E1"
  
  E1.appendChild(input);
  E1.appendChild(document.createElement("br"));
}

function addE2() { //adds E2 input box to screen along with its's attributes
  let E2 = document.getElementById("Ex2");
  let input = document.createElement("input");

  input.type = "text";           
  input.name = "";
  input.placeholder = "E2";
  input.size = "1";
  input.id = "E2"

  E2.appendChild(input);
  E2.appendChild(document.createElement("br"));

}


function addE3() {
  let E3 = document.getElementById("Ex3");
  let input = document.createElement("input");

  input.type = "text";
  input.name = "";
  input.placeholder = "E3";
  input.size = "1";
  input.id = "E3";

  E3.appendChild(input);
  E3.appendChild(document.createElement("br"));
}


function addE4() {
  let E4 = document.getElementById("Ex4");
  let input = document.createElement("input");

  input.type = "text";
  input.name = "";
  input.placeholder = "E4";
  input.size = "1";
  input.id = "E4";

  E4.appendChild(input);
  E4.appendChild(document.createElement("br"));
}

function addE5() {
  let E5 = document.getElementById("Ex5");
  let input = document.createElement("input");
  
  input.type = "text";
  input.name = "";
  input.placeholder = "E5";
  input.size = "1";
  input.id = "E5";

  E5.appendChild(input);
  E5.appendChild(document.createElement("br"));
}

function addE6() {

  let E6 = document.getElementById("Ex6");
  let input = document.createElement("input");

  input.type = "text";
  input.name = "";
  input.placeholder = "E6";
  input.size = "1";
  input.id = "E6";
  
  E6.appendChild(input);
  E6.appendChild(document.createElement("br"));
}

function addD() {  //adds Dscore input box to screen
  let D = document.getElementById("Dscore");
  let input = document.createElement("input");
  
  input.type = "text";
  input.name = "";
  input.placeholder = "D";
  input.size = "2";
  input.id = "D";

  D.appendChild(input);
  D.appendChild(document.createElement("br"));
}

function addBonus() {  
    let bonus = document.getElementById("Bonus");
    let input = document.createElement("input");
    
    input.type = "text";
    input.name = "";
    input.placeholder = "Bonus";
    input.size = "3";
    input.id = 'B'
  
    bonus.appendChild(input);
    bonus.appendChild(document.createElement("br"));
  }

  function addPenalty() {  
    let penalty = document.getElementById("Penalty");
    let input = document.createElement("input");
    
    input.type = "text";
    input.name = "";
    input.placeholder = "Penalty";
    input.size = "3";
    input.id = "P"
  
    penalty.appendChild(input);
    penalty.appendChild(document.createElement("br"));
  }
  
  function addFinalScore() {  //adds Dscore input box to screen
    let finalScore = document.getElementById("FinalScore");
    let input = document.createElement("input");
    
    input.type = "text";
    input.name = "";
    input.placeholder = "FinalScore";
    input.size = "5";
    input.id = "final"
  
    finalScore.appendChild(input);
    finalScore.appendChild(document.createElement("br"));
  }
  
function addAthletes() {    //accepts user input and displays scoring inputs based on #of athletes

  let number = document.getElementById("numberOfAthletes").value; //number of inputs to create
  let newAthlete = document.getElementById("Name");
  
  for (let i = 0; i < number; i++) {
    let input = document.createElement("input");
    
    input.type = "text";
    input.placeholder = "Athlete Name";
    input.size = "10";
    
    newAthlete.appendChild(input);
    newAthlete.appendChild(document.createElement("br"));

    addInput("Ex1", "E1", "E1");
    addInput("Ex2", "E2", "E2");
    addInput("Ex3", "E3", "E3");
    addInput("Ex4", "E4", "E4");
    addInput("Ex5", "E5", "E5");
    addInput("Ex6", "E6", "E6");

    addD();
    // addE1();
    // addE2();
    // addE3();
    // addE4();
    // addE5();
    // addE6();
    addBonus();
    addPenalty();
    addFinalScore();
}
}
