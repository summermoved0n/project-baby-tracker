import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";

import { logIn } from "../redux/auth/authOperation";
import { selectAuthLoading } from "../redux/auth/authSelectors";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
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

    dispatch(logIn(loginData))
      .unwrap()
      .then((res) => {
        setEmail("");
        setPassword("");
        Toast.show({
          type: "success", // 'success' | 'error' | 'info'
          text1: res.message || "Welcome to your account",
        });
        navigation.navigate("Tasks");
      })
      .catch((err) => {
        Toast.show({
          type: "error", // 'success' | 'error' | 'info'
          text1: err.message || err || "Error",
          text2: "Something went wrong",
        });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -230}
        style={styles.container}
      >
        <View style={styles.login_container}>
          <Image
            source={require("../../assets/images/girl_bg.jpg")}
            style={{
              width: "100%",
              height: 320,
              marginBottom: 20,
            }}
            resizeMode="cover"
          />

          <View>
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
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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
        </View>

        {isLoading && <Loading />}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  login_container: {
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingBottom: 134,
    justifyContent: "flex-end",
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
    borderColor: "pink",
    backgroundColor: "transparent",
  },
  login_button: {
    marginTop: 43,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "pink",
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
