import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setTaskHours, setTaskMinutes } from "../redux/tasks/tasksReducer";

export default function TimeInput() {
  const dispatch = useDispatch();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const handleHourChange = (text) => {
    const num = parseInt(text, 10);
    if (text === "" || (!isNaN(num) && num >= 0 && num <= 23)) {
      const value = text.padStart(2, "0");
      setHour(value);
      dispatch(setTaskHours(value));
    }
  };

  const handleMinuteChange = (text) => {
    const num = parseInt(text, 10);
    if (text === "" || (!isNaN(num) && num >= 0 && num <= 59)) {
      const value = text.padStart(2, "0");
      setMinute(value);
      dispatch(setTaskMinutes(value));
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={hour}
        onChangeText={handleHourChange}
        placeholder="hh"
        maxLength={2}
        keyboardType="number-pad"
      />
      <Text style={styles.separator}>:</Text>
      <TextInput
        style={styles.input}
        value={minute}
        onChangeText={handleMinuteChange}
        placeholder="mm"
        maxLength={2}
        keyboardType="number-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 40,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 8,
  },
});
