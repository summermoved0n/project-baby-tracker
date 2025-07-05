import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

export default function Selector() {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
        placeholder={{ label: "Оберіть опцію...", value: null }}
        items={[
          { label: "Опція 1", value: "option1" },
          { label: "Опція 2", value: "option2" },
          { label: "Опція 3", value: "option3" },
        ]}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false} // обов'язково для кастому
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    color: "black",
    backgroundColor: "#fff",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    color: "black",
    backgroundColor: "#fff",
  },
});
