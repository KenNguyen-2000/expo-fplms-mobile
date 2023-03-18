import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import BottomNavbar from './src/components/BottomNavbar';
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
  const [isSignedIn, setIsSignedIn] = useState(undefined);

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await AsyncStorage.getItem('@accessToken');
      if (token) {
        setIsSignedIn(token);
      } else {
        setIsSignedIn(undefined);
      }
    };

    getAccessToken();
  }, []);

  return (
    <NavigationContainer>
      {/* <BottomNavbar /> */}
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
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
