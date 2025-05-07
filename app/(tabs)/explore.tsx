import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import ArticleList from "@/components/ArticleList";
import { getArticlesByCategory, getPremiumArticles } from "@/mocks/articles";
import { categories } from "@/mocks/categories";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={Typography.h1}>Explore</Text>
          <Text style={styles.subtitle}>
            Discover in-depth reporting and analysis across all categories
          </Text>
        </View>

        <ArticleList 
          title="Premium Content"
          articles={getPremiumArticles().slice(0, 3)}
        />

        {categories.map((category) => (
          <ArticleList 
            key={category.id}
            title={category.name}
            articles={getArticlesByCategory(category.slug).slice(0, 2)}
            compact
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});
