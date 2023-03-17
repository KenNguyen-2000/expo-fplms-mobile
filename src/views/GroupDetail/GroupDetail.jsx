import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const GroupDetail = ({ navigation }) => {
  return (
    <View>
      <Text>GroupDetail</Text>
      <Button
        title='Go to Profile'
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      />
    </View>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({});
