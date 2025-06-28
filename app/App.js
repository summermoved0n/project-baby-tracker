import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { Text } from "react-native";
import Toast from "react-native-toast-message";

import AppNavigation from "./src/components/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
