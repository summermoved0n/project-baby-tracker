import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  View,
  TextInput,
} from "react-native";

export default function PostsScreen() {
  // const username = useSelector(selectUsersName);
  // const email = useSelector(selectUsersEmail);
  // const avatar = useSelector(selectUsersAvatar);

  return (
    <View style={styles.container}>
      <View style={styles.avatar_container}>
        {/* {!avatar ? ( */}
        <View style={styles.avatar_empty}>
          <Text>A</Text>
        </View>
        {/* ) : (
          <ImageBackground
            style={styles.avatar_image}
            source={{ uri: avatar }}
          ></ImageBackground>
        )} */}
        <View style={styles.text_container}>
          <Text style={styles.text_username}>username</Text>
          <Text style={styles.text_email}>email</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
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
});
