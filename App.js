import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  ClassListScreen,
  GroupDetail,
  GroupListScreen,
  LoginScreen,
  ProfileScreen,
} from './src/views';
import Hello from './src/views/Hello';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen
          name='ClassList'
          component={ClassListScreen}
          options={{ title: 'ClassList' }}
        />
        <Stack.Screen
          name='GroupList'
          component={GroupListScreen}
          options={{ title: 'GroupList' }}
        />
        <Stack.Screen
          name='GroupDetail'
          component={GroupDetail}
          options={{ title: 'GroupDetail' }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name='Hello'
          component={Hello}
          options={{ title: 'Hello' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
