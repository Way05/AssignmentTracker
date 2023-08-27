import React, { useState } from "react";
import { FlatList, Text, Pressable } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import themes from "../app-data/themes";
import { changeTheme, settingsStyles } from "../../style";

type data = {
  id: number;
  name: string;
  time: string;
  icon: string;
  background: string;
  modal: string;
  shadow: string;
  activities: string;
  tasks: string;
  button: string;
  text: string;
};

type Props = {
  item: data;
  onPress: () => void;
  backgroundColor: string;
  color: string;
};

const Item = ({ item, onPress, backgroundColor, color }: Props) => (
  <Pressable
    onPress={onPress}
    style={[settingsStyles.rippleButton, { backgroundColor }]}
  >
    <Text style={[settingsStyles.settingsText, { color }]}>{item.name}</Text>
  </Pressable>
);

const Ree = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: data }) => {
    const backgroundColor =
      item.name === selectedId ? item.background : item.tasks;
    const color = item.name === selectedId ? item.tasks : item.background;
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.name);
          changeTheme(item.id);
        }}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={themes}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

export default Ree;
