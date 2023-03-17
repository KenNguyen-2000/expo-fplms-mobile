import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ClassListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ClassListScreen</Text>
      <Button
        title='Go to Group List'
        onPress={() => navigation.navigate('GroupList', { name: 'Jane' })}
      />
    </View>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({});
