//JS Code
//var apiurl = "http://127.0.0.1:8080"
//state and DOM manipultion should be separtate


var State = {
	newGame: {},
	onNewQuestion: 1,
	numberCorrect: 0,
	onQuestion: 0,
	onGame: 0,
	displayQuestion: 0,
	activeUser: '',
	Games: [],
	currentGame: []
};


function submitEmail() {
	event.preventDefault();
	var emailID = $('#email-username-input').val();
	State.activeUser = $('#email-username-input').val();
	$("#active-username").text(emailID);
	$.get('http://127.0.0.1:8080/getquizes', getQuizesCallback);
}


function getQuizesCallback(data) {
	console.log("loadgamelist", data);
	State.Games = data;
	renderGameList();
}


function loadGameList() {
	event.preventDefault();
	$('#game-list').empty();
	$.get('http://127.0.0.1:8080/getquizes', getQuizesCallback);
	for (var i = 0; i < State.Games.length; i++) {
		console.log(State.Games[i].Title);
		$('#game-list').append(
			"<li class='row game-list-li'><div class='game-title'>" + State.Games[i].Title + "</div><div class='high-score'>" + State.Games[i].Score + "</div><button type='button' class='btn btn-info btn-xs' onclick='newGame(\"" + State.Games[i].ID + "\")'>Start Quiz</button><button class='btn btn-info btn-xs' onclick='deleteGame(\"" + State.Games[i].ID + "\")'>Delete Quiz</button></li>"
		);
	}
	$("#game-list-div").removeClass('hidden');
}


function getQuizCallback(data) {
	State.currentGame = data;
	renderQuestion(State.currentGame.Questions[State.onQuestion]);
}


function addQuizCallback(data) {
	State.newGame = {};
	State.Games.push(data);
	renderGameList();
}


function deleteQuizCallback(data) {
	//
}

//rendergamelist should be used just for reloading
function renderGameList() {
	//not needed for button click functions
	event.preventDefault();
	$('#game-list').empty();
	$("#enter-email-username").addClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
		console.log(State.Games[i].Title);
		$('#game-list').append(
			"<li class='row game-list-li'><div class='game-title'>" + State.Games[i].Title + "</div><div class='high-score'>" + State.Games[i].Score + "</div><button type='button' class='btn btn-info btn-xs' onclick='newGame(\"" + State.Games[i].ID + "\")'>Start Quiz</button><button class='btn btn-info btn-xs' onclick='deleteGame(\"" + State.Games[i].ID + "\")'>Delete Quiz</button></li>"
		);
	}
	$("#game-list-div").removeClass('hidden');
	$("#game-over-div").addClass('hidden');
	$("#add-game").removeClass('hidden');
}

// Start a New Game
function newGame(gameID) {
	console.log('gameID', gameID);
	$('#game-list-div').addClass('hidden');
	State.onQuestion = 0;
	State.numberCorrect = 0;
	$.get('http://127.0.0.1:8080/getquiz?ID=' + gameID, getQuizCallback);
	$("#answer-box").text('');
	$('.selections').prop('checked', false);
	$("#question-box").removeClass('hidden');
	$("#Submit").removeClass('hidden');
	$("#start").addClass('hidden');
	$("#game-over-div").addClass('hidden');
	$('#add-game').addClass('hidden');
}

// not used
function addGame(gameID) {
	$('#game-list-div').addClass('hidden');
	//$('#new-game-form-div').removeClass('hidden');
	$('#update-game-form-div').removeClass('hidden');
	//put whole game object into inputs
	//hide submit button for new, unhide update button for update functionality
}


function deleteGame(gameID) {
	event.preventDefault();
	$.ajax({ url: 'http://127.0.0.1:8080/deletequiz?ID=' + gameID, type: 'DELETE'}).done(function(data) {
		console.log('hello delete', data);
		for (var i = 0; i < State.Games.length; i++) {
			if (State.Games[i].ID === gameID) {
				State.Games.splice(i, 1);
				break;
			}
		}
		renderGameList();
	});
}


//in progress
function submitNewGame() {
	event.preventDefault();
	saveQuestionToState();
	$("#new-game-form-div").addClass('hidden');
	$("#game-list-div").removeClass('hidden');
	console.log(State.newGame);
	//.ajax({url:''})
	$.post('http://127.0.0.1:8080/addquiz', {Title: State.newGame.Title, Score: 0, Questions: State.newGame.Questions}).done(function(data) {
		//data = State.newGame;
		console.log(data);
		State.newGame.ID = data;
		State.Games.push(newGame);
		State.newGame = {};
		renderGameList();
	});
}


function saveQuestionToState() {
	var question = {};
	console.log($('#new-game-form-options').children());
	question.Title = $('#question-text-input').val();
	question.Answer = $('#new-game-answer').val();
	question.Choices = [];
	for (var i = 0; i < $('#new-game-form-options').children().length; i++) {
		question.Choices.push($('#new-game-form-options').val());
	}
	State.newGame.Questions.push(question);
	console.log(question);
}


