import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  Alert,
  Pressable,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, ToggleButton } from 'react-native-paper';
import ReportService from '../../api/reportService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from '../../api/studentService';
import { COLOR } from '../../utils/color';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GroupService } from '../../api/groupService';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CycleReports = ({ navigation, route }) => {
  const { classId, groupId } = route.params;

  const [value, setValue] = useState(false);
  const [items, setItems] = useState({});
  const [reports, setReports] = useState();
  const today = new Date();

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;

        const strTime = timeToString(time);
        const todayReports = reports.filter(
          (report) => report.reportTime === strTime
        );

        if (!items[strTime]) {
          items[strTime] = [];
          console.log(first);

          // const numItems = Math.floor(Math.random() * 3 + 1);
          todayReports.forEach((report) => {
            items[strTime].push({
              title: report.title,
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strTime,
              ...report,
            });
          });
          // for (let j = 0; j < todayReports.length; j++) {
          //   items[strTime].push({
          //     name: 'Item for ' + strTime + ' #' + j,
          //     height: Math.max(10, Math.floor(Math.random() * 150)),
          //     day: strTime,
          //   });
          // }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  useEffect(() => {
    const fetchCycleReports = async () => {
      try {
        const res = await ReportService.getCycleReports(classId, groupId);
        console.log(res);
        if (res.status === 200) {
          const result = res.data.data;
          console.log('Cycle', result);
          setReports(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCycleReports();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      title: 'Cycle Reports',
      headerRight: () => (
        <TouchableOpacity onPress={showAlertModal}>
          <MaterialCommunityIcons
            name='delete-empty'
            color={COLOR.red[2]}
            size={28}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const showAlertModal = () => {
    Alert.alert('Delete class', 'This action cannot revers', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Confirm', onPress: () => handleDeleteGroup() },
    ]);
  };
  const handleDeleteGroup = async () => {
    try {
      const res = await GroupService.deleteGroup(classId, groupId);
      if (res.status === 200) {
        if (res.data.code === 200) {
          navigation.goBack();
        } else {
          throw new Error(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CardTitle = ({ item }) => (
    <View className='w-full flex-row items-center justify-between mt-3 pr-3'>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Entypo name='cycle' size={20} color={COLOR.gray[1]} />
    </View>
  );

  const renderItem = (item) => {
    console.warn('Content: ', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ReportDetail', {
            reportId: item.id,
            classId: classId,
            groupId: groupId,
          })
        }
        style={styles.item}
      >
        <Card elevation={3} style={styles.card} contentStyle={{ padding: 0 }}>
          <Card.Title title={<CardTitle item={item} />} />
          <Card.Content
            style={{
              flexDirection: 'column',
              borderTopWidth: 2,
              borderTopColor: COLOR.gray[3],
              paddingTop: 8,
            }}
          >
            <View className='mb-4'>
              <Text className='text-gray-700 text-base'>{item.content}</Text>
            </View>
            <View>
              <Text className='text-gray-600 text-sm'>{item.groupId}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={styles.toggleBtn}
          className={`w-1/2 items-center  ${
            value ? 'bg-blue_2 text-white' : 'bg-white text-primary_text'
          }`}
        >
          <Pressable
            onPress={() =>
              navigation.goBack({
                classId: classId,
                groupId: groupId,
              })
            }
          >
            <Text
              style={{
                fontWeight: '600',
                color: value ? '#fff' : COLOR.primary03,
              }}
            >
              Daily Reports
            </Text>
          </Pressable>
        </View>
        <View
          style={styles.toggleBtn}
          className={`w-1/2 items-center  ${
            !value ? 'bg-blue_2 text-white' : 'bg-white text-primary_text'
          }`}
        >
          <Pressable>
            <Text
              style={{
                fontWeight: '600',
                color: !value ? '#fff' : COLOR.primary03,
              }}
            >
              Cycle Reports
            </Text>
          </Pressable>
        </View>
      </View>
      {reports && (
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={'2022-02-21'}
          refreshControl={null}
          showClosingKnob={true}
          refreshing={false}
          renderItem={renderItem}
        />
      )}
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 12,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray[2],
    color: COLOR.blue[1],
    marginRight: 20,
  },
  toggleBtn: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLOR.gray[3],
  },
});

export default CycleReports;
