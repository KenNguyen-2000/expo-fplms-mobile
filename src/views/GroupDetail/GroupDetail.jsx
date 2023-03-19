import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import ReportService from '../../api/reportService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from '../../api/studentService';
import { COLOR } from '../../utils/color';
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const GroupDetail = ({ navigation, route }) => {
  const { classId, groupId } = route.params;

  const [items, setItems] = React.useState({});
  const [progressReports, setProgressReports] = React.useState();
  const today = new Date();

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;

        const strTime = timeToString(time);
        const todayReports = progressReports.filter(
          (report) => report.reportTime === strTime
        );

        if (!items[strTime]) {
          items[strTime] = [];

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

  const loadDumpItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push([{
          //     title: '',
          //     height: Math.max(10, Math.floor(Math.random() * 150)),
          //     day: strTime,
          //   }]);
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
          setProgressReports(result);
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

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ReportDetail')}
        style={styles.item}
      >
        <Card style={styles.card} contentStyle={{ padding: 0 }}>
          <Card.Title title={item.title} titleStyle={styles.cardTitle} />
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
              <Text className='text-gray-600 text-sm'>{item.student.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {progressReports && (
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
    padding: 0,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray[2],
    color: COLOR.blue[1],
  },
});

export default GroupDetail;
