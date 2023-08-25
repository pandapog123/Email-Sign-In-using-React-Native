import { useContext, useMemo, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthRouteStateContext } from "../state/AuthRoute";
import IconButton from "./IconButton";
import AppButton from "./AppButton";
import { validateEmail } from "../utils/email";
import { logInWithEmail, signUpWithEmail } from "../firebase/auth";

export default function AuthFlowView() {
  const authRouteState = useContext(AuthRouteStateContext);

  let currentView = useMemo(() => {
    switch (authRouteState.route) {
      case "Login":
        return <LoginView />;
      case "Signup":
        return <SignupView />;
    }
  }, [authRouteState]);

  return (
    <SafeAreaView style={styles.authContainer}>
      {currentView}

      <View style={styles.buttonBar}>
        <IconButton iconName="arrow-back" onPress={authRouteState.closeModal} />
      </View>
    </SafeAreaView>
  );
}

function LoginView() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorValue, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const authRouteState = useContext(AuthRouteStateContext);

  const formValid = useMemo(() => {
    const passwordValid = passwordValue.length > 7;

    const emailValid = validateEmail(emailValue);

    return passwordValid && emailValid && !loading;
  }, [emailValue, passwordValue, loading]);

  async function handleSubmit() {
    if (!formValid) {
      return;
    }
    setLoading(true);

    try {
      await logInWithEmail(emailValue, passwordValue);

      authRouteState.closeModal();
    } catch (error) {
      setShowError(true);

      if (typeof error === "string") {
        setError(error);
      } else {
        setError("Unknown Error occurred when logging in");
      }
    }

    setLoading(false);
  }

  function handleSetEmail(email: string) {
    setEmailValue(email);

    setShowError(false);
  }

  function handleSetPassword(password: string) {
    setPasswordValue(password);

    setShowError(false);
  }

  function handleRedirect() {
    authRouteState.setRoute("Signup");
  }

  return (
    <View style={styles.authViewContainer}>
      <Text style={styles.authViewTitle}>Login</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputSectionHeader}>Email</Text>

        <TextInput
          keyboardType="email-address"
          onChangeText={handleSetEmail}
          value={emailValue}
          style={styles.authInput}
          placeholder="Enter your email address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputSectionHeader}>Password</Text>

        <TextInput
          onChangeText={handleSetPassword}
          autoCapitalize="none"
          value={passwordValue}
          style={styles.authInput}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.submitButtonContainer}>
        <AppButton
          label="Log in"
          theme="primary"
          fullWidth
          onPress={handleSubmit}
          disabled={!formValid}
        />

        {showError ? <Text style={styles.error}>{errorValue}</Text> : null}
      </View>

      <View style={styles.divider}></View>

      <View style={styles.redirectContainer}>
        <Text style={styles.redirectContent}>Don't have an account?</Text>

        <TouchableOpacity onPress={handleRedirect}>
          <Text
            style={{
              ...styles.redirectContent,
              ...styles.redirectButtonContent,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SignupView() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorValue, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const authRouteState = useContext(AuthRouteStateContext);

  const formValid = useMemo(() => {
    const passwordValid = passwordValue.length > 7;

    const emailValid = validateEmail(emailValue);

    return passwordValid && emailValid && !loading;
  }, [emailValue, passwordValue, loading]);

  async function handleSubmit() {
    if (!formValid) {
      return;
    }
    setLoading(true);

    try {
      await signUpWithEmail(emailValue, passwordValue);

      authRouteState.closeModal();
    } catch (error) {
      setShowError(true);

      if (typeof error === "string") {
        setError(error);
      } else {
        setError("Unknown Error occurred when logging in");
      }
    }

    setLoading(false);
  }

  function handleSetEmail(email: string) {
    setEmailValue(email);

    setShowError(false);
  }

  function handleSetPassword(password: string) {
    setPasswordValue(password);

    setShowError(false);
  }

  function handleRedirect() {
    authRouteState.setRoute("Login");
  }

  return (
    <View style={styles.authViewContainer}>
      <Text style={styles.authViewTitle}>Sign Up</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputSectionHeader}>Email</Text>

        <TextInput
          keyboardType="email-address"
          onChangeText={handleSetEmail}
          value={emailValue}
          style={styles.authInput}
          placeholder="Enter your email address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputSectionHeader}>Password</Text>

        <TextInput
          onChangeText={handleSetPassword}
          autoCapitalize="none"
          value={passwordValue}
          style={styles.authInput}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.submitButtonContainer}>
        <AppButton
          label="Sign Up"
          theme="primary"
          fullWidth
          onPress={handleSubmit}
          disabled={!formValid}
        />

        {showError ? <Text style={styles.error}>{errorValue}</Text> : null}
      </View>

      <View style={styles.divider}></View>

      <View style={styles.redirectContainer}>
        <Text style={styles.redirectContent}>Have an account?</Text>

        <TouchableOpacity onPress={handleRedirect}>
          <Text
            style={{
              ...styles.redirectContent,
              ...styles.redirectButtonContent,
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  authViewContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 24,
    gap: 16,
  },
  authViewTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonBar: {
    width: "100%",
    padding: 24,
    flexDirection: "row",
  },
  authInput: {
    backgroundColor: "#dbdbdb",
    borderRadius: 8,
    padding: 12,
    fontSize: 20,
    width: "100%",
  },
  inputSection: {
    display: "flex",
    width: "100%",
    gap: 4,
  },
  inputSectionHeader: {
    fontSize: 18,
  },
  submitButtonContainer: {
    gap: 8,
    marginTop: 16,
    width: "100%",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
  divider: {
    height: 2,
    borderRadius: 100,
    backgroundColor: "#dbdbdb",
    width: "100%",
  },
  redirectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  redirectContent: {
    fontSize: 18,
  },
  redirectButtonContent: {
    color: "royalblue",
  },
});
