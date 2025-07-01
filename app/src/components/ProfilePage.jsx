import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

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

export default function PostsScreen() {
  const dispatch = useDispatch();
  const { email, username } = useSelector(selectAuthUser);

  const [breastFeed, setBreastFeed] = useState(null);
  const [milkFormula, setMilkFormula] = useState(null);
  const [poopSize, setPoopSize] = useState(null);
  const [isPee, setIsPee] = useState(false);

  const [activePoop, setActivePoop] = useState(false);
  const [activeFart, setActiveFart] = useState(false);
  const [activePee, setActivePee] = useState(false);
  const [activeDropD, setActiveDropD] = useState(false);
  const [activeLeftBreast, setActiveLeftBreast] = useState(false);
  const [activeRightBreast, setActiveRightBreast] = useState(false);

  const sendData = async () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const customDate = `${year}-${month}-${day}`;
    const customTime = `0${date.getHours()}:0${date.getMinutes()}`;

    const formData = {
      date: customDate,
      time: customTime,
      milkFormula: Number(milkFormula),
      breastFeedingTime: Number(breastFeed),
      poopSize,
      isPee,
    };

    console.log(formData);

    try {
      dispatch(createTask(formData));
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  const resetForm = () => {
    setBreastFeed(null);
    setMilkFormula(null);
    setPoopSize(null);
    setIsPee(false);
    setActivePoop(false);
    setActiveFart(false);
    setActivePee(false);
    setActiveDropD(false);
    setActiveLeftBreast(false);
    setActiveRightBreast(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar_container}>
        <View style={styles.avatar_empty}>
          <Text>A</Text>
        </View>

        <View style={styles.text_container}>
          <Text style={styles.text_username}>{username}</Text>
          <Text style={styles.text_email}>{email}</Text>
        </View>
      </View>

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
            value={breastFeed}
            onChangeText={setBreastFeed}
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
                  return setActiveLeftBreast(false);
                }
                setActiveLeftBreast(true);
                setActiveRightBreast(false);
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
                  return setActiveRightBreast(false);
                }
                setActiveLeftBreast(false);
                setActiveRightBreast(true);
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
              setPoopSize("big");
            }}
            style={[styles.button, activePoop && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Poop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActivePee(!activePee)}
            style={[styles.button, activePee && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Pee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActiveFart(!activeFart);
              setPoopSize("small");
            }}
            style={[styles.button_small, activeFart && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>Fart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveDropD(!activeDropD)}
            style={[styles.button_small, activeDropD && styles.active_button]}
          >
            <Text style={{ fontSize: 20 }}>DropD</Text>
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
