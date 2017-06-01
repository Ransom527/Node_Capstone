var State = {
	newGame: {},
	onNewQuestion: 1,
	numberCorrect: 0,
	onQuestion: 0,
	onGame: 0,
	displayQuestion: 0,
	activeUser: '',
	Games: [],
	currentGame: {}
};

function submitEmail(event) {
	event.preventDefault();
	var emailID = $('#email-username-input').val();
	State.activeUser = $('#email-username-input').val();
	$("#active-username").text(emailID);
	$.get('/getquizes', getQuizesCallback);
}

function getQuizesCallback(data) {
	State.Games = data;
	renderGameList();
}

function getQuizCallback(data) {
	State.currentGame = data;
	renderQuestion(State.currentGame.Questions[State.onQuestion]);
}

//rendergamelist should be used just for reloading
function renderGameList() {
	//not needed for button click functions
	//event.preventDefault();
	$('#game-list').empty();
	$("#enter-email-username").addClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
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
	$('#game-list-div').addClass('hidden');
	State.onGame = gameID;
	State.onQuestion = 0;
	State.numberCorrect = 0;
	$.get('/getquiz?ID=' + gameID, getQuizCallback);
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
	$.ajax({ url: '/deletequiz?ID=' + gameID, type: 'DELETE'}).done(function(data) {
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

	if ($('#question-text-input').val() !== "" && $('#new-game-answer').val()) {
		saveQuestionToState();
	}
	$("#new-game-form-div").addClass('hidden');
	$("#game-list-div").removeClass('hidden');

	State.newGame.Score = 0;

	$.post('/addquiz', { Title: State.newGame.Title, Score: State.newGame.Score, Questions: State.newGame.Questions}).done(function(data) {

		State.newGame.ID = data;
		State.Games.push(State.newGame);
		State.newGame = {};
		renderGameList();
	});
}

function saveQuestionToState() {
	var question = {};
	question.Title = $('#question-text-input').val();
	question.Answer = $('#new-game-answer').val();
	question.Choices = [];
	for (var i = 0; i < $('#new-game-form-options').children().length; i++) {
		question.Choices.push($($('#new-game-form-options').children()[i]).find(".new-game-option").val());
	}
	State.newGame.Questions.push(question);
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

// Add New Game
function addQuestion() {
	event.preventDefault();
	State.onNewQuestion++;
	$('#new-game-form-on-question').empty();
	$('#new-game-form-on-question').append(State.onNewQuestion);

	if ($('#question-text-input').val() !== "" && $('#new-game-answer').val()) {
		saveQuestionToState();
	}
 
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
	$('#radio-buttons-answers').empty();
	for (var i = 0; i < question.Choices.length; i++) {
		$('#radio-buttons-answers').append("<li><input type='radio' class='selections' name='Answers' value='" + question.Choices[i] + "'> <span class='answers'>" + question.Choices[i] + "</span></li>");
	}
	$('#Question').text(question.Title);
	$('#on-question').text(State.onQuestion + 1);
	$('#number-correct').text(State.numberCorrect);
}

function onSubmit() {
	event.preventDefault();
	var choice;
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
	} else {
	State.onQuestion++;
	$('.selections').prop('checked', false);
	renderQuestion(State.currentGame.Questions[State.onQuestion]);
	}
}

function gameOver() {
	event.preventDefault();
	$("#game-over-div").removeClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
		if (State.Games[i].ID == State.onGame) {
			var score = State.numberCorrect / State.currentGame.Questions.length * 100;
			if (State.Games[i].Score < score) { //Could also be inline IF
				State.Games[i].Score = score;
			}

			$.post('/updatequizscore?ID=' + State.Games[i].ID, {Score: score});
		}
	}
}