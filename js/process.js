//ceremony.js by justin wolfe 
//processor functions and other helper functions

//probability sequence generator - to make up a sequence from a probability object
function probSeq(arr, numb) {
  var probArray = [];
  var outputArray = [];
  //iterate through the objects in the probability array
  for (var i = 0; i < arr.length; i++) {
    //iterate up to the chance number, populating the probability array with elements
    for (var j = 0; j < arr[i].chance; j++) {
      probArray.push(arr[i].type);
    }
  }
  //for loop to then extract weighted random elements from the probability array to make up the output array
  for (var k = 0; k < numb; k++) {
    outputArray.push(rae(probArray));
  }
  return outputArray;
}

//processor for sequences - takes an array with sequence directions, outputs an array of rendered sentences
function processSeq(seqArray) {
  var seqRender = [];
  for (var i = 0; i < seqArray.length; i++) {
    var s = "";
    if (Array.isArray(seqArray[i]) != true) {
      //if it's a string just pass the string
      s = seqArray[i];
    } else {
      //check for array length
      if (seqArray[i].length == 1) {
        //just process the single gen choice if that's what it is
        s = gen[seqArray[i][0]].sentence();
      } else if (seqArray[i].length == 2) {
        //otherwise also pass the arg
        s = gen[seqArray[i][0]].sentence(seqArray[i][1]);
      } else if (seqArray[i].length == 3) {
        //otherwise also pass the other arg
        s = gen[seqArray[i][0]].sentence(seqArray[i][1], seqArray[i][2]);
      }
    }
    //don't push blank strings to the render, they're useless
    if (s != "") {
      seqRender.push(s);
    }
  }
  return seqRender;
}

//TOOLS
//returns a random array element
function rae(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  return rand;
}

//returns a random object key (uses rae())
function rok(obj) {
  var keys = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }
  return rae(keys);
}

//returns a random integer
function ri(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//returns the correct indefinite article for a word (most of the time)
function article(word) {
  var article = "";
  if (word.charAt(0) == "a" || word.charAt(0) == "e" || word.charAt(0) == "i" || word.charAt(0) == "o" || word.charAt(0) == "u") {
    article = "an";
  } else {
    article = "a";
  }
  return article;
}

//returns a string with a count-up or count-down in it.
function count(num, dir) {
  var s = "";
  if (dir == "up") {
    for (var i = 0; i < num; i++) {
      s += " " + i + ".";
    }
  } else {
    for (var j = num; j > 0; j--) {
      s += " " + j + ".";
    }
  }
  return s;
}