import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import Typography from "@/constants/typography";

interface ArticleListProps {
  title?: string;
  articles: Article[];
  compact?: boolean;
}

export default function ArticleList({ title, articles, compact = false }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={Typography.body}>No articles found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={[Typography.h2, styles.title]}>{title}</Text>}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} compact={compact} />}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
