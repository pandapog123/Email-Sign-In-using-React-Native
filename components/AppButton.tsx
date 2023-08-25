import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AppButtonProps {
  onPress?: () => void;
  label: string;
  disabled?: boolean;
  theme?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function AppButton({
  onPress,
  label,
  disabled,
  theme,
  fullWidth,
}: AppButtonProps) {
  const [pressed, setPressed] = useState(false);

  const primary = theme === "primary";

  const pressedButtonStyle = primary
    ? pressed
      ? styles.buttonPrimaryPressed
      : styles.buttonPrimaryReleased
    : pressed
    ? styles.buttonSecondaryPressed
    : styles.buttonSecondaryReleased;

  const buttonStyle = disabled
    ? primary
      ? styles.buttonPrimaryDisabled
      : styles.buttonSecondaryDisabled
    : pressedButtonStyle;

  const buttonTextStyle = primary
    ? styles.buttonPrimaryLabel
    : styles.buttonSecondaryLabel;

  const buttonWidthStyle = fullWidth ? styles.fullWidthButton : {};

  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        onPress={disabled ? null : onPress}
        onPressIn={disabled ? null : () => setPressed(true)}
        onPressOut={disabled ? null : () => setPressed(false)}
        style={{ ...styles.button, ...buttonStyle, ...buttonWidthStyle }}
      >
        <Text style={buttonTextStyle}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
  },
  fullWidthButton: {
    width: "100%",
  },
  buttonPrimaryPressed: {
    backgroundColor: "gray",
  },
  buttonPrimaryReleased: {
    backgroundColor: "black",
  },
  buttonPrimaryDisabled: {
    backgroundColor: "gray",
  },
  buttonPrimaryLabel: {
    color: "white",
    fontSize: 20,
  },
  buttonSecondaryPressed: {
    backgroundColor: "#9c9c9c",
  },
  buttonSecondaryReleased: {
    backgroundColor: "#d4d4d4",
  },
  buttonSecondaryDisabled: {
    backgroundColor: "#9c9c9c",
  },
  buttonSecondaryLabel: {
    color: "black",
    fontSize: 20,
  },
});
