import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
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
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
}
