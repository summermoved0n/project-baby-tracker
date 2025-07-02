import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getDayTasks } from "../redux/tasks/tasksOperation";
import { selectDayTasks } from "../redux/tasks/tasks.Selectors";
import CalendarItem from "./CalendarItem";

const today = new Date();

export default function CalendarPage() {
  const dispatch = useDispatch();
  const dayTasks = useSelector(selectDayTasks);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  useEffect(() => {
    console.log(selectedDate);
    dispatch(getDayTasks(selectedDate));

    return () => {
      console.log("unmount component");
    };
  }, [selectedDate]);

  return (
    <View style={styles.calendar_conteiner}>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={(day) => {
            // console.log("selected day", day);
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
      <ScrollView style={styles.scroll_conteiner}>
        <Text style={styles.scroll_header}>Tasks:</Text>
        {(!dayTasks || dayTasks.length === 0) && (
          <Text>Any notices at this day.</Text>
        )}
        {dayTasks?.map(({ _id, babyService }) => (
          <View key={_id} style={styles.tasks_list}>
            {babyService?.map((items) => (
              <CalendarItem key={items._id} babyService={items} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar_conteiner: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "pink",
    width: "100%",
    height: "100%",
  },
  calendar: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  scroll_conteiner: {},
  scroll_header: {
    marginLeft: 16,
    color: "#000",
    fontWeight: "500",
    fontSize: 18,
  },
  tasks_list: {
    display: "flex",
    gap: 4,
  },
});
