import { View, FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import React, { useCallback, useState, useLayoutEffect } from 'react';
import { Text } from '~/components/ui/text';
import { useNavigation, useRoute, RouteProp, DarkTheme, DefaultTheme, ThemeProvider, Theme,  } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { NAV_THEME } from '~/lib/constants';
import { fetchGenreMovies } from '@/services/api/movieService';
import MovieAccordion from '~/components/ui/movieaccordion';
import { RootStackParamList } from '~/types/types'; // adjust import path
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import PlaylistCover from '~/components/ui/playlistcover';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';


type PlaylistRouteProp = RouteProp<RootStackParamList, 'playlist'>;
type PlaylistNavProp = StackNavigationProp<RootStackParamList, 'playlist'>;

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
  const { colors } = useTheme();
  const navigation = useNavigation<PlaylistNavProp>();
  const { movieId, genre } = route.params; // Only need the movieId for the API call
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false
    });
  }, [navigation]);

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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
          <ChevronLeft strokeWidth={1.5} size={25} color={colors.text}/>
      </TouchableOpacity>

      <View className="flex-1 gap-5">
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
    </View>

    </ScrollView>
    </ThemeProvider>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 45,
    left: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 8,
  },
});