import { StyleSheet, View, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Rating } from '@kolking/react-native-rating';
import { useTheme } from '@react-navigation/native';
import { Text } from '~/components/ui/text';

interface Movie {
  id: number;
  title: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
}

interface MovieAccordionProps {
  movie: Movie;
}

const MovieAccordion: React.FC<MovieAccordionProps> = ({ movie }) => {
  const [rating, setRating] = useState(0);
  const { colors } = useTheme();

  const handleChange = useCallback(
    (value: number) => setRating(Math.round(value * 10) / 10),
    []
  );

  return (
    <Accordion
      type="multiple"
      collapsible
      defaultValue={undefined}
      className="m-2"
    >
      <AccordionItem value="item-1" className="bg-white dark:bg-black rounded-[10] p-3 gap-3">
        <AccordionTrigger className="pt-0 pb-0 pr-5 flex-row items-center">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={{ width: 60, height: 90 }}
            resizeMode="cover"
          />
          <View className="justify-start ml-5 flex-1 gap-1">
            <View>
              <Text>{movie.title}</Text>
              <Text className='text-sm font-thin'>{movie.release_date?.substring(0, 4)}</Text>
            </View>
            <View className='flex-row gap-1'>
              {movie.vote_average !== undefined && (
                <Rating
                  size={12}
                  maxRating={5}
                  rating={movie.vote_average / 2}
                  onChange={handleChange}
                  disabled={true}
                  fillColor={colors.primary}
                />
              )}
              <Text className='text-sm font-thin'>({movie.vote_average})</Text>
            </View>
          </View>
        </AccordionTrigger>
        <AccordionContent className="rounded-md p-3 bg-[#f8f8f8] dark:bg-[#222222]">
          <Text>{movie.overview}</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const styles = StyleSheet.create({});

export default MovieAccordion;