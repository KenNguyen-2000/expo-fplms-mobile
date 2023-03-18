import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../utils/color';
import image from '../../images/SE160037.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dumpData = {
  profile: {
    dob: '04/01/2002',
    gender: 'male',
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
    <SafeAreaView>
      <View style={styles.headerLayout}>
        <View style={styles.avatarBox}>
          <Image
            source={require('../../images/SE160037.jpg')}
            style={styles.img}
          />
          <View style={styles.avatarInfo}>
            <Text>{userInfo ? userInfo.name : 'Pham Trong Thanh'}</Text>
            <Text>SE160037</Text>
          </View>
        </View>
        <Text style={styles.heading}><strong>Profile</strong></Text>
        <View style={styles.styleDetailInfo}>
          <Text><strong>Date of birth:</strong> {dumpData.profile.dob}</Text>
          <Text><strong>Gender:</strong> {dumpData.profile.gender}</Text>
          <Text><strong>Phone number:</strong> {dumpData.profile.phoneNumber}</Text>
          <Text><strong>Address:</strong> {dumpData.profile.address}</Text>
          <Text><strong>Email:</strong> {dumpData.profile.email}</Text>
        </View>
        <Text style={styles.heading}><strong>Academic</strong></Text>
        <View style={styles.styleDetailInfo}>
        <Text><strong>Major:</strong> {dumpData.academic.major}</Text>
        <Text><strong>Current term:</strong> {dumpData.academic.currentTerm}</Text>
        <Text><strong>Role number:</strong> {dumpData.academic.roleNumber}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerLayout: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 'x-large',
    color: COLOR.blue[1],
    marginLeft: '5px',
    marginTop: '15px',
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
    width: 100,
    aspectRatio: 1,
    borderRadius: '50%',
  },
  avatarInfo: {
      width: 150,
      marginLeft: 25,
      marginTop: 20,
  },
  styleDetailInfo: {
    marginLeft: 15
  }
});
