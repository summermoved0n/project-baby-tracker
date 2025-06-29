import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { logIn } from "../redux/auth/authOperation";
import { selectAuthLoading } from "../redux/auth/authSelectors";

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
  ActivityIndicator,
} from "react-native";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [isSecurePassword, setIsSecurePassword] = useState(true);

  const onLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const resultAction = await dispatch(logIn(loginData));

      if (logIn.fulfilled.match(resultAction)) {
        const message = resultAction.payload?.message;
        if (message === "Email or password valid") {
          Toast.show({
            type: "error", // 'success' | 'error' | 'info'
            text1: "Error",
            text2: "Email or password valid",
          });
        } else {
          Toast.show({
            type: "success", // 'success' | 'error' | 'info'
            text1: "Welcome to your account",
          });
          navigation.navigate("Posts");
        }
      } else if (logIn.rejected.match(resultAction)) {
        console.log(resultAction.payload);
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: resultAction.payload.message,
          text2: "error",
          // text2: "Тепер ви можете увійти 🚀",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Error",
        text2: err.message,
        // text2: "Тепер ви можете увійти 🚀",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -240}
        style={styles.container}
      >
        <ImageBackground
          style={styles.background}
          source={require("../../assets/images/photo-BG.jpg")}
        >
          <View style={styles.login_container}>
            <Text style={styles.login_title}>Log In</Text>

            <View style={styles.login_form}>
              <TextInput
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={[
                  styles.login_input,
                  emailFocus && styles.login_inputFocused,
                ]}
                placeholder="Email"
                placeholderTextColor="#bdbdbd"
                value={email}
                onChangeText={setEmail}
              />

              <View>
                <TextInput
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  style={[
                    styles.login_input,
                    passwordFocus && styles.login_inputFocused,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#bdbdbd"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSecurePassword}
                />
                <TouchableOpacity
                  style={styles.login_show_btn}
                  onPressIn={() => setIsSecurePassword(false)}
                  onPressOut={() => setIsSecurePassword(true)}
                >
                  <Text style={styles.login_show_text}>Show</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.login_button} onPress={onLogin}>
              <Text style={styles.login_btn_text}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.login_form_text}>
                Do you not have an account? Registration
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {isLoading && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.8)",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 100,
            }}
          >
            <ActivityIndicator size="large" color="#FF6C00" />
          </View>
        )}
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
  login_container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 144,
  },
  login_title: {
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  login_form: {
    display: "flex",
    gap: 16,
    paddingHorizontal: 16,
  },
  login_input: {
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
  login_inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "transparent",
  },
  login_button: {
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
  login_btn_text: {
    fontWeight: "400",
    fontSize: 16,
    color: "white",
  },
  login_form_text: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1b4371",
  },
  login_show_btn: {
    position: "absolute",
    right: 16,
    bottom: "50%",
    transform: [{ translateY: "50%" }],
  },
  login_show_text: {
    fontWeight: "400",
    fontSize: 16,
    color: "#1b4371",
  },
});
