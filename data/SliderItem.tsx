import { View, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Text } from '~/components/ui/text';
import { ImageSliderType } from '~/data/SliderData';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>
}

const {width} = Dimensions.get('screen');

export const SliderItem = ({item, index, scrollX}: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index+1) * width],
                        [-width * 0.25, 0, width*0.25],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }

    });
    return (
        <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
            <Image source={item.image} style={{width:width, height:480}} />
            <LinearGradient className='flex-1 p-20' colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}/>
            <View className="justify-end items-center flex-col" style={styles.background}>
                <Text className='text-base font-light'>{item.id}</Text>   
            </View>
        </Animated.View>
    )
    }


const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width, 
        gap: 20
    },
    background: {
        position: 'absolute',
        width: width, 
        height: 480,
        padding: 50
    }

})
