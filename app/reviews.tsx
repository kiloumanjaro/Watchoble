import { View, ScrollView, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import ReviewCover from '~/components/ui/reviewcover';
import { Text } from '~/components/ui/text';
import { Tags } from 'lucide-react-native';
import { History } from 'lucide-react-native';
import { Star } from 'lucide-react-native';
import {
  Card,
} from '~/components/ui/card';

const genreIdMap: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const Reviews = () => {
  const params = useLocalSearchParams();
  const movieParam = Array.isArray(params.movie) ? params.movie[0] : params.movie;
  const movie = movieParam ? JSON.parse(movieParam) : null;
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const handleChange = useCallback(
  (value: number) => setRating(Math.round(value * 10) / 10),
  []
  );


  if (!movie) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No movie data found</Text>
      </View>
    );
  }

const genreNames = movie.genre_ids
  ?.map((id: number) => genreIdMap[id])
  .filter(Boolean)
  .slice(0, 2)
  .join(', ');

  return (
    <View className='flex-1 bg-secondary/30'>
      <ReviewCover path={movie.backdrop_path} vote_average={movie.vote_average} poster_path={movie.poster_path} />
      <View className='p-6 flex-row '>
        <View className='w-3/4 pr-5 gap-2'>
          <Text className="font-semibold text-3xl ">{movie.title}</Text>
          <Text className='text-sm' > {movie.overview} </Text>
        </View>
        <View className=' w-1/4 items-end '>
          <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={{ width: 84, height: 126, borderRadius: 5 }}
          resizeMode="cover"
          />
        </View>
      </View>
      <View className='w-full flex-row '>
        <Card className="flex-1 w-2/5 justify-center p-5 m-2 gap-2">
          <Tags strokeWidth={1.5} size={25} color={colors.text}/>
          <View>
            <Text className="text-base font-bold text-primary">Genres</Text>
            <Text className="text-sm text-foreground">{genreNames || 'N/A'}</Text>
          </View>
        </Card>
        <Card className="flex-1  justify-center p-4 m-2 gap-2">
          <History strokeWidth={1.5} size={25} color={colors.text}/>
          <View>
            <Text className="text-base font-bold text-primary">Released</Text>
            <Text className="text-sm text-foreground">{movie.release_date || 'N/A'}</Text>
          </View>

        </Card>
        <Card className="flex-1 justify-center p-4 m-2 gap-2">
          <Star strokeWidth={1.5} size={25} color={colors.text}/>
          <View>
            <Text className="text-base font-bold text-primary">Ratings</Text>
            <Text className="text-sm text-foreground">{movie.vote_average || 'N/A'}</Text>
          </View>
        </Card>

      </View>

    </View>
  );
};

export default Reviews;
