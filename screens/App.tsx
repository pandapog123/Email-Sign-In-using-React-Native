import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../components/AuthProvider";
import AppButton from "../components/AppButton";
import { signOutAsync } from "../firebase/auth";

export default function AppScreen() {
  const user = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={styles.appContainer}>
        <View style={styles.appContent}>
          <Text style={styles.appText}>Your signed in as</Text>

          <Text style={{ ...styles.appText, ...styles.highlightedText }}>
            {user?.email}
          </Text>
        </View>

        <AppButton label="Sign out" theme="primary" onPress={signOutAsync} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingVertical: 20,
  },
  appText: {
    fontSize: 32,
  },
  appContent: {
    alignItems: "center",
    gap: 8,
  },
  highlightedText: {
    backgroundColor: "goldenrod",
    color: "white",
    padding: 4,
  },
});
