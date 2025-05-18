import { View } from 'react-native'
import {
    Card,
    CardDescription,
    CardFooter,
} from '~/components/ui/card';
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
    <View className='mb-5'> 
        <Card className='w-full flex-col p-5 '>
            <CardDescription>
                <View className='flex-row gap-3'>
                    <View className='flex-col h-full'>
                        <CircleUser strokeWidth={1.5} size={45} color={colors.text}/>
                    </View>

                    <View className='flex-1 flex-col gap-3'>
                        <View className='flex-col '>
                            <Text className='text-xl font-bold'>{username}</Text>
                            <Text className='text-xs'>{getDaysAgo(date)}</Text>
                        </View>
                        <View className='pr-4'>
                            <Text>{review}</Text>
                        </View>
                    </View>
                </View>
            </CardDescription>

        </Card>
    </View>

    );
};

export default ReviewCard