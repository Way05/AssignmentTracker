import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Modal,
  Dimensions,
  TextInput,
  Animated,
  LayoutAnimation,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather.js";
import DropDownPicker from "react-native-dropdown-picker";

import toggleAnimation from "./src/animations/toggleAnimation";

import Accordion from "./src/components/accordionComponent";
import ClassDisplay from "./src/components/classComponent";
import { AddActivityModal } from "./src/components/modalComponents/addActivityModal";
import { AddTaskModal } from "./src/components/modalComponents/addTaskModal";
import ClassData from "./src/app-data/classesOBJ.js";
// import DatePicker from "react-native-date-picker";
import { styles, changeTheme } from "./style";
import themes from "./src/app-data/themes";
import DateDisplay from "./src/components/dateComponent";

export default function App() {
  function getClasses(id: number, count: number) {
    var child = [];

    const today: Date = new Date();

    for (let j = 0; j < count; j++) {
      const dd: Date = new Date(ClassData[id - 1].content[j].dueDate);
      const diffTime: number = dd.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      child.push([ClassData[id - 1].content[j].assignmentName, diffDays]);
    }

    for (let i = 0; i < child.length - 1; i++) {
      if (child[i][1] > child[i + 1][1]) {
        const placeholder: Array<any> = child[i];
        child[i] = child[i + 1];
        child[i + 1] = placeholder;
      }
    }

    return (
      <FlatList
        data={child}
        renderItem={({ item }) => (
          <ClassDisplay name={item[0]} date={item[1]} />
        )}
      />
    );
  }

  const [uniqueValue, changeUniqueValue] = useState(0);
  function forceRemount() {
    changeUniqueValue(uniqueValue + 1);
  }
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

  return (
    //SAFEAREAVIEW is for IOS top bezel
    <SafeAreaView key={uniqueValue}>
      <View key={uniqueValue}>
        <View style={styles.topTextContainer}>
          <Icon name="menu" style={styles.settingsIcon} />
          <DateDisplay />
        </View>

        <View style={styles.activityContainer}>
          <FlatList
            data={ClassData}
            // keyExtractor={item => item.classID}
            renderItem={({ item }) => (
              <Accordion
                title={item.title}
                content={getClasses(item.classID, item.taskCount)}
              />
            )}
            style={styles.activityList}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View
            style={{ transform: [{ translateX: buttonTransform }] }}
          >
            <Pressable
              onPress={() => {
                <AddActivityModal />;
              }}
              style={styles.minorButton}
            >
              <Text style={styles.buttonText}>Activity</Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={{ transform: [{ translateX: buttonTransform2 }] }}
          >
            <Pressable onPress={() => {}} style={styles.minorButton}>
              <Text style={styles.buttonText}>Task</Text>
            </Pressable>
          </Animated.View>

          <Pressable
            onPress={() => {
              toggleButtons();
            }}
            style={styles.addButton}
          >
            <Animated.View style={{ transform: [{ rotateZ: iconTransform }] }}>
              <Text style={styles.buttonText}>{hidden ? "+" : "Add"}</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
