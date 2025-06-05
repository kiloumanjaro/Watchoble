import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { SendHorizontal } from 'lucide-react-native';

type ReviewInputProps = {
  onSendReview?: () => void; // Make it optional for flexibility
};

const ReviewInput: React.FC<ReviewInputProps> = ({ onSendReview }) => {
  const { colors } = useTheme();
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (reviewText.trim()) {
      console.log('Submit clicked'); // Debug line
      console.log('Submitted review:', reviewText);
      setReviewText('');
      onSendReview?.(); // Trigger the modal
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
        <TouchableOpacity onPress={handleSubmit}>
          <SendHorizontal strokeWidth={1.5} size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewInput;
