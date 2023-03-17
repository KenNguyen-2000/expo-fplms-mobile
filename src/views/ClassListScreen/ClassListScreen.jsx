import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ClassItem } from '../../components';

const dumpData = {
  classCode: 'SE160026',
  courseName: 'Software Project',
  courseCode: 'SWP391',
  lecturer: 'Huongntc2@fpt.edu.vn',
  numOfStudents: 35,
};

const classes = new Array(10).fill(dumpData);

const ClassListScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className='bg-white flex-1 relative'>
      <Button
        title='Goto group list'
        onPress={() => navigation.navigate('GroupList', { name: 'Jane' })}
      />
      <View className='mx-4 mt-4 flex-row px-3 py-6 rounded-lg bg-[#BCF0DA]'>
        <View className='flex-col'>
          <Text
            style={styles.title}
            className='text-xl font-medium tracking-widest'
          >
            Project-based Learning
          </Text>
          <Text
            style={styles.title}
            className='text-xl font-medium tracking-widest'
          >
            Mangement System
          </Text>
        </View>
      </View>
      <FlatList
        data={classes}
        className='mx-4'
        renderItem={({ item }) => <ClassItem class={item} />}
        keyExtractor={(item) => item.id}
      />

      <StatusBar type='auto' />
    </SafeAreaView>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat',
  },
});
