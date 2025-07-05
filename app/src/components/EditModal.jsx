import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDayTasks,
  selectEditData,
  selectTaskTime,
} from "../redux/tasks/tasks.Selectors";
import { updateOneTask } from "../redux/tasks/tasksOperation";
import Selector from "./Selector";
import { closeModal } from "../redux/tasks/tasksReducer";

export default function EditModal() {
  const dispatch = useDispatch();
  const dayTasks = useSelector(selectDayTasks);
  const editData = useSelector(selectEditData);
  const taskTime = useSelector(selectTaskTime);

  console.log(taskTime);

  const [milkFormula, setMilkFormula] = useState(null);
  const [breastFeedingTime, setBreastFeedingTime] = useState(null);
  const [breastSide, setBreastSide] = useState(null);
  const [isPoop, setIsPoop] = useState(false);
  const [isPee, setIsPee] = useState(false);
  const [vitaminD, setVitaminD] = useState(false);

  const onSubmit = () => {
    const { hours, minutes } = taskTime || {};

    if (!hours || !minutes) {
      return dispatch(closeModal());
    }

    const time = `${hours}:${minutes}`;
    console.log("🕒 Обране: ", time);
    console.log(editData._id);

    const data = {
      date: dayTasks[0].date,
      dayId: dayTasks[0]._id,
      taskId: editData._id,
      updateData: {
        time,
      },
    };

    dispatch(updateOneTask(data))
      .then()
      .finally(() => dispatch(closeModal()));
  };

  return (
    <Modal>
      <Text style={styles.edit_header}>Edit Task</Text>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.milk_container}>
          <Text style={styles.input_text}>Time</Text>

          <Selector />
        </View>

        <View style={styles.milk_container}>
          <Text style={styles.input_text}>Milk Formula</Text>
          <TextInput
            style={[styles.input, styles.milk_input]}
            placeholder="ml"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={milkFormula}
            onChangeText={setMilkFormula}
            maxLength={3}
          />
        </View>
      </ScrollView>

      <View style={styles.send_btn_container}>
        <TouchableOpacity style={styles.send_btn} onPress={() => onSubmit()}>
          <Text style={styles.text_btn}>Send</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scroll_container: { height: 360 },
  edit_header: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  milk_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // gap: 6,
  },
  input_text: {
    fontWeight: "500",
    fontSize: 18,
    color: "gray",
  },
  input: {
    backgroundColor: "pink",
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  send_btn_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text_btn: { fontWeight: "500", fontSize: 18, color: "#fff" },
  send_btn: {
    width: 100,
    height: 50,
    backgroundColor: "#f02951",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
