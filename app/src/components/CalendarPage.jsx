import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";
import { ScrollView, Text, View } from "react-native";
import { getDayTasks } from "../redux/tasks/tasksOperation";

const today = new Date();

export default function CalendarPage() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  useEffect(() => {
    dispatch(getDayTasks(selectedDate));
  }, []);

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
      <ScrollView></ScrollView>
    </View>
  );
}
