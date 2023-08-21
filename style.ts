import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import themes from "./src/app-data/themes";

export var currentTheme = themes[0];

export function changeTheme(value: number) {
  currentTheme = themes[value];
  console.log(value);
}

// device height
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAV_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

export const styles = StyleSheet.create({
  topTextContainer: {
    backgroundColor: currentTheme.background,
    paddingTop: Platform.OS === "android" ? STATUS_BAR_HEIGHT + 20 : 0,
    paddingBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  settingsIcon: {
    fontSize: 30,
    color: "white",
  },
  activityContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "black",
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
    color: "white",

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

    backgroundColor: "black",

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

    backgroundColor: "black",
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
