var model = {
    words : ["bicycle", "knife", "developer", "software", "button"],
    selectedWord : "",
    currentGuess :"",
    guesses : [],
    hits : 0,
    misses : 0,
    
    selectRandomWord : function() {
        var rand = Math.floor(Math.random() * 5);
        this.selectedWord = this.words[rand];
        console.log(this.selectedWord);
    },
    
    checkGuess : function(guess) {
        if(this.misses == 9 || this.hits == this.selectedWord.length) {
            return false;
        }
        console.log(guess);
        this.currentGuess = guess;
        this.guesses.push(guess);
        if (this.selectedWord.indexOf(guess) >= 0) {
            view.updateSelectedWord();
            if(this.hits == this.selectedWord.length) {
                view.displayMessage("YOY WIN!!!");
            }
            else {            
                view.displayMessage("Well done motherfucker!");
            }
        }
        else {
            this.misses++;
            view.updateHangman();
            if(this.misses == 9) {
                view.displayMessage("GAME OVER LOSER");    
            }
            else {
                view.displayMessage("You missed");
            }
        }                
    }
}

var view = {
    displayMessage : function(msg) { 
        $("#messageArea").text(msg);  
    },
    
    updateHangman : function() {
        $("#hangman").attr("src", "images/stage" + model.misses.toString() + ".png");
    },
    
    updateSelectedWord : function() {
        var display = "";
        
        if(model.guesses.length == 0) {
            for(var i=0; i<model.selectedWord.length; i++) {            
                display = display + "_ ";
            }
        }
        else {            
            display = $("#word").text();            
            for(var i=0; i<model.selectedWord.length; i++) {                
                if(model.currentGuess == model.selectedWord[i]) {
                    model.hits++;
                    display = display.replaceAt(2*i, model.currentGuess);
                }
            }    
        }
        $("#word").text(display);
    } 
}
    
$(document).ready(initialize);
 
function initialize() {
    console.log("I'm in!!!");
    
    var buttons = $(":button");
    for(var i=0; i<buttons.length; i++) {
        buttons[i].onclick = handleButtonClick;
    }
    
    model.selectRandomWord();  
    view.updateSelectedWord();  
    view.displayMessage("Hit a letter");
}

function handleButtonClick(buttonObj) {
    var button = buttonObj.target;
    model.checkGuess(button.value);  
    button.disabled = true;  
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}