import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Oticons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Peoples from './Peoples';
import { ListItemSwipeable } from '@rneui/base-edge/dist/ListItem/ListItem.Swipeable';
import { ListItem } from '@rneui/base-edge';

const CycleItem = (props) => {
  const { report } = props;

  return (
    <View
      style={styles.wrapper}
      className='flex-col  px-2 py-2 bg-blue_5 border border-gray-100 rounded-md relative'
    >
      <View className=''>
        <Text className='text-xl font-semibold text-primary_text mb-3'>
          {report.title}
        </Text>
        <View className='flex-row gap-2 items-center mb-2'>
          <Text className='text-lg text-gray_0 uppercase text-medium'>
            Sprint {report.cycleNumber}
          </Text>
        </View>
        <View className='flex-row  gap-2 items-center'>
          <View className='px-2 bg-green_1 rounded-md'>
            <Text className='text-lg text-white font-medium'>
              {report.mark !== null ? `Mark: ` + report.mark : 'Reviewing...'}
            </Text>
          </View>
        </View>
        <View className='absolute  right-1 bottom-1'>
          <Text> Sprint {report.cycleNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default CycleItem;

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
