import { React, useState, useRef } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/Feather.js";
import Accordion from "./src/components/accordionComponent.tsx";
import ClassDisplay from "./src/components/classComponent.tsx";
import ClassData from "./src/app-data/classesOBJ.js";
import { toggleAnimation } from "./src/animations/toggleAnimation.js";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import THEMES from "./src/app-data/themes.js";
import DateDisplay from "./src/components/dateComponent.tsx";

// device height
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAV_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

// const [theme, setTheme] = useState(THEMES.DARK);

export default function App() {
  function getClasses(id, count) {
    var child = [];

    const today = new Date();

    for (let j = 0; j < count; j++) {
      const dd = new Date(ClassData[id - 1].content[j].dueDate);
      const diffTime = dd - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      child.push([ClassData[id - 1].content[j].assignmentName, diffDays]);
    }

    for (let i = 0; i < child.length - 1; i++) {
      if (child[i][1] > child[i + 1][1]) {
        const placeholder = child[i];
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

  const [modal1Visible, setModal1Visibility] = useState(false);
  const [nameText, setNameText] = useState("");

  const [modal2Visible, setModal2Visibility] = useState(false);

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
  const [value, setValue] = useState(null);
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

  return (
    //SAFEAREAVIEW is for IOS top bezel
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>
          <Icon name="menu" style={styles.settingsIcon} />
          <DateDisplay />
        </View>

        <View style={styles.activityContainer}>
          <FlatList
            data={ClassData}
            keyExtractor={(item) => item.classID}
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
                setModal1Visibility(true);
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
                setModal2Visibility(true);
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
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
          setModal1Visibility(!modalVisible);
        }}
      >
        <View style={styles.modalParent}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Create New Activity</Text>
            <TextInput
              onChangeText={setNameText}
              value={nameText}
              placeholder="name"
            />
            <View style={styles.pressables}>
              <Pressable
                onPress={() => {
                  setModal1Visibility(!modal1Visible);
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
                  setModal1Visibility(!modal1Visible);
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
        visible={modal2Visible}
        onRequestClose={() => {
          setModal2Visibility(!modal2Visible);
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
                  setModal2Visibility(!modal2Visible);
                  var activity = value;
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
                    ? (style = { opacity: 0 })
                    : styles.pressable
                }
                disabled={value == null || nameText == ""}
              >
                <Text style={styles.buttonText}>save</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModal2Visibility(!modal2Visible);
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

const styles = StyleSheet.create({
  topTextContainer: {
    backgroundColor: theme.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    paddingBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  settingsIcon: {
    fontSize: 30,
  },
  activityContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: theme.background,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  activityList: {
    margin: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: BOTTOM_NAV_BAR_HEIGHT + 10,
    right: 10,
  },
  addButton: {
    borderRadius: 10,

    width: 80,
    height: 80,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.button,
  },
  minorButton: {
    borderRadius: 10,

    height: 40,
    width: 80,

    marginBottom: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "black",
  },
  buttonText: {
    color: theme.text,

    fontWeight: "bold",
  },
  modalParent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  modalContent: {
    borderRadius: 20,
    width: 300,
    height: 200,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.background,

    //IOS DROP SHADOW
    shadowColor: theme.shadow,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowRadius: 3,
    //ANDROID DROP SHADOW
    elevation: 10,
  },
  modalSubContent: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerModal: {
    height: 500,
  },
  modalText: {},
  pressables: {
    width: 110,

    position: "absolute",
    bottom: 10,
    right: 10,

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressable: {
    borderRadius: 10,
    width: 50,
    height: 30,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.button,
  },
  dropdown: {
    width: 200,

    paddingHorizontal: 15,
    margin: 7,
    marginLeft: "50%",
    transform: [{ translateX: -100 }],
  },
  datePicker: {
    margin: 5,
  },
});
