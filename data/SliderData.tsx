// SliderData.ts
import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  id: string;
  image: ImageSourcePropType;
};

export const ImageSlider = [
  {
    id: 'Beetle Juice (2004)',
    image: require('../assets/images/beetle-juice.png'),
  },
  {
    id: 'Breaking Bad (2008)',
    image: require('../assets/images/breaking-bad.png')
  },
  {
    id: 'Alien Romulus (2024)',
    image: require('../assets/images/alien-romulus.png'),
  },
  {
    id: 'Jurassic (2018)',
    image: require('../assets/images/jurassic.png'),
  },
];
