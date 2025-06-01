import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '~/components/ui/text';
import { Search } from 'lucide-react-native';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setSearchQuery('');
    onSearch('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-row items-center px-4">
        <View className="flex-row flex-1 items-center rounded-2xl px-5 py-1 bg-[#f6f2ef] dark:bg-black/50">
          <Search size={20} color={colors.text} />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search"
            placeholderTextColor={colors.text + '88'} // 88 = 50% opacity
            value={searchQuery}
            onChangeText={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ color: colors.text }}
          />
        </View>
        {isFocused && (
          <TouchableOpacity onPress={handleCancel} className="ml-3">
            <Text className="text-primary text-base">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
