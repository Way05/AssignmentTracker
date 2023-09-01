import ClassData from "./classesOBJ";

var RNFS = require("react-native-fs");

var path = RNFS.DocumentDirectoryPath + "./text-data/";
var classesTxt = "classes.txt";
var themesTxt = "themes.txt";

function writeFile(filePath, data) {
  RNFS.writeFile(filePath, data, "utf8")
    .then((success) => {
      console.log("data saved");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
writeFile(path + classesTxt, ClassData);
