import { View, FlatList, ScrollView} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Text } from '~/components/ui/text';
import { useRoute, RouteProp, DarkTheme, DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native';
import { NAV_THEME } from '~/lib/constants';
import { fetchGenreMovies } from '@/services/api/movieService';
import MovieAccordion from '~/components/ui/movieaccordion';
import { RootStackParamList } from '~/types/types'; // adjust import path
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import PlaylistCover from '~/components/ui/playlistcover';


type PlaylistRouteProp = RouteProp<RootStackParamList, 'playlist'>;

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

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
  const { movieId, genre } = route.params; // Only need the movieId for the API call
  const colorScheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      const loadGenreMovies = async () => {
        try {
          const data = await fetchGenreMovies(movieId);
          setGenreMovies(data);
        } catch (error) {
          console.error('Error fetching movies for that genre:', error);
        }
      };
  
      loadGenreMovies();
    }, [movieId])
  );
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
    <ScrollView className='flex-1 bg-secondary/30' showsVerticalScrollIndicator={false}>
    <View className="flex-1">
      <PlaylistCover name={genre}/>
      <View className='pl-2 pr-2'>
        <FlatList
          data={genreMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieAccordion movie={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false} 
        />
      </View>

    </View>
    </ScrollView>
    </ThemeProvider>
  );
};

export default Playlist;