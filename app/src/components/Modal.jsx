import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  setModalType,
  setTaskHours,
  setTaskMinutes,
} from "../redux/tasks/tasksReducer";
import { useEffect, useRef } from "react";
import { selectModalType } from "../redux/tasks/tasksSelectors";

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const noModal = () => {
    dispatch(setTaskHours(null));
    dispatch(setTaskMinutes(null));
    dispatch(setModalType(null));
    dispatch(closeModal());
  };

  return (
    <View style={styles.modal_containet}>
      {modalType !== "delete" && (
        <TouchableOpacity style={styles.close_icon} onPress={() => noModal()}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      )}
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
    // height: 500,
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
