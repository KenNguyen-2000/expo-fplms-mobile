import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GroupService } from '../../api/groupService';
import Entypo from 'react-native-vector-icons/Entypo';
import { Overlay } from '@rneui/themed';
import GroupItem from '../../components/GroupItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '../../utils/color';
import { ClassService } from '../../api/classService';
import ReportService from '../../api/reportService';
import CycleItem from '../../components/CycleItem';

const CycleReports = ({ navigation, route }) => {
  const { classId, groupId } = route.params;

  const [reports, setCycleReports] = useState([]);

  const [showMenuActions, setShowMenuActions] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleShowCycleReportDetail = (report) => {
    navigation.navigate('CycleDetail', {
      report: report,
    });
  };

  const handleDeleteClass = async () => {
    try {
      const res = await ClassService.deleteClass(route.params.classId);
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
      headerBackTitle: 'Back',
      headerBackTitleVisible: false,
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

      <TouchableHighlight
        underlayColor='#99B3FB'
        className='absolute bottom-3 right-2  z-40 bg-blue_1 rounded-full p-3'
        onPressOut={() => setShowMenuActions(false)}
      >
        <Entypo name='dots-three-vertical' color={'#fff'} size={24} />
      </TouchableHighlight>
      <TouchableOpacity
        style={{
          transform: [
            {
              translateY: showMenuActions ? -58 : 0,
            },
          ],
        }}
        onPress={() => setToggleModal(true)}
        className={`absolute bottom-3 right-2 z-30 bg-blue_1 rounded-full p-2`}
      >
        <Ionicons name='search' color={'#fff'} size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          transform: [
            {
              translateY: showMenuActions ? -58 : 0,
            },
            {
              translateX: showMenuActions ? -58 : 0,
            },
          ],
        }}
        onPress={() =>
          navigation.navigate('StudentList', {
            classId: route.params.classId,
          })
        }
        className={`absolute bottom-3 right-2 z-30 bg-blue_1 rounded-full p-2`}
      >
        <Ionicons name='ios-people-sharp' color={'#fff'} size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          transform: [
            {
              translateX: showMenuActions ? -58 : 0,
            },
          ],
        }}
        onPress={() =>
          navigation.navigate('AddGroup', {
            classId: route.params.classId,
          })
        }
        className={`absolute bottom-3 right-2  z-30`}
      >
        <AntDesign name='pluscircle' color={'#7799FA'} size={48} />
      </TouchableOpacity>

      <StatusBar type='auto' />
    </SafeAreaView>
  );
};

export default CycleReports;

const styles = StyleSheet.create({});
