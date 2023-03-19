import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../../utils/color';
import { ClassService } from '../../api/classService';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GroupService } from '../../api/groupService';

const jsDateString = '2023-03-19T10:00:32.285Z';
const date = new Date(jsDateString);

const convertToJavaFormat = (date) =>
  date.toISOString().replace('T', ' ').slice(0, -1);

const AddGroupScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [groupData, setGroupData] = React.useState({
    classId: route.params.classId,
    enrollTime: convertToJavaFormat(new Date()),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AntDesign name='close' size={20} onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const handleCreateGroup = async () => {
    const enrollDate = new Date(groupData.enrollTime);
    const javaDateString = convertToJavaFormat(enrollDate);

    try {
      const res = await GroupService.createGroup({
        ...groupData,
        enrollTime: javaDateString,
      });
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.code === 200) {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setGroupData({
      ...groupData,
      enrollTime: convertToJavaFormat(currentDate),
    });
    // setShow(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className='w-full h-full flex-col bg-white rounded-lg px-4 py-4 shadow-lg'
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-col gap-2 items-center mb-8'>
          <Text className='text-3xl font-bold tracking-wide'>Create Group</Text>
          <Text className='text-base font-medium text-gray-400'>
            Enter details to make a space for courses
          </Text>
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Group Quantity</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            placeholder='4'
            onChangeText={(text) =>
              setGroupData({ ...groupData, groupQuantity: text })
            }
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Maximum Mebers</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            placeholder='4'
            onChangeText={(text) =>
              setGroupData({ ...groupData, memberQuantity: text })
            }
          />
        </View>
        <View style={styles.formItem} className='relative'>
          <Text style={styles.label}>Enroll Date</Text>
          <TouchableOpacity
            onPress={() => setShowDate(!showDate)}
            style={styles.datePicker}
          >
            <Text>{date.toLocaleString().split(', ')[0]}</Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={'date'}
              is24Hour={true}
              onChange={onChange}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              style={{
                marginTop: -30,
                zIndex: 30,
              }}
            />
          )}
        </View>
        <View style={styles.formItem} className='relative'>
          <Text style={styles.label}>Enroll Time</Text>
          <TouchableOpacity
            onPress={() => setShowTime(!showTime)}
            style={styles.datePicker}
          >
            <Text>{date.toLocaleString().split(', ')[1]}</Text>
          </TouchableOpacity>

          {showTime && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={'time'}
              is24Hour={true}
              onChange={onChange}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              style={{
                marginTop: -30,
                zIndex: 30,
              }}
            />
          )}
        </View>
        <View className='items-center py-6'>
          <TouchableOpacity
            className='bg-blue_2 px-4 py-2 rounded-lg'
            onPress={handleCreateGroup}
          >
            <Text className='text-white font-semibold text-lg'>Create new</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  label: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 16,
  },

  formItem: {
    flexDirection: 'column',
    paddingBottom: 16,
  },

  textInput: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: COLOR.gray[2],
    borderRadius: '100%',
  },
  datePicker: {
    borderWidth: 2,
    borderColor: COLOR.gray[2],
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
