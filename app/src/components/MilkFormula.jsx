import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function MilkFormula({ milkFormula, setMilkFormula }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  input: {
    
  }
})