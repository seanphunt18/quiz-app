var state = {
    questions: [],
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentQuestionIndex: -1
};


// State modification functions

function Question (text, answerChoices, correctAnswer){
    this.text = text;
    this.answerChoices = answerChoices;
    this.correctAnswer = correctAnswer;
}

var ques1 = new Question("What is the capital of Maryland?", ["Annapolis", "Baltimore", "Frederick", "Salisbury"], "1");

state.questions.push(ques1);


var ques2 = new Question("What is the state bird of Maryland?", ["Cardinal", "Oriole", "Blue Jay", "Raven"], "2");

state.questions.push(ques2);

var ques3 = new Question("What is the state sport of Maryland?", ["Jousting", "Lacrosse", "Baseball", "Soccer"], "1");

state.questions.push(ques3);

var ques4 = new Question("What is the state flower of Maryland?", ["Sunflower", "Tulip", "Dandelion", "Black-eyed Susan"], "4");

state.questions.push(ques4);

var ques5 = new Question("Which color does NOT appear on the Maryland flag?", ["Black", "Red", "Blue", "Yellow"], "3");

state.questions.push(ques5);


var checkAnswer = function(state, answerText) {
    for (var i=0; i<state.questions[state.currentQuestionIndex].answerChoices.length; i++) {
        if (state.questions[state.currentQuestionIndex].answerChoices[i].text == answerText) {
            state.questions[state.currentQuestionIndex].answerChoices[i].closest("li").removeClass("default");
            if (state.questions[state.currentQuestionIndex].answerChoices[i].index == state.questions[state.currentQuestionIndex].correctAnswer) {
                correctAnswers ++;
            } else {
                incorrectAnswers ++;
            }
        } else if (state.questions[state.currentQuestionIndex].answerChoices[i].index == state.questions[state.currentQuestionIndex].correctAnswer) {
            state.questions[state.currentQuestionIndex].answerChoices[i].closest("li").removeClass("default");;
        }
    }
}


// Render function

function renderNextQuestion (state) {

    state.currentQuestionIndex++;

    var cqi = state.currentQuestionIndex;

    $(".question").find("h3").text(state.questions[cqi].text);
    // Under the div with class "question", find an <h3> and set its text to the 'text' property of the the object in 'questions' matching the currentQuestionIndex.
    
    $(".js-question-count").text(cqi +1);

    $(".js-amt-correct").text(state.correctAnswers);

    $(".js-amt-incorrect").text(state.incorrectAnswers);

    for (var i = 0; i < state.questions[cqi].answerChoices.length; i++){
        $(".js-list").append("<li class=\"answer default\">" + state.questions[cqi].answerChoices[i] + "</li>");
        // Under the element with class "js-list" (a <ul>), add the code in quotes with the following between: the current item of the 'answerChoices' array whose value matches the object in 'questions' matching the currentQuestionIndex.
    }

}


// Event listeners

$(function() { 

    $('#js-enter-button').on('click', function(event) {
        event.preventDefault;
        $(this).closest('div').addClass('hidden');
    });

    renderNextQuestion(state);

    $('.answer').on("click", function(event) {
        event.preventDefault;
        checkAnswer(state, $(this).closest("li").find('.answer').text());
    });

    $('.next').on("click", function(event) {
        event.preventDefault;
        renderNextQuestion(state);
    })

})





