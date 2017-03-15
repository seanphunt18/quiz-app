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

var ques1 = new Question("What is the capital of Maryland?", ["Annapolis", "Baltimore", "Frederick", "Salisbury"], 0);

state.questions.push(ques1);


var ques2 = new Question("What is the state bird of Maryland?", ["Cardinal", "Oriole", "Blue Jay", "Raven"], 1);

state.questions.push(ques2);

var ques3 = new Question("What is the state sport of Maryland?", ["Jousting", "Lacrosse", "Baseball", "Soccer"], 0);

state.questions.push(ques3);

var ques4 = new Question("What is the state flower of Maryland?", ["Sunflower", "Tulip", "Dandelion", "Black-eyed Susan"], 3);

state.questions.push(ques4);

var ques5 = new Question("Which color does NOT appear on the Maryland flag?", ["Black", "Red", "Blue", "Yellow"], 2);

state.questions.push(ques5);


var checkAnswer = function(state, answerElement) {
    
    var answerText = answerElement.text();

    var cqi = state.questions[state.currentQuestionIndex];

    for (var i=0; i<cqi.answerChoices.length; i++) {
            if (cqi.answerChoices[i] == answerText) {
                if (i == cqi.correctAnswer) {
                    state.correctAnswers ++;
                    $(".js-amt-correct").text(state.correctAnswers);
                    answerElement.addClass('correct');
                } else {
                    state.incorrectAnswers ++;
                    $(".js-amt-incorrect").text(state.incorrectAnswers);
                    answerElement.addClass('incorrect');
                }
            } else if (i == cqi.correctAnswer) {
                $('.js-list').children("li").each(function() {
                    if ($(this).text() == cqi.answerChoices[cqi.correctAnswer]) {
                        $(this).addClass('correct');
                    }
                })
        }
    }
}

var reset = function(state) {
    state.correctAnswers = 0;
    state.incorrectAnswers = 0;
    state.currentQuestionIndex = -1;
    $('.landing').removeClass('hidden');
    $('.next').addClass('hidden');
};

// Render function

function renderNextQuestion (state) {

    $('.next').prop('disabled', true);

    state.currentQuestionIndex++;

    var cqi = state.currentQuestionIndex;

    $(".question").find("h3").text(state.questions[cqi].text);
    // Under the div with class "question", find an <h3> and set its text to the 'text' property of the the object in 'questions' matching the currentQuestionIndex.
    
    $(".js-question-count").text(cqi +1);

    $(".js-amt-correct").text(state.correctAnswers);

    $(".js-amt-incorrect").text(state.incorrectAnswers);

    $('.js-list').empty();

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

    $('.js-list').on("click", '.answer', function(event) {
        event.preventDefault;
        checkAnswer(state, $(this));
        $('.next').prop('disabled', false);
    });

    $('.next').on("click", function(event) {
        event.preventDefault;
        renderNextQuestion(state);
    })

})