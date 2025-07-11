import "react-native-gesture-handler";

import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import TasksScreen from "../Screens/TasksScreen";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logOut } from "../redux/auth/authOperation";
import { useEffect } from "react";

const MainStack = createStackNavigator();

export default function AppNavigation() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [token]);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={token ? "Tasks" : "Login"}>
        <MainStack.Screen
          name={"Registration"}
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name={"Login"}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={"Tasks"}
          component={TasksScreen}
          options={({ navigation }) => ({
            headerTitle: "Baby tracker",
            headerStyle: { borderBottomColor: "#bdbdbd", borderBottomWidth: 1 },
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontWeight: "500",
              fontSize: 20,
            },
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => {}}>
                <Ionicons name="settings-outline" size={26} color="#bdbdbd" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => {
                  dispatch(logOut()).finally(() => {
                    Toast.show({
                      type: "success", // 'success' | 'error' | 'info'
                      text1: "Log Out success",
                      text2: "See you again next time!",
                    });
                    navigation.navigate("Login");
                  });
                }}
              >
                <Feather name="log-out" size={24} color="#bdbdbd" />
              </TouchableOpacity>
            ),
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
