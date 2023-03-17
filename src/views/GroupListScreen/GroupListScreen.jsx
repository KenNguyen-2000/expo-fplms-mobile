import { View, Text, Button } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const GroupListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>GroupListScreen</Text>
      <Button
        title='Go to GroupId: 123456'
        onPress={() => navigation.navigate('GroupDetail', { name: 'Jane' })}
      />
      <StatusBar type='auto' />
    </View>
  );
};

export default GroupListScreen;
