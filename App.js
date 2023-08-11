import { React, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  FlatList,
} from "react-native";
import Accordion from "./src/components/accordionComponent.js";
import ClassData from "./src/app-data/classesOBJ.js";

export default function App() {
  function displayCurrentTimeDate() {
    var dateFormatter = require("./getDate.js");

    const [currentDate, setCurrentDate] = useState("");

    const getDate = useCallback(() => {
      var formattedDate = dateFormatter.main();

      setCurrentDate(formattedDate);
    }, []);
    useEffect(() => {
      const intervalID = setInterval(getDate, 1000);
      return () => clearInterval(intervalID);
    }, [getDate]);

    return <Text style={styles.topText}>{currentDate}</Text>;
  }

  function getClasses(id, count) {
    var child = [];
    for (let j = 0; j < count; j++) {
      child.push([
        ClassData[id - 1].content[j].assignmentName,
        ClassData[id - 1].content[j].dueDate,
      ]);
      console.log(child);
    }
    return (
      <FlatList
        data={child}
        renderItem={({ item }) => (
          <View style={styles.tHolder}>
            <Text style={styles.t}>{item[0]}</Text>
            <Text style={styles.t}>{item[1]}</Text>
          </View>
        )}
      />
    );
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>{displayCurrentTimeDate()}</View>

        <View style={styles.activityContainer}>
          <FlatList
            data={ClassData}
            keyExtractor={(item) => item.classID}
            renderItem={({ item }) => (
              <Accordion
                title={item.title}
                content={getClasses(item.classID, item.taskCount)}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              console.log("button pressed");
            }}
            title="+"
            style={styles.addButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topTextContainer: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    paddingBottom: 20,
  },
  topText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },
  activityContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "lightblue",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 40,
    right: 10,
    height: 50,
    width: "100%",
    alignItems: "flex-end",
  },
  addButton: {
    borderRadius: 100,
  },
  tHolder: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  t: {
    width: "50%",
    color: "white",
    textAlign: "center",
  },
});
