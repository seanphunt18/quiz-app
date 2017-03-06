var state = {
    questions: ['Who is the best player in the National Hockey League?', 'What is your favorite color?'],
    answers: [{text: "A. Alex Ovechkin", correct: true, default: true}, {text: "B. Alex Ovechkin", correct: false, default: true}, {text: "C. Alex Ovechkin", correct: false, default: true}, {text: "D. Alex Ovechkin", correct: false, default: true}, {text: "A. Blue", correct: true, default: true}, {text: "B. Green", correct: false, default: true}, {text: "C. Orange", correct: true, default: true}, {text: "D. Red", correct: true, default: true}]
};



var correctAnswers = 0;

var incorrectAnswers = 0;

var questionCount = 1;

// State modification functions
var checkAnswer = function(state, answerText) {
	for (var i=0; i<state.answers.length; i++) {
		if (state.answers[i].text == answerText) {
			state.answers[i].default = !state.answers[i].default;
			if (state.answers[i].correct) {
				correctAnswers ++;
			} else {
				incorrectAnswers ++;
			}
		} else if (state.answers[i].correct) {
			state.answers[i].default = !state.answers[i].default;
		}
	}
}




// Render function

var renderList = function(state, element) {
    var itemsHTML = state.answers.map(function(answer) {

        var beginListItem = "";

        // if ((answer.index()) < 4) {

            if (answer.default) {
            	 beginListItem = '<li><button type="submit" class="answer default">';
            } else if (answer.correct) {
                beginListItem = '<li><button type="submit" class="answer correct">';
            } else {
                beginListItem = '<li><button type="submit" class="answer incorrect">';
            }

            return beginListItem + answer.text + '</button></li>';

        // };
    });
    element.html(itemsHTML);
    $('.js-amt-correct').text(correctAnswers);
    $('.js-amt-incorrect').text(incorrectAnswers);
    $('.js-question-count').text(questionCount);
};

// Event listeners

$(function() { 

    renderList(state, $('.js-list'));

    $('#js-enter-button').on('click', function(event) {
        event.preventDefault;
        $(this).closest('div').addClass('hidden');
    });

    $('.answer').on('click', function(event) {
    	event.preventDefault;
    	checkAnswer(state, $(this).closest("li").find('.answer').text());;
    	renderList(state, $('.js-list'));
    });


});