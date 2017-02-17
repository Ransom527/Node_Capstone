//JS Code
var State = {
	numberCorrect: 0,
	onQuestion: 0,
	onGame: 0,
	displayQuestion: 0,
	activeUser: '',
	Games: [{
		Title: "Game 1",
		highScore: 0,
		ID: '1'
	}, {
		Title: "Game 2",
		highScore: 0,
		ID: '2'
	}],
	Questions: [{
		Title: 'What was the development codename for the Nintendo Gamecube?',
		Choices: ['Swordfish', 'Dolphin', 'Rhino', 'Panther'],
		Answer: 'Dolphin'
	}, {
		Title: 'The infamous "Konami Code" first appeared in which game?',
		Choices: ['Contra', 'Sidewinder', 'Mega Zone', 'Gradius'],
		Answer: 'Gradius'
	}, {
		Title: 'Nintendo of America is the majority owner of which sports team?',
		Choices: ['San Francisco Giants', 'Seattle Seahawks', 'Seattle Mariners', 'Chicago Cubs'],
		Answer: 'Seattle Mariners'
	}, {
		Title: 'Hyundai released the Nintedo 64 in South Korea under a different name due to import restrictions, what was it called?',
		Choices: ['Ultra 64', 'Comboy 64', 'iQue Player', 'Famicom'],
		Answer: 'Comboy 64'
	}, {
		Title: 'What was the name of the eagerly awaited add-on for the Nintedo 64, only realeased in Japan?',
		Choices: ['N64 DD', 'iQue Player', 'Satellaview', 'Ultra 64'],
		Answer: 'N64 DD'
	}, {
		Title: 'What was the name of the most expesive video game platform ever released?',
		Choices: ['3DO', 'Neo Geo AES', 'Phillips CD-i', 'Pioneer LaserActive'],
		Answer: 'Pioneer LaserActive'
	}, {
		Title: 'What was the name of the camera peripheral for the Sega Dreamcast, only released in Japan?',
		Choices: ['DreamSnap', 'SegaCam', 'Dreameye', 'WebCast'],
		Answer: 'Dreameye'
	}]
};

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

function submitEmail() {
	event.preventDefault();
	emailID = $('#email-username-input').val();
	State.activeUser = $('#email-username-input').val();
	$("#active-username").text(emailID);
	loadGameList();
}


function newGame(gameID) {
	State.onGame = gameID;
	$('#game-list-div').addClass('hidden');
	State.onQuestion = 0;
	State.numberCorrect = 0;
	renderQuestion(State.Questions[State.onQuestion]);
	$("#answer-box").text('');
	$('.selections').prop('checked', false);
	$("#question-box").removeClass('hidden');
	$("#Submit").removeClass('hidden');
	$("#start").addClass('hidden');
	$("#game-over-div").addClass('hidden');
}


function loadGameList() {
	event.preventDefault();
	$('#game-list').empty();
	$("#enter-email-username").addClass('hidden');
	$("#game-list-div").removeClass('hidden');
	for (var i = 0; i < State.Games.length; i++) {
		console.log(State.Games[i].Title);
		$('#game-list').append(
			"<li class='row'><div class='col-md-3'>" + State.Games[i].Title + "</div><button class='btn btn-info col-md-3' onclick='newGame(" + State.Games[i].ID + ")'>Start Quiz</button><div class='col-md-3'>" + State.Games[i].highScore + "</div></li>"
		);
	}
	$("#game-list-div").removeClass('hidden');
	$("#game-over-div").addClass('hidden');
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