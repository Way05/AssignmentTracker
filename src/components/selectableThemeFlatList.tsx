import React, { useState } from "react";
import { FlatList, Text, Pressable } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import themes from "../app-data/themes";
import {
  RippleConfig,
  changeTheme,
  currentTheme,
  settingsStyles,
} from "../../style";

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
  settingsText: string;
};

type Props = {
  item: data;
  onPress: () => void;
  indicator: string;
};
type Prop2 = {
  mount: () => void;
};

const Item = ({ item, onPress, indicator }: Props) => (
  <Pressable
    onPress={onPress}
    style={[settingsStyles.rippleButton]}
    android_ripple={RippleConfig}
  >
    <Text style={[settingsStyles.settingsText]}>{indicator + item.name}</Text>
  </Pressable>
);

const Ree = ({ mount }: Prop2) => {
  const [selectedId, setSelectedId] = useState(currentTheme.name);

  const renderItem = ({ item }: { item: data }) => {
    // const backgroundColor = item.name === selectedId ? "white" : "black";
    const indicator = item.name === selectedId ? "     _" : "     ";
    // const color = item.name === selectedId ? "black" : "white";
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.name);
          changeTheme(item.id);
          mount();
        }}
        indicator={indicator}
      />
    );
  };
  return (
    <FlatList
      data={themes}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      style={settingsStyles.flatlist}
    />
  );
};

export default Ree;
