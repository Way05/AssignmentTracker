import { React, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const accordion = ({ title, content }) => {
  const [isActive, setActive] = useState(false);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        style={styles.titleHolder}
        onPress={() => {
          setActive(!isActive);
          console.log("ACCORDION");
        }}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text>{isActive ? "-" : "+"}</Text>
      </TouchableOpacity>
      {isActive && <Text style={styles.accordionContent}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    width: "90%",
  },
  titleHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "black",
  },
  accordionContent: {
    color: "white",
    backgroundColor: "black",
  },
  titleText: {
    color: "white",

    textAlign: "center",
  },
});

export default accordion;
