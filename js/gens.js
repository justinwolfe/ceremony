//ceremony.js by justin wolfe 
//objects containing data for each of the sentence types and the sentence generator function

var gen = {};

gen.eyes = {
  sentence: function(into) {
    var s = "";
    if (into == "open") {
      if (ceremony.state.eyes == "open") {} else {
        s = "open your eyes.";
        ceremony.state.eyes = "open";
      }
    } else if (into == "closed") {
      if (ceremony.state.eyes == "open") {
        s = "close your eyes.";
        ceremony.state.eyes = "closed";
      } else {
        ceremony.state.eyes = "open";
      }
    }
    return s;
  }
};

gen.transition = {
  sentence: function(into, from) {
    var s = "";
    //in case a "from" arg isn't provided, grab it from the global setting
    if (from != null) {} else {
      from = ceremony.state.position;
    }
    switch (from) {
      case "standing":
        switch (into) {
          case "sitting":
            s = "sit down.";
            ceremony.state.position = "sitting";
            break;
          case "lyingBack":
            s = "sit down and then lie on your back, with your legs and arms relaxed.";
            ceremony.state.position = "lyingBack";
            break;
          case "lyingBelly":
            s = "sit down, lie on your back, then roll over so that you're lying on your belly.";
            ceremony.state.position = "lyingBelly";
            break;
        }
        break;
      case "sitting":
        switch (into) {
          case "standing":
            s = "stand up.";
            ceremony.state.position = "standing";
            break;
          case "lyingBack":
            s = "lie down on your back, with your arms and legs outstretched and relaxed.";
            ceremony.state.position = "lyingBack";
            break;
          case "lyingBelly":
            s = "lie down on your back, then roll over so that you're lying down on your belly.";
            ceremony.state.position = "lyingBelly";
            break;
        }
        break;
      case "lyingBack":
        switch (into) {
          case "sitting":
            s = "sit up and cross your legs loosely";
            ceremony.state.position = "sitting";
            break;
          case "standing":
            s = "sit up, then stand up.";
            ceremony.state.position = "standing";
            break;
          case "lyingBelly":
            s = "roll over so that you're lying on your belly";
            ceremony.state.position = "lyingBelly";
            break;
        }
        break;
      case "lyingBelly":
        switch (into) {
          case "sitting":
            s = "roll over onto your back, then sit up. cross your legs loosely.";
            ceremony.state.position = "sitting";
            break;
          case "lyingBack":
            s = "roll over onto your back.";
            ceremony.state.position = "lyingBack";
            break;
          case "standing":
            s = "press yourself up so that you're on all fours, then stand up.";
            ceremony.state.position = "standing";
            break;
        }
        break;
    }
    return s;
  }
};

gen.chanting = {
  verbs: ["repeat the word"],
  nouns: ["ocean", "river", "stream", "water", "home", "island", "mountain", "forest", "shore", "valley", "meadow", "field", "feather", "flower", "leaf", "tree", "path", "trail", "cloud"],
  sentences: [],
  sentence: function() {
    var word = rae(this.nouns);
    var times = ri(3, 9);
    var s = rae(this.verbs) + " " + word + " " + times + " " + "times.";
    for (var i = 0; i < times; i++) {
      s += " " + word + ".";
    }
    return s;
  }
};

gen.meditation = {
  sentence: function() {
    var times = ri(7, 32);
    var s = "count up to " + times + ".";
    for (var i = 0; i <= times; i++) {
      s += " " + i + ".";
    }
    return s;
  }
};

gen.affirmation = {
  sentences: ["you have value. you are valuable.", "love yourself for who you are.", "remember to be gentle.", "peace is possible in this moment.", "you can feel good soon, even if you feel bad now.", "all things must pass.", "you are alive.", "everything is okay.", "you are worthwhile."],
  sentence: function() {
    var s = "";
    var choice = rae(this.sentences);
    s = choice + ". repeat this to yourself: " + choice + " " + choice + " " + choice;
    return s;
  }
};

gen.imagination = {
  sentence: function(type) {
    var s = "";
    var color = rae(attr.colors);
    var room = rae(stuff.rooms);
    var shape = rae(attr.shapes);
    var objectThing = rae(stuff.objects);
    var nature = rae(stuff.nature);
    var structures = {
      objectThing: "imagine that you are holding " + article(objectThing) + " " + objectThing + ". turn it over in your hands and examine it. feel its weight and its texture.",
      room: "imagine that you are inside of " + article(room) + " " + room + ". with your eyes closed, move your gaze around the space, taking in your surroundings.",
      color: "imagine the color" + " " + color + ".",
      shape: "imagine" + " " + article(color) + " " + color + " " + shape + ".",
      shapes: "imagine" + " " + ri(2, 6) + " " + color + " " + shape + "s" + "."
    };
    if (type != null) {
      s = structures[type];
    } else {
      s = structures[rok(structures)];
    }
    return s;
  }
};

