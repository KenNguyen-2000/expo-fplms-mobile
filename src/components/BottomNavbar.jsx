import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassListScreen from '../views/ClassListScreen/ClassListScreen';
import {
  AddClassScreen,
  GroupDetail,
  GroupListScreen,
  HomeScreen,
  ProfileScreen,
  ReportDetail,
} from '../views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarItem from './TabBarItem';
import { COLOR } from '../utils/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const ClassStack = createNativeStackNavigator();

function ClassStackScreen() {
  return (
    <ClassStack.Navigator>
      <ClassStack.Screen name='ClassList' component={ClassListScreen} />
      <ClassStack.Screen name='StudentList' component={ClassListScreen} />
      <ClassStack.Screen name='GroupList' component={GroupListScreen} />
      <ClassStack.Screen name='GroupDetail' component={GroupDetail} />
      <ClassStack.Screen name='ReportDetail' component={ReportDetail} />
    </ClassStack.Navigator>
  );
}

const HomeButton = (props) => {
  const { homeButton } = styles;
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={homeButton}>
      <FontAwesome name='home' size={32} color={'#fff'} />
    </TouchableOpacity>
  );
};

const BottomNavbar = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#303a60',
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name='ClassStack'
        component={ClassStackScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='class' size={32} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name='ClassList'
        component={ClassListScreen}
        options={{
          tabBarButton: (props) => <HomeButton {...props} />,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            <FontAwesome name='user' size={32} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    backgroundColor: COLOR.blue[2],
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
    bottom: 40,
  },
  icon: {
    color: COLOR.blue[5],
  },
});
