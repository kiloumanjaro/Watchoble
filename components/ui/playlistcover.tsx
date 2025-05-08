import { View } from 'react-native'
import { Text } from '~/components/ui/text';

type PlaylistCoverProps = {
    name : string
    };   

    const PlaylistCover: React.FC<PlaylistCoverProps> = ({ name }) => {

    return (
    <View className="w-full h-1/3 flex-col bg-red-500 justify-end items-center p-5">
        <Text className='font-semibold text-3xl'>{name}</Text>
    </View>
    );
};

export default PlaylistCover;