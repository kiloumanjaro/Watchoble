import { StyleSheet, View } from 'react-native'
import UserReview from '~/components/ui/userreview';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { Toggle, ToggleIcon } from '~/components/ui/toggle';
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
  const [pressedR, setPressedR] = React.useState(false);
  const [pressedM, setPressedM] = React.useState(false);


  return (
    <View className='flex-1 bg-secondary/30 gap-2 '>
      <View className='px-4 flex-row mt-14 gap-2'>
        <Button variant={"outline"} 
          style={{
            width: 45,       // or any size you prefer
            height: 45,
          }}
        >
          <Plus strokeWidth={1.5} size={20} color={colors.text}/>
        </Button>

        <Toggle 
          pressed={pressedR}
          onPressedChange={setPressedR}
          aria-label='Toggle bold'
          variant='outline'
        >
          <Text>Reviews</Text>
        </Toggle>

        <Toggle 
          pressed={pressedM}
          onPressedChange={setPressedM}
          aria-label='Toggle bold'
          variant='outline'
        >
          <Text>Movies</Text>
        </Toggle>
      </View>
    <View className='p-2'>
      <UserReview review={review} />
    </View>
    
  </View>
  )
}

export default films

const styles = StyleSheet.create({})