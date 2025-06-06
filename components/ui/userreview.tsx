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
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';

interface UserReview {
  title: string;
  poster_path?: string;
  review: string;
  date: Date; 
  ratings: number;
}

interface UserReviewProps {
  review: UserReview;
  onDelete: () => void;
}

const UserReview: React.FC<UserReviewProps> = ({ review, onDelete }) => {
  const [rating, setRating] = useState(0);
  const { colors } = useTheme();
  const isLongTitle = review.title.length > 27; // adjust threshold as needed
  const handleChange = useCallback(
    (value: number) => setRating(Math.round(value * 10) / 10),
    []
  );
  
  const router = useRouter();

  return (
    <Accordion
      type="multiple"
      defaultValue={['item-1']}
      className="mt-1 ml-2 mr-2 mb-1"
    >
      <AccordionItem value="item-1" className="bg-card p-3 gap-3">
        <AccordionTrigger className="pt-0 pb-0 pr-5 flex-row items-center">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${review.poster_path}` }}
            style={{ width: 63, height: 93, borderRadius: 3 }}
            resizeMode="cover"
          />

          <View className={`ml-5 flex-1 ${isLongTitle ? 'h-[90%]' : 'h-3/4'} flex-col justify-start`}>
            <View className="flex-grow">
              <Text className='text-lg font-medium' style={{ lineHeight: 20 }}>{review.title}</Text>
              <Text className='text-sm font-thin'>{(review.date).toLocaleDateString()}</Text>
            </View>
            
            <View className='flex-row gap-1'>
              
              {review.ratings !== undefined && (
                <Rating
                  size={10}
                  maxRating={5}
                  rating={review.ratings}
                  onChange={handleChange}
                  disabled={true}
                  fillColor={colors.primary}
                />
              )}
              <Text className='text-xs font-thin'>
                ({review.ratings?.toFixed(1)})
              </Text>
            </View>
          </View>
            <View className='absolute right-5 z-50 bg-card overflow-hidden'>
              <TouchableOpacity onPress={onDelete}>
              <Trash2 strokeWidth={1.5} size={18} color={'#FF0000'} />
              </TouchableOpacity>
            </View>
        </AccordionTrigger>

        <AccordionContent className="rounded-md p-4 bg-[#f8f8f8] dark:bg-[#222222] text-xl gap-3">  
          <View className='flex-row items-center gap-2'>
            <FileText strokeWidth={1.5} size={18} color={colors.primary} />
            <Text className='text-base'>Review</Text>
          </View>
          <Text className='text-sm'>{review.review}</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const styles = StyleSheet.create({});

export default UserReview;
