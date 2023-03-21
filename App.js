import { LogBox, TouchableOpacity } from 'react-native';

LogBox.ignoreLogs([
  "ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
  'ColorPropType will be removed',
]);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect, useState } from 'react';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GroupService } from './src/api/groupService';

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

    const showAlertModal = () => {
      Alert.alert('Delete class', 'This action cannot revers', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => handleDeleteGroup() },
      ]);
    };

    const handleDeleteGroup = async () => {
      try {
        const res = await GroupService.deleteGroup(classId, groupId);
        if (res.status === 200) {
          if (res.data.code === 200) {
            navigation.goBack();
          } else {
            throw new Error(res.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    useLayoutEffect(() => {
      props.navigation.setOptions({
        headerBackTitleVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={showAlertModal}>
            <MaterialCommunityIcons
              name='delete-empty'
              color={COLOR.red[2]}
              size={28}
            />
          </TouchableOpacity>
        ),
      });
    }, []);
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
