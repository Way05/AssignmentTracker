import { useState } from "react";
import toggleAnimation from "./toggleAnimation.js";

export {
  hidden,
  setHidden,
  animStatus1,
  animStatus2,
  toggleButtons,
  iconTransform,
  buttonTransform,
  buttonTransform2,
};

const [hidden, setHidden] = useState(false);
const animStatus1 = useRef(new Animated.Value(0)).current;
const animStatus2 = useRef(new Animated.Value(0)).current;
const toggleButtons = () => {
  const config = {
    duration: 200,
    toValue: hidden ? 0 : 1,
    useNativeDriver: true,
  };
  const config2 = {
    duration: 300,
    toValue: hidden ? 0 : 1,
    useNativeDriver: true,
  };
  Animated.timing(animStatus1, config).start();
  Animated.timing(animStatus2, config2).start();
  LayoutAnimation.configureNext(toggleAnimation);
  setHidden(!hidden);
};
const iconTransform = animStatus1.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "225deg"],
});
const buttonTransform = animStatus1.interpolate({
  inputRange: [0, 1],
  outputRange: [100, 0],
});
const buttonTransform2 = animStatus2.interpolate({
  inputRange: [0, 1],
  outputRange: [100, 0],
});
