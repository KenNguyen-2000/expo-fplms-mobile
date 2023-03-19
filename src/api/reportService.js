import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../config';

const getToken = async () => await AsyncStorage.getItem('@accessToken');

export default class ReportService {
  static async getCycleReports(classId, groupId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL + `/management/cycle-reports?groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  static async getCycleReportById(reportId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL + `/management/cycle-reports/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  static async feedbackCycleReport({ feedback, groupId, mark, reportId }) {
    const accessToken = await getToken();
    const res = await axios.put(
      Config.API_URL + `/management/cycle-reports/feedback`,
      { feedback, groupId, mark, reportId },
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

  static async getProgressReportById(reportId) {
    const accessToken = await getToken();
    const res = await axios.get(
      Config.API_URL + `/management/progress-reports/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }
}
