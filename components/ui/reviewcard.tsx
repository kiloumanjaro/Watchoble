import { View } from 'react-native'
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { CircleUser } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

type ReviewCardProps = {
  username: string;
  review: string;
  date: Date;
  has_spoiler: boolean;
}

const getDaysAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ username, review, date, has_spoiler}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(!has_spoiler);

    return (
    <Accordion
      type="multiple"
      className="px-5 pb-5"
      defaultValue={has_spoiler ? undefined : ['item-1']}
      onValueChange={(values) => setIsOpen(values.includes('item-1'))}
    >
      <AccordionItem value='item-1' className='bg-card'>
        <AccordionTrigger>
          {has_spoiler && !isOpen && (
          <View className="absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden rounded-xl">
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={50}
              tint="systemChromeMaterialDark"
              className="flex-1"
            />
          </View>
          )}
          <View className="px-6 py-2 flex-row items-center gap-4 relative overflow-hidden">
            <View className="flex-col z-20">
              <CircleUser strokeWidth={1.5} size={45} color={colors.text} />
            </View>
            <View className="flex-1 flex-col z-20">
              <Text className="text-xl font-bold">{username}</Text>
              <Text className="text-xs font-light">{getDaysAgo(date)}</Text>
            </View>
          </View>
        </AccordionTrigger>

        <AccordionContent className='pl-16 pr-10 pb-9 bg-red-60'>
          <Text>{review}</Text>
        </AccordionContent>

      </AccordionItem>
    </Accordion>
    );
};

export default ReviewCard