import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { Article } from "@/types/article";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { formatDate } from "@/utils/dateFormatter";

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

export default function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/article/${article.id}`);
  };

  if (compact) {
    return (
      <Pressable
        style={styles.compactContainer}
        onPress={handlePress}
        android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      >
        <View style={styles.compactContent}>
          <Text style={Typography.category}>{article.category}</Text>
          <View style={styles.titleRow}>
            <Text style={[Typography.h4, styles.compactTitle]} numberOfLines={2}>
              {article.title}
            </Text>
            {article.isPremium && (
              <Lock size={16} color={Colors.light.premium} style={styles.lockIcon} />
            )}
          </View>
          <Text style={Typography.caption} numberOfLines={2}>
            {article.excerpt}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
    >
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={Typography.category}>{article.category}</Text>
        <View style={styles.titleRow}>
          <Text style={Typography.h3} numberOfLines={2}>
            {article.title}
          </Text>
          {article.isPremium && (
            <Lock size={18} color={Colors.light.premium} style={styles.lockIcon} />
          )}
        </View>
        <Text style={Typography.body} numberOfLines={2}>
          {article.excerpt}
        </Text>
        <View style={styles.footer}>
          <Text style={Typography.small}>{formatDate(article.publishedAt)}</Text>
          {article.isPremium && (
            <Text style={Typography.premium}>Premium</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 8,
  },
  lockIcon: {
    marginLeft: 8,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  compactContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 12,
  },
  compactContent: {
    padding: 12,
  },
  compactTitle: {
    fontSize: 16,
    flex: 1,
  },
});
