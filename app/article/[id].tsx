import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { ArrowLeft, Share2 } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { getArticleById } from "@/mocks/articles";
import { Article } from "@/types/article";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { formatDate } from "@/utils/dateFormatter";
import useAuth from "@/hooks/useAuth";
import LoginPrompt from "@/components/LoginPrompt";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const ARTICLE_LIMIT = 2;

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isSubscribed, incrementArticleCount, articleCount } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (typeof id !== "string") {
      router.back();
      return;
    }

    const fetchedArticle = getArticleById(id);
    if (!fetchedArticle) {
      router.back();
      return;
    }

    setArticle(fetchedArticle);
    setIsLoading(false);

    // Check if article should be behind paywall
    if (fetchedArticle.isPremium && !isSubscribed) {
      setShowPaywall(true);
    } else if (!isSubscribed) {
      const count = incrementArticleCount();
      if (count > ARTICLE_LIMIT) {
        setShowPaywall(true);
      }
    }
  }, [id, router, isSubscribed, incrementArticleCount]);

  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here.");
  };

  if (isLoading || !article) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: article.title,
            headerShown: true,
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft size={24} color={Colors.light.text} />
              </Pressable>
            ),
          }}
        />
        <ScrollView>
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={Typography.category}>{article.category}</Text>
            <Text style={Typography.h1}>{article.title}</Text>
            <Text style={Typography.body} numberOfLines={3}>
              {article.excerpt}
            </Text>
          </View>
          <LoginPrompt message="Sign in to read the full article" />
        </ScrollView>
      </View>
    );
  }

  if (showPaywall) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: article.title,
            headerShown: true,
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft size={24} color={Colors.light.text} />
              </Pressable>
            ),
          }}
        />
        <ScrollView>
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={Typography.category}>{article.category}</Text>
            <Text style={Typography.h1}>{article.title}</Text>
            <Text style={Typography.body} numberOfLines={3}>
              {article.excerpt}
            </Text>
          </View>
          <View style={styles.paywall}>
            <Text style={styles.paywallTitle}>
              {article.isPremium
                ? "This is premium content"
                : `You've reached your limit of ${ARTICLE_LIMIT} free articles`}
            </Text>
            <Text style={styles.paywallMessage}>
              Subscribe to Trend Forge to continue reading and get unlimited access to all content.
            </Text>
            <SubscriptionBanner />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          title: article.title,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.light.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleShare} style={styles.shareButton}>
              <Share2 size={24} color={Colors.light.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView>
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={Typography.category}>{article.category}</Text>
          <Text style={Typography.h1}>{article.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.author}>By {article.author}</Text>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
          <Text style={styles.articleContent}>{article.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  articleContent: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.light.text,
  },
  paywall: {
    padding: 16,
    alignItems: "center",
  },
  paywallTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  paywallMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
});
