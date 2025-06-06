import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import {
  Card,
  CardDescription,
  CardHeader,
} from '~/components/ui/card';
import { CheckCircle } from 'lucide-react-native';

type PeopleProps = {
  name: string;
  known_for_department: string;
  profile_path?: string;
};

const People: React.FC<PeopleProps> = ({ name, known_for_department, profile_path }) => {
  return (
    <Card className='w-44 h-60 m-2 justify-center items-center'>
      <View className='items-center'>
        <View className='relative mb-2'>
          {profile_path ? (
            <Image source={{ uri: profile_path }} className="w-24 h-24 rounded-md" />
          ) : (
            <View className="w-24 h-24 rounded-md bg-gray-300" />
          )}
          <View className="absolute bottom-0 right-0 bg-white rounded-lg">
            <CheckCircle size={16} color="#4ade80" />
          </View>
        </View>
        <Text className='text-lg font-semibold text-center'>{name}</Text>
        <CardDescription>
          <Text className="text-sm font-normal text-gray-500 text-center">
            {known_for_department}
          </Text>
        </CardDescription>
      </View>
    </Card>
  );
};

export default People;
