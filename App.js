import { React, useCallback, useState, useEffect } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/Feather.js";
import Accordion from "./src/components/accordionComponent.js";
import ClassDisplay from "./src/components/classComponent.js";
import ClassData from "./src/app-data/classesOBJ.js";

// device height
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAV_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

export default function App() {
  function displayCurrentTimeDate() {
    var dateFormatter = require("./getDate.js");

    const [currentDate, setCurrentDate] = useState("");

    const getDate = useCallback(() => {
      var formattedDate = dateFormatter.main();

      setCurrentDate(formattedDate);
    }, []);
    useEffect(() => {
      const intervalID = setInterval(getDate, 1000);
      return () => clearInterval(intervalID);
    }, [getDate]);

    return <Text style={styles.topText}>{currentDate}</Text>;
  }

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

  const [modalVisible, setModalVisibility] = useState(false);

  const [nameText, setNameText] = useState("");

  return (
    //SAFEAREAVIEW is for IOS top bezel
    <SafeAreaView>
      <View>
        <View style={styles.topTextContainer}>
          <Icon name="menu" style={styles.settingsIcon} />
          <Text style={styles.topText}>{displayCurrentTimeDate()}</Text>
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
          <Pressable
            onPress={() => {
              setModalVisibility(true);
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisibility(!modalVisible);
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
                  setModalVisibility(!modalVisible);
                  var newAssignment = nameText;
                  ClassData.push({
                    classID: ClassData.length + 1,
                    title: newAssignment,
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
                  setModalVisibility(!modalVisible);
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
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    paddingBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },
  settingsIcon: {
    fontSize: 30,
  },
  activityContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "white",
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

    backgroundColor: "black",
  },
  buttonText: {
    color: "white",

    fontWeight: "bold",
  },
  modalParent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    borderRadius: 20,
    width: 300,
    height: 200,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",

    //IOS DROP SHADOW
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowRadius: 3,
    //ANDROID DROP SHADOW
    elevation: 10,
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

    backgroundColor: "black",
  },
});
