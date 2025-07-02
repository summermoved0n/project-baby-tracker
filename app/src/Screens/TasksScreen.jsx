import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import ProfilePage from "../components/ProfilePage";
import UserPage from "../components/UserPage";
import CalendarPage from "../components/CalendarPage";
import { currentUser } from "../redux/auth/authOperation";

function Profile() {
  return (
    <View style={styles.container}>
      <ProfilePage />
    </View>
  );
}

function User() {
  return (
    <View style={styles.container}>
      <UserPage />
    </View>
  );
}

function Calendar() {
  return (
    <View style={styles.container}>
      <CalendarPage />
    </View>
  );
}

const Tabs = createBottomTabNavigator();

const Tasks = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const storageToken = await AsyncStorage.getItem("token");

      if (storageToken) {
        dispatch(currentUser());
      } else {
        navigation.navigate("Login");
      }
    };

    checkToken();
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "User") {
            return (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "pink" : "transparent",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Feather
                  name="user"
                  size={focused ? 13 : 24}
                  color={focused ? "#fff" : "#bdbdbd"}
                />
              </View>
            );
          } else if (route.name === "Profile") {
            return (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "pink" : "transparent",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Fontisto
                  name="plus-a"
                  size={focused ? 13 : 24}
                  color={focused ? "#fff" : "#bdbdbd"}
                />
              </View>
            );
          } else if (route.name === "Calendar") {
            return (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "pink" : "transparent",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <FontAwesome
                  name="calendar"
                  size={focused ? 13 : 24}
                  color={focused ? "#fff" : "#bdbdbd"}
                />
              </View>
            );
          }
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 10,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="Calendar" component={Calendar} />
      <Tabs.Screen name="Profile" component={Profile} />
      <Tabs.Screen name="User" component={User} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default Tasks;
