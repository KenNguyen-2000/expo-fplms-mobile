import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
  'ColorPropType will be removed',
]);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import BottomNavbar from './src/components/BottomNavbar';
import {
  AddClassScreen,
  AddGroupScreen,
  LoginScreen,
  ReportDetail,
} from './src/views';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DailyReports } from './src/views/index';
import CycleReports from './src/views/CycleReports/CycleReports';
import CycleDetail from './src/views/CycleDetail/CycleDetail';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

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
    const { classId, groupId } = props.route.params;
    return (
      <TopTab.Navigator>
        <TopTab.Screen
          name='DailyReports'
          component={DailyReports}
          initialParams={{
            groupId: groupId,
            classId: classId,
          }}
        />
        <TopTab.Screen
          name='CycleReports'
          component={CycleReports}
          initialParams={{
            groupId: groupId,
            classId: classId,
          }}
        />
      </TopTab.Navigator>
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
          <Stack.Screen name='Reports' component={HeadTab} />
          <Stack.Screen name='CycleDetail' component={CycleDetail} />
          <Stack.Screen name='ProgressDetail' component={ReportDetail} />
          {/* <Stack.Screen name='DailyReports' component={DailyReports} />
          <Stack.Screen name='CycleReports' component={CycleReports} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
