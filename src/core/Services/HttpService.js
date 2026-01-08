import axios from "axios";
import * as Keychain from "react-native-keychain";
import qs from "qs";
import { API_BASE_URL } from '../../config/constants';
import { environment } from '../../../environments/environment.dev';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: environment.API_BASE_URL_data_get,
  // baseURL: environment.API_BASE_URL,
  timeout: 10000,
  // headers: {
  //   // Bearer token from localStorage (if available)
  //   Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
  //   'Content-Type': 'application/json',
  // }
});


// api.interceptors.request.use(async (config) => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials && credentials.password) {
//       config.headers.Authorization = `Bearer ${credentials.password}`;
//     }
//   } catch (error) {
//     console.warn("⚠️ Error reading token:", error);
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.warn("⚠️ Unauthorized - Token may be expired");
//       await Keychain.resetGenericPassword();
//       // Optionally navigate to login screen here
//     }
//     return Promise.reject(error);
//   }
// );



 

export const HttpService = {

  // get: async (path, params = {}) => {
  //   // console.log(path + params,'params');
  //   try {
  //     // const response = await api.get(test);
  //     const response = await api.get(path, { params });
  //     // console.log(response, "responseresponseresponseresponse")
  //     return response;
  //   } catch (error) {
  //     // console.error(`GET ${path} failed:`, error.response?.data || error.message);
  //     throw error.response?.data || error;
  //   }
  // },


get: async (path, params = {}) => {
  // console.log(params,'params', path, "path")
  try {
    let headers = {}; 
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Requesting ${path} with parameters:`, params);
    console.log(path,params, headers, "test")
    const response = await api.get(path, { params, headers });
    // console.log("Response:", response);
    return response;
  } catch (error) {
    // console.error(`GET ${path} failed:`, error.response?.data || error.message);
    console.error(`GET ${path} failed:`, error.response || error.message);
    throw error.response?.data || error;
  }
},




  post: async (path, data = {}) => {
    try {
      // console.log(path, "path")
      // console.log(path + data, 'params');
      // Check if data is FormData (for file uploads)
      const isFormData = data instanceof FormData;
      const config = {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/x-www-form-urlencoded" },
      };

      // Only stringify if not FormData
      const payload = isFormData ? data : qs.stringify(data);
      // console.log(path + payload, "payload")
      const response = await api.post(path, payload, config);
      // console.log(response, "responseresponse ok");
      return response;
    } catch (error) {
      // console.error(`POST ${path} failed:`, error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  put: async (path, data = {}) => {
    try {
      const response = await api.put(path, data);
      return response.data;
    } catch (error) {
      console.error(` PUT ${path} failed:`, error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  delete: async (path, params = {}) => {
    try {
      const response = await api.delete(path, { params });
      return response.data;
    } catch (error) {
      console.error(`❌ DELETE ${path} failed:`, error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },
};
