import React from 'react';
import { View, Pressable } from 'react-native';
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
    onPress: (genre: string, movieId: number) => void;  // onPress should expect both genre and movieId
  };
  

  const Genre: React.FC<GenreProps> = ({ name, items, genre, movieId, onPress }) => {
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
        <Card className='w-96 h-56 p-5 flex justify-between m-3'>
            <View className='w-full items-end'>
                <Menu>
                    <MenuTrigger>
                        <Ellipsis size={30} color={colors.primary} />
                    </MenuTrigger>
                    <MenuOptions customStyles={menuOptionsStyles}>
                        <MenuOption onSelect={() => alert('Share pressed')}>
                            <Text className="text-base px-4 py-2" style={{ color: colors.text }}>Share</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert('Edit pressed')}>
                            <Text className="text-base px-4 py-2" style={{ color: colors.text }}>Edit</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert('Delete pressed')}>
                            <Text className="text-base px-4 py-2" style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <View className='w-fullp-2 rounded'>
                <Text className='text-sm'>{items} items</Text>
                <Text className='text-2xl font-semibold'>{name}</Text>
            </View>
        </Card>
        </Pressable>
    );
};

export default Genre;
