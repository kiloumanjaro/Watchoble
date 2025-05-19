import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
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
        <Animated.View style={styles.itemContainer}>
            <Image source={item.image} style={{width:300, height:500}} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}>
            <Text>{item.id}</Text>
            </LinearGradient>


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
        width: 300, 
        height: 500,
        padding: 20,
    }

})
