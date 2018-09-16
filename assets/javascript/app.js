$(document).ready(function(){

var questions = [
    {
        question: "In what year was Spider-Man first published?",
        choices:["1960", "1961", "1962", "1959"],
        answer: 2
    },


    {
        question: "What was the name of the wrestler that Spider-Man fought shortly after gaining his new powers?",
        choices:["Rhino", "Bone Saw", "The Piledriver", "The Crusher"],
        answer: 1
    },


    {
        question: "What are the names of Peter's parents?",
        choices:["Mary and Peter Parker Sr.", "Betty and John Parker", "May and Ben Parker", "Richard and Mary Parker"],
        answer: 3
    },


    {
        question: "How many times did Peter Parker propose to Mary-Jane Watson before she said yes?",
        choices:["2", "4", "3", "1"],
        answer: 0
    },


    {
        question: "Spider-Man was killed in 2012. Which of these villians did it?",
        choices:["Dr. Doom", "Rhino", "Venom", "Dr. Octopus"],
        answer: 3
    }]; 


    var correctCount= 0;
    var incorrectCount= 0;
    var unanswered= 0;
    var intervalId;
    var timer = 5;
    var userGuess= " ";
    var qCount= questions.length
    var running = false;
    var holder = [];
    var pick;
    var index;
    var newArray= [];
    

    $("#reset").hide();

    $("#startGame").on("click", function () {
		$("#startGame").hide();
		displayQ();
		
    });

//    })

    function startTimer(){
        if (!running){
            intervalId= setInterval(decrement, 1000);
            running= true;
        }
    }

    function decrement(){
        $("#time").html("<h2> Time left: " + timer + "<h2>");
        timer --;
        if(timer === 0){
            unanswered++;
            stop();
            $("#answers").html("<h2> Time up! The correct answer was " + pick.choices[pick.answer] + "<h2>")
            displayQ();
        }
    }

    function stop(){
        running= false;
        clearInterval(intervalId);
    }

    // dispays on screen ____________________________________________
    function displayQ() {
        $("#answers").text("")
        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];
        timer = 5;
        startTimer();


        $("#question").text(pick.question);
        if ((incorrectCount + correctCount + unanswered) === qCount) {
            $("#question").empty();
            $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answers").append("<h4> Correct: " + correctCount + "</h4>");
            $("#answers").append("<h4> Incorrect: " + incorrectCount + "</h4>");
            $("#answers").append("<h4> Unanswered: " + unanswered + "</h4>");
            stop();
        }
        else {
            for (var i = 0; i < pick.choices.length; i++) {
    
                var userChoice = $("<button>");
                userChoice.addClass("answerchoice");
                userChoice.text(pick.choices[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answers").append(userChoice);
            }
        }
    }


    $("#answers").on("click", ".answerchoice", function() {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        if(userGuess===pick.answer){
            stop();
            correctCount++;
            userGuess= " ";
            $("#answers").text("Correct!");
        
        }

        else{
            stop();
            incorrectCount++;
            userGuess= " ";
            $("#answers").text("Wrong. The answer is " + pick.choices[pick.answer]);
            displayQ();
        }
        //dispaly
        displayQ();
    });
    
    function next () {
        newArray.push(pick);
        questions.splice(index,1);
        timer= 20;
    }
    
    
    
    
    console.log(questions.length)



});