import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Oticons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ClassItem = (props) => {
  return (
    <View
      style={styles.wrapper}
      className='flex-col  px-2 py-2 bg-white border border-gray-100 rounded-md relative'
    >
      <View>
        <Text className='text-xl font-semibold text-primary_text mb-1'>
          {props.class.classCode}
        </Text>
        <View className='flex-row gap-2 items-center'>
          <Oticons name='project' size={18} />
          <Text className='mb-1 text-base'>{props.class.courseName}</Text>
        </View>
        <View className='flex-row gap-2 items-center'>
          <Feather name='mail' size={18} />
          <Text className='mb-1'>{props.class.lecturer}</Text>
        </View>
        <View className='flex-row items-center gap-2'>
          <Ionicons name='ios-people-outline' size={18} />
          <Text>Number of Students: {props.class.numOfStudents}</Text>
        </View>
      </View>
    </View>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },

  wrapper: {
    shadowColor: '#171717',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
