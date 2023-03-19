import {
  Button,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLOR } from '../../utils/color';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import jwtDecode from 'jwt-decode';
import Config from '../../../config';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: Config.EXPO_GOOGLE_CLIENT_ID,
    androidClientId: Config.ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: Config.iosClientId,
    prompt: 'select_account',
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const persistAuth = async () => {
        await AsyncStorage.setItem(
          '@accessToken',
          JSON.stringify(response.params.id_token)
        );
      };

      const setUserInfo = async (userInfo) => {
        await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
      };
      // console.log(response);

      persistAuth();
      const decoded = jwtDecode(response.params.id_token);

      setUserInfo(decoded);
      setToken(response.params.id_token);
    }
  }, [response]);

  useEffect(() => {
    if (token !== '') {
      loginSuccess();
    }
  }, [token]);

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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLOR.blue[2], COLOR.blue[3], COLOR.blue[5]]}
        className='absolute inset-0 flex-1'
      />
      <View className='relative items-center mt-10'>
        <View className='rounded-full relative'>
          <Image
            style={styles.hero1}
            source={require('../../../assets/hero1.png')}
          />
          {/* <View style={styles.bgHero1} /> */}
          <LinearGradient
            colors={['rgba(255, 153, 0, 1)', 'rgb(246, 157, 24)', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bgHero1}
            locations={[0, 0.5, 0.95]}
          />
        </View>

        <Image
          style={styles.hero2}
          source={require('../../../assets/hero2.png')}
        />
        <Image
          style={styles.hero3}
          source={require('../../../assets/hero3.png')}
        />
      </View>

      <View className='items-center mt-20'>
        <Pressable
          className='shadow-lg'
          style={styles.googleBtn}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            Sign in FPT education email
          </Text>
        </Pressable>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.blue[2],
  },
  googleBtn: {
    color: '#fff',
    backgroundColor: COLOR.blue[1],
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    bottom: -30,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.blue[5],
  },
  hero1: {
    height: 300,
    aspectRatio: 1,
    resizeMode: 'contain',
    zIndex: 5,
  },
  hero2: {
    height: 140,
    width: 140,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '-10%',
    right: 4,
  },
  hero3: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: '-5%',
  },
  bgHero1: {
    height: 250,
    width: 250,
    backgroundColor: '#333',
    borderRadius: 300 / 2,
    position: 'absolute',
    bottom: 0,
    left: 25,
    transform: [
      {
        rotate: '80deg',
      },
    ],
  },
});
