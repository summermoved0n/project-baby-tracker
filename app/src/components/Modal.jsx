import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/tasks/tasksReducer";
import { selectOpenModal } from "../redux/tasks/tasks.Selectors";
import { useEffect, useRef } from "react";

export default function Modal({ children }) {
  const dispatch = useDispatch();
  // const isModal = useSelector(selectOpenModal);
  const fadeAnim = useRef(new Animated.Value(0)).current; // старт з opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // кінцеве значення opacity
      duration: 500, // мс
      useNativeDriver: true, // покращена продуктивність
    }).start();
  }, []);

  const noModal = () => {
    dispatch(closeModal());
  };

  return (
    <View style={styles.modal_containet}>
      <TouchableOpacity style={styles.close_icon} onPress={() => noModal()}>
        <Feather name="x" size={24} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={[styles.modal_content, { opacity: fadeAnim }]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal_containet: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 385,
    height: 636,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    top: 0,
    left: 0,
  },
  modal_content: {
    position: "relative",
    backgroundColor: "#fff",
    width: 300,
    height: 500,
    borderRadius: 16,
    padding: 20,
  },
  close_icon: {
    position: "absolute",
    top: 0,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: "50%",
    borderColor: "#fff",
    padding: 10,
  },
});
