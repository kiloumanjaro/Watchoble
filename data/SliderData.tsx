// SliderData.ts
import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  id: string;
  image: ImageSourcePropType;
};

export const ImageSlider = [
  {
    id: '1',
    image: require('~/assets/images/beetle-juice.png'),
  },
  {
    id: '2',
    image: require('~/assets/images/breaking-bad.png')
  },
  {
    id: '3',
    image: require('~/assets/images/alien-romulus.png'),
  },
  {
    id: '4',
    image: require('~/assets/images/jurassic.png'),
  },
];
