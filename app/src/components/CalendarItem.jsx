import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { selectDayTasks } from "../redux/tasks/tasks.Selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTask } from "../redux/tasks/tasksOperation";

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

  const dispatch = useDispatch();
  const dayTask = useSelector(selectDayTasks);

  const onPressDelete = (id) => {
    const getDayId = dayTask.map((item) => item._id);
    console.log("date ID", getDayId[0]);
    console.log("task ID", id);
    const data = {
      dayId: getDayId[0],
      taskId: id,
    };

    dispatch(deleteOneTask(data));
  };

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
          <TouchableOpacity onPress={() => onPressDelete(_id)}>
            <Ionicons name="trash-bin-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom_conteiner}>
        {milkFormula && (
          <Text style={[styles.item, styles.formula]}>
            <MaterialCommunityIcons
              name="baby-bottle-outline"
              size={14}
              color="black"
            />{" "}
            {milkFormula}ml
          </Text>
        )}
        {breastFeedingTime && (
          <Text style={[styles.item, styles.milk]}>
            <Entypo name="water" size={14} color="black" /> Feed:
            {breastFeedingTime}min
          </Text>
        )}
        {isPoop && (
          <Text style={[styles.item, styles.poop]}>
            <MaterialCommunityIcons
              name="emoticon-poop"
              size={18}
              color="black"
            />{" "}
            Poop
          </Text>
        )}
        {isPee && (
          <Text style={[styles.item, styles.pee]}>
            <Ionicons name="water-outline" size={14} color="black" /> Pee
          </Text>
        )}
        {vitaminD && (
          <Text style={[styles.item, styles.vitamin]}>
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
    gap: 10,
  },
  bottom_conteiner: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
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
  vitamin: {
    backgroundColor: "#59e37a",
  },
  poop: {
    backgroundColor: "#a89423",
  },
  pee: {
    backgroundColor: "#ffc100",
  },
  formula: {
    backgroundColor: "#00fbff",
  },
  milk: {
    backgroundColor: "#ceeced",
  },
});
