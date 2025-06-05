import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from '~/components/ui/searchbar';
import People from '~/components/ui/people';
import { Text } from '~/components/ui/text';
import Genre from '~/components/ui/genre';
import Media from '~/components/ui/media';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingPeople } from '@/services/api/peopleService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/types/types'; // adjust import path
import Slider from '~/components/ui/slider';
import { ImageSlider } from '@/data/SliderData';
import { GenreData } from '~/data/GenreData';


type GenreDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'playlist'>;


interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
}

 const genreIdMap: { [key: string]: number } = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };


const index = () => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<GenreDetailsNavigationProp>(); 
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]);

  const handleGenrePress = (genre: string) => {
    const movieId = genreIdMap[genre] ?? 0;  // Get the movieId from the genreIdMap
    navigation.navigate('playlist', {
      genre,    // Pass the genre name (if needed in the playlist page)
      movieId,  // Pass the corresponding movieId
    });
  };

  useEffect(() => {
    const loadTrendingPeople = async () => {
      try {
        const data = await fetchTrendingPeople();
        setTrendingPeople(data);
      } catch (error) {
        console.error('Error loading trending people:', error);
      }
    };

    loadTrendingPeople();
  }, []);

  const handleSearch = (query: string) => {
    setQuery(query);
    console.log('Search query:', query);
  };

  const renderPersonCard = ({ item }: { item: Person }) => (
    <People
      name={item.name}
      known_for_department={item.known_for_department || 'Unknown'}
      profile_path={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : undefined}
    />
  );

  return (
    <ScrollView className='flex-1 bg-secondary/30' showsVerticalScrollIndicator={false}>
      <View className="relative flex-1 ">
        <Slider itemList={ImageSlider} />
        <View className="absolute top-14 left-0 right-0 z-10">
          <SearchBar onSearch={handleSearch} />
        </View>
      </View>

    <View className="mt-4">
      <Text className="text-xl font-semibold ml-5">Film Genres</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {GenreData.map((genreItem) => (
            <Genre
              key={genreItem.genre}
              name={genreItem.name}
              items={genreItem.items}
              movieId={genreIdMap[genreItem.genre] ?? 0}
              genre={genreItem.genre}
              image={genreItem.image}
              onPress={() => handleGenrePress(genreItem.genre)}
            />
          ))}
        </View>
      </ScrollView>
    </View>


      <View className='mt-5'>
        <Text className='text-xl font-semibold ml-5'>People</Text>
        <View className='w-full mt-1'>
          <FlatList
            data={trendingPeople}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPersonCard}
            ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View className='w-full mt-5'>
        <Text className='text-xl font-semibold ml-5'>Media Type</Text>
        <View className='flex-row w-flex m-1'>
          <Media name='TV Show'/>
          <Media name='Movies'/>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
