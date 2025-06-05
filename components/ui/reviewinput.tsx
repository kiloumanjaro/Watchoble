import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { SendHorizontal } from 'lucide-react-native';

type ReviewInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSendReview?: () => void;
};

const ReviewInput: React.FC<ReviewInputProps> = ({ value, onChangeText, onSendReview }) => {
  const { colors } = useTheme();

  const handleSubmit = () => {
    if (value.trim()) {
      console.log('Submit clicked');
      console.log('Submitted review:', value);
      onSendReview?.();
    }
  };

  return (
    <View className='mb-5 w-full'>
      <View className='flex-row gap-3 items-center'>
        <View className='flex-1'>
          <TextInput
            className='border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-base text-foreground bg-background'
            multiline
            placeholder="Write your review..."
            placeholderTextColor={colors.text + '80'}
            value={value}
            onChangeText={onChangeText}
            style={{ minHeight: 60 }}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <SendHorizontal strokeWidth={1.5} size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ReviewInput;
