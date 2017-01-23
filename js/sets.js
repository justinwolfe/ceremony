//ceremony.js by justin wolfe 
//meditation probability sets and sequences

//meditation probability sets, to introduce more randomness (but still structured randomness) than the sequences
var prob = {};
prob.test = [{
  chance: 80,
  type: ["imagination", "color"]
}, {
  chance: 20,
  type: ["movement"]
}];

//meditation sequences 
//each sequence is an array containing items with one of four types:
//1)string (for standalone custom sentences), 
//2)one element array (single element is sentence gen to call);
//3)two element array (first element is sentence gen to call, second element is an arg)
//4)three element array, first element is sentence gen to call with two args (i.e. gen.transition)
var seq = {};
seq.test = [
  "you are at peace with the world.", 
  ["transition", "standing"],
  ["chanting"],
  ["imagination", "color"],
  ["mindful"],
  ["movement"],
  ["chanting"],
  ["mindful"],
  ["transition", "sitting"],
  ["stretching"]
];
seq.test2 = [
  "something else."
];