import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text className='text-xl font-bold'>LoginScreen</Text>
      <Button
        title='Go to Class List'
        onPress={() => navigation.navigate('Hello', { name: 'Jane' })}
        className='border border-slate-500 px-3'
      />
      <StatusBar style='auto' />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
