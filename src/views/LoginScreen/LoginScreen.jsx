import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLOR } from '../../utils/color';

const LoginScreen = ({ navigation }) => {
  return (
    <View className='w-fit'>
      <Text className='text-xl font-bold'>LoginScreen</Text>
      <View className='bg-blue-300 w-fit'>
        <Button
          title='Login'
          color={'#333'}
          onPress={() => {
            navigation.navigate('Main', { name: 'Jane' });
          }}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.blue[2],
  },
});
