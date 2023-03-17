import { View, Text, Button } from 'react-native';
import React from 'react';

const GroupListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>GroupListScreen</Text>
      <Button
        title='Go to GroupId: 123456'
        onPress={() => navigation.navigate('GroupDetail', { name: 'Jane' })}
      />
    </View>
  );
};

export default GroupListScreen;
