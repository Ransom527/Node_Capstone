//JS Code
var State = {
	numberCorrect: 0,
	onQuestion: 0,
	Questions: [
{
	Title:'What was the development codename for the Nintendo Gamecube?',
	Choices:['Swordfish','Dolphin','Rhino','Panther'],
	Answer: 'Dolphin'
},
{
	Title:'The infamous "Konami Code" first appeared in which game?',
	Choices:['Contra','Sidewinder','Mega Zone','Gradius'],
	Answer: 'Gradius'
},
{
	Title:'Nintendo of America is the majority owner of which sports team?',
	Choices:['San Francisco Giants','Seattle Seahawks','Seattle Mariners','Chicago Cubs'],
	Answer: 'Seattle Mariners'
},
{
	Title:'Hyundai released the Nintedo 64 in South Korea under a different name due to import restrictions, what was it called?',
	Choices:['Ultra 64','Comboy 64','iQue Player','Famicom'],
	Answer: 'Comboy 64'
},
{
	Title:'What was the name of the eagerly awaited add-on for the Nintedo 64, only realeased in Japan?',
	Choices:['N64 DD','iQue Player','Satellaview','Ultra 64'],
	Answer: 'N64 DD'
},
{
	Title:'What was the name of the most expesive video game platform ever released?',
	Choices:['3DO','Neo Geo AES','Phillips CD-i','Pioneer LaserActive'],
	Answer: 'Pioneer LaserActive'
},
{
	Title:'What was the name of the camera peripheral for the Sega Dreamcast, only released in Japan?',
	Choices:['DreamSnap','SegaCam','Dreameye','WebCast'],
	Answer: 'Dreameye'
}]
};


//state management, use single object
//state.Questions[i].Question
//refactor Answer: 


function gameStart() {
	renderQuestion(State.Questions[State.onQuestion]);
	$("#question-box").removeClass('hidden');
	$("#start").addClass('hidden');
}


function newGame() {
	State.onQuestion = 0;
	State.numberCorrect = 0;
	renderQuestion(State.Questions[State.onQuestion]);
	$("#answer-box").text('');
	$('.selections').prop('checked', false);
	$("#question-box").removeClass('hidden');
	$("#Submit").removeClass('hidden');
	$("#new-game").addClass('hidden');
	$("#game-over-div").addClass('hidden');
}



function renderQuestion(question) {
	console.log(data, 'data');
	$('#radio-buttons-answers').clear();
	for (var i = 0; i < question.Choices.length; i++) {
		$('#radio-buttons-answers').append("<li><input type='radio' class='selections' name='Answers' value='"+question.Choices[i]+"'>")
		.append("<span class='answers'>" + question.Choices[i] + "</span></li>");
	}
	$('#Question').val(question.Title);

	//move elsewhere, next q
	$('#on-question').text(State.onQuestion);
	$('#number-correct').text(State.numberCorrect);
}



function onSubmit() {
	event.preventDefault();
	var choice;
	console.log(State.Questions[State.onQuestion].Answer, $("input:radio[name='Answers']:checked").val() );
	if(State.Questions[State.onQuestion].Answer === $("input:radio[name='Answers']:checked").text()) {
		State.numberCorrect++;
	}
	else {
		$('#answer-box').text(State.Questions[State.onQuestion].Answer);
	}
	State.onQuestion += 1;
	$("#Submit").addClass('hidden');
	if(State.onQuestion == State.Questions.length) {
		gameOver();
		$("#new-game").removeClass('hidden');
		$("#question-box").addClass('hidden');
		console.log('game over')
	}
	else {
		$("#next-question").removeClass('hidden');
	}
}

//use jquery
function checkChecked(value) {
	return document.getElementById(value).checked;
	//Returns selected answer
}



function nextQuestion() {
	event.preventDefault();
	$('.selections').prop('checked', false);
	$("#next-question").addClass('hidden');
	$("#Submit").removeClass('hidden');
	$("#answer-box").text('');
	renderQuestion(State.Questions[State.onQuestion])
}


function gameOver() {
	$("#game-over-div").removeClass('hidden');
}


function checkAnswer() {
//
}


