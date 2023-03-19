import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import BottomNavbar from './src/components/BottomNavbar';
import { AddClassScreen, AddGroupScreen, LoginScreen } from './src/views';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DailyReports } from './src/views/index';
import CycleReports from './src/views/CycleReports/CycleReports';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

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

  const HeadTab = (props) => {
    console.log(props);
    return (
      <Tab.Navigator>
        <Tab.Screen name='DailyReports' component={DailyReports} />
        <Tab.Screen name='CycleReports' component={CycleReports} />
      </Tab.Navigator>
    );
  };

  return (
    <PaperProvider>
      <NavigationContainer>
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
          <Stack.Screen
            name='AddClass'
            component={AddClassScreen}
            options={{ tabBarVisible: false }}
          />
          <Stack.Screen
            name='AddGroup'
            component={AddGroupScreen}
            options={{ tabBarVisible: false }}
          />
          <Stack.Screen name='DailyReports' component={DailyReports} />
          <Stack.Screen name='CycleReports' component={CycleReports} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
