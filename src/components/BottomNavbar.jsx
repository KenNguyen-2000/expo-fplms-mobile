import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassListScreen from '../views/ClassListScreen/ClassListScreen';
import { GroupDetail, GroupListScreen, ProfileScreen } from '../views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const ClassStack = createNativeStackNavigator();
const GroupStack = createNativeStackNavigator();

function ClassStackScreen() {
  return (
    <ClassStack.Navigator>
      <ClassStack.Screen name='ClassList' component={ClassListScreen} />
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
      <Tab.Screen name='ClassList' component={ClassStackScreen} />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({});
