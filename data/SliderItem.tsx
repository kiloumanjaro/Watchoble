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
            <Image source={item.image} style={{width:width, height:480}} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}>
            <View className="flex-1 justify-end items-center flex-col">
                <Text className="mb-20"></Text>
                <Text className="mb-20">{item.id}</Text>
                <Text className="mb-20">{item.id}</Text>
            </View>
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
        width: width, 
        height: 480,
        padding: 20,
    }

})
