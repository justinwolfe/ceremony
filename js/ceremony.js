//ceremony.js by justin wolfe 
//code for running 

//high level settings
var ceremony = {};
//settings related to running the app
ceremony.session = {};
ceremony.session.active = false;
ceremony.session.started = false;
ceremony.session.timerCounter = 0;
ceremony.session.timer = "";
//settings that can be modified
ceremony.settings = {};
ceremony.settings.shortPause = 900;
ceremony.settings.longPause = 3500;
ceremony.speech = {};
//global state variables for the body using the app
ceremony.state = {};
// valid: open, closed
ceremony.state.eyes = "open";
// valid: standing, sitting, lying_back, lying_belly
ceremony.state.position = "standing";

//speech synthesis stuff
ceremony.speech.speechArray = processSeq(seq.test);
ceremony.speech.speechBuffer = [];
ceremony.speech.speakIt = new SpeechSynthesisUtterance();
ceremony.speech.voiceList = speechSynthesis.getVoices();
ceremony.speech.speakIt.rate = .8;
ceremony.speech.speakIt.pitch = 1;
ceremony.speech.speakIt.lang = "en-US";
//ceremony.speech.speakIt.voiceURI = "";
ceremony.descriptions = {
  "cer-1":"(something mystical about the first one)",
  "cer-2":"(another mystical thing about the second one)",
  "cer-3":"(something else mystical about the third one)",
  "cer-4":"(you know i've got something mystical about the fourth one)",
  "cer-5":"(concluding with the fifth one, super mystical)"
}

$(document).ready(function() {
  console.log(ceremony.speech.speechArray);
  getVoices();
  //cancel on load to clear out any leftover speech from the last time this ran
  speechSynthesis.cancel();
  //make select buttons look prettier
  setupUI();
});

//parses text to be spoken and sets up a buffer to get around the problem of speechUtterance crapping out with longer strings
function speaker() {
  console.log(ceremony.speech.speechBuffer.length);
  console.log(ceremony.speech.speechArray.length);
  //first check if there's strings in the speech buffer that need to be said before proceeding to the next string in the speech array
  if (ceremony.speech.speechBuffer.length > 0) {
    //very brief pause and then the next sentence in the speech buffer
    var firstWord = ceremony.speech.speechBuffer.shift();
    var timer = setTimeout(function() {
      speaks(firstWord)
    }, ceremony.settings.shortPause);
    // else, slightly longer pause and then move ahead with the next string in the speech array  
  } else if (ceremony.speech.speechBuffer.length == 0 && ceremony.speech.speechArray.length >= 1) {
    var firstLine = ceremony.speech.speechArray.shift();
    ceremony.speech.speechBuffer = firstLine.split(".").filter(String);
    console.log(ceremony.speech.speechBuffer);
    var firstWord = ceremony.speech.speechBuffer.shift();
    var timer = setTimeout(function() {
      //pass the current string from the speechArray to the visual element
      $("#output").text(firstLine);
      speaks(firstWord)
    }, ceremony.settings.longPause);
    //else if both the buffer and the array are empty and there is nothing left to read:  
  } else if (ceremony.speech.speechBuffer.length == 0 && ceremony.speech.speechArray.length == 0) {
    console.log("done")
  }
}

//the actual speech synthesis being passed the text and speaking it, then recursing (lol, not really a word) back to speaker();
function speaks(word) {
  ceremony.speech.speakIt.text = word;
  speechSynthesis.speak(ceremony.speech.speakIt)
  ceremony.speech.speakIt.onend = function() {
    console.log("end utterance");
    speaker();
  }
}

//sets up...UI
function setupUI() {
    $("label.glyph").hover(function() {
      console.log("hovered glyph");
      console.log($(this).prev().attr("id"));
      var choice = $(this).prev().attr("id");
      console.log(ceremony.descriptions[choice]);
      $("#description").text(ceremony.descriptions[choice])
    });
  $("label.glyph").click(function() {
    console.log("clicked glyph");
    console.log($(this)[0].innerHTML);
    console.log($(this).prev());
    $('#controls').css('visibility', 'visible');
    $('#controls').animate({opacity: 1}, ceremony.settings.shortPause, function(){
    });
  })
  $("#voices").change(function(e) {
    var voiceIndex = this.value;
    console.log(voiceIndex);
    ceremony.speech.speakIt.voice = ceremony.speech.voiceList[voiceIndex];
  });
  $("#action").click(function() {
    if(ceremony.session.active == false){
      ceremony.session.active = true;
      if (ceremony.session.started == false){
        ceremony.session.started = true;
        ceremony.session.timer = setInterval(sessionTimer,1000);
        speaker();
        fader();
      } else {
        speechSynthesis.resume(); 
        $("#timer").hide();
        ceremony.session.timer = setInterval(sessionTimer,1000);
      }
      $("#action").text("pause");
    } else if (ceremony.session.active == true){
      speechSynthesis.pause();
      clearInterval(ceremony.session.timer);
      $("#timer").show();
      ceremony.session.active = false;
      $("#action").text("play");
    }
  });
}

//fade out UI elements
function fader(){
  $("#title,#voices,#timerChooser,#action,#glyphs,#description").fadeOut(ceremony.settings.longPause, function() {
    $("#action").fadeIn(ceremony.settings.longPause, function() {});
  });
}

//retrieve voice options
function getVoices(){
  ceremony.speech.voiceList = speechSynthesis.getVoices();
  console.log(ceremony.speech.voiceList);
  for(var i=0; i<ceremony.speech.voiceList.length; i++){
    $("#voices").append("<option value='"+i+"'>" + ceremony.speech.voiceList[i].name + "</option>");
  }
}

//timer
function sessionTimer(){
  ceremony.session.timerCounter++;
  console.log(ceremony.session.timerCounter);
  $("#timer").text(ceremony.session.timerCounter);
}