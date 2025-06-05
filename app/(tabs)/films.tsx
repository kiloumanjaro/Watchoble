import { StyleSheet, View } from 'react-native'
import UserReview from '~/components/ui/userreview';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import React from 'react'

const review = {
  title: 'Inception',
  poster_path: '/poster.jpg',
  review: 'Great movie!',
  date: new Date(),
  ratings: 8.4,
};

const films = () => {
  const { colors } = useTheme();

  return (
    <View className='flex-1 bg-secondary/30 gap-2 '>
      <View className='px-4 flex-row mt-14 gap-2'>
        <Button variant={"outline"} 
          style={{
            width: 40,       // or any size you prefer
            height: 40,
          }}
        >
          <Plus strokeWidth={1.5} size={20} color={colors.text}/>
        </Button>

        <Button variant={"outline"} 
          style={{
            height: 40,


          }}
        >
          <Text>Reviews</Text>
        </Button>

        <Button variant={"outline"} 
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Movies</Text>
        </Button>
      </View>

      <View className='p-2'>
        <UserReview review={review} />
      </View>
    
    </View>
  )
}

export default films

const styles = StyleSheet.create({})