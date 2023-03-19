import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export default class StudentService {
  static async getStudentById(accessToken, studentId) {
    const res = await axios.get(
      Config.API_URL + `/management/students/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
