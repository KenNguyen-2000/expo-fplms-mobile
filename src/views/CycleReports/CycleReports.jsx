import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Overlay } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../../utils/color';
import ReportService from '../../api/reportService';
import CycleItem from '../../components/CycleItem';

const CycleReports = ({ navigation, route }) => {
  const { classId, groupId } = route.params;

  const [reports, setCycleReports] = useState([]);

  const [toggleModal, setToggleModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleShowCycleReportDetail = (report) => {
    navigation.navigate('CycleDetail', {
      report: report,
    });
  };

  const handleRefreshList = async () => {
    setRefresh(true);
    try {
      const res = await ReportService.getCycleReports(classId, groupId);
      if (res.status === 200) {
        if (res.data.code === 200) {
          setTimeout(() => {
            setCycleReports(res.data.data);
            setRefresh(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Daily Reports',
    });
  }, []);

  useEffect(() => {
    const fetchCycleReports = async () => {
      try {
        const res = await ReportService.getCycleReports(classId, groupId);
        if (res.status === 200) {
          if (res.data.code === 200) {
            setCycleReports(res.data.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCycleReports();
  }, []);

  return (
    <SafeAreaView className='bg-white flex-1 relative'>
      <Overlay
        isVisible={toggleModal}
        onBackdropPress={() => setToggleModal(false)}
      >
        <View
          className='flex-row items-center py-1 gap-2'
          style={{ width: 200 }}
        >
          <Ionicons name='search' color={'#333'} size={18} />
          <TextInput
            placeholder='useless placeholder'
            className='flex-1 text-black'
            onChangeText={setSearchValue}
            value={searchValue}
          />
        </View>
      </Overlay>

      <View className='flex-1 mt-3 bg-white'>
        {reports.length > 0 && (
          <FlatList
            refreshing={refresh}
            onRefresh={handleRefreshList}
            data={reports.sort((a, b) => a.number > b.number)}
            className='mx-2 px-2 z-10'
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={handleShowCycleReportDetail.bind(null, item)}
              >
                <CycleItem report={item} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CycleReports;

const styles = StyleSheet.create({});
