import { useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  createYearPattern,
  createTimePattern,
  hasTwoMoreKeys,
  getMinutesDifference,
} from "../helpers/middleware";
import { createTask } from "../redux/tasks/tasksOperation";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function CreateTaskPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [milkFormula, setMilkFormula] = useState(null);
  const [isPoop, setIsPoop] = useState(false);
  const [isPee, setIsPee] = useState(false);
  const [breastSide, setBreastSide] = useState(null);
  const [vitaminD, setVitaminD] = useState(false);

  const [startFeed, setStartFeed] = useState("00:00");
  const [endFeed, setEndFeed] = useState("00:00");

  const [activePoop, setActivePoop] = useState(false);
  const [activePee, setActivePee] = useState(false);
  const [activeDropD, setActiveDropD] = useState(false);
  const [activeLeftBreast, setActiveLeftBreast] = useState(false);
  const [activeRightBreast, setActiveRightBreast] = useState(false);

  const sendData = async () => {
    const date = new Date();
    const countFeedTime = getMinutesDifference(startFeed, endFeed);

    if (countFeedTime === 0) {
      setStartFeed("00:00");
      setEndFeed("00:00");
    }

    const formData = {
      date: createYearPattern(date),
      time: createTimePattern(date),
    };
    if (milkFormula) formData.milkFormula = Number(milkFormula);
    if (countFeedTime) formData.breastFeedingTime = countFeedTime;
    if (isPoop) formData.isPoop = isPoop;
    if (isPee) formData.isPee = isPee;
    if (breastSide) formData.breastSide = breastSide;
    if (vitaminD) formData.vitaminD = vitaminD;

    if (hasTwoMoreKeys(formData)) {
      try {
        console.log(formData);
        dispatch(createTask(formData));
        resetForm();
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: "Created a task",
          text2: "You can see a new task in the calendar.",
        });

        navigation.navigate("Calendar");
      } catch (error) {
        console.log(error);
      }
      return;
    }

    Toast.show({
      type: "error", // 'success' | 'error' | 'info'
      text1: "Bad request",
      text2: "You must pick at least one value.",
    });
  };

  const resetForm = () => {
    setBreastSide(null);
    setMilkFormula(null);
    setIsPoop(false);
    setIsPee(false);
    setVitaminD(false);

    setStartFeed("00:00");
    setEndFeed("00:00");

    setActivePoop(false);
    setActivePee(false);
    setActiveDropD(false);
    setActiveLeftBreast(false);
    setActiveRightBreast(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll_container}>
        <Text style={styles.food_header}>Types of food</Text>
        <View style={[styles.milk_container, styles.border_conreiner]}>
          <Text style={styles.input_text}>Milk Formula</Text>
          <TextInput
            style={[styles.input, styles.milk_input]}
            placeholder="ml"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={milkFormula}
            onChangeText={setMilkFormula}
          />
        </View>

        <View style={styles.border_conreiner}>
          <Text style={styles.input_text}>Breast Feeding</Text>
          <View style={styles.feeding_container}>
            <View style={styles.container_row}>
              <TouchableOpacity
                style={[
                  styles.button_small,
                  startFeed !== "00:00" && styles.active_button,
                ]}
                disabled={startFeed !== "00:00"}
                onPress={() => {
                  const date = new Date();
                  setStartFeed(createTimePattern(date));
                }}
              >
                <Text style={styles.input_text}>Start</Text>
              </TouchableOpacity>

              <View style={[styles.timer_container, styles.button_small]}>
                <Text style={styles.input_text}>{startFeed}</Text>
              </View>
            </View>

            <View style={styles.container_row}>
              <TouchableOpacity
                style={[
                  styles.button_small,
                  endFeed !== "00:00" && styles.active_button,
                ]}
                disabled={endFeed !== "00:00" || startFeed === "00:00"}
                onPress={() => {
                  const date = new Date();
                  setEndFeed(createTimePattern(date));
                }}
              >
                <Text style={styles.input_text}>End</Text>
              </TouchableOpacity>

              <View style={[styles.timer_container, styles.button_small]}>
                <Text style={styles.input_text}>{endFeed}</Text>
              </View>
            </View>
          </View>

          <View style={{}}>
            <Text style={styles.input_text}>Breast side</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (activeLeftBreast) {
                    setBreastSide(null);
                    setActiveLeftBreast(false);
                    return;
                  }
                  setActiveLeftBreast(true);
                  setActiveRightBreast(false);
                  setBreastSide("left");
                }}
                style={[
                  styles.button_small,
                  activeLeftBreast && styles.active_button,
                ]}
              >
                <Text style={styles.input_text}>Left</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (activeRightBreast) {
                    setBreastSide(null);
                    setActiveRightBreast(false);
                    return;
                  }
                  setActiveLeftBreast(false);
                  setActiveRightBreast(true);
                  setBreastSide("right");
                }}
                style={[
                  styles.button_small,
                  activeRightBreast && styles.active_button,
                ]}
              >
                <Text style={styles.input_text}>Right</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.food_header}>Diaper</Text>

        <View style={[styles.diaper_container, styles.border_conreiner]}>
          <TouchableOpacity
            onPress={() => {
              setActivePoop(!activePoop);
              setIsPoop(!isPoop);
            }}
            style={[styles.button_small, activePoop && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Poop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActivePee(!activePee);
              setIsPee(!isPee);
            }}
            style={[styles.button_small, activePee && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Pee</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.food_header}>Medicine</Text>

        <View style={[styles.medical_container, styles.border_conreiner]}>
          <TouchableOpacity
            onPress={() => {
              setVitaminD(!vitaminD);
              setActiveDropD(!activeDropD);
            }}
            style={[styles.button_small, activeDropD && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Vitamin D</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVitaminD(!vitaminD);
              setActiveDropD(!activeDropD);
            }}
            style={[styles.button_small, activeDropD && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Eye Drop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.send_data_btn} onPress={sendData}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Send Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
  },
  container_row: { display: "flex", flexDirection: "row", gap: 20 },
  scroll_container: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
    // paddingBottom: 8,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  border_conreiner: {
    borderWidth: 1,
    borderColor: "purple",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  milk_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
  },
  timer_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  feeding_container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  diaper_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  medical_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  food_header: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
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

  button_small: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    width: 140,
    height: 60,
    borderRadius: 16,
  },
  active_button: {
    borderColor: "purple",
    borderWidth: 2,
  },
  circle_button: {
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: "50%",
  },
  send_data_btn: {
    left: "50%",
    transform: [{ translateX: "-50%" }],
    borderRadius: 16,
    backgroundColor: "purple",
    paddingTop: 10,
    paddingBottom: 10,
    width: 100,
  },
});
