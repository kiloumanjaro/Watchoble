import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
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
import { FileText } from 'lucide-react-native';
import { MessageSquareQuote } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

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
  const isLongTitle = movie.title.length > 27; // adjust threshold as needed
  const handleChange = useCallback(
    (value: number) => setRating(Math.round(value * 10) / 10),
    []
  );
  
  const router = useRouter();

  // Function to handle navigation to the Reviews page
  const goToReviews = () => {
    router.push({
      pathname: '/reviews',
      params: { movie: JSON.stringify(movie) }, // You must stringify objects
    });
  };

  return (
    <Accordion
      type="multiple"
      collapsible
      defaultValue={undefined}
      className="mt-1 ml-2 mr-2 mb-1"
    >
      <AccordionItem value="item-1" className="bg-card p-3 gap-3">
        <AccordionTrigger className="pt-0 pb-0 pr-5 flex-row items-center">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={{ width: 63, height: 93, borderRadius: 3 }}
            resizeMode="cover"
          />
          <View className={`ml-5 flex-1 ${isLongTitle ? 'h-[90%]' : 'h-3/4'} flex-col justify-start`}>
            <View className="flex-grow">
              <Text className='text-lg font-medium' style={{ lineHeight: 20 }}>{movie.title}</Text>
              <Text className='text-sm font-thin'>{movie.release_date?.substring(0, 4)}</Text>
            </View>
            <View className='flex-row gap-1'>
              {movie.vote_average !== undefined && (
                <Rating
                  size={10}
                  maxRating={5}
                  rating={movie.vote_average / 2}
                  onChange={handleChange}
                  disabled={true}
                  fillColor={colors.primary}
                />
              )}
              <Text className='text-xs font-thin'>
                ({movie.vote_average?.toFixed(1)})
              </Text>
            </View>
          </View>
        </AccordionTrigger>

        <AccordionContent className="rounded-md p-4 bg-[#f8f8f8] dark:bg-[#222222] text-xl gap-3">
          <View className='flex-row items-center gap-2'>
            <FileText strokeWidth={1.5} size={18} color={colors.primary}/>
            <Text className='text-base'>Description</Text>
          </View>
          <Text className='text-sm'>{movie.overview}</Text>
        </AccordionContent>

        <TouchableOpacity onPress={goToReviews}>
          <AccordionContent className="rounded-md p-4 bg-[#f8f8f8] dark:bg-[#222222] text-xl gap-3">
            <View className="flex-row justify-between"> 
              <View className='flex-row items-center gap-2'>
                <MessageSquareQuote strokeWidth={1.5} size={18} color={colors.primary}/>
                <Text className='text-base'>Reviews</Text>
              </View>
              <ChevronRight strokeWidth={1.5} size={18} color={colors.primary}/>
            </View>
          </AccordionContent>
        </TouchableOpacity>
      </AccordionItem>
    </Accordion>
  );
};

const styles = StyleSheet.create({});

export default MovieAccordion;
