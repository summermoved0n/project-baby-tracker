import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

export default function CalendarItem({ babyService }) {
  const {
    _id,
    time,
    milkFormula,
    breastFeedingTime,
    isPoop,
    isPee,
    vitaminD,
    breastSide,
  } = babyService;

  return (
    <View key={_id} style={styles.conteiner}>
      <View style={styles.top_conteiner}>
        <Text style={styles.time_text}>Time: {time}</Text>
        {breastSide && (
          <Text style={styles.breast_side}>Last breast: {breastSide}</Text>
        )}
        <View style={styles.button_conteiner}>
          <TouchableOpacity>
            <FontAwesome6 name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash-bin-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom_conteiner}>
        {milkFormula && (
          <Text style={styles.item}>
            <MaterialCommunityIcons
              name="baby-bottle-outline"
              size={14}
              color="black"
            />{" "}
            {milkFormula}ml
          </Text>
        )}
        {breastFeedingTime && (
          <Text style={styles.item}>
            <Entypo name="water" size={14} color="black" /> Feed:
            {breastFeedingTime}min
          </Text>
        )}
        {isPoop && (
          <Text style={styles.item}>
            <MaterialCommunityIcons
              name="emoticon-poop"
              size={18}
              color="black"
            />{" "}
            Poop
          </Text>
        )}
        {isPee && (
          <Text style={styles.item}>
            <Ionicons name="water-outline" size={14} color="black" /> Pee
          </Text>
        )}
        {vitaminD && (
          <Text style={styles.item}>
            <FontAwesome6
              name="prescription-bottle-medical"
              size={14}
              color="black"
            />{" "}
            VitaminD
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    gap: 6,
    width: "100%",
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  top_conteiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button_conteiner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  bottom_conteiner: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    // justifyContent: "center",
    alignItems: "center",
  },
  time_text: { fontSize: 16, fontWeight: "500" },
  breast_side: {
    fontSize: 16,
  },
  item: {
    borderRadius: 12,
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 4,
  },
});
