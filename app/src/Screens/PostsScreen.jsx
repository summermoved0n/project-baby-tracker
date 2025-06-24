import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";

import ProfilePage from "../components/ProfilePage";
import UserPage from "../components/UserPage";

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

const Tabs = createBottomTabNavigator();

const Posts = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "User") {
            iconName = focused ? "user" : "user";
          } else if (route.name === "Profile") {
            iconName = focused ? "plus-a" : "plus-a";
          }

          return (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#ff6c00" : "transparent",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              {route.name === "Profile" ? (
                <Fontisto
                  name={iconName}
                  size={focused ? 13 : 24}
                  color={focused ? "#fff" : "#bdbdbd"}
                />
              ) : (
                <Feather
                  name={iconName}
                  size={focused ? 13 : 24}
                  color={focused ? "#fff" : "#bdbdbd"}
                />
              )}
            </View>
          );
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

export default Posts;
