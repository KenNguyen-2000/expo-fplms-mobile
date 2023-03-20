import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../utils/color';
import image from '../../images/SE160037.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Surface } from 'react-native-paper';

// {"aud": "241110768064-o5spvgck701jdjjnvltnjs3tv9n2242j.apps.googleusercontent.com", "azp": "241110768064-o5spvgck701jdjjnvltnjs3tv9n2242j.apps.googleusercontent.com", "email": "kienntse160026@fpt.edu.vn", "email_verified": true, "exp": 1679166592, "given_name": "Nguyen Thanh Kien - K16_HCM", "hd": "fpt.edu.vn", "iat": 1679162992, "iss": "https://accounts.google.com", "jti": "f0e4f86c9c9a77f5976c6e799051ca66da604402", "locale": "en-GB", "name": "Nguyen Thanh Kien - K16_HCM", "nonce": "06d8c17f1d339a2acf27a7b68087032bd3631eda088698fa4c5cf02ce56583e9", "picture": "https://lh3.googleusercontent.com/a/AGNmyxbS2f-PoYfvmR_uwzpeEI4RfXrJfkDBMkGbyETE=s96-c", "sub": "117527463137728320241"}

const dumpData = {
  profile: {
    dob: '04/01/2002',
    gender: 'Male',
    phoneNumber: '0977102955',
    address: '',
    email: 'thanhptse160037@fpt.edu.vn',
  },
  academic: {
    major: 'Software Engineering',
    currentTerm: 7,
    roleNumber: 'SE160037',
  },
};

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();

  const logout = async () => {
    const token = await AsyncStorage.getItem('@accessToken');
    console.log(token);
    await AuthSession.revokeAsync(
      {
        token: token,
      },
      {
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      }
    );
    await AsyncStorage.removeItem('@accessToken');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const jsonValue = await AsyncStorage.getItem('@userInfo');

      if (jsonValue) {
        const user = JSON.parse(jsonValue);
        console.log(user);
        setUserInfo(user);
      }
    };

    getUserInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className='relative'>
      <View style={styles.circle2}></View>
      <View style={styles.circle3}></View>
      <View style={styles.circle1}></View>
      <View className='px-6 mt-20 '>
        <Surface elevation={3} style={styles.wrapper} className='shadow-md'>
          <View className='flex-col gap-1 items-center -mt-16 mb-7'>
            {userInfo ? (
              <Image source={{ uri: userInfo.picture }} style={styles.img} />
            ) : (
              <Image
                source={require('../../images/SE160037.jpg')}
                style={styles.img}
              />
            )}
            <Text className='font-bold text-xl text-primary_text'>
              {userInfo ? userInfo.name : 'Pham Trong Thanh'}
            </Text>
            <Text className='text-gray-500'>SE160026</Text>
          </View>
          <View className='flex-row w-full items-center px-8'>
            <FontAwesome
              name='birthday-cake'
              color={'#585757'}
              size={24}
              style={styles.iconLeft}
            />
            <Text className='text-lg  text-gray-500'>
              {dumpData.profile.dob}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View className='flex-row w-full items-center px-8'>
            <MaterialCommunityIcons
              name={
                dumpData.profile.gender.toLowerCase === 'male'
                  ? 'gender-male'
                  : 'gender-female'
              }
              color={'#585757'}
              size={24}
              style={styles.iconLeft}
            />
            <Text className='text-lg  text-gray-500'>
              {dumpData.profile.gender}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View className='flex-row w-full items-center px-8'>
            <Entypo
              name='mail'
              color={'#585757'}
              size={24}
              style={styles.iconLeft}
            />
            <Text className='text-lg  text-gray-500'>
              {userInfo ? userInfo.email : dumpData.profile.email}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View className='flex-row w-full items-center px-8'>
            <FontAwesome
              name='leanpub'
              color={'#585757'}
              size={24}
              style={styles.iconLeft}
            />
            <Text className='text-lg  text-gray-500'>
              {dumpData.academic.major}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View className='flex-row w-full items-center px-8'>
            <Entypo
              name='leaf'
              color={'#585757'}
              size={24}
              style={styles.iconLeft}
            />
            <Text className='text-lg  text-gray-500'>
              Semester {dumpData.academic.currentTerm}
            </Text>
          </View>

          <Pressable
            onPress={logout}
            className='flex-row items-center justify-center bg-blue_1 px-5 py-1 rounded-md mt-7 mb-3'
          >
            <Text className='text-lg font-bold text-white mr-2'>Log out</Text>
            <Ionicons name='md-exit-outline' color={'#fff'} size={20} />
          </Pressable>
        </Surface>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  circle1: {
    width: 340,
    height: 340,
    borderRadius: 340 / 2,
    backgroundColor: COLOR.blue[2],
    position: 'absolute',
    top: -100,
    left: -120,
  },
  circle2: {
    width: 340,
    height: 340,
    borderRadius: 340 / 2,
    backgroundColor: COLOR.blue[4],
    position: 'absolute',
    top: -90,
    right: -80,
  },
  circle3: {
    width: 340,
    height: 340,
    borderRadius: 340 / 2,
    backgroundColor: COLOR.blue[3],
    position: 'absolute',
    top: -200,
    right: -70,
  },
  iconLeft: {
    marginRight: 40,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: COLOR.gray[4],
    marginVertical: 10,
  },
  wrapper: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    paddingBottom: 4,
  },
  heading: {
    fontSize: 20,
    color: COLOR.blue[1],
    marginTop: 15,
    marginBottom: 8,
    fontWeight: '600',
  },
  avatarBox: {
    border: '1px solid black',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    boxShadow: '5px 10px 8px #888888',
  },
  img: {
    height: 140,
    aspectRatio: 1,
    borderRadius: 140 / 2,
    borderWidth: 2,
    borderColor: '#d1d1d1',
    marginBottom: 6,
  },
  avatarInfo: {
    width: 150,
    marginLeft: 25,
    marginTop: 20,
  },
  styleDetailInfo: {
    marginLeft: 15,
  },
});
