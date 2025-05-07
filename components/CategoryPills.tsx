import React from "react";
import { StyleSheet, ScrollView, Pressable, Text, View } from "react-native";
import { categories } from "@/mocks/categories";
import Colors from "@/constants/colors";

interface CategoryPillsProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryPills({ selectedCategory, onSelectCategory }: CategoryPillsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable
          style={[
            styles.pill,
            selectedCategory === null && styles.selectedPill,
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text
            style={[
              styles.pillText,
              selectedCategory === null && styles.selectedPillText,
            ]}
          >
            All
          </Text>
        </Pressable>

        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.pill,
              selectedCategory === category.slug && styles.selectedPill,
            ]}
            onPress={() => onSelectCategory(category.slug)}
          >
            <Text
              style={[
                styles.pillText,
                selectedCategory === category.slug && styles.selectedPillText,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedPill: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  selectedPillText: {
    color: "white",
  },
});
