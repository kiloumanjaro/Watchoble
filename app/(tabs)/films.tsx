import { StyleSheet, View, Alert, FlatList } from 'react-native';
import UserReview from '~/components/ui/userreview';
import { Text } from '~/components/ui/text';
import { supabase } from '@/lib/supabase';
import { fetchSingleMovie } from '@/services/api/movieService';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { Toggle } from '~/components/ui/toggle';
import React from 'react';
import { useRouter } from 'expo-router';

// Define the shape of each item
type ReviewItem = {
  reviewID: string; // adjust based on your Supabase schema
  userID: string;
  movieID: string;
  content: string;
  date: string;
  ratings: number;
  movie: {
    id: number;
    title: string;
    poster_path: string;
    // Add more fields if needed
  };
};

const Films = () => {
  const { colors } = useTheme();
  const [pressedR, setPressedR] = React.useState(false);
  const [pressedM, setPressedM] = React.useState(false);
  const router = useRouter();
  const [reviewData, setReviewdata] = React.useState<ReviewItem[]>([]);

  const handleNavigateToExplore = () => {
    router.push('/explore');
  };

  React.useEffect(() => {
    const getReviewsAndMovies = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        Alert.alert('Error', 'Please log in to add a review');
        return;
      }

      const userId = userData.user.id;

      const { data: reviews, error: reviewError } = await supabase
        .from('review')
        .select('*')
        .eq('userID', userId);

      if (reviewError || !reviews) {
        Alert.alert('Error', 'Failed to fetch reviews from supabase');
        return;
      }

      try {
        const enrichedReviews = await Promise.all(
          reviews.map(async (review) => {
            const movie = await fetchSingleMovie(review.movieID);
            return {
              ...review,
              movie,
            };
          })
        );
        setReviewdata(enrichedReviews);
      } catch (error: any) {
        Alert.alert('Error', 'Failed to enrich reviews: ' + error.message);
      }
    };

    getReviewsAndMovies();
  }, []);

  return (
    <View className='flex-1 bg-secondary/30 gap-2'>
      <View className='px-4 flex-row mt-14 gap-2'>
        <Button
          variant={'outline'}
          onPress={handleNavigateToExplore}
          style={{
            width: 42.5,
            height: 42.5,
          }}
        >
          <Plus strokeWidth={1.5} size={20} color={colors.text} />
        </Button>

        <Toggle pressed={pressedR} onPressedChange={setPressedR} variant='outline'>
          <Text>Reviews</Text>
        </Toggle>

        <Toggle pressed={pressedM} onPressedChange={setPressedM} variant='outline'>
          <Text>Movies</Text>
        </Toggle>
      </View>

      <View className='p-2'>
        <FlatList
          data={reviewData}
          keyExtractor={(item) => item.reviewID} // Make sure 'id' exists
          renderItem={({ item }) => <UserReview 
          review={{
            title: item.movie.title,
            poster_path: item.movie.poster_path,
            review: item.content,
            date: item.date ? new Date(item.date) : new Date(),
            ratings: item.ratings,
          }} />}
          ListEmptyComponent={<Text className='text-center mt-4'>No reviews found.</Text>}
        />
      </View>
    </View>
  );
};

export default Films;

const styles = StyleSheet.create({});
