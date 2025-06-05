import React, { useCallback, useState } from 'react';
import { Modal, View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Rating } from '@kolking/react-native-rating';
import { useTheme } from '@react-navigation/native';



type ReviewSubmitProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  initialRating?: number;
};

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({
  visible,
  onClose,
  onSubmit,
  initialRating = 3,
}) => {
  const [rating, setRating] = useState(initialRating);
  const { colors, dark } = useTheme();

  const handleSubmit = useCallback(() => {
    onSubmit(rating);
    onClose();
  }, [rating, onSubmit, onClose]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="absolute inset-0 justify-center items-center p-4">
        <View
          className={`
            w-full max-w-md
            bg-card
            border border-border
            rounded-xl p-6
            shadow-lg
            shadow-black/20
            items-center
            gap-4
          `}
        >
          <Text className="text-lg text-foreground font-semibold">Rate this Movie</Text>

          <Rating
            size={24}
            maxRating={5}
            rating={rating}
            onChange={setRating}
            fillColor={colors.primary}
          />

          <Text className="text-sm text-muted-foreground">
            Your rating: {rating.toFixed(1)} / 5
          </Text>

          <View className="mt-4 w-full flex-col space-y-2">
            <Button onPress={handleSubmit} className="w-full">
              <Text className="text-center">Submit</Text>
            </Button>
            <Button variant="default" onPress={onClose} className="w-full">
              <Text className="text-center">Cancel</Text> 
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewSubmit;
