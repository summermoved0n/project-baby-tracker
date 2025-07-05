import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch } from "react-redux";
import { setTaskHours, s, setTaskMinutes } from "../redux/tasks/tasksReducer";

export default function TimePickerSplit() {
  const dispatch = useDispatch();
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const getHourOptions = () => {
    const hours = [];
    for (let h = 0; h < 24; h++) {
      const hh = h.toString().padStart(2, "0");
      hours.push({ label: hh, value: hh });
    }
    return hours;
  };

  const getMinuteOptions = (step = 1) => {
    const minutes = [];
    for (let m = 0; m < 60; m += step) {
      const mm = m.toString().padStart(2, "0");
      minutes.push({ label: mm, value: mm });
    }
    return minutes;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.row, styles.constainer]}>
          <RNPickerSelect
            onValueChange={(value) => {
              dispatch(setTaskHours(value));
              setHour(value);
            }}
            value={hour}
            placeholder={{ label: "hh", value: null }}
            items={getHourOptions()}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={true}
          />
          <Text style={styles.label}>{hour}h</Text>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={[styles.row, styles.constainer]}>
          <RNPickerSelect
            onValueChange={(value) => {
              dispatch(setTaskMinutes(value));

              setMinute(value);
            }}
            value={minute}
            placeholder={{ label: "mm", value: null }}
            items={getMinuteOptions(1)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={true}
          />
          <Text style={styles.label}>{minute}m</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  constainer: { borderWidth: 1, paddingHorizontal: 10, borderRadius: 14 },
  label: {
    fontSize: 16,
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    color: "#000",
    width: 100,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    width: 30,
    height: 34,
    backgroundColor: "#fff",
  },
});
