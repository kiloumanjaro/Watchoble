import React, { useState } from 'react';
import { Modal, View, Pressable, TextInput } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useTheme } from '@react-navigation/native';

type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (profile: {
    username: string;
    firstname: string;
    lastname: string;
    bio: string;
  }) => void;
  initialProfile: {
    username: string;
    firstname: string;
    lastname: string;
    bio: string;
  };
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  onSave,
  initialProfile,
}) => {
  const [username, setUsername] = useState(initialProfile.username);
  const [firstname, setFirstName] = useState(initialProfile.firstname);
  const [lastname, setLastName] = useState(initialProfile.lastname);
  const [bio, setBio] = useState(initialProfile.bio);
  const { colors } = useTheme();

  const handleSave = () => {
    onSave({ username, firstname, lastname, bio });
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="absolute inset-0 justify-center items-center p-4"
      >
        <Pressable
          onPress={() => {}}
          className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-lg shadow-black/20 gap-4"
        >
          <Text className="text-xl font-semibold text-center mb-2">Edit Profile</Text>

          {/* Username */}
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            className="border border-border rounded-lg px-4 py-2 text-base text-foreground"
            placeholderTextColor={colors.text}
          />

          {/* First Name */}
          <TextInput
            value={firstname}
            onChangeText={setFirstName}
            placeholder="First Name"
            className="border border-border rounded-lg px-4 py-2 text-base text-foreground"
            placeholderTextColor={colors.text}
          />

          {/* Last Name */}
          <TextInput
            value={lastname}
            onChangeText={setLastName}
            placeholder="Last Name"
            className="border border-border rounded-lg px-4 py-2 text-base text-foreground"
            placeholderTextColor={colors.text}
          />

          {/* Bio */}
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            multiline
            numberOfLines={3}
            className="border border-border rounded-lg px-4 py-2 text-base text-foreground h-24 text-left"
            placeholderTextColor={colors.text}
          />

          <Button onPress={handleSave} className="mt-4 w-full">
            <Text className="text-center">Save Changes</Text>
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditProfileModal;
