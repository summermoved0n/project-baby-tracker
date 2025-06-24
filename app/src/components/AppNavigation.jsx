import "react-native-gesture-handler";

import { TouchableOpacity } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/RegistrationScreen";
// import LoginScreen from "../Screens/LoginScreen";
// import PostsScreen from "../Screens/PostsScreen";

const MainStack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name={"Registration"}
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <MainStack.Screen
          name={"Login"}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={"Posts"}
          component={PostsScreen}
          options={({ navigation }) => ({
            headerStyle: { borderBottomColor: "#bdbdbd", borderBottomWidth: 1 },
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontWeight: "500",
              fontSize: 17,
            },
            headerLeft: () => null,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => navigation.navigate("Registration")}
              >
                <Feather name="log-out" size={24} color="#bdbdbd" />
              </TouchableOpacity>
            ),
          })}
        /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
