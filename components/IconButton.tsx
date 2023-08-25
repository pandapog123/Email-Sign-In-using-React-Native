import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

let ionIconsGlyphMap = Ionicons.getRawGlyphMap();

interface IconButtonProps {
  iconName: keyof typeof ionIconsGlyphMap;
  theme?: "primary";
  onPress?: () => void;
}

export default function IconButton({
  iconName,
  theme,
  onPress,
}: IconButtonProps) {
  const [pressed, setPressed] = useState(false);

  const primary = theme === "primary";

  const pressedButtonStyle = primary
    ? pressed
      ? styles.buttonPrimaryPressed
      : styles.buttonPrimaryReleased
    : pressed
    ? styles.buttonSecondaryPressed
    : styles.buttonSecondaryReleased;

  const buttonIconStyle = primary
    ? styles.buttonPrimaryLabel
    : styles.buttonSecondaryLabel;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ ...styles.button, ...pressedButtonStyle }}
    >
      <Ionicons name={iconName} size={32} style={buttonIconStyle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  buttonPrimaryPressed: {
    backgroundColor: "gray",
  },
  buttonPrimaryReleased: {
    backgroundColor: "black",
  },
  buttonPrimaryLabel: {
    color: "white",
  },
  buttonSecondaryPressed: {
    backgroundColor: "#9c9c9c",
  },
  buttonSecondaryReleased: {
    backgroundColor: "#d4d4d4",
  },
  buttonSecondaryLabel: {
    color: "black",
  },
});
