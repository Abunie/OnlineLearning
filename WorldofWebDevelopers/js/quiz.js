var inputmap = {};
var bestAnswer = {};
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', checkAnswer);



function buildQuiz() {
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onload = function() {
    var xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');

    var questions = xmlDoc.getElementsByTagName("questions")[0];
    var children = questions.getElementsByTagName("question");
    var form = document.getElementById("quizform")
    for (i=0; i < children.length; i++)
    {
      var container = document.createElement("div");
      container.className = "container";
      form.appendChild(container);
      
      

        
      var row = document.createElement("div");
      row.className = "row"
      row.style= "color:blue";
      container.appendChild(row);

      

      var ask = document.createElement("div");
      ask.className = "col s12";
      row.appendChild(ask);
     

      question = document.createElement("b");
      var t = document.createTextNode(i + 1 + ". " + children[i].getElementsByTagName("ask")[0].innerHTML);
      question.appendChild(t);
      ask.appendChild(question);
     
     
      var row2 = document.createElement("div");
      row2.className = "row"
      container.appendChild(row2);
        
      
        
        
     //Checks questions
        var choices = children[i].getElementsByTagName("choice");
        for (k = 0; k < choices.length; k++) {
          var p = document.createElement("p");
          

          var input = document.createElement("input");
          input.name = "answer-question" + i;
          inputmap[input.name] = input.value
          input.type = "radio";
          input.id = input.name + "answer" + k;

          var label = document.createElement("label");
          label.innerHTML = choices[k].textContent;
          label.htmlFor = input.name + "answer" + k;
        
            
          
         
          row2.appendChild(p);
          p.appendChild(input);
          p.appendChild(label);
          
         
        
        }
        bestAnswer[input.name] = children[i].getElementsByTagName("answer")[0].innerHTML;
    }
    var buttondiv = document.createElement("div");
    buttondiv.className = "center row";

  }

  xmlhttp.open("GET", "questions.xml", false);
  xmlhttp.send();
}

function checkAnswer() {


  var score = 0;
  var numquestions = Object.keys(bestAnswer).length
  var ans = '';
  for(key in inputmap){
    var value = inputmap[key];
      
    ans = $("input[name=" + key + "]:checked").next().text().charAt(0);
    if (ans == bestAnswer[key]) {
      score++;
    }   
  }
  if (score/numquestions>= 0.7 ){
      printwin();
      printResult(score);
      
  }else{
     printfail();
     printResult(score);
  }
    
  

}
function printwin(){
  var form = document.getElementById("quizform");
  form.innerHTML = "";
  var gif_path = "";
  
  var container = document.createElement("div");
  form.appendChild(container);
  
  var win = document.createElement("h1");
  win.style.color ="Green";
  win.innerHTML="Congratulations You Passed, Look down for your score and Solutions !!";
  win.align = "left";
  container.appendChild(win);
  
  
  
}
function printfail(){

  var form = document.getElementById("quizform");
  form.innerHTML = "";

  var container = document.createElement("div");
  form.appendChild(container);
  var fail = document.createElement("h1");
  fail.style.color ="red";
  fail.innerHTML="Sorry, You Failed, Look down for your score and Solutions or Try again";
  fail.align = "left";
  container.appendChild(fail);
  
  
}
function printResult(score) {
  
  document.getElementById("results").outerHTML='';
  document.getElementById("submission").innerHTML='';
  document.getElementById("redirect").style ="display:block";
  var form = document.getElementById("quizform")
  var numquestions = Object.keys(bestAnswer).length;

  var container = document.createElement("div");
  container.className = "container";
  container.id = "results"
  form.appendChild(container);

  var result = document.createElement("h3");
  result.innerHTML = "You got " + score + " of " + numquestions + " correct. Which is " + score/numquestions*100 + "% )";
  container.appendChild(result);


  var label = document.createElement("B");
  var t = document.createTextNode("Solutions:");
  label.appendChild(t);
  container.appendChild(label);

  var counter = 1;
  for(key in bestAnswer) {
    var ans = document.createElement("p");
    ans.innerHTML = counter + ". " + bestAnswer[key];
    container.appendChild(ans);
    counter++;
  }
  
}
