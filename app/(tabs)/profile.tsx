import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import EditProfileModal from '~/components/ui/editpopup';
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
import { supabase } from '~/lib/supabase';
import { SquarePen } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function ProfileScreen() {
  const [progress, setProgress] = React.useState(78);
  const [userdata, setUserData] = useState<any>();
  const [isEditVisible, setEditVisible] = useState(false);
  const { colors } = useTheme();


  const getprofileData = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        Alert.alert('Error', 'Please log in first');
        return
      }
    
    const userId = userData.user.id;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        Alert.alert('Error', 'Failed to fetch user data');
        return;
      }
      setUserData(data || null);
    };
  getprofileData();

  const updateUserProfile = async (newProfiledata: any) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      Alert.alert('Error', 'Please log in first');
      return;
    }

    const userId = userData.user.id;

    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('username', newProfiledata.username)
      .neq('id', userId)
      .maybeSingle();

    if (checkError) {
      Alert.alert('Error', 'Failed to check username availability');
      return;
    }

    if (existingUser) {
      Alert.alert('Error', 'Username already taken');
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        username: newProfiledata.username,
        firstname: newProfiledata.firstname,
        lastname: newProfiledata.lastname,
        bio: newProfiledata.bio,
      })
      .eq('id', userId);

    if (updateError) {
      Alert.alert('Error', 'Failed to update profile');
      return;
    }

    Alert.alert('Success', 'Profile updated successfully');
    getprofileData();
  };

  useEffect (() => {
    getprofileData();
  }, []);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <View className="flex-1 justify-center p-6 gap-5 bg-secondary/30">
      <View className="items-center">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader className="items-center">
            <Avatar alt="Avatar" className="w-24 h-24">
              <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
              <AvatarFallback>
                <Text>RS</Text>
              </AvatarFallback>
            </Avatar>
            <View className="p-3" />

            <View className="flex-row gap-2">
              <CardTitle className="pb-2 text-center">
                {userdata?.username ?? 'user_101'}
              </CardTitle>
              <TouchableOpacity className="pt-1" onPress={() => setEditVisible(true)}>
                <SquarePen strokeWidth={1.5} size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View className="flex-row">
              {userdata?.bio?.trim() && (
                <CardDescription className="text-base font-semibold">
                  {userdata.bio}
                </CardDescription>
              )}
            </View>
          </CardHeader>

          <CardContent>
            <View className="flex-row justify-around gap-3">
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">First Name</Text>
                <Text className="text-xl font-semibold">{userdata?.firstname ?? 'user_101'}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Last Name</Text>
                <Text className="text-xl font-semibold">{userdata?.lastname ?? 'user_101'}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Reviews</Text>
                <Text className="text-xl font-semibold">3</Text>
              </View>
            </View>
          </CardContent>

          <CardFooter className="flex-col gap-3 pb-0">
      {/* ✅ Modal rendered outside the Card */}
      {userdata && (
        <EditProfileModal
          visible={isEditVisible}
          onClose={() => setEditVisible(false)}
          onSave={async (updatedProfile) => {
          setUserData((prev: any) => ({ ...prev, ...updatedProfile }));
          updateUserProfile(updatedProfile);
          }}
          initialProfile={{
            username: userdata?.username ?? '',
            firstname: userdata?.firstname ?? '',
            lastname: userdata?.lastname ?? '',
            bio: userdata?.bio ?? '',
          }}
        />
      )}
          </CardFooter>
        </Card>
      </View>
    </View>
  );
}
