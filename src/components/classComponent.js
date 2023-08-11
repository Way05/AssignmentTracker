import { React } from "react";
import { Text, View, StyleSheet } from "react-native";

const classes = ({ name, date }) => {
  return (
    <View style={styles.tHolder}>
      <Text style={styles.t}>{name}</Text>
      <Text style={styles.t}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default classes;
