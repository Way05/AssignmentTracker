const data = require("./src/app-data/test.json");

var classList = [];
var className = [];
var assignmentList = [];
for (var i = 0; i < Object.keys(data).length; i++) {
  var key = "class" + i;
  classList.push(key);
  className.push(data);
  assignmentList.push(data[key].content);
}
console.log(assignmentList[0][1]);
