import React from "react";
import { Text, View, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export type Props = {
  name: string;
  date: number;
};

const ClassDisplay: React.FC<Props> = ({ name, date }) => {
  const dateString = (days: number) =>
    days > 0 ? `${days} days left` : `${days} days overdue!`;

  return (
    <View style={styles.tHolder}>
      <Text style={styles.t}>{name}</Text>
      <Text style={styles.t}>{dateString(date)}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  tHolder: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  t: {
    width: "50%",
    color: "$text",
    textAlign: "center",
  },
});

export default ClassDisplay;
