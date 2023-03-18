import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Oticons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Peoples from './Peoples';

const GroupItem = (props) => {
  const { group } = props;
  console.log(group);

  return (
    <View
      style={styles.wrapper}
      className='flex-col  px-2 py-2 bg-[#EEF2FF] border border-gray-100 rounded-md relative'
    >
      <View className=''>
        <Text className='text-xl font-semibold text-primary_text mb-3'>
          GROUP {group.number}
        </Text>
        <View className='flex-row gap-2 items-center mb-2'>
          <Text className='text-lg text-gray_0 uppercase'>
            Project Base LMS
          </Text>
        </View>
        <View className='flex-row  gap-2 items-center'>
          <Text className='text-lg text-blue_1'>
            {group.currentNumber}/{group.memberQuantity} Members
          </Text>
        </View>
        <View className='absolute  right-1 bottom-1'>
          <Peoples length={group.currentNumber} />
        </View>
      </View>
    </View>
  );
};

export default GroupItem;

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
