import { View } from 'react-native'
import {
    Card,
    CardDescription,
    CardFooter,
} from '~/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { CircleUser } from 'lucide-react-native';

type ReviewCardProps = {
  username: string;
  review: string;
  date: Date;
}

const getDaysAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};


const ReviewCard: React.FC<ReviewCardProps> = ({ username, review, date, }) => {
    const { colors } = useTheme();

    return (
    <Accordion
      type="multiple"
      className='px-5 pb-5'
      defaultValue={['item-1']}
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <View className='px-6 py-2 flex-row items-center gap-4'>
          <View className='flex-col'>
              <CircleUser strokeWidth={1.5} size={45} color={colors.text}/>
          </View>
          <View className='flex-1 flex-col'>
                  <Text className='text-xl font-bold'>{username}</Text>
                  <Text className='text-xs font-light'>{getDaysAgo(date)}</Text>
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