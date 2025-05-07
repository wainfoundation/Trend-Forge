import React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { Article } from "@/types/article";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { formatDate } from "@/utils/dateFormatter";

interface FeaturedArticleProps {
  article: Article;
}

const { width } = Dimensions.get("window");

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
    >
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={[Typography.category, styles.category]}>
            {article.category}
          </Text>
          <View style={styles.titleRow}>
            <Text style={[Typography.h2, styles.title]} numberOfLines={2}>
              {article.title}
            </Text>
            {article.isPremium && (
              <Lock size={20} color="white" style={styles.lockIcon} />
            )}
          </View>
          <Text style={[Typography.body, styles.excerpt]} numberOfLines={2}>
            {article.excerpt}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
            {article.isPremium && (
              <Text style={styles.premium}>Premium</Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    padding: 16,
  },
  category: {
    color: "white",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    flex: 1,
  },
  lockIcon: {
    marginLeft: 8,
    marginTop: 4,
  },
  excerpt: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  date: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  premium: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
