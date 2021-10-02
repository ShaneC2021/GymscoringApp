function fscore() {
  
  let difficulty = parseFloat(document.getElementById("Dscore").value);
  let E1 = parseFloat(document.getElementById("E1").value);
  let E2 = parseFloat(document.getElementById("E2").value);
  let E3 = parseFloat(document.getElementById("E3").value);
  let E4 = parseFloat(document.getElementById("E4").value);
  let E5 = parseFloat(document.getElementById("E5").value);
  let E6 = parseFloat(document.getElementById("E6").value);

  let bonus = parseFloat(document.getElementById("Bonus").value);
  let penalty = parseFloat(document.getElementById("Penalty").value);

  let deductions = (E1+E2+E3+E4+E5+E6)/6;

  let finalScore =  difficulty + (10 - deductions) + bonus - penalty;

  document.getElementById("finalscore").value = finalScore;
}