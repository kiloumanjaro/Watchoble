import { View, Image } from 'react-native';
import React from 'react';



type ReviewCoverProps = {
    path: string;
    vote_average: number;
    poster_path: string;
};

const ReviewCover: React.FC<ReviewCoverProps> = ({path}) => {

    return (
        <View className='w-full h-56'>
            <View className="flex-1">
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${path}` }}  style={{ position: 'absolute', width: '100%', height: '100%', top: 0 }} resizeMode="cover" />
            </View>
        </View>
    );
};

export default ReviewCover;
