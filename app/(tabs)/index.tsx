import { StyleSheet, Text, View } from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import React from 'react'

const index = () => {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full h-1/2 max-w-sm p-6 rounded-2xl'></Card>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})