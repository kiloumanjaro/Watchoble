import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Card, CardDescription } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { SendHorizontal } from 'lucide-react-native';

const ReviewInput: React.FC = () => {
  const { colors } = useTheme();
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (reviewText.trim()) {
      // For now, just log it. Replace with real functionality later.
      console.log('Submitted review:', reviewText);
      setReviewText('');
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
                    value={reviewText}
                    onChangeText={setReviewText}
                    style={{ minHeight: 60 }}
                />
            </View>
            <TouchableOpacity>
                <SendHorizontal  strokeWidth={1.5} size={25} color={colors.text}/>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ReviewInput;
