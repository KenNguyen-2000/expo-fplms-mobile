import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../utils/color';
import image from '../../images/SE160037.jpg';

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
            <Text>Pham Trong Thanh</Text>
            <Text>SE160037</Text>
          </View>
        </View>
        <Text style={styles.heading}>Profile</Text>
        <Text>Date of birth: {dumpData.profile.dob}</Text>
        <Text>Gender: {dumpData.profile.gender}</Text>
        <Text>Phone number: {dumpData.profile.phoneNumber}</Text>
        <Text>Address: {dumpData.profile.address}</Text>
        <Text>Email: {dumpData.profile.email}</Text>
        <Text style={styles.heading}>Academic</Text>
        <Text>Major: {dumpData.academic.major}</Text>
        <Text>Current term: {dumpData.academic.currentTerm}</Text>
        <Text>Role number: {dumpData.academic.roleNumber}</Text>
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
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    paddingTop: 25,
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
});
