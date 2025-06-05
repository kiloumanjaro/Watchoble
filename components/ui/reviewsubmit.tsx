import React, { useCallback, useState } from 'react';
import { Modal, View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Rating } from '@kolking/react-native-rating';
import { Checkbox } from '~/components/ui/checkbox';
import { useTheme } from '@react-navigation/native';

type ReviewSubmitProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, hasSpoilers: boolean) => void;
  initialRating?: number;
};

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({
  visible,
  onClose,
  onSubmit,
  initialRating = 3,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const { colors } = useTheme();

  const handleSubmit = useCallback(() => {
    onSubmit(rating, hasSpoilers); // Convert to 10-point scale
    onClose();
  }, [rating, hasSpoilers, onSubmit, onClose]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="absolute inset-0 bg-black/40 justify-center items-center p-4"
      >
        <Pressable
          onPress={() => {}}
          className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-lg shadow-black/20 items-center gap-4"
        >
          {/* Rating Stars */}
          <Rating
            size={35}
            maxRating={5}
            rating={rating}
            onChange={setRating}
            fillColor={colors.text}
          />

          {/* Spoiler Checkbox */}
          <View className="mt-4 px-12 flex-row items-center space-x-2 gap-2">
            <Checkbox checked={hasSpoilers} onCheckedChange={setHasSpoilers} />
            <Text className="text-sm text-foreground">This review contains spoilers that may reveal key plot points</Text>
          </View>

          {/* Submit Button */}
          <View className="mt-4 w-full">
            <Button onPress={handleSubmit} className="w-full">
              <Text className="text-center">Submit</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ReviewSubmit;
