import { StyleSheet, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Rating } from '@kolking/react-native-rating';
import { useTheme } from '@react-navigation/native';

type MovieCardProps = {
    title: string;
    rating: number;
    description: string;
    year?: string;
    poster_path?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
    title,
    rating,
    description,
    year,
    poster_path,
}) => {
    const [userRating, setUserRating] = useState(rating);
    const { colors } = useTheme();
    const handleChange = useCallback(
        (value: number) => setUserRating(Math.round((userRating + value) * 5) / 10),
        [userRating],
    );

    return (
    <Card className='w-full max-w-sm min-h-[300px] p-6 rounded-2xl'>
        <CardHeader className='gap-2'>
            <View className='flex-row gap-2'>
                <CardTitle>{title}</CardTitle>
                <Text>{year}</Text>
            </View>
            <Rating size={10} maxRating={5} rating={userRating} onChange={handleChange} disabled={true} fillColor={colors.primary}/>
            <CardDescription>{description}</CardDescription>
            <View className='w-full items-start'>
                <Image
                    source={{ uri: 'https://image.tmdb.org/t/p/w500' + poster_path }}
                    style={{ width: 100, height: 150 }}
                    resizeMode="cover"
                />
            </View>
        </CardHeader>
    </Card>
    );
};

export default MovieCard