gen.stretching = {
  sentence: function(move) {
    //generate attributes here so that they can be reused within the same sentence
    var direction = rae(attr.directions);
    var bodySide = rae(body.sides);
    var side = rae(attr.sides);
    var structures = {};
    structures.standing = {
      lean: "lean " + direction,
      forwardBend: "bend forward at the waist and let your body hang loosely, your arms gently swinging. hang there for a count of ",
      backBend: "bend backward at the waist, placing your hands on your hips to balance you.",
      shoulderBend: "raise your hands above your head and intertwine your fingers. inhale while leaning to the left. hold that pose, feeling the stretch in the left side of your body. exhale while returning to center. then repeat on the other side, inhaling as you lean to the right. feel the stretch up and down your side. exhale while returning to center",
      legLift: "lift your" + " " + bodySide + " knee in front of you; hold it there.",
      armSide: "lift your" + " " + bodySide + " arm out to your side, so that it's at a right angle with your body.",
      armFront: "lift your arms and hold them outstretched in front of you. hold this for a count of 10. 1. 2. 3. 4. 5. 6. 7. 8. 9. 10.",
      goddess: "",
      pressUp: "",
      pressForward: "",
      long: "",
      toes: "bend forward at the waist. try to ",
    };
    structures.sitting = {
      forwardBend: "stretch your legs out straight in front of you. while inhaling, raise your arms straight above your head. while exhaling, bend forward over your legs and try to touch your toes. hold this for a count of ",
      sideStretch: "raise your arms straight above your head. stretch to your " + rae(attr.sides) + ".",
      twist: "",
      neckHang: "",
      qiBall: "",
      handsOnKnees: ""
    };
    structures.lyingBack = {
      snowAngel: "",
      kneeTuck: "",
      figure8: "",
      childPose: "",
      lift: "",
      upsideChair: "",
      long: "",
      backStroke: "",
    };
    structures.lyingBelly = {
      legLift: "",
      armShift: "",
      wiggle: "",
      embrace: "",
      pushUp: "",
      flying: ""
    };
    //move arg can be used to pick a specific move or random move for this position can be chosen
    var s = "";
    if (move != null) {      
    } else {
      move = rok(structures[ceremony.state.position]);
    }
    s = structures[ceremony.state.position][move];
    return s;
  }
};

//only use in standing position
gen.movement = {
  sentence: function() {
    var s = "";
    structures = {
      standing: {
        jump: "jump into the air.",
        jumpDirection: "jump " + rae(attr.directions),
        step: "take" + " " + ri(1, 5) + " steps " + rae(attr.directions) + ".",
      }
    };
    if (ceremony.state.position == "standing") {
      s = structures.standing[rok(structures.standing)];
    } else {}
    return s;
  }
};

gen.mindful = {
  verbs: ["focus on your", "concentrate on your", "feel the sensation in your", "become aware of your"],
  sentences: [],
  sentence: function(type) {
    var s = "";
    var structures = {
      single: rae(gen.mindful.verbs) + " " + rae(body.singleParts) + ".",
      hemi: rae(gen.mindful.verbs) + " " + rae(body.sides) + " " + rae(body.hemiParts) + ".",
      double: rae(gen.mindful.verbs) + " " + rae(body.hemiParts) + "s" + "."
    };
    if (type != null) {
      s = structures[type];
    } else {
      s = structures[rok(structures)];
    }
    return s;
  }
};

gen.breathing = {
  sentences: ["Slow the rhythm of your breath.", "Be conscious of the quality of your breath.", "Breathe deeply through your nose, then exhale slowly through your mouth.", "Breathe slowly into your belly—feel it expand with your breath. Repeat.", "Breathe in through the nose for 4 beats. 1, 2, 3, 4. Hold for 7 beats. 1, 2, 3, 4, 5, 6, 7. Exhale for 8 beats. 1, 2, 3, 4, 5, 6, 7, 8.", "Visualize the air you inhale as it travels through your body.", "Remember that the exhale is as important as the inhale."],
  sentence: function() {
    var s = rae(this.sentences);
    return s;
  }
};

gen.noticing = {
  verbs: [],
  nouns: ["an object in the room"],
  sentences: [],
  structures: [],
  sentence: function() {
    switch (ceremony.state.position) {
      case "standing":
        break;
      case "sitting":
        break;
      case "lyingBack":
        break;
      case "lyingBelly":
        break;
    }
  }
};
