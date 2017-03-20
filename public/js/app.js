//JS Code
//var apiurl = "http://127.0.0.1:8080"

var State = {
	newGame: {},
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


function getQuizCallback(data) {
	State.currentGame = data;
	renderQuestion(State.currentGame.Questions[State.onQuestion]);
}


function updateQuizCallback(data) {
	//
}


function deleteQuizCallback(data) {
	//console.log(data);

}


function renderGameList() {
	event.preventDefault();
	$('#game-list').empty();
	$("#enter-email-username").addClass('hidden');
	$("#game-list-div").removeClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
		console.log(State.Games[i].Title);
		$('#game-list').append(
			"<li class='row game-list-li'><div class='game-title'>" + State.Games[i].Title + "</div><div class='high-score'>" + State.Games[i].Score + "</div><button type='button' class='btn btn-info btn-xs' onclick='newGame(\"" + State.Games[i].ID + "\")'>Start Quiz</button><button class='btn btn-info btn-xs' onclick='updateGame(\"" + State.Games[i].ID + "\")'>Update Quiz</button><button class='btn btn-info btn-xs' onclick='deleteGame(\"" + State.Games[i].ID + "\")'>Delete Quiz</button></li>"
		);
	}
	$("#game-list-div").removeClass('hidden');
	$("#game-over-div").addClass('hidden');
	$("#add-game").removeClass('hidden');
}


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


function updateGame(gameID) {
	$('#game-list-div').addClass('hidden');
	//$('#new-game-form-div').removeClass('hidden');
	$('#update-game-form-div').removeClass('hidden');
	//put whole game object into inputs
	//hide submit button for new, unhide update button for update functionality
}


function deleteGame(gameID) {
	event.preventDefault();
	//console.log(gameID);
	$.ajax({ url: 'http://127.0.0.1:8080/deletequiz?ID=' + gameID, type: 'DELETE'}).done(function(data) {
		console.log('hello delete', data);
	});

	renderGameList();
}


/*
function loadQuiz(callback) {
	quiz = [];
	$.get('http://127.0.0.1:8080/getquizzes', callback);
	State.currentGame = quiz;
}


function updateQuiz(data, callback) {
	quiz = $()
	$.get('http://127.0.0.1:8080/getquizzes', data, callback);
	State.currentGame = quiz;
}
*/


function submitNewGame() {
	event.preventDefault();
	var gameFormData = {
		Title: '',
		Choices: [],
		Answer: ''
	};
	var inputs = $('#new-game-form-ul li');
	gameFormData.Title = $('#question-text-input').val();
	inputs.each(function(i) {
		if (i > 0) {
			var value = $(this).find("input[type='text']").val();
			gameFormData.Choices.push(value);
			console.log($(this).find("input[type='radio']:checked"))
			if ($(this).find("input[type='radio']:checked").length > 0) {
				gameFormData.Answer = value;
			}
		}
	});
	console.log(gameFormData)
		//Add form data to state object or send through api
}



function addOptionField() {
	event.preventDefault();
	$('#new-game-form-ul').append("<li class='new-game-form-class'><div><input type='radio'></div><input type='text' placeholder='Option Text'></li>");
}


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
	console.log(State.Questions[State.onQuestion].Answer, $("input:radio[name='Answers']:checked")[0].value);
	if (State.Questions[State.onQuestion].Answer === $("input:radio[name='Answers']:checked")[0].value) {
		State.numberCorrect++;
	} else {
		//Add Alert box that expires
		$('#answer-box').text(State.Questions[State.onQuestion].Answer);
	}
	//$("#Submit").addClass('hidden');
	//Instead of hiding, hide until selection is made
	if (State.onQuestion + 1 >= State.Questions.length) {
		//store the high score
		//State.Games[State.onGame].highScore = State.numberCorrect;
		gameOver();
		$("#new-game").removeClass('hidden');
		$("#question-box").addClass('hidden');
		console.log('game over')
			//return to list of games
	} else {
		//	$("#next-question").removeClass('hidden');
	}
	State.onQuestion++;
	$('.selections').prop('checked', false);
	renderQuestion(State.Questions[State.onQuestion]);
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