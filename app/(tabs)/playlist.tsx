import { StyleSheet, View, FlatList} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Text } from '~/components/ui/text';
import { useRoute, RouteProp } from '@react-navigation/native';
import { fetchGenreMovies } from '@/services/api/movieService';
import MovieAccordion from '~/components/ui/movieaccordion';
import { RootStackParamList } from '~/types/types'; // adjust import path
import { useFocusEffect } from '@react-navigation/native';

type PlaylistRouteProp = RouteProp<RootStackParamList, 'playlist'>;

interface Movie {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
}

const Playlist = () => {
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const route = useRoute<PlaylistRouteProp>();
  const { movieId } = route.params; // Only need the movieId for the API call

  useFocusEffect(
    useCallback(() => {
      const loadGenreMovies = async () => {
        try {
          const data = await fetchGenreMovies(movieId);
          setGenreMovies(data);
        } catch (error) {
          console.error('Error fetching movieszzz for that genre:', error);
        }
      };
  
      loadGenreMovies();
    }, [movieId])
  );
  return (
    <View className="flex-1 bg-secondary/30 p-6">
        <Text>{movieId}</Text>
      <FlatList
        data={genreMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieAccordion movie={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </View>
  );
};

export default Playlist;