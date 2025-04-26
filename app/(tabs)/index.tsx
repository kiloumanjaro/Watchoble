import { StyleSheet, View, FlatList } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { Text } from '~/components/ui/text';
import MovieCard from '@/components/ui/moviecard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { fetchPopularMovies, fetchTopRatedMovies } from '@/services/api/movieService'; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

interface Movie {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
}

const index = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'popular' | 'top'>('popular');

  const handleChange = useCallback(
    (value: number) => setRating((prevRating) => Math.round((prevRating + value) * 5) / 10),
    []
  );
  const [rating, setRating] = useState(0);

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
    <MovieCard
      title={item.title}
      description={item.overview || 'No overview available.'}
      rating={item.vote_average || 0}
      year={item.release_date?.substring(0, 4)}
      poster_path={item.poster_path}
    />
  ), []); // Empty dependency array means this function will only be created once

  return (
    <View className="flex-1 p-6">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className=" max-w-[400px] mx-auto flex-col gap-6"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="popular" className="flex-1">
            <Text>Popular</Text>
          </TabsTrigger>
          <TabsTrigger value="top" className="flex-1">
            <Text>Top</Text>
          </TabsTrigger>
        </TabsList>
  
        <TabsContent value="popular" className="flex-1">
          <FlatList
            data={popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCard}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </TabsContent>
  
        <TabsContent value="top" className="flex-1">
          <FlatList
            data={topRatedMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCard}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </TabsContent>
      </Tabs>
    </View>
  );
};


const styles = StyleSheet.create({});

export default index;