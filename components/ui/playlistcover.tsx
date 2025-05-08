import { View, Image } from 'react-native';
import { Text } from '~/components/ui/text';

type PlaylistCoverProps = {
  name: string;
};

const genreImages: { [key: string]: any } = {
  action: require('~/assets/images/action.png'),
  // Add more genres and image paths as needed
};

const genreDescriptions: { [key: string]: string } = {
    action: 'High-energy playlists filled with excitement, battles, and adrenaline-pumping soundtracks.',
    adventure: 'Epic and uplifting tracks that inspire exploration, courage, and unforgettable journeys.',
    animation: 'Colorful, whimsical tunes that bring animated worlds to life with charm and imagination.',
    comedy: 'Light-hearted tracks to accompany laughter, jokes, and feel-good scenes.',
    crime: 'Moody, suspenseful beats that echo investigations, heists, and underworld dealings.',
    documentary: 'Atmospheric and reflective scores that enhance real-life stories and insightful narratives.',
    drama: 'Emotional, powerful compositions that underscore intense character moments and deep storytelling.',
    family: 'Warm, joyful melodies perfect for all ages, full of heart, wonder, and togetherness.',
    fantasy: 'Magical, sweeping scores that transport listeners to enchanted realms and legendary quests.',
    history: 'Stirring and period-authentic music that captures the spirit of past eras and monumental events.',
    horror: 'Dark, eerie sounds designed to unsettle, build tension, and evoke pure terror.',
    music: 'A diverse celebration of genres and rhythms, spotlighting iconic tracks and musical expression.',
    mystery: 'Intriguing and subtle compositions that tease clues, secrets, and unexpected twists.',
    romance: 'Tender, heartfelt melodies that capture love, longing, and emotional connection.',
    thriller: 'Tense, gripping tracks that keep the pulse racing through suspense and danger.',
    war: 'Epic, somber, and heroic music that reflects conflict, sacrifice, and the cost of battle.',
    western: 'Rustic, frontier-inspired tunes that evoke dusty trails, saloons, and classic showdowns.',
  };

const PlaylistCover: React.FC<PlaylistCoverProps> = ({ name }) => {
  const key = name.toLowerCase();
  const imageSource = genreImages[key] || require('~/assets/images/default.png');
  const description = genreDescriptions[key] || 'A unique blend of sounds tailored to this genre.';

  return (
    <View className='w-full h-96'>
      <View className="w-full h-4/5 flex-col justify-end items-center">
        <Image source={imageSource} style={{ position: 'absolute', width: '100%', height: '100%', top: 0 }} resizeMode="cover" />
        <Text className="font-semibold text-3xl text-white mb-7">{name}</Text>
      </View>
      <View className='flex-1 w-full bg-[#f6f2ef] dark:bg-[#1b1b1b] px-10 py-2 justify-center'>
        <Text className='text-sm font-light text-center'>{description}</Text>
      </View>
    </View>
  );
};

export default PlaylistCover;
