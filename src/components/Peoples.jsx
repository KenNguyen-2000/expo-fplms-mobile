import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../utils/color';

const arrColor = [COLOR.blue[3], COLOR.green[3], COLOR.gray[3], COLOR.red[4]];

const Peoples = (props) => {
  const { length } = props;

  return (
    <View className='flex-row-reverse'>
      <View
        style={styles.circle}
        className='bg-blue_3 items-center justify-center'
      >
        {length > 4 && <Text className='font-medium'>+{length - 4}</Text>}
      </View>
      <View style={styles.circle} className='bg-green_3'></View>
      <View style={styles.circle} className='bg-gray_3'></View>
      <View style={styles.circle} className='bg-red_3'></View>
    </View>
  );
};

export default Peoples;

const styles = StyleSheet.create({
  circle: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    marginLeft: -12,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
