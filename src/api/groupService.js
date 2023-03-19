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

  static async createGroup({
    groupQuantity,
    memberQuantity,
    enrollTime,
    classId,
  }) {
    const accessToken = await getToken();
    const res = await axios.post(
      Config.API_URL + `/management/classes/${classId}/groups`,
      {
        classId: classId,
        enrollTime: enrollTime,
        groupQuantity: groupQuantity,
        memberQuantity: memberQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  static async deleteGroup(classId, groupId) {
    const accessToken = await getToken();
    const res = await axios.delete(
      Config.API_URL + `/management/classes/${classId}/groups/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
