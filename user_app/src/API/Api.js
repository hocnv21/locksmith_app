import axios from 'axios';
import {Platform} from 'react-native';

const baseUrl =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

export const getLocksmithNearBy = async (long, lat) => {
  return new Promise(async (resolve, reject) => {
    try {
      const configurationObject = {
        method: 'get',
        url: `${baseUrl}/locksmith/location/find/${long}a${lat}`,
      };
      const response = await axios(configurationObject);
      //   const dataLocksmith = response.data.dada;
      resolve({
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
