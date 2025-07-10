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
import {
  closeModal,
  setTaskHours,
  setTaskMinutes,
} from "../redux/tasks/tasksReducer";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function EditModal() {
  const dispatch = useDispatch();
  const dayTasks = useSelector(selectDayTasks);
  const editData = useSelector(selectEditData);
  const taskTime = useSelector(selectTaskTime);

  console.log(editData);

  const [milkFormula, setMilkFormula] = useState(null);
  const [breastFeedingTime, setBreastFeedingTime] = useState(null);
  const [breastSide, setBreastSide] = useState(editData.breastSide || null);
  const [isPoop, setIsPoop] = useState(editData.isPoop || false);
  const [isPee, setIsPee] = useState(editData.isPee || false);
  const [vitaminD, setVitaminD] = useState(editData.vitaminD || false);
  const [eyeDrop, setEyeDrop] = useState(editData.eyeDrop || false);

  const onSubmit = () => {
    const { hours, minutes } = taskTime || {};

    const data = {
      date: dayTasks[0].date,
      dayId: dayTasks[0]._id,
      taskId: editData._id,
      updateData: {},
    };

    if (hours && minutes) data.updateData.time = `${hours}:${minutes}`;
    if (milkFormula) data.updateData.milkFormula = Number(milkFormula);
    if (breastFeedingTime)
      data.updateData.breastFeedingTime = Number(breastFeedingTime);
    if (breastSide) data.updateData.breastSide = breastSide;
    if (isPoop !== null || isPoop !== undefined)
      data.updateData.isPoop = isPoop;
    if (isPee !== null || isPee !== undefined) data.updateData.isPee = isPee;
    if (vitaminD !== null || vitaminD !== undefined)
      data.updateData.vitaminD = vitaminD;

    dispatch(updateOneTask(data))
      .then()
      .finally(() => {
        dispatch(closeModal());
        dispatch(setTaskHours(null));
        dispatch(setTaskMinutes(null));
      });
  };

  return (
    <Modal>
      <Text style={styles.edit_header}>Edit Task</Text>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.time_container}>
          <Text style={styles.input_text}>Time</Text>

          <Selector />
        </View>

        <View style={styles.milk_container}>
          <Text style={styles.input_text}>Breast Feeding Time</Text>
          <TextInput
            style={[styles.input, styles.milk_input]}
            placeholder="min"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={breastFeedingTime}
            onChangeText={setBreastFeedingTime}
            maxLength={2}
          />
          <Text>Hello</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
            justifyContent: "center",
            marginVertical: 6,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_breast_side,
              breastSide === "left" && styles.active_button,
            ]}
            onPress={() => {
              setBreastSide("left");
            }}
          >
            <Text style={styles.text_button}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_breast_side,
              breastSide === "right" && styles.active_button,
            ]}
            onPress={() => {
              setBreastSide("right");
            }}
          >
            <Text style={styles.text_button}>Right</Text>
          </TouchableOpacity>
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

        <Text style={styles.section_header}>Diaper`s staff</Text>

        <View
          style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_poop,
              isPoop && styles.active_button,
            ]}
            onPress={() => {
              setIsPoop(!isPoop);
            }}
          >
            <MaterialCommunityIcons
              name="emoticon-poop"
              size={18}
              color="black"
            />
            <Text style={styles.text_button}>Poop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_pee,
              isPee && styles.active_button,
            ]}
            onPress={() => {
              setIsPee(!isPee);
            }}
          >
            <Ionicons name="water-outline" size={16} color="black" />
            <Text style={styles.text_button}>Pee</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section_header}>Medicine</Text>

        <View
          style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_vitamin,
              vitaminD && styles.active_button,
            ]}
            onPress={() => {
              setVitaminD(!vitaminD);
            }}
          >
            <FontAwesome6
              name="prescription-bottle-medical"
              size={14}
              color="black"
            />
            <Text style={styles.text_button}>Vitamin D</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.btn_eye_drop,
              eyeDrop && styles.active_button,
            ]}
            onPress={() => {
              setEyeDrop(!eyeDrop);
            }}
          >
            <FontAwesome name="eye" size={16} color="black" />
            <Text style={styles.text_button}>Eye Drop</Text>
          </TouchableOpacity>
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
  time_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  milk_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
  section_header: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  active_button: { borderColor: "#f02951", borderWidth: 2 },

  text_button: { fontWeight: "500", fontSize: 16 },
  btn_breast_side: { backgroundColor: "pink" },
  btn_vitamin: {
    backgroundColor: "#59e37a",
  },
  btn_poop: {
    backgroundColor: "#a89423",
  },
  btn_pee: {
    backgroundColor: "#ffc100",
  },
  btn_formula: {
    backgroundColor: "#00fbff",
  },
  btn_milk: {
    backgroundColor: "#ceeced",
  },
  btn_eye_drop: {
    backgroundColor: "#c75bc2",
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
