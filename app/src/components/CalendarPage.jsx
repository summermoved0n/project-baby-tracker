import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";
import { ScrollView, Text, View } from "react-native";
import { getDayTasks } from "../redux/tasks/tasksOperation";
import { selectDayTasks } from "../redux/tasks/tasks.Selectors";

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
      <ScrollView>
        <Text>Tasks</Text>
        {(!dayTasks || dayTasks.length === 0) && (
          <Text>Any notices at this day.</Text>
        )}
        {dayTasks?.map(({ _id, babyService }) => (
          <View key={_id}>
            {babyService?.map(
              ({
                _id,
                time,
                milkFormula,
                breastFeedingTime,
                poopSize,
                isPee,
              }) => (
                <View key={_id}>
                  <Text>{time}</Text>
                  {milkFormula && <Text>- Milk formula: {milkFormula} ml</Text>}
                  {breastFeedingTime && (
                    <Text>- Breast Feed: {breastFeedingTime} min</Text>
                  )}
                  {poopSize && <Text>- Had a {poopSize} poop</Text>}
                  {isPee && <Text>- Had a pee</Text>}
                </View>
              )
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
