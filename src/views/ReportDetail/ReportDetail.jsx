import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReportService from '../../api/reportService';
import StudentService from '../../api/studentService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surface } from 'react-native-paper';
import { COLOR } from '../../utils/color';

const ReportDetail = ({ navigation, route }) => {
  const { classId, groupId, reportId } = route.params;

  const [report, setReport] = useState(undefined);
  console.log(report);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
      headerTitle: '',
    });

    if (report) {
      navigation.setOptions({
        headerTitle: report.title,
      });
    }
  }, [report]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await ReportService.getProgressReportById(reportId);
        if (res.status === 200) {
          if (res.data.code === 200) {
            const accessToken = await AsyncStorage.getItem('@accessToken');
            const studentInfo = await StudentService.getStudentById(
              accessToken,
              res.data.data.studentId
            );
            setReport({
              ...res.data.data,
              student: studentInfo.data.data,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (reportId) {
      console.log('fetching');
      fetchReport();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {report && (
        <ScrollView style={styles.scrollView}>
          <Surface style={styles.wrapper}>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Reporter
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText}>{report.student.name}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Report title
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText}>{report.title}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Contents
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText} className='min-h-[70]'>
                  {report.content}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Report date
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText}>{report.reportTime}</Text>
              </View>
            </View>
          </Surface>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ReportDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 12,
    marginTop: 24,
  },
  wrapper: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray[3],
  },
  colRight: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexShrink: 1,
  },
  leftTitle: {},
  colLeft: {
    width: 120,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignSelf: 'flex-start',

    // paddingRight: 24,
    // borderRightWidth: 1,
    borderRightColor: COLOR.gray[3],
  },
  contentText: {
    fontSize: 16,
    flexShrink: 1,
  },
});
