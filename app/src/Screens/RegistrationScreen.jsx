import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { setUserAvatar, setUserEmail, setUserName } from "../redux/rootReducer";

import AntDesign from "@expo/vector-icons/AntDesign";
import {
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistrationScreen() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [isSecurePassword, setIsSecurePassword] = useState(true);

  const [imageUri, setImageUri] = useState(null);

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("mbe her?");
      Alert.alert("Permission denied", "We need access to your gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log("why dont open");
    if (!result.canceled) {
      const file = result.assets[0];
      setImageUri(file.uri);
    }
  };

  const onRegistration = () => {
    const usernameTrim = username.trim();
    if (usernameTrim.length < 3 || usernameTrim.length > 20) {
      return Alert.alert(
        "Username must be more than 3 and less than 20 letters🙄"
      );
    }

    const emailTrim = email.trim();
    if (!emailTrim.includes("@") || !emailTrim.includes(".com")) {
      return Alert.alert(
        `Email is not valid. '@' is required! '.com' is required!`
      );
    }

    const passwordTrim = password.trim();
    if (passwordTrim.length < 3 || passwordTrim.length > 20) {
      return Alert.alert(
        "Password must be more than 3 and less than 20 letters🙄"
      );
    }

    // dispatch(
    //   setUserName(usernameTrim),
    //   setUserEmail(emailTrim),
    //   setUserAvatar(imageUri)
    // );

    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -180}
        style={styles.container}
      >
        <ImageBackground
          style={styles.background}
          source={require("../../assets/images/photo-BG.jpg")}
        >
          <View style={styles.registration_container}>
            {!imageUri ? (
              <View style={styles.registration_avatar}>
                <TouchableOpacity
                  onPress={openGallery}
                  style={styles.registration_icon}
                >
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: [{ translateX: -60 }, { translateY: -60 }],
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <ImageBackground
                    source={{ uri: imageUri }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => setImageUri(null)}
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: -12.5,
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    zIndex: 10,
                  }}
                >
                  <AntDesign name="closecircleo" size={25} color="#bdbdbd" />
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.registration_header}>Registration</Text>

            <View style={styles.registration_form}>
              <TextInput
                onFocus={() => {
                  setUsernameFocus(true);
                }}
                onBlur={() => setUsernameFocus(false)}
                style={[
                  styles.registration_input,
                  usernameFocus && styles.registration_inputFocused,
                ]}
                placeholder="Username"
                placeholderTextColor="#bdbdbd"
                value={username}
                onChangeText={setUsername}
              />

              <TextInput
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={[
                  styles.registration_input,
                  emailFocus && styles.registration_inputFocused,
                ]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#bdbdbd"
                value={email}
                onChangeText={setEmail}
              />

              <View>
                <TextInput
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  style={[
                    styles.registration_input,
                    passwordFocus && styles.registration_inputFocused,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#bdbdbd"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecurePassword}
                />
                <TouchableOpacity
                  style={styles.registration_show_btn}
                  onPressIn={() => setIsSecurePassword(false)}
                  onPressOut={() => setIsSecurePassword(true)}
                >
                  <Text style={styles.registration_show_text}>Show</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.registration_button}
              onPress={onRegistration}
            >
              <Text style={styles.registration_btn_text}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registration_form_text}>
                Do you have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  registration_container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    paddingTop: 92,
    paddingBottom: 78,
  },
  registration_avatar: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  registration_icon: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },
  registration_header: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
  },
  registration_form: {
    display: "flex",
    gap: 16,
    paddingHorizontal: 16,
  },
  registration_input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  registration_inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "transparent",
  },
  registration_button: {
    marginTop: 43,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registration_btn_text: {
    fontWeight: "400",
    fontSize: 16,
    color: "white",
  },
  registration_form_text: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1b4371",
  },
  registration_show_btn: {
    position: "absolute",
    right: 16,
    bottom: "50%",
    transform: [{ translateY: "50%" }],
  },
  registration_show_text: {
    fontWeight: "400",
    fontSize: 16,
    color: "#1b4371",
  },
});
