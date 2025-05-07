import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

interface LoginPromptProps {
  message?: string;
  onDismiss?: () => void;
}

export default function LoginPrompt({ 
  message = "Sign in to access this content", 
  onDismiss 
}: LoginPromptProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.h3, styles.title]}>Sign In Required</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.loginButton}
          onPress={handleLogin}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Pressable>
        {onDismiss && (
          <Pressable
            style={styles.dismissButton}
            onPress={onDismiss}
            android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
          >
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  loginButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dismissButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  dismissButtonText: {
    color: Colors.light.text,
    fontSize: 16,
  },
});
