import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BottomNavbar } from './src/components';
import {
  ClassListScreen,
  GroupDetail,
  GroupListScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
} from './src/views';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function MainScreen() {
    return;
  }

  return (
    <NavigationContainer>
      {/* <BottomNavbar /> */}
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen
          name='Main'
          options={{ headerShown: false }}
          component={BottomNavbar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
