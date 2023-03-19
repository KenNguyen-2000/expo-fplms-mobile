import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export default class ReportService {
  static async getCycleReports(classId, groupId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL +
        `/management/cycle-reports?classId=${classId}&groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
  static async getProgressReports(classId, groupId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL +
        `/management/progress-reports?classId=${classId}&groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
