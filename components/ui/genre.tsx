import React from 'react';
import { View, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { Ellipsis } from 'lucide-react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

type GenreProps = {
    name: string;
    items: number;
    genre: string;  // Accept genre as a prop
    movieId: number;  // Accept movieId as a prop
    image: any;
    onPress: (genre: string, movieId: number) => void;  // onPress should expect both genre and movieId
  };
  
  const { width } = Dimensions.get('screen');

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
                {/* Top Right Menu */}
                <View className='items-end' style={{ zIndex: 2 }}>
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

                {/* Bottom Text Content */}
                <View style={{ zIndex: 2 }}>
                    <Text className='text-sm text-white'>{items} items</Text>
                    <Text className='text-2xl font-semibold text-white'>{name}</Text>
                </View>
            </ImageBackground>
            <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 1)']}
            className="absolute top-0 right-0 bottom-0 left-0"
            />
        </Card>
    </Pressable>
    );
};

export default Genre;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: width * 0.96, // match Card width (tailwind w-96 = 384px ≈ 96% of screen)
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});