import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View } from "react-native";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <View
      style={{
        paddingTop: 16,
        paddingHorizontal: 16,
        backgroundColor: "pink",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 320,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "pink",
            },
          }}
          theme={{
            calendarBackground: "rgba(199,91,141,0.6)",
            selectedDayTextColor: "#5bc7a3",
            textDisabledColor: "#3d403f",
            todayTextColor: "#34ebd0",
            monthTextColor: "pink",
            dayTextColor: "#fff",
            arrowColor: "pink",
            textSectionTitleColor: "purple",
            textDayFontSize: 18,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </View>
  );
}
