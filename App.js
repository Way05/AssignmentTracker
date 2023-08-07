import { React, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
var dateFormatter = require("./getDate.js");

export default function App() {
  function displayCurrentTimeDate() {
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

  return (
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>{displayCurrentTimeDate()}</View>

        <View style={styles.activityContainer}>
          {/*ITS CALLED AN ACCORDION :OOOOOOOOOOOOOOOOOOOO*/}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
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
    width: "auto",
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "flex-end",
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
