import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import FeaturedArticle from "@/components/FeaturedArticle";
import CategoryPills from "@/components/CategoryPills";
import ArticleList from "@/components/ArticleList";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { getFeaturedArticles, getArticlesByCategory, getLatestArticles } from "@/mocks/articles";
import Colors from "@/constants/colors";
import useAuth from "@/hooks/useAuth";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [featuredArticle, setFeaturedArticle] = useState(getFeaturedArticles()[0]);
  const [articles, setArticles] = useState(getLatestArticles());
  const { isSubscribed } = useAuth();

  useEffect(() => {
    if (selectedCategory) {
      setArticles(getArticlesByCategory(selectedCategory));
    } else {
      setArticles(getLatestArticles());
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedArticle article={featuredArticle} />
        
        <CategoryPills 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        {!isSubscribed && <SubscriptionBanner />}
        
        <ArticleList 
          title={selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News` : "Latest News"}
          articles={articles}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
