import { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export type Props = {};

const monthNames: { [key: number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
const dayNames: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const DateDisplay: React.FC<Props> = ({}) => {
  var month = new Date().getMonth() + 1;
  var day = new Date().getUTCDate() + 1;
  var dayUTC = new Date().getUTCDate();

  function returnDay() {
    day = day % 7;

    if (day == 0) {
      day = 1;
    }

    var dayName;
    for (let i = 1; i < Object.keys(dayNames).length; i++) {
      if (i == day) {
        dayName = dayNames[i];
      }
    }

    return dayName;
  }
  function returnMonth() {
    var monthName;
    for (let i = 1; i < Object.keys(monthNames).length; i++) {
      if (i == month) {
        monthName = monthNames[i];
      }
    }

    return monthName;
  }

  function displayCurrentTimeDate() {
    const [currentDate, setCurrentDate] = useState("");

    const getDate = useCallback(() => {
      setCurrentDate(`${returnDay()}, ${returnMonth()} ${dayUTC}`);
    }, []);
    useEffect(() => {
      const intervalID = setInterval(getDate, 1000);
      return () => clearInterval(intervalID);
    }, [getDate]);

    return currentDate;
  }
  return <Text style={styles.text}>{displayCurrentTimeDate()}</Text>;
};

const styles = EStyleSheet.create({
  text: {
    color: "$time",
    fontSize: 30,
    textAlign: "center",
  },
});

export default DateDisplay;
