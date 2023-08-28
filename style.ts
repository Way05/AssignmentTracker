import { Dimensions, StatusBar, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import themes from "./src/app-data/themes";

export {
  currentTheme,
  changeTheme,
  styles,
  settingsStyles,
  RippleConfig,
  textInputPlaceholderColor,
};

var currentTheme = themes[0];
function changeTheme(value: number) {
  currentTheme = themes[value];
  build();
  buildRipple();
  buildPlaceholderText();
  console.log(value);
}

var RippleConfig = {
  color: currentTheme.accent,
  borderless: false,
  radius: 200,
  foreground: false,
};
function buildRipple() {
  RippleConfig = {
    color: currentTheme.accent,
    borderless: false,
    radius: 200,
    foreground: false,
  };
}

var textInputPlaceholderColor = currentTheme.text;
function buildPlaceholderText() {
  textInputPlaceholderColor = currentTheme.text;
}

// device height
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAV_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

function build() {
  EStyleSheet.build({
    $theme: currentTheme.name,
    $time: currentTheme.time,
    $icon: currentTheme.icon,
    $background: currentTheme.background,
    $modal: currentTheme.modal,
    $shadow: currentTheme.shadow,
    $activities: currentTheme.activities,
    $tasks: currentTheme.tasks,
    $button: currentTheme.button,
    $text: currentTheme.text,
    $settingsText: currentTheme.settingsText,
    $accent: currentTheme.accent,
  });
}
build();
buildRipple();
buildPlaceholderText();

const styles = EStyleSheet.create({
  topTextContainer: {
    backgroundColor: "$background",
    paddingTop: Platform.OS === "android" ? STATUS_BAR_HEIGHT + 20 : 0,
    paddingBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  settingsIcon: {
    fontSize: 30,
    color: "$icon",
  },
  activityContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: "$background",
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
    bottom: BOTTOM_NAV_BAR_HEIGHT + 40,
    right: 5,
  },
  addButton: {
    borderRadius: 10,

    width: 80,
    height: 80,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "$button",
  },
  minorButton: {
    borderRadius: 10,

    height: 40,
    width: 80,

    marginBottom: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "$button",
  },
  buttonText: {
    color: "$text",

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

    backgroundColor: "$background",

    //IOS DROP SHADOW
    shadowColor: "$shadow",
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
  modalText: {
    color: "$text",
  },
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

    backgroundColor: "$button",
  },
  textInput: {
    backgroundColor: "$background",
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

const settingsStyles = EStyleSheet.create({
  settingsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "$background",
  },
  settingsTitleContainer: {
    height: "20%",

    alignItems: "center",
    justifyContent: "center",
  },
  settingsTitle: {
    color: "$settingsText",
    fontSize: 40,
  },
  settingsText: {
    color: "$settingsText",
    fontSize: 20,
  },
  rippleButton: {
    padding: 20,
  },
  settingsFootContainer: {
    width: "100%",
    position: "absolute",
    color: "$text",
    bottom: 0,
  },
});
