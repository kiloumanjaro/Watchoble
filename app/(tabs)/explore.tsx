import { StyleSheet, View, ScrollView, FlatList} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { Text } from '~/components/ui/text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { fetchPopularMovies, fetchTopRatedMovies } from '@/services/api/movieService';
import MovieAccordion from '~/components/ui/movieaccordion';

interface Movie {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
}

const explore = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'popular' | 'top'>('popular');

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        console.error('Error loading popular movies:', error);
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    const loadTopRatedMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setTopRatedMovies(data);
      } catch (error) {
        console.error('Error loading top-rated movies:', error);
      }
    };

    loadTopRatedMovies();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'popular' | 'top');
  };

  const renderMovieCard = useCallback(({ item }: { item: Movie }) => (
    <MovieAccordion movie={item} />
  ), []);

  return (
    <ScrollView className='flex-1 bg-secondary/30' showsVerticalScrollIndicator={false}>
    <View className="flex-1 p-2 pt-12">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full max-w-[500px] mx-auto flex-col gap-6"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="popular" className="flex-1">
            <Text>Popular</Text>
          </TabsTrigger>
          <TabsTrigger value="top" className="flex-1">
            <Text>Top</Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <FlatList
            data={popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCard}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false} 
          />
        </TabsContent>

        <TabsContent value="top">
          <FlatList
            data={topRatedMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCard}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false} 
          />
        </TabsContent>
      </Tabs>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default explore;