// Add New Game
function addGameName() {
	event.preventDefault();
	State.newGame = {};
	State.newGame.Title = $('#game-name').val();
	State.newGame.Questions = [];
	$('#new-game-form-on-question').append(State.onNewQuestion);
	$('#game-input-header').empty();
	$('#game-input-header').append(State.newGame.Title);
	//console.log(State.newGame.Title);
	$('#game-name').addClass('hidden');
	$("#add-question").removeClass('hidden');
	$('#new-game-form-question').append("<li><input id='question-text-input' type='text' placeholder='Question'></li>");
	$('#new-game-form-options').append(
		"<li><input class='new-game-option' type='text' placeholder='Option'></li>" + 
		"<li><input class='new-game-option' type='text' placeholder='Option'></li>"
		);
	$('#new-game-form-answer').append("<li><input id='new-game-answer' type='text' placeholder='Answer'></li>");
	$("#game-name-entry").addClass('hidden');
	$("#submit-game").removeClass('hidden');
	$("#add-option").removeClass('hidden');
	$("#new-game-form-on-question-div").removeClass('hidden');
}


function initQuestion() {
	//everything the addGameName and AddQuestion have in common
	//

}


// Add New Game
function addQuestion() {
	event.preventDefault();
	State.onNewQuestion++;
	$('#new-game-form-on-question').empty();
	$('#new-game-form-on-question').append(State.onNewQuestion);
	saveQuestionToState();
	//new function the pulls qquestion/inputs and add to state object
	//var inputs = $('#new-game-form-options li input').val();
	//console.log(inputs);
	//State.newGame.Questions = inputs;
	$('#new-game-form-question').empty();
	$('#new-game-form-options').empty();
	$('#new-game-form-answer').empty();
	//tried clearing value, have to rebuild
	$('#new-game-form-question').append(
		"<li><input id='question-text-input' type='text' placeholder='Question'></li>");
	$('#new-game-form-options').append(
		"<li><input class='new-game-option' type='text' placeholder='Option'></li>" + 
		"<li><input class='new-game-option' type='text' placeholder='Option'></li>"
		);
	$('#new-game-form-answer').append(
		"<li><input id='new-game-answer' type='text' placeholder='Answer'></li>");
	//"<li><input id='question-text-input' type='text' placeholder='Question'></li>"
	//"<li><input id='new-game-answer' type='text' placeholder='Answer'></li>"
/*	
	inputs.each(function(i) {
		if (i > 0) {
			var value = $(this).find("input[type='text']").val();
			State.newGame.Choices.push(inputs);
			//console.log($(this).find("input[type='radio']:checked"))
			if ($(this).find("input[type='radio']:checked").length > 0) {
				State.newGame.Answer = value;
			}
		}
	});
*/
}


// Add New Game
function addOptionField() {
	event.preventDefault();
	$('#new-game-form-options').append("<li><input type='text' placeholder='Option'></li>");
}



// Add New Game
function loadCreateGame() {
	$('#game-list-div').addClass('hidden');
	$("#new-game-form-div").removeClass('hidden');
	$('#add-game').addClass('hidden');
}


function renderQuestion(question) {
	console.log(question, 'q');
	$('#radio-buttons-answers').empty();
	for (var i = 0; i < question.Choices.length; i++) {
		$('#radio-buttons-answers').append("<li><input type='radio' class='selections' name='Answers' value='" + question.Choices[i] + "'> <span class='answers'>" + question.Choices[i] + "</span></li>");
	}
	$('#Question').text(question.Title);
	$('#on-question').text(State.onQuestion + 1);
	$('#number-correct').text(State.numberCorrect);
}


function onSubmit() {
	console.log(State.currentGame);
	event.preventDefault();
	var choice;
	console.log(State.currentGame.Questions[State.onQuestion].Answer, $("input:radio[name='Answers']:checked")[0].value);
	if (State.currentGame.Questions[State.onQuestion].Answer === $("input:radio[name='Answers']:checked")[0].value) {
		State.numberCorrect++;
	} else {
		//Add Alert box that expires
		$('#answer-box').text(State.currentGame.Questions[State.onQuestion].Answer);
	}
	//$("#Submit").addClass('hidden');
	//Instead of hiding, hide until selection is made
	if (State.onQuestion + 1 >= State.currentGame.Questions.length) {
		//store the high score
		gameOver();
		$("#new-game").removeClass('hidden');
		$("#question-box").addClass('hidden');
		console.log('game over');
	} else {
	State.onQuestion++;
	$('.selections').prop('checked', false);
	renderQuestion(State.currentGame.Questions[State.onQuestion]);
	}
}


function checkChecked(value) {
	return document.getElementById(value).checked;
}


function gameOver() {
	event.preventDefault();
	$("#game-over-div").removeClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
		if (State.Games[i].ID == State.onGame) {
			if (State.Games[i].highScore < State.numberCorrect) { //Could also be inline IF
				State.Games[i].highScore = State.numberCorrect;
			}
		}
	}
}


function checkAnswer() {
	//
}


//quiz form functionality
//assemble add quiz form data into object for submission
//add quiz data
//add delete
//import to mongodb

//Temorary Username value
//var emailID = '';
//var Password = '';

/*
function gameStart() {
	State.onQuestion = 0;
	State.numberCorrect = 0;
	renderQuestion(State.Questions[State.onQuestion]);
	$("#question-box").removeClass('hidden');
	$("#start").addClass('hidden');
}
*/