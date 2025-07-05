import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditData } from "../redux/tasks/tasks.Selectors";
import { updateOneTask } from "../redux/tasks/tasksOperation";

export default function EditModal() {
  const dispatch = useDispatch();
  const editData = useSelector(selectEditData);
  console.log(editData);

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
      <ScrollView style={styles.scroll_container}>
        <Text>EditModal</Text>
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
  scroll_container: { height: 390 },
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
