import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react';
import SearchBar from '~/components/ui/searchbar'
import People from '~/components/ui/people'
import Genre from '~/components/ui/genre'
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
    <View className='flex-1 bg-secondary/30'>
      <SearchBar onSearch={handleSearch} />
      <View className='w-full'>
        <FlatList
          data={trendingPeople}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPersonCard}
          ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Genre name='Action' items={30}/>
          <Genre name='Adventure' items={30}/>
          <Genre name='Animation' items={30}/>
          <Genre name='Comedy' items={30}/>
          <Genre name='Crime' items={30}/>
          <Genre name='Drama' items={30}/>
          <Genre name='Family' items={30}/>
          <Genre name='Fantasy' items={30}/>
          <Genre name='History' items={30}/>
          <Genre name='Horror' items={30}/>
          <Genre name='Music' items={30}/>
          <Genre name='Mystery' items={30}/>
          <Genre name='Romance' items={30}/>
          <Genre name='Science Fiction' items={30}/>
          <Genre name='TV Movie' items={30}/>
          <Genre name='Thriller' items={30}/>
          <Genre name='War' items={30}/>
          <Genre name='Western' items={30}/>
        </ScrollView>
      </View>

    </View>
  );
};

export default index;

const styles = StyleSheet.create({});