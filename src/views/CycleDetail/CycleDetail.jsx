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

const CycleDetail = ({ navigation, route }) => {
  const { reportId, report } = route.params;

  const [cycleReport, setCycleReport] = useState(report);
  console.log(report);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
      headerTitle: 'Report Detail',
    });
  }, [report]);

  return (
    <SafeAreaView style={styles.container}>
      {cycleReport && (
        <ScrollView style={styles.scrollView}>
          <Surface style={styles.wrapper}>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Sprint
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text
                  style={styles.contentText}
                  className='text-gray-800 font-semibold'
                >
                  {cycleReport.cycleNumber}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Report Group
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText}>{cycleReport.groupId}</Text>
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
                <Text style={styles.contentText}>{cycleReport.title}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Mark
                </Text>
              </View>
              <View style={styles.colRight}>
                <View className='px-4 bg-green-400  text-white rounded-full'>
                  <Text
                    style={styles.contentText}
                    className='text-white font-medium text-xl'
                  >
                    {cycleReport.mark}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Feedback
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText} className='min-h-[70]'>
                  {cycleReport.feedback}
                </Text>
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
                  {cycleReport.content}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.colLeft}>
                <Text
                  className='text-base font-semibold'
                  style={styles.leftTitle}
                >
                  Meeting link
                </Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.contentText}>
                  {cycleReport.resourceLink}
                </Text>
              </View>
            </View>
          </Surface>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CycleDetail;

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
