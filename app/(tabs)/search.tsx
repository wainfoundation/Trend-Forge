import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { X } from "lucide-react-native";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/mocks/articles";
import { Article } from "@/types/article";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "" && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== query));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable style={styles.clearButton} onPress={clearSearch}>
            <X size={20} color="#666" />
          </Pressable>
        )}
      </View>

      {searchQuery.trim() === "" && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <Text style={Typography.h3}>Recent Searches</Text>
          {recentSearches.map((query, index) => (
            <View key={index} style={styles.recentSearchItem}>
              <Pressable
                style={styles.recentSearchText}
                onPress={() => handleRecentSearchPress(query)}
              >
                <Text style={styles.recentSearchQuery}>{query}</Text>
              </Pressable>
              <Pressable onPress={() => removeRecentSearch(query)}>
                <X size={16} color="#666" />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {searchQuery.trim() !== "" && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ArticleCard article={item} />}
          contentContainerStyle={styles.resultsContainer}
          ListHeaderComponent={
            <Text style={styles.resultsHeader}>
              {searchResults.length} results for "{searchQuery}"
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyResultsContainer}>
              <Text style={styles.emptyResultsText}>
                No results found for "{searchQuery}"
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  clearButton: {
    position: "absolute",
    right: 24,
    top: 30,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  emptyResultsContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyResultsText: {
    fontSize: 16,
    color: "#666",
  },
  recentSearchesContainer: {
    padding: 16,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  recentSearchText: {
    flex: 1,
  },
  recentSearchQuery: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
