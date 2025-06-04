import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';



type ReviewCoverProps = {
    path: string;
    vote_average: number;
    poster_path: string;
};

const ReviewCover: React.FC<ReviewCoverProps> = ({path}) => {

    return (
        <View className='w-full h-64'>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${path}` }}  style={{ position: 'absolute', width: '100%', height: '100%', top: 0 }} resizeMode="cover" />
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 1)']} className="absolute top-0 right-0 bottom-0 left-0"/>
        </View>
    );
};

export default ReviewCover;
