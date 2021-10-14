let language;
let seconds = 0;
let settings = {
	music: true,
	sounds: true
};	

let cardSymbol = [1,1,2,2,3,3,4,4,5,5,6,6];
let cardState = [0,0,0,0,0,0,0,0,0,0,0,0];
let reverseCards = [];
let nbFindedPairs = 0;
let row = 4;
let col = 3;
	
window.addEventListener('orientationchange', function() {
	window.location.reload();
});

if (window.innerWidth > window.innerHeight) {
	row = 3;
	col = 4;
}

let userLanguage = navigator.language || navigator.userLanguage;
// If the navigator language is available for the game
if (userLanguage && Object.keys(texts).includes(userLanguage.slice(0,2))) {
	language = userLanguage.slice(0,2);
}
// Else, the default language is English
else {
	language = 'en';
}

// If the user decides to change the game language, this information is
// stored in the sessionStorage and the page is reloaded to update the texts
function changeLanguage(event) {
	sessionStorage.setItem('language', event.target.value);
	window.location.reload();
}

$(document).ready(function() {
	// If there is a language item in the sessionStorage,
	// it means the user has changed the game language
	if (sessionStorage.getItem('language') != null) {
		language = sessionStorage.getItem('language');
	}
	// The languages list is filled with the user language first,
	// then with the other available languages
	$('select').append(`
		<option value="${language}">${language.toUpperCase()}</option>
	`);
	Object.keys(texts).forEach((key) => {
		if (key != language) {
			$('select').append(`
				<option value="${key}">${key.toUpperCase()}</option>`);
		}
	});

	// Each text area is filled with the right translation, according to the user language;
	// a text id equals a key in the translation file
	$('.translation').each(function(index) {
		$(this).html(texts[language][$(this).attr('id')]);
	});

	// Show explanation modal
	$('#explanation').show();
	$('#timer').hide();
	$('#molette').hide();
	$('#success').show();

	// Handle settings modifications
	$('input.custom-control-input').change(function() {
		settings[$(this).attr('id')] = $(this).is(':checked');
        if ($(this).attr('id') == 'music') {
			document.getElementById('background_music').muted = !settings.music;
        }
	});

	//Animation of the cards 
	$( "td > img" ).click(function() {
		$( this ).css({
			transform: 'rotateY(180deg) scale(1.3)',
  			'transition': '0.5s',
  			'transform-style': 'preserve-3d',
			});
			setTimeout(() => {
				$( this ).css({
					transform: 'rotateY(180deg) scale(1)',
  					'transition': '0.5s'
				});
			}, 700);
	  });
});

function startGame() {
	// Play background music
	document.getElementById('background_music').play();
	// Show content
	$('#board').css('visibility', 'visible');
	$('#molette').show();
	$('#timer').show();
	$('#explanation').hide();
    startTimer();
}

function finishGame() {
	window.location.replace('success.html');
    stopTimer();
}

function closeGame(){
    try { Legendr.finish(true); } catch (e) {};
    try { window.close(); } catch (e) {};
}

function resetGame(){
	window.location.replace('index.html');
	}

function startTimer(){
      timerID = setInterval(chrono, 1000);
  }
 
  function stopTimer(){
      clearTimeout(timerID);
	  sessionStorage.setItem('timer', seconds);
  }

  function chrono(){
    seconds += 1;
	$("#time").html(seconds + "s");
}

// Randomize the position of the cards
function gameInitialize(){
	for(var position = cardSymbol.length-1; position >= 1; position--){
		var random = Math.floor(Math.random()*(position + 1));
		var save = cardSymbol[position];
		cardSymbol[position] = cardSymbol[random];
		cardSymbol[random] = save;
	}
}

function gameControl(cardIndex){
	if(reverseCards.length < 2){
		if(cardState[cardIndex] == 0){
			cardState[cardIndex] = 1;
			reverseCards.push(cardIndex);
			updateDisplay(cardIndex);
		}
		if(reverseCards.length==2){
			var newState = 0;
			if(cardSymbol[reverseCards[0]] == cardSymbol[reverseCards[1]]) {
				newState = -1;
				nbFindedPairs++;
			}

			cardState[reverseCards[0]] = newState;
			cardState[reverseCards[1]] = newState;
			setTimeout(function(){
				updateDisplay(reverseCards[0]);
				updateDisplay(reverseCards[1]);
				reverseCards=[];
				if(nbFindedPairs == 6) {
					finishGame();
				}
			},750);
		}
	}
}

// case 0 = initial state of the card at the beginning of the game
// case 1 = state of the card when the user click on them
// case -1 = state of the card when the user find a pair of them
function updateDisplay(cardIndex) {
	switch(cardState[cardIndex]) {
		case 0:
	imgCards[cardIndex].src="./image/background_card.png";
			break;
		case 1:
	imgCards[cardIndex].src="./image/card"+cardSymbol[cardIndex]+".png";
			break;
		case -1:
	imgCards[cardIndex].style.opacity="0";
	imgCards[cardIndex].style.transition="1s";
			break;
	}
}

//Initialize the board game table
	for (i = 0; i < row; i++) {
    let col_html = "<tr>";
    for (j = 0; j < col; j++) {
        col_html += "<td><img src=\"./image/background_card.png\"/></td>";
    }
    col_html += "</tr>";
    $('table').append(col_html);
}

let imgCards = document.getElementById("board").getElementsByTagName("img");
console.log(imgCards.length);
for(let i = 0; i < imgCards.length; i++){
	imgCards[i].cardIndex = i;
	imgCards[i].onclick = function() {
		gameControl(this.cardIndex); 
		if (settings.sounds)
			Sound.play('card_flip');
	}
}
gameInitialize();