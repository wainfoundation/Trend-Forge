import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

export default function SubscriptionBanner() {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push("/subscribe");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[Typography.h3, styles.title]}>
          Get unlimited access
        </Text>
        <Text style={styles.description}>
          Subscribe to Trend Forge for unlimited access to all articles, including premium content.
        </Text>
        <Pressable
          style={styles.button}
          onPress={handleSubscribe}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
        >
          <Text style={styles.buttonText}>Subscribe Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 24,
    overflow: "hidden",
  },
  content: {
    padding: 20,
  },
  title: {
    color: "white",
    marginBottom: 8,
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: Colors.light.tint,
    fontWeight: "bold",
    fontSize: 16,
  },
});
