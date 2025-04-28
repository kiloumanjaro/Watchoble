import React, { useState } from 'react'; 
import { View, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from '~/components/ui/card';
import { CheckCircle } from 'lucide-react-native';
import { Button } from '~/components/ui/button';

type PeopleProps = {
    name: string;
    known_for_department: string;
    profile_path?: string;
};

const People: React.FC<PeopleProps> = ({ name, known_for_department, profile_path }) => {
  // State to track if the person is followed or not
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <Card className='w-44 h-60 flex-col justify-between m-2'>
      <View className='flex-1 justify-center'>
        <CardHeader className='p-0 items-center gap-2'>
          <View>
            {profile_path ? (
              <Image source={{ uri: profile_path }} className="w-14 h-14 rounded-md" />
            ) : (
              <View className="w-14 h-14 rounded-md bg-gray-300" />
            )}

            <View className="absolute bottom-0 right-0 bg-white rounded-lg">
              <CheckCircle size={16} color="#4ade80" />
            </View>
          </View>
          <Text className='text-lg font-semibold'>{name}</Text>
        </CardHeader>
        <CardDescription>
            <Text className="text-sm font-normal text-gray-500 text-center">{known_for_department}</Text>
        </CardDescription>
      </View>
      <CardFooter>
        <Button size='default' className='w-full' onPress={toggleFollow}>
          <Text>{isFollowing ? 'Following' : 'Follow'}</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default People;
