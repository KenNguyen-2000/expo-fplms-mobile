import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export class ClassService {
  static async getClassList() {
    const accessToken = await getToken();
    const res = await axios.get(Config.API_URL + '/management/classes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  }

  static async createNewClass({
    className,
    semesterCode,
    subjectId,
    enrollKey,
    cycleDuration,
  }) {
    const accessToken = await getToken();
    const res = await axios.post(
      Config.API_URL + '/management/classes',
      {
        name: className,
        semesterCode,
        subjectId,
        enrollKey,
        cycleDuration,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  static async deleteClass(classId) {
    const accessToken = await getToken();
    const res = await axios.delete(
      Config.API_URL + `/management/classes/${classId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
