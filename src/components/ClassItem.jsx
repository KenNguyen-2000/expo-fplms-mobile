import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Oticons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../utils/color';

const ClassItem = (props) => {
  const classItem = props.class;

  const returnString = (string) => {
    const arr = ['SU', 'SP', 'FA'];
    const value = {
      SU: 'SUMMER',
      SP: 'SPRING',
      FA: 'FALL',
    };
    const getString = arr.find((item) => string.includes(item));

    return string.replace(getString, value[getString]);
  };

  return (
    <View
      style={styles.wrapper}
      className='flex-col  px-2 py-2 bg-white border border-gray-200 rounded-md relative'
    >
      <View>
        <Text className='text-xl font-semibold text-primary_text mb-1'>
          {classItem.name}
        </Text>
        <View style={styles.row} className='flex-row items-center'>
          <Oticons color={COLOR.gray[1]} name='project' size={22} />
          <Text style={styles.label} className='mb-1 text-lg font-medium'>
            {returnString(classItem.semesterCode)}
          </Text>
        </View>
        <View style={styles.row} className='flex-row items-center'>
          <Entypo color={COLOR.gray[1]} name='cycle' size={22} />
          <Text style={styles.label} className='mb-1'>
            Sprint cycle: {classItem.cycleDuration}
          </Text>
        </View>
        <View style={styles.row} className='flex-row items-center'>
          <Ionicons color={COLOR.gray[1]} name='ios-people-outline' size={22} />
          <Text style={styles.label}>
            Number of Students: {classItem.enrollKey}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  row: {
    marginTop: 2,
    alignItems: 'center',
  },

  label: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 20,
  },

  wrapper: {
    shadowColor: '#171717',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
