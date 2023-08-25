import { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";

import { styles } from "../../../style";
import ClassData from "../../app-data/classesOBJ.js";

export {
  activityModalVisible,
  setActivityModalVisibility,
  activityNameText,
  setActivityNameText,
  AddActivityModal,
};

type Props = {};

const [activityModalVisible, setActivityModalVisibility] = useState(false);
const [activityNameText, setActivityNameText] = useState("");

const AddActivityModal: React.FC<Props> = ({}) => {
  return (
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
            onChangeText={setActivityNameText}
            value={activityNameText}
            placeholder="name"
            style={styles.textInput}
            placeholderTextColor={"$text"}
          />
          <View style={styles.pressables}>
            <Pressable
              onPress={() => {
                setActivityModalVisibility(!activityModalVisible);
                var newClass = activityNameText;
                ClassData.push({
                  classID: ClassData.length + 1,
                  title: newClass,
                  taskCount: 0,
                  content: [],
                });
                setActivityNameText("");
              }}
              style={styles.pressable}
            >
              <Text style={styles.buttonText}>save</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setActivityModalVisibility(!activityModalVisible);
                setActivityNameText("");
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
