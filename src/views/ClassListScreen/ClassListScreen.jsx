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
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ClassItem } from '../../components';
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

const dumpData = {
  classCode: 'SE160026',
  courseName: 'Software Project',
  courseCode: 'SWP391',
  lecturer: 'Huongntc2@fpt.edu.vn',
  numOfStudents: 35,
};

const classes = new Array(10).fill(dumpData);

const ClassListScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [showMenuActions, setShowMenuActions] = useState(false);
  const [toggleModal, setToggleModal] = useState(true);

  let fontSize = 24;
  let paddingVertical = 6;

  const showAddClassForm = () => {
    setShowMenuActions(!showMenuActions);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const SearchInput = () => {
    return (
      <View className='absolute inset-0 z-50 backdrop-brightness-90'>
        <TextInput placeholder='SE1600,...' />
      </View>
    );
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
              placeholder={'Please type here…'}
              className='flex-1 text-black'
            />
          </View>
        </Overlay>
        {/* <View className='absolute flex-1 inset-0 opacity-50 bg-black z-50'>
          <Text>Welcome to the React Native Playground!</Text>
        </View> */}
        <View className='my-4 flex-col items-center px-6 py-2 bg-[#BCF0DA] relative shadow-lg'>
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

        <View className='flex-1'>
          <FlatList
            data={classes}
            className='mx-2 px-2 z-10'
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('GroupList')}
              >
                <ClassItem class={item} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(item, index) => index}
          />
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