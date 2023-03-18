import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLOR } from '../../utils/color';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  // console.log(IOS_GOOGLE_CLIENT_ID);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '241110768064-21b0fe5rkcpj2hl9t9o7eh6qerup8go6.apps.googleusercontent.com',
    iosClientId:
      '241110768064-p9s1248uop2nc89eqj7epbnrihsm7j7n.apps.googleusercontent.com',
    expoClientId:
      '241110768064-jboevjbkvqeo146drfmh6m217a1nt3sj.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View className='w-fit'>
      <Text className='text-xl font-bold'>LoginScreen</Text>
      <View className='bg-blue-300 w-fit'>
        <Button
          title='Login'
          color={'#333'}
          onPress={() => {
            navigation.navigate('Main', { name: 'Jane' });
          }}
        />
        {userInfo === null ? (
          <Button
            title='Sign in with Google'
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        ) : (
          <Text style={styles.text}>{userInfo.name}</Text>
        )}
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.blue[2],
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
