import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '~/components/ui/text';

type PlaylistCoverProps = {
  name: string;
};

const genreImages: { [key: string]: any } = {
  action: require('assets/images/FilmGenre_imgs/action.png'),
  adventure: require('assets/images/FilmGenre_imgs/adventure_card.png'),
  animation: require('assets/images/FilmGenre_imgs/animation.png'),
  comedy: require('assets/images/FilmGenre_imgs/comedy.png'),
  crime: require('assets/images/FilmGenre_imgs/crime.png'),
  documentary: require('assets/images/FilmGenre_imgs/documentary.png'),
  drama: require('assets/images/FilmGenre_imgs/drama.png'),
  family: require('assets/images/FilmGenre_imgs/family.png'),
  fantasy: require('assets/images/FilmGenre_imgs/fantasy.png'),
  history: require('assets/images/FilmGenre_imgs/history.png'),
  horror: require('assets/images/FilmGenre_imgs/horror.png'),
  music: require('assets/images/FilmGenre_imgs/music.png'),
  mystery: require('assets/images/FilmGenre_imgs/mystery.png'),
  romance: require('assets/images/FilmGenre_imgs/romance.png'),
  thriller: require('assets/images/FilmGenre_imgs/thriller.png'),
  war: require('assets/images/FilmGenre_imgs/war.png'),
  western: require('assets/images/FilmGenre_imgs/western.png'),
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
    <View className='w-full -max-h-screen-safe-offset-96'>
      <Image source={imageSource} style={{ position: 'absolute', width: '100%', height: '100%', top: 0 }} resizeMode="cover" />

      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 1)']}
        className="absolute top-0 right-0 bottom-0 left-0"
      />
      <View className="w-full h-full flex-col justify-end items-center">
        <Text className="font-semibold text-3xl text-white mb-3">{name}</Text>
        <View className='w-5/6'>
          <Text className='text-sm font-light text-center mb-10'>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlaylistCover;
