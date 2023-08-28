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
import Accordion from "./src/components/accordionComponent";
import ClassDisplay from "./src/components/classComponent";
import ClassData from "./src/app-data/classesOBJ.js";
import toggleAnimation from "./src/animations/toggleAnimation.js";
import DropDownPicker from "react-native-dropdown-picker";
// import DatePicker from "react-native-date-picker";
import {
  styles,
  changeTheme,
  settingsStyles,
  RippleConfig,
  currentTheme,
  textInputPlaceholderColor,
} from "./style";
import themes from "./src/app-data/themes";
import DateDisplay from "./src/components/dateComponent";
import Ree from "./src/components/selectableThemeFlatList";

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

  const [activityModalVisible, setActivityModalVisibility] = useState(false);
  const [taskModalVisible, setTaskModalVisibility] = useState(false);
  const [settingsModalVisible, setSettingsModalVisibility] = useState(false);

  //only one text input will be open at a time so this is acceptable
  const [nameText, setNameText] = useState("");

  //hidden state for add buttons
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState(getItems());
  function getItems() {
    const classNames = [];
    for (let i = 0; i < ClassData.length; i++) {
      classNames.push({
        label: ClassData[i].title,
        value: ClassData[i].classID - 1,
      });
    }
    return classNames;
  }

  const [date, setDate] = useState(new Date());

  const [themeValue, setTheme] = useState(0);
  const [themeItems, setThemeItems] = useState(getThemes());
  function getThemes() {
    var list = [];
    for (let i = 0; i < themes.length; i++) {
      list.push({
        label: themes[i].name,
        value: i,
      });
    }
    return list;
  }

  const [uniqueValue, changeUniqueValue] = useState(currentTheme.id);
  function forceRemount() {
    changeUniqueValue(uniqueValue + 1);
  }

  return (
    //SAFEAREAVIEW is for IOS top bezel
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>
          <Pressable
            onPress={() => {
              setSettingsModalVisibility(true);
            }}
          >
            <Icon name="menu" style={styles.settingsIcon} />
          </Pressable>
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
                setActivityModalVisibility(true);
              }}
              style={styles.minorButton}
            >
              <Text style={styles.buttonText}>Activity</Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={{ transform: [{ translateX: buttonTransform2 }] }}
          >
            <Pressable
              onPress={() => {
                setTaskModalVisibility(true);
              }}
              style={styles.minorButton}
            >
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={settingsModalVisible}
        onRequestClose={() => {
          setSettingsModalVisibility(!settingsModalVisible);
        }}
        key={uniqueValue}
      >
        <View style={settingsStyles.settingsContainer}>
          <View style={settingsStyles.settingsTitleContainer}>
            <Text style={settingsStyles.settingsTitle}>Menu</Text>
          </View>
          <View style={settingsStyles.settingsOptionsContainer}>
            <Pressable
              style={settingsStyles.rippleButton}
              android_ripple={RippleConfig}
            >
              <Text style={settingsStyles.settingsText}>Themes</Text>
            </Pressable>
            <Ree mount={forceRemount} />
            {/* <DropDownPicker
              open={open}
              value={themeValue}
              items={themeItems}
              setOpen={setOpen}
              setValue={setTheme}
              setItems={setThemeItems}
              onChangeValue={() => {
                changeTheme(themeValue);
                forceRemount();
              }}
              style={settingsStyles.themeDropdown}
            /> */}
            <Pressable
              style={settingsStyles.rippleButton}
              android_ripple={RippleConfig}
            >
              <Text style={settingsStyles.settingsText}>Notifications</Text>
            </Pressable>
          </View>
          <View style={settingsStyles.settingsFootContainer}>
            <Pressable
              style={settingsStyles.rippleButton}
              android_ripple={RippleConfig}
            >
              <Text style={settingsStyles.settingsText}>About</Text>
            </Pressable>
            <Pressable
              style={settingsStyles.rippleButton}
              android_ripple={RippleConfig}
            >
              <Text style={settingsStyles.settingsText}>V // 1.0.0</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={activityModalVisible}
        onRequestClose={() => {
          setActivityModalVisibility(!activityModalVisible);
        }}
      >
        <View style={styles.modalParent}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Create New Activity</Text>
            <TextInput
              onChangeText={setNameText}
              value={nameText}
              placeholder="name"
              style={styles.textInput}
              placeholderTextColor={textInputPlaceholderColor}
            />
            <View style={styles.pressables}>
              <Pressable
                onPress={() => {
                  setActivityModalVisibility(!activityModalVisible);
                  var newClass = nameText;
                  ClassData.push({
                    classID: ClassData.length + 1,
                    title: newClass,
                    taskCount: 0,
                    content: [],
                  });
                  setNameText("");
                }}
                style={styles.pressable}
              >
                <Text style={styles.buttonText}>save</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setActivityModalVisibility(!activityModalVisible);
                  setNameText("");
                }}
                style={styles.pressable}
              >
                <Text style={styles.buttonText}>close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={taskModalVisible}
        onRequestClose={() => {
          setTaskModalVisibility(!taskModalVisible);
        }}
      >
        <View style={styles.modalParent}>
          <View style={[styles.modalContent, styles.datePickerModal]}>
            <View style={styles.modalSubContent}>
              <Text style={styles.modalText}>Add Task</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
              />
              <TextInput
                onChangeText={setNameText}
                value={nameText}
                placeholder="name"
                style={styles.textInput}
                placeholderTextColor={textInputPlaceholderColor}
              />
            </View>

            {/* https://reactnative.dev/docs/datepickerios */}
            {/* MUST RUN DATEPICKER ON DEV BUILD */}
            {/* <DatePicker
              date={date}
              onDateChange={setDate}
              style={styles.datePicker}
            /> */}

            <View style={styles.pressables}>
              <Pressable
                onPress={() => {
                  setTaskModalVisibility(!taskModalVisible);
                  var activity: number = value;
                  var newTask = nameText;
                  ClassData[activity].content.push({
                    assignmentName: newTask,
                    dueDate: date,
                  });
                  ClassData[activity].taskCount++;
                  setNameText("");
                }}
                style={
                  value == null || nameText == ""
                    ? { opacity: 0 }
                    : styles.pressable
                }
                disabled={value == null || nameText == ""}
              >
                <Text style={styles.buttonText}>save</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTaskModalVisibility(!taskModalVisible);
                  setNameText("");
                }}
                style={styles.pressable}
              >
                <Text style={styles.buttonText}>close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
