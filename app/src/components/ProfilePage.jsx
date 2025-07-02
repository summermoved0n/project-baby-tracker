import { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  createYearPattern,
  createTimePattern,
  hasTwoMoreKeys,
} from "../helpers/middleware";
import { selectAuthUser } from "../redux/auth/authSelectors";
import { createTask } from "../redux/tasks/tasksOperation";

import {
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function TasksScreen() {
  const dispatch = useDispatch();
  // const { email, username } = useSelector(selectAuthUser);

  const [breastFeedingTime, setBreastFeedingTime] = useState(null);
  const [milkFormula, setMilkFormula] = useState(null);
  const [isPoop, setIsPoop] = useState(false);
  const [isPee, setIsPee] = useState(false);
  const [breastSide, setBreastSide] = useState(null);
  const [vitaminD, setVitaminD] = useState(false);

  const [activePoop, setActivePoop] = useState(false);
  const [activePee, setActivePee] = useState(false);
  const [activeDropD, setActiveDropD] = useState(false);
  const [activeLeftBreast, setActiveLeftBreast] = useState(false);
  const [activeRightBreast, setActiveRightBreast] = useState(false);

  const sendData = async () => {
    const date = new Date();

    const formData = {
      date: createYearPattern(date),
      time: createTimePattern(date),
    };
    if (milkFormula) formData.milkFormula = Number(milkFormula);
    if (breastFeedingTime)
      formData.breastFeedingTime = Number(breastFeedingTime);
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
    setBreastFeedingTime(null);
    setBreastSide(null);
    setMilkFormula(null);
    setIsPoop(false);
    setIsPee(false);
    setVitaminD(false);

    setActivePoop(false);
    setActivePee(false);
    setActiveDropD(false);
    setActiveLeftBreast(false);
    setActiveRightBreast(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", gap: 16, marginTop: 16, marginBottom: 16 }}
      >
        <View>
          <Text>Milk Formula</Text>
          <TextInput
            style={styles.input}
            placeholder="Milk Formula"
            placeholderTextColor="#bdbdbd"
            keyboardType="number-pad"
            value={milkFormula}
            onChangeText={setMilkFormula}
          />
        </View>

        <View>
          <Text>Breast Feeding</Text>
          <TextInput
            style={styles.input}
            placeholder="Breast Feeding"
            placeholderTextColor="#bdbdbd"
            keyboardType="number-pad"
            value={breastFeedingTime}
            onChangeText={setBreastFeedingTime}
          />
        </View>

        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingBottom: 16,
          }}
        >
          <Text>Lastest Breast</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
              <Text style={{ fontSize: 20 }}>Left</Text>
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
              <Text style={{ fontSize: 20 }}>Right</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setActivePoop(!activePoop);
              setIsPoop(!isPoop);
            }}
            style={[styles.button, activePoop && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Poop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActivePee(!activePee);
              setIsPee(!isPee);
            }}
            style={[styles.button, activePee && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Pee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVitaminD(!vitaminD);
              setActiveDropD(!activeDropD);
            }}
            style={[styles.button_small, activeDropD && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Vitamin D</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          left: "50%",
          transform: [{ translateX: "-50%" }],
          borderRadius: 16,
          backgroundColor: "purple",
          paddingTop: 10,
          paddingBottom: 10,
          width: 100,
        }}
        onPress={sendData}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Send Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
  },
  avatar_container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  avatar_empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
  },
  avatar_image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
  },
  text_username: {
    fontWeight: "700",
    fontSize: 13,
    color: "#212121",
  },
  text_email: {
    fontWeight: "400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 16,
    // borderColor:
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 140,
    height: 120,
    borderRadius: 16,
  },
  button_small: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 140,
    height: 60,
    borderRadius: 16,
  },
  active_button: {
    borderColor: "purple",
    borderWidth: 2,
  },
});
