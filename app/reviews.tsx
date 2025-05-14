import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Review {
  id: string;
  author: string;
  content: string;
}

const ReviewsPage = () => {
  const route = useRoute();
  const { movieId } = route.params; // Movie ID passed from MovieAccordion
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch reviews from an API (e.g., TMDB or another source)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        setReviews(data.results);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [movieId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  reviewContainer: {
    marginBottom: 16,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
});

export default ReviewsPage;
