import { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { styles, changeTheme } from "../../../style";
import ClassData from "../../app-data/classesOBJ";
import themes from "../../app-data/themes";

export { AddTaskModal };

type Props = {};

const AddTaskModal: React.FC<Props> = ({}) => {
  const [taskModalVisible, setTaskModalVisibility] = useState(false);
  const [taskNameText, setTaskNameText] = useState("");

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

  const [date, setDate] = useState(new Date());

  return (
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
            <DropDownPicker
              open={open}
              value={themeValue}
              items={themeItems}
              setOpen={setOpen}
              setValue={setTheme}
              setItems={setThemeItems}
              onChangeValue={() => {
                changeTheme(themeValue);
                // forceRemount();
              }}
              style={styles.dropdown}
            />
            <TextInput
              onChangeText={setTaskNameText}
              value={taskNameText}
              placeholder="name"
              style={styles.textInput}
              placeholderTextColor={styles.dropdownPlaceholder}
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
                var newTask = taskNameText;
                ClassData[activity].content.push({
                  assignmentName: newTask,
                  dueDate: date,
                });
                ClassData[activity].taskCount++;
                setTaskNameText("");
              }}
              style={
                value == null || taskNameText == ""
                  ? { opacity: 0 }
                  : styles.pressable
              }
              disabled={value == null || taskNameText == ""}
            >
              <Text style={styles.buttonText}>save</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setTaskModalVisibility(!taskModalVisible);
                setTaskNameText("");
              }}
              style={styles.pressable}
            >
              <Text style={styles.buttonText}>close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
