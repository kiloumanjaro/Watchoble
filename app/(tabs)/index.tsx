import { StyleSheet, View } from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import React, { useCallback, useState } from 'react'
import { Text } from '~/components/ui/text';
import { Rating } from '@kolking/react-native-rating';


const index = () => {
  const [rating, setRating] = useState(0);
  const handleChange = useCallback(
    (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating],
  );

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full h-1/2 max-w-sm p-6 rounded-2xl'>
      <CardHeader className='gap-2'>
        <View className='flex-row gap-2'>  
          <CardTitle>Card Title</CardTitle>
          <Text>2025</Text>
        </View>
        <Rating size={40} maxRating={5} rating={rating} onChange={handleChange}  />
        <CardDescription>Card Description</CardDescription>
        <View className='w-full items-start'>
        </View>
      </CardHeader>
      </Card>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})