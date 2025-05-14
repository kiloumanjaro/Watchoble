import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Reviews = () => {
  const params = useLocalSearchParams();

  const movieParam = Array.isArray(params.movie) ? params.movie[0] : params.movie;
  const movie = movieParam ? JSON.parse(movieParam) : null;

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>No movie data found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.json}>
        {JSON.stringify(movie, null, 2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  json: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
});

export default Reviews;
