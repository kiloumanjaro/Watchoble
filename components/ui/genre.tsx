import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from '~/components/ui/card';
import { Ellipsis } from 'lucide-react-native';
import { MenuProvider } from 'react-native-popup-menu';


type GenreProps = {
    name: string;
    items: number;
    };

    const Genre: React.FC<GenreProps> = ({ name, items}) => {

    return (
        <Card className='w-96 h-56 p-5 flex justify-between'>
            <View className='w-full items-end'>
            <Ellipsis size={30} color="#4ade80" />
            </View>

            <View className='w-full'>
                <Text className='text-sm'>{items} items</Text>
                <Text className='text-2xl font-semibold'>{name}</Text>
                
            </View>

        </Card>

        
        
    );
};


export default Genre;

