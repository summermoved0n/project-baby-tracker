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
import { selectEditData } from "../redux/tasks/tasks.Selectors";
import { updateOneTask } from "../redux/tasks/tasksOperation";
import Selector from "./Selector";

export default function EditModal() {
  const dispatch = useDispatch();
  const editData = useSelector(selectEditData);
  console.log(editData);

  const [time, setTime] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const [milkFormula, setMilkFormula] = useState(null);
  const [breastFeedingTime, setBreastFeedingTime] = useState(null);
  const [breastSide, setBreastSide] = useState(null);
  const [isPoop, setIsPoop] = useState(false);
  const [isPee, setIsPee] = useState(false);
  const [vitaminD, setVitaminD] = useState(false);

  const onSubmit = () => {
    const data = {
      dayId: "getDayId",
      taskId: "id",
    };

    dispatch(updateOneTask());
  };

  return (
    <Modal>
      <Text style={styles.edit_header}>Edit Task</Text>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.milk_container}>
          <Text style={styles.input_text}>Time</Text>

          <Selector />
          <Text>:</Text>
          <TextInput
            style={[styles.input, styles.milk_input]}
            placeholder="00"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            maxLength={2}
          />
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
    gap: 6,
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
