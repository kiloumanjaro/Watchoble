import { StyleSheet, View, ScrollView, FlatList} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react';
import SearchBar from '~/components/ui/searchbar'
import People from '~/components/ui/people'
import { Text } from '~/components/ui/text';
import Genre from '~/components/ui/genre'
import Media from '~/components/ui/media'
import { fetchTrendingPeople } from '@/services/api/peopleService';

interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
}

const index = () => {
  const [query, setQuery] = useState('');
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]);

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
      <View className='mt-4'>
        <SearchBar onSearch={handleSearch} />
      </View>

      <View className="mt-4">
        <Text className='text-xl font-semibold ml-5'>Film Genres</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row ">
            {[
              'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
              'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
              'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
            ].map((genre) => (
              <Genre key={genre} name={genre} items={30} />
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

const styles = StyleSheet.create({});