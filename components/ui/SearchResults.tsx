// components/ui/SearchResults.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { Movie } from '@/services/api/movieService';

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
  if (!query.trim()) {
    return null;
  }

  if (isSearching) {
    return (
      <View className="bg-white rounded-lg p-4 mx-5 mt-2 shadow-sm">
        <View className="flex-row items-center justify-center py-4">
          <ActivityIndicator size="small" color="#007AFF" />
          <Text className="ml-2 text-gray-600">Searching...</Text>
        </View>
      </View>
    );
  }

  if (searchError) {
    return (
      <View className="bg-white rounded-lg p-4 mx-5 mt-2 shadow-sm">
        <Text className="text-red-500 text-center">{searchError}</Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View className="bg-white rounded-lg p-4 mx-5 mt-2 shadow-sm">
        <Text className="text-gray-500 text-center">No movies found for "{query}"</Text>
      </View>
    );
  }

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      className="flex-row p-3 border-b border-gray-100"
      onPress={() => onMoviePress?.(item)}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image',
        }}
        className="w-12 h-16 rounded"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3 justify-center">
        <Text className="font-semibold text-gray-900" numberOfLines={1}>
          {item.title}
        </Text>
        {item.release_date && (
          <Text className="text-sm text-gray-500 mt-1">
            {new Date(item.release_date).getFullYear()}
          </Text>
        )}
        {item.vote_average && (
          <Text className="text-sm text-gray-500 mt-1">
            ⭐ {item.vote_average.toFixed(1)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white rounded-lg mx-5 mt-2 shadow-sm max-h-80">
      <FlatList
        data={results.slice(0, 5)} // Limit to 5 results for better UX
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResults;