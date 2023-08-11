import { React, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  FlatList,
} from "react-native";
import { toggleAnimation } from "../animations/toggleAnimation";
import ClassData from "../app-data/classes.js";
import AssignmentItem from "./classComponent.js";
import JSON from "../app-data/test.json";

const accordion = ({ title, content }) => {
  const [isActive, setActive] = useState(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    const config = {
      duration: 200,
      toValue: isActive ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setActive(!isActive);
  };

  const iconTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "180deg"],
  });

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        onPress={() => {
          toggleAccordion();
        }}
      >
        <View style={styles.titleHolder}>
          <Text style={styles.titleText}>{title}</Text>
          <Animated.View style={{ transform: [{ rotateZ: iconTransform }] }}>
            <Text style={styles.icon}>{isActive ? "-" : "+"}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isActive && <View style={styles.bodyText}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    width: "80%",

    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 5,

    alignSelf: "center",

    overflow: "hidden",
  },
  bodyHolder: {
    width: "100%",
  },
  titleHolder: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  titleText: {
    color: "white",

    fontSize: 20,
    fontWeight: "bold",
  },
  bodyText: {
    color: "white",

    width: "100%",
  },
  icon: {
    color: "white",

    fontSize: 20,
    fontWeight: "bold",
  },
});

export default accordion;
