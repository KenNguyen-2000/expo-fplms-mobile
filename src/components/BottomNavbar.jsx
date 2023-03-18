import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassListScreen from '../views/ClassListScreen/ClassListScreen';
import {
  AddClassScreen,
  GroupDetail,
  GroupListScreen,
  ProfileScreen,
} from '../views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const ClassStack = createNativeStackNavigator();

function ClassStackScreen() {
  return (
    <ClassStack.Navigator>
      <ClassStack.Screen name='ClassList' component={ClassListScreen} />
      <ClassStack.Screen name='StudentList' component={ClassListScreen} />
      <ClassStack.Screen name='AddClass' component={AddClassScreen} />
      <ClassStack.Screen name='GroupList' component={GroupListScreen} />
      <ClassStack.Screen name='GroupDetail' component={GroupDetail} />
    </ClassStack.Navigator>
  );
}

const BottomNavbar = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='ClassStack'
        component={ClassStackScreen}
        options={{
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
              }}
            >
              Class
            </Text>
          ),
          tabBarIconStyle: {
            display: 'none',
          },
          tabBarItemStyle: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: true,
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
              }}
            >
              Profile
            </Text>
          ),

          tabBarIconStyle: {
            display: 'none',
          },
          tabBarItemStyle: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({});
