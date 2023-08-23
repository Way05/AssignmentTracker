import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import { toggleAnimation } from "../animations/toggleAnimation";

export type Props = {
  title: string;
  content: React.JSX.Element;
};
const Accordion: React.FC<Props> = ({ title, content }) => {
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

    backgroundColor: "$activities",
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
    color: "$text",

    fontSize: 20,
    fontWeight: "bold",
  },
  bodyText: {
    color: "$text",

    width: "100%",
  },
  icon: {
    color: "white",

    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Accordion;
