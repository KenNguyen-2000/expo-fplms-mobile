import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export class GroupService {
  static async getGroupList(classId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL + `/management/classes/${classId}/groups`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
