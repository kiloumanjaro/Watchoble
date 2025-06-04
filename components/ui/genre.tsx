import React from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { Ellipsis } from 'lucide-react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useTheme } from '@react-navigation/native';

type GenreProps = {
    name: string;
    items: number;
    genre: string;  // Accept genre as a prop
    movieId: number;  // Accept movieId as a prop
    image: any;
    onPress: (genre: string, movieId: number) => void;  // onPress should expect both genre and movieId
  };
  

  const Genre: React.FC<GenreProps> = ({ name, items, genre, movieId, image, onPress }) => {
    const { colors } = useTheme();

    const menuOptionsStyles = {
        optionsContainer: {
            backgroundColor: colors.card, // dynamic card color
            borderRadius: 12,
            paddingVertical: 8,
            elevation: 0, 
            shadowColor: 'transparent',
            width: 150,
        },
    };

    const handlePress = () => {
        onPress(genre, movieId);  // Call onPress with both genre and movieId
      };

    return (
        <Pressable onPress={handlePress}>
            <Card className='w-96 h-56 overflow-hidden rounded-xl m-3 p-0'>
                <ImageBackground
                    source={image}
                    resizeMode="cover"
                    style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}
                >
                    <View className='items-end'>
                        <Menu>
                            <MenuTrigger>
                                <Ellipsis size={30} color={colors.primary} />
                            </MenuTrigger>
                            <MenuOptions customStyles={menuOptionsStyles}>
                                {/* MenuOption items */}
                            </MenuOptions>
                        </Menu>
                </View>
                <View className=''>
                    <Text className='text-sm text-white'>{items} items</Text>
                    <Text className='text-2xl font-semibold text-white'>{name}</Text>
                </View>
            </ImageBackground>
        </Card>
    </Pressable>
    );
};

export default Genre;
