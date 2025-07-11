import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getDayTasks } from "../redux/tasks/tasksOperation";
import {
  selectDayTasks,
  selectModalType,
  selectOpenModal,
} from "../redux/tasks/tasksSelectors";
import CalendarItem from "./CalendarItem";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { selectAuthToken } from "../redux/auth/authSelectors";

const today = new Date();

export default function CalendarPage() {
  const dispatch = useDispatch();
  const dayTasks = useSelector(selectDayTasks);
  const isModal = useSelector(selectOpenModal);
  const modalType = useSelector(selectModalType);
  const token = useSelector(selectAuthToken);

  const [selectedDate, setSelectedDate] = useState(
    today.toLocaleDateString("sv-SE")
  );

  useEffect(() => {
    if (!token) return;
    console.log(selectedDate);
    dispatch(getDayTasks(selectedDate))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [selectedDate, dispatch, token]);

  return (
    <View style={styles.calendar_conteiner}>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={(day) => {
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
        {(!dayTasks ||
          dayTasks.length === 0 ||
          dayTasks[0].babyService.length === 0) && (
          <Text>Any notices at this day.</Text>
        )}
        {dayTasks?.map(({ _id, babyService }) => (
          <View key={_id} style={styles.tasks_list}>
            {babyService
              ?.slice()
              .sort((a, b) => {
                const [aHours, aMinutes] = a.time.split(":").map(Number);
                const [bHours, bMinutes] = b.time.split(":").map(Number);

                return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
              })
              .map((items) => (
                <CalendarItem key={items._id} babyService={items} />
              ))}
          </View>
        ))}
      </ScrollView>

      {isModal && modalType === "delete" && <DeleteModal />}
      {isModal && modalType === "edit" && <EditModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  calendar_conteiner: {
    position: "relative",
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
