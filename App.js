import { React, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";
import Accordion from "./accordionComponent.js";

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

  const testAcc = [
    { title: "testing", content: "lorem ipsum" },
    { title: "te", content: "co" },
  ];

  return (
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>{displayCurrentTimeDate()}</View>

        <View style={styles.activityContainer}>
          <View style={styles.accContainer}>
            <Text style={styles.accContainer}>
              {testAcc.map(({ title, content }) => (
                <Accordion title={title} content={content} />
              ))}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              console.log("button pressed");
            }}
            title="Add Activity"
            style={styles.addButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accContainer: {
    width: "90%",
  },
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
    backgroundColor: "white",
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
  addButton: {},
});
