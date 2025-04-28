import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { useTheme } from '@react-navigation/native';

type MediaProps = {
    name: string;
    picture?: string;
};

const Media: React.FC<MediaProps> = ({ name }) => {
    const { colors } = useTheme();

    return (
        <Card className='flex-1 m-2 h-28'>
            <View className="flex-row justify-center items-center h-full">
            <Text className="text-lg font-semibold">
                {name}
            </Text>
            </View>
        </Card>
    );
};


export default Media;