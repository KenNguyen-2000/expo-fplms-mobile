import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLOR } from '../../utils/color';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '241110768064-o5spvgck701jdjjnvltnjs3tv9n2242j.apps.googleusercontent.com',
    androidClientId:
      '241110768064-21b0fe5rkcpj2hl9t9o7eh6qerup8go6.apps.googleusercontent.com',
    iosClientId:
      '241110768064-p9s1248uop2nc89eqj7epbnrihsm7j7n.apps.googleusercontent.com',
    prompt: 'select_account',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response);

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          '@accessToken',
          JSON.stringify(response.authentication.accessToken)
        );
      };
      persistAuth();
      getUserInfo(JSON.stringify(response.authentication.accessToken));
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem('@userInfo', JSON.stringify(user));
      loginSuccess();
    } catch (error) {
      // Add your own error handler here
    }
  };

  const loginSuccess = () => navigation.navigate('Main');

  const logout = async () => {
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
  };

  return (
    <View className='w-fit'>
      <Text className='text-xl font-bold'>LoginScreen</Text>
      <View className='bg-blue-300 w-fit'>
        <Button
          title='Sign in with Google'
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
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
    fontWeight: 600,
  },
});
