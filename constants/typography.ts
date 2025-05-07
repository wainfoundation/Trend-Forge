import { StyleSheet } from "react-native";
import Colors from "./colors";

export default StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: "#666",
  },
  small: {
    fontSize: 12,
    color: "#666",
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.light.tint,
    textTransform: "uppercase",
  },
  premium: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.light.premium,
  },
});
