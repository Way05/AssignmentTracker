const data = require("./src/app-data/test.json");

var classList = [];
var className = [];
var assignmentList = [];
for (var i = 0; i < Object.keys(data).length; i++) {
  var key = "class" + i;
  classList.push(key);
  className.push(data[key].title);
  for (var j = 0; j < data[key].content.length; j++) {
    assignmentList.push(data[key].content[j]);
  }
}
