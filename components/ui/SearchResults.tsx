"use client";
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { Text } from "~/components/ui/text";
import type { Movie } from "@/services/api/movieService";
import { Ionicons } from "@expo/vector-icons";

interface SearchResultsProps {
  results: Movie[];
  isSearching: boolean;
  searchError: string | null;
  query: string;
  onMoviePress?: (movie: Movie) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isSearching,
  searchError,
  query,
  onMoviePress,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (query.trim()) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [query, fadeAnim]);

  if (!query.trim()) {
    return null;
  }

  if (isSearching) {
    return (
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="bg-white dark:bg-[#121214] rounded-3xl mx-4 mt-3 shadow-lg border border-gray-100 dark:border-[#343434]"
      >
        <View className="flex-row items-center justify-center py-8">
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text className="ml-3 text-gray-600 dark:text-gray-300 font-medium">
            Searching movies...
          </Text>
        </View>
      </Animated.View>
    );
  }

  if (searchError) {
    return (
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="bg-white dark:bg-gray-800 rounded-3xl mx-4 mt-3 shadow-lg border border-red-100 dark:border-red-800"
      >
        <View className="p-6">
          <Text className="text-red-500 dark:text-red-400 text-center font-medium">
            {searchError}
          </Text>
        </View>
      </Animated.View>
    );
  }

  if (results.length === 0) {
    return (
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="bg-white dark:bg-[#121214] rounded-3xl mx-4 mt-3 shadow-lg border border-gray-100 dark:border-[#343434]"
      >
        <View className="p-8">
          <View className="items-center">
            <Text className="text-6xl mb-3">🎬</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-center font-medium">
              No movies found
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-center text-sm mt-1">
              Try searching with different keywords
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  const renderMovieItem = (item: Movie, index: number) => (
    <TouchableOpacity
      key={item.id.toString()}
      className="flex-row p-4 pr-10 active:bg-gray-50 dark:bg-[#121214]"
      onPress={() => onMoviePress?.(item)}
      style={{
        borderBottomWidth: index === results.length - 1 ? 0 : 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
      }}
    >
      <View className="relative">
        <Image
          source={{
            uri: item.poster_path
              ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image",
          }}
          className="w-20 h-24 rounded-xl"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 ml-4 justify-center">
        <View className="flex-row flex-wrap items-baseline gap-2">
          <Text
            className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-5"
            numberOfLines={2}
            style={{ flexShrink: 1 }}
          >
            {item.title}
          </Text>
          {item.release_date && (
            <View className="bg-gray-100 dark:bg-[#09090b] px-2 py-1 rounded-lg border dark:border-[#1e1e20]">
              <Text className="text-xs text-gray-600 dark:text-white">
                {new Date(item.release_date).getFullYear()}
              </Text>
            </View>
          )}
        </View>
        {item.overview && (
          <Text
            className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-4"
            numberOfLines={2}
          >
            {item.overview}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="bg-white dark:bg-[#121214] rounded-2xl mx-4 mt-3 shadow-lg border border-gray-100 dark:border-[#343434] overflow-hidden"
    >
      {/* Header */}
      <View className="bg-white dark:bg-[#0a0a0a] px-5 py-4 border-b border-gray-100 dark:border-[#343434]">
        <Text className="font-semibold text-gray-900 dark:text-gray-100">
          Search Results
        </Text>
      </View>

      {/* Results List - Using ScrollView instead of FlatList */}
      <ScrollView
        className="max-h-80"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 8,
        }}
      >
        {results.map((item, index) => renderMovieItem(item, index))}
      </ScrollView>

      {/* Bottom Bar - Result Counter */}
      <View className="px-5 py-4 border-t border-gray-100 dark:border-[#343434]">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Found {results.length} movie{results.length !== 1 ? "s" : ""} for "
          {query}"
        </Text>
      </View>
    </Animated.View>
  );
};

export default SearchResults;
