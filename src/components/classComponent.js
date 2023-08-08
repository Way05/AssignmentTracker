import { React } from "react";
import { Text, View, StyleSheet } from "react-native";

const assignmentItem = ({ name, date }) => {
  return (
    <View>
      <Text style={styles.text}>
        {name} due on {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default assignmentItem;
