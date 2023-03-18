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
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'row',
    height: '120px',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '15px',
    marginBottom: '10px',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    boxShadow: '5px 10px 8px #888888',
  },
  img: {
    width: 100,
    aspectRatio: 1,
    borderRadius: '50%',
  },
  avatarInfo: {
      width: '150px',
      marginLeft: '25px',
      marginTop: '20px',
  },
  styleDetailInfo: {
    marginLeft: '15px'
  }
});
