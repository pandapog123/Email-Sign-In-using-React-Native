import { Modal, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { useState } from "react";
import AuthFlowView from "../components/AuthFlowView";
import { AuthRouteStateContext, AuthRoutes } from "../state/AuthRoute";

export default function AuthScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [authRoute, setAuthRoute] = useState<AuthRoutes>("Login");

  async function handleLoginClick() {
    setAuthRoute("Login");

    setModalVisible(true);
  }

  async function handleSignUpClick() {
    setAuthRoute("Signup");

    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Log In</Text>

        <Text style={styles.subHeader}>Sign in using your google account!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton onPress={handleLoginClick} label="Log in" theme="primary" />

        <AppButton onPress={handleSignUpClick} label="Sign up" />
      </View>

      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="fullScreen"
      >
        <AuthRouteStateContext.Provider
          value={{ route: authRoute, closeModal, setRoute: setAuthRoute }}
        >
          <AuthFlowView></AuthFlowView>
        </AuthRouteStateContext.Provider>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  headerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    gap: 16,
  },
  header: {
    fontSize: 56,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    gap: 8,
  },
  authModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authViewContainer: {
    flex: 1,
  },
});
