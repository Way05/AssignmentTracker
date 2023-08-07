import { StatusBar } from "expo-status-bar";
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
    <SafeAreaView style={styles.topText}>
      <Text>NO WAY IT WORKS</Text>
      <StatusBar style="auto" />

      <View style={styles.activityContainer}>
        //add activities here through code
      </View>

      <button />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topText: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  activityContainer: {
    height: "80%",
    width: "auto",
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
  },
  addButton: {},
});
