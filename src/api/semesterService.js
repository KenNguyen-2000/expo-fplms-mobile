import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export default class SemesterService {
  static async getSemesters() {
    const accessToken = await getToken();
    const res = await axios.get(Config.API_URL + `/management/semesters`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  }
}
