module.exports = {
  main: function () {
    var month = new Date().getMonth() + 1;
    var day = new Date().getUTCDate();
    var dayUTC = new Date().getUTCDate() - 1;

    day = day % 7;

    if (day == 0) {
      day = 1;
    }

    month.toString();
    day.toString();

    const monthNames = {
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
    const dayNames = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };

    // function convertToWrittenDate() {
    var monthName;
    for (const [key, value] of Object.entries(monthNames)) {
      if (key == month) {
        monthName = monthNames[key];
        break;
      }
    }

    var dayName;
    for (const [key, value] of Object.entries(dayNames)) {
      if (key == day) {
        dayName = dayNames[key];
      }
    }

    return `${dayName}, ${monthName} ${dayUTC}`;
    // }
  },
};
