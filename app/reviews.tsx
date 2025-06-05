  import { View, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Alert} from 'react-native';
  import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';
  import { useNavigation, useTheme } from '@react-navigation/native';
  import { useLocalSearchParams, Redirect } from 'expo-router';
  import ReviewCover from '~/components/ui/reviewcover';
  import ReviewCard from '~/components/ui/reviewcard';
  import ReviewInput from '~/components/ui/reviewinput';
  import ReviewSubmit from '~/components/ui/reviewsubmit';
  import { Text } from '~/components/ui/text';
  import { Tags } from 'lucide-react-native';
  import { History } from 'lucide-react-native';
  import { Star } from 'lucide-react-native';
  import { ChevronLeft } from 'lucide-react-native';
  import { supabase } from '@/lib/supabase';
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
    const [reviewText, setReviewText] = useState('');
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [rating, setRating] = useState(0);
    const handleChange = useCallback(
    (value: number) => setRating(Math.round(value * 10) / 10),
    []
    );

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);


    if (!movie) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text>No movie data found</Text>
        </View>
      );
    }
  
  // State for fetching reviews
  const [reviewsData, setReviewsData] = useState<any[]>([]);

  // State for inserting review
  const [content, setContent] = useState('');
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [date, setDate] = useState(new Date().toISOString()); // ISO format for Supabase

  // Fetch all reviews
  const getReviewsData = async () => {
    const { data, error } = await supabase
      .from('review')
      .select(`
        content,
        has_spoiler,
        rating,
        date,
        users!review_userID_fkey(username)
      `)
      .eq('movieID', movie.id);

    if (error) {
      Alert.alert('Error', 'Failed to fetch reviews');
      return;
    }
    setReviewsData(data || []);
  };

  // Insert review
  const insertReview = async () => {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      Alert.alert('Error', 'Please log in to add a review');
      return
    }
  
    const userId = userData.user.id;

    if(!content || myRating === 0) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const { data, error } = await supabase
      .from('review')
      .insert([
        {
          userID: userId,
          movieID: movie.id,
          content,
          has_spoiler: hasSpoiler,
          rating: myRating,
          date,
        },
      ]);

    if (error) {
      if (error.code === '23505') {
        Alert.alert('Error', 'You have already reviewed this movie');
        return;
      }
      Alert.alert('Error', 'Failed to add review');
      return;
    }

    Alert.alert('Success', 'Review added!');
    setContent('');
    setReviewText('');
    setHasSpoiler(false);
    setMyRating(0);
    setDate(new Date().toISOString());
    getReviewsData(); // Refresh reviews
    
  };

    // Delete review //Add delete button first
  const deleteReview = async () => {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      Alert.alert('Error', 'Please log in to add a review');
      return
    }
  
    const userId = userData.user.id;

    const { data, error } = await supabase
    .from('review')
    .delete()
    .eq('userID', userId)
    .eq('movieID', movie.id);

    if (error) {
      Alert.alert('Error', 'Failed to delete review');
      return;
    }

    Alert.alert('Success', 'Review deleted successfully');
    getReviewsData(); // Refresh reviews
  }

  // Fetch reviews on mount
  useEffect(() => {
    getReviewsData();
  }, []);
  
  const renderReviewCard = useCallback(
    ({ item }: { item: typeof reviewsData[0] }) => (
      <ReviewCard
        username={item.users.username}
        content={item.content}
        has_spoiler={item.has_spoiler ?? false}
        rating={item.rating}
        date={item.date}
      />
    ),
    []
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmitRating = (newRating: number, containsSpoiler: boolean) => {
    setMyRating(newRating);   
    setHasSpoiler(containsSpoiler);
    insertReview();              
  };

  const genreNames = movie.genre_ids
    ?.map((id: number) => genreIdMap[id])
    .filter(Boolean)
    .slice(0, 2)
    .join(', ');

  return (
    <FlatList
      data={reviewsData}
      keyExtractor={(item) => item.id}
      renderItem={renderReviewCard}
      removeClippedSubviews={false}
      contentContainerStyle={{ paddingBottom: 100, flex: 1}}
      ListHeaderComponent={
        <>
          <TouchableOpacity
            onPress={() => {
              console.log('Chevron clicked'); // Debug line
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <ChevronLeft strokeWidth={1.5} size={25} color={colors.text} />
          </TouchableOpacity>

          <View className="gap-1">
            <ReviewCover path={movie.backdrop_path} vote_average={movie.vote_average} poster_path={movie.poster_path} />

            <View className="p-6 flex-row">
              <View className="w-3/4 pr-5 gap-2">
                <Text className="font-semibold text-3xl">{movie.title}</Text>
                <Text className="text-sm">{movie.overview}</Text>
              </View>
              <View className="w-1/4 items-end">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  style={{ width: 84, height: 126, borderRadius: 5 }}
                  resizeMode="cover"
                />
              </View>
            </View>

            <View className="flex-row w-full mx-5 gap-2">
              {/* Cards */}
              <Card style={{ width: '30%' }} className="justify-center mr-1 p-5 bg-[#f8f8f8] dark:bg-[#222222]/50">
                <Tags strokeWidth={1.5} size={25} color={colors.text} />
                <View>
                  <Text className="text-base font-bold text-primary">Genres</Text>
                  <Text className="text-sm text-foreground">{genreNames || 'N/A'}</Text>
                </View>
              </Card>

              <Card style={{ width: '28%' }} className="justify-center p-4 mr-1 bg-[#f8f8f8] dark:bg-[#222222]/50">
                <History strokeWidth={1.5} size={25} color={colors.text} />
                <View>
                  <Text className="text-base font-bold text-primary">Released</Text>
                  <Text className="text-sm text-foreground">{movie.release_date || 'N/A'}</Text>
                </View>
              </Card>

              <Card style={{ width: '28%' }} className="justify-center p-4 bg-[#f8f8f8] dark:bg-[#222222]/50 gap-3 py-6">
                <Star strokeWidth={1.5} size={25} color={colors.text} />
                <View>
                  <Text className="text-base font-bold text-primary">Ratings</Text>
                  <Text className="text-sm text-foreground">{movie.vote_average || 'N/A'}</Text>
                </View>
              </Card>
            </View>

            <View className="pl-5 pr-5 pt-5">
              <ReviewInput
                value={reviewText}
                onChangeText={setReviewText}
                onSendReview={() => {
                  setModalVisible(true);
                  setContent(reviewText); // Sync content with reviewText
                }}
              />
       
              <Text className="mb-4 text-lg font-semibold">Reviews</Text>
            </View>
          </View>
          <ReviewSubmit
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleSubmitRating}
          />
        </>
      }
      showsVerticalScrollIndicator={false}
    />
  );

  };

  export default Reviews;

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