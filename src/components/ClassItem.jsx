import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ClassItem = (props) => {
  return (
    <View className='flex-col px-2 py-1'>
      <Text>{props.class.classCode}</Text>
      <Text>{props.class.courseName}</Text>
      <Text>{props.class.lecturer}</Text>
      <Text>{props.class.numOfStudents}</Text>
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
});
