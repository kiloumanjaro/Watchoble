import { FlatList, View, Text, ViewToken, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { ImageSlider, ImageSliderType } from '~/data/SliderData';
import { SliderItem } from '~/data/SliderItem';
import { Pagination } from '~/components/ui/pagination';
import Animated, { isSharedValue, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue, scrollTo } from 'react-native-reanimated';


type Props = {
    itemList: ImageSliderType[]
}

const {width} = Dimensions.get('screen');

const Slider = ({itemList} : Props) => {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    // const [data, setData] = useState(itemList);
    const data = itemList;
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        },
    });

    useEffect(() => {
    if (isAutoPlay) {
        interval.current = setInterval(() => {
        offset.value = offset.value + width;
        }, 5000);
    }

    return () => {
        // Always clear interval when unmounted or isAutoPlay changes
        if (interval.current) {
        clearInterval(interval.current);
        }
    };
    }, [isAutoPlay, offset, width]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const index = viewableItems[0]?.index;
    if (typeof index === 'number' && index !== paginationIndex) {
        setPaginationIndex(index % itemList.length);
    }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const viewabilityConfigCallbackPairs = useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ]);

    return (
        <View className="relative">
            <Animated.FlatList
                ref={ref}
                // data={data}
                data={itemList}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX}/>}
                horizontal={true} // optional: common for sliders
                showsHorizontalScrollIndicator={false} // optional
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={onScrollHandler}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                // onEndReached={()=> setData([...data,...itemList])}
                // onEndReachedThreshold={0.5}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                    if (interval.current) {
                        clearInterval(interval.current);
                    }
                }}
                onScrollEndDrag={() => {
                    setIsAutoPlay(true)
                }}
            />
            <View className="absolute bottom-0 left-0 right-0 z-10">
                <Pagination items={itemList} scrollX={scrollX} paginationIndex={paginationIndex}/>
            </View>
        </View>
    )
}

export default Slider;

