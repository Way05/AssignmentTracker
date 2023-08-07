module.exports = {
  main: function () {
    var month = new Date().getMonth() + 1;
    var day = new Date().getUTCDate() + 1;
    var dayUTC = new Date().getUTCMonth();

    if (month > 12) {
      month = 0;
    }
    if (day > 7) {
      day = 0;
    }

    month.toString();
    day.toString();

    const monthNames = {
      0: "January",
      1: "February",
      2: "March",
      8: "August",
      9: "September",
    };
    const dayNames = {
      0: "Monday",
      1: "Tuesday",
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
