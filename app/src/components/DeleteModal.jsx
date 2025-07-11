import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectDeleteData } from "../redux/tasks/tasksSelectors";
import { deleteOneTask } from "../redux/tasks/tasksOperation";
import {
  closeModal,
  setDeleteData,
  setModalType,
} from "../redux/tasks/tasksReducer";

export default function DeleteModal() {
  const dispatch = useDispatch();
  const deleteData = useSelector(selectDeleteData);

  const onDelete = () => {
    dispatch(deleteOneTask(deleteData)).then(() => onCancel());
  };

  const onCancel = () => {
    dispatch(setDeleteData(null));
    dispatch(closeModal());
    dispatch(setModalType(null));
  };

  return (
    <Modal>
      <Text style={styles.delete_header}>Delete confirmation</Text>

      <View style={styles.btn_container}>
        <TouchableOpacity
          style={[styles.delete_btn, styles.button]}
          onPress={() => onDelete()}
        >
          <Text style={[styles.text_btn, { color: "#fff" }]}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancel_btn, styles.button]}
          onPress={() => onCancel()}
        >
          <Text style={styles.text_btn}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  delete_header: { fontWeight: "600", fontSize: 20, marginBottom: 20 },
  btn_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },
  text_btn: { fontWeight: "500", fontSize: 18 },
  button: {
    width: 100,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  delete_btn: { borderRadius: 16, backgroundColor: "#f02951" },
  cancel_btn: { borderWidth: 2, borderRadius: 16 },
});
