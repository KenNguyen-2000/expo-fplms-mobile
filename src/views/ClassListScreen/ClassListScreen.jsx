import {
  Button,
  FlatList,
  Image,
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
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Overlay } from '@rneui/themed';
import ClassItem from '../../components/ClassItem';
import { ClassService } from '../../api/classService';

const dumpData = {
  classCode: 'SE160026',
  courseName: 'Software Project',
  courseCode: 'SWP391',
  lecturer: 'Huongntc2@fpt.edu.vn',
  numOfStudents: 35,
};

const ClassListScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [showMenuActions, setShowMenuActions] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [classes, setClasses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const showAddClassForm = () => {
    setShowMenuActions(!showMenuActions);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleRefreshList = async () => {
    setRefresh(true);
    try {
      const res = await ClassService.getClassList();
      if (res.status === 200) {
        setTimeout(() => {
          setClasses(res.data.data);
          setRefresh(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const res = await ClassService.getClassList();
        if (res.status === 200) {
          setClasses(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassList();
  }, []);

  const handleShowGroups = (id) => {
    navigation.navigate('GroupList', {
      classId: id,
    });
  };

  if (!fontsLoaded) {
    <View>Waiting</View>;
  } else {
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
        {/* <View className='absolute flex-1 inset-0 opacity-50 bg-black z-50'>
          <Text>Welcome to the React Native Playground!</Text>
        </View> */}
        <View className='my-4 mb-2 flex-col items-center px-6 py-2 bg-[#BCF0DA] relative shadow-lg'>
          <View className='absolute top-6 left-4 z-40'>
            <Text
              style={styles.title}
              className='text-xl font-medium tracking-widest'
            >
              Project-based
            </Text>
            <Text
              style={styles.title}
              className='text-xl font-medium tracking-widest'
            >
              Learning
            </Text>
            <Text
              style={styles.title}
              className='text-xl font-medium tracking-widest'
            >
              Mangement
            </Text>

            <Text
              style={styles.title}
              className='text-xl font-medium tracking-widest'
            >
              System
            </Text>
          </View>
          <Image
            style={styles.image}
            source={require('../../../assets/study-1.png')}
          />
        </View>

        <View className='flex-1 mb-2'>
          {classes.length > 0 && (
            <FlatList
              refreshing={refresh}
              onRefresh={handleRefreshList}
              data={classes}
              className='mx-2 px-2 z-10'
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleShowGroups.bind(null, item.id)}
                >
                  <ClassItem class={item} />
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
          onPress={showAddClassForm}
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
                translateX: showMenuActions ? -58 : 0,
              },
            ],
          }}
          onPress={() => navigation.navigate('AddClass')}
          className={`absolute bottom-3 right-2  z-30`}
        >
          <AntDesign name='pluscircle' color={'#7799FA'} size={48} />
        </TouchableOpacity>

        <StatusBar type='auto' />
      </SafeAreaView>
    );
  }
};

export default ClassListScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat_500Medium',
  },
  image: {
    height: 160,
    aspectRatio: 1710 / 1383,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
    alignSelf: 'flex-end',
    marginRight: -8,
  },

  traverseUY: {
    transform: [
      {
        translateY: -58,
      },
    ],
  },

  traverseX: {
    transform: [
      {
        translateX: -58,
      },
    ],
  },
});
