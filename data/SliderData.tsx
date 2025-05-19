// SliderData.ts
import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  id: string;
  image: ImageSourcePropType;
};

export const ImageSlider = [
  {
    id: '1',
    image: { uri: 'https://picsum.photos/id/237/200/300' },
  },
  {
    id: '2',
    image: { uri: 'https://picsum.photos/seed/picsum/200/300' },
  },
  {
    id: '3',
    image: { uri: 'https://picsum.photos/200/300?grayscale' },
  },
  {
    id: '4',
    image: { uri: 'https://picsum.photos/seed/picsum/200/300' },
  },
];
