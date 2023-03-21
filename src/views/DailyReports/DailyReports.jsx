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

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const DailyReports = ({ navigation, route }) => {
  const { classId, groupId } = route.params;

  const [value, setValue] = useState(true);
  const [items, setItems] = useState({});
  const [reports, setReports] = useState();
  const today = new Date();

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -30; i < 14; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;

        const strTime = timeToString(time);
        const todayReports = reports.filter((report) => {
          return report.reportTime === strTime;
        });

        if (!items[strTime]) {
          items[strTime] = [];

          todayReports.forEach((report) => {
            items[strTime].push({
              title: report.title,
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strTime,
              ...report,
            });
          });
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
    const fetchProgressReports = async () => {
      try {
        const res = await ReportService.getProgressReports(classId, groupId);
        if (res.status === 200) {
          const accessToken = await AsyncStorage.getItem('@accessToken');
          const result = await Promise.all(
            res.data.data.map(async (item) => {
              const studentInfo = await fetchStudentData(
                accessToken,
                item.studentId
              );

              return {
                ...item,
                student: studentInfo,
              };
            })
          );
          setReports(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStudentData = async (accessToken, studentId) => {
      try {
        const res = await StudentService.getStudentById(accessToken, studentId);
        if (res.status === 200) {
          return res.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgressReports();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Daily Reports',
    });
  }, []);

  const CardTitle = ({ item }) => (
    <View className='w-full flex-row items-center justify-between mt-3 pr-3'>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Entypo name='cycle' size={20} color={COLOR.gray[1]} />
    </View>
  );

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProgressDetail', {
            report: item,
          })
        }
        style={styles.item}
      >
        <Card style={styles.card} contentStyle={{ padding: 0 }}>
          <Card.Title title={<CardTitle item={item} />} />
          <Card.Content
            style={{
              flexDirection: 'column',
              borderTopWidth: 2,
              borderTopColor: COLOR.gray[3],
              paddingTop: 8,
            }}
          >
            {/* <View className='mb-4'>
              <Text className='text-gray-700 text-base'>{item.content}</Text>
            </View> */}
            <View>
              <Text className='text-gray-600 text-sm'>{item.student.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {reports && (
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={today.toISOString().split('T')[0]}
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
    backgroundColor: '#fffffff4',
    paddingTop: 8,
    borderRadius: 0,
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

export default DailyReports;
