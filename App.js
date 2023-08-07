import { React } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>NO WAY IT WORKS</Text>
        </View>

        <View style={styles.activityContainer}>
          {/*add activities here through code*/}
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
    backgroundColor: "lightgray",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    paddingBottom: 20,
  },
  topText: {
    color: "white",
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
