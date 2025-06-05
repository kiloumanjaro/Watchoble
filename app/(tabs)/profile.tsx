import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { supabase } from '~/lib/supabase';
import { SquarePen } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  // State for fetching user data 
  const [userdata, setuserData] = useState<any>();

  useEffect (() => {
    const getprofileData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          Alert.alert('Error', 'Please log in to add a review');
          return
        }
      
      const userId = userData.user.id;
      const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)

        if (error) {
          Alert.alert('Error', 'Failed to fetch user data');
          return;
        }
        setuserData(data?.[0] || null);
      };
      
    getprofileData();
  }, []);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  const { colors } = useTheme();

  return (
<View className='flex-1 justify-center p-6 gap-5 bg-secondary/30'>
  <View className='items-center'>
    <Card className='w-full max-w-sm p-6 rounded-2xl'>
      <CardHeader className='items-center'>
        <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          <AvatarFallback>
            <Text>RS</Text>
          </AvatarFallback>
        </Avatar>
        <View className='p-3' />

        <View className='flex-row gap-2'> 
          <CardTitle className='pb-2 text-center'>
            {userdata?.username ?? 'user_101'}
          </CardTitle>
          <TouchableOpacity className='pt-1'>
            <SquarePen strokeWidth={1.5} size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View className='flex-row'>
          {userdata?.bio?.trim() && (
            <CardDescription className='text-base font-semibold'>
              {userdata.bio}
            </CardDescription>
          )}
        </View>
      </CardHeader>

      <CardContent>
        <View className='flex-row justify-around gap-3'>
          <View className='items-center'>
            <Text className='text-sm text-muted-foreground'>First Name</Text>
            <Text className='text-xl font-semibold'>{userdata?.firstname ?? 'user_101'}</Text>
          </View> 
          <View className='items-center'>
            <Text className='text-sm text-muted-foreground'>Last Name</Text>
            <Text className='text-xl font-semibold'>{userdata?.lastname ?? 'user_101'}</Text>
          </View>
          <View className='items-center'>
            <Text className='text-sm text-muted-foreground'>Followings</Text>
            <Text className='text-xl font-semibold'>3</Text>
          </View>
        </View>
      </CardContent>
      
      <CardFooter className='flex-col gap-3 pb-0'>
        <View className='flex-row items-center overflow-hidden'>
          <Text className='text-sm text-muted-foreground'>Reviews</Text>
          <LayoutAnimationConfig skipEntering>
            <Animated.View
              key={progress}
              entering={FadeInUp}
              exiting={FadeOutDown}
              className='w-11 items-center'
            >
              <Text className='text-sm font-bold text-sky-600'>{progress}%</Text>
            </Animated.View>
          </LayoutAnimationConfig>
        </View>
        <Progress value={progress} className='h-2' indicatorClassName='bg-sky-600' />
        <View />
      </CardFooter>
    </Card>
  </View>

    <View className="pl-7">
      <Text className="text-lg font-semibold">Followings</Text>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView> */}
    </View>
  </View>
  );
}
