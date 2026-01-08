import { HttpService } from '../Services/HttpService';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import getApiList from '../../student/config/Api/ApiList';
import getAdminApiList from '../api/adminApiList';
import SessionService from '../Services/SessionService';
import { Alert } from 'react-native';

const AuthService = {
  loginStudent: async (payload) => {
    // console.log("login payload", payload);
    try {
      const apiList = getApiList();
      const loginApi = apiList?.login;
      const response = await HttpService.post(loginApi, payload);
      // console.log("loginStudent response", response);
      // console.log("authservice response", response?.data.LoginResponse);

      if (response?.data?.LoginResponse) {
        let userData = {
          ...response?.data.LoginResponse,
          STUDENT_ID: payload?.STUDENT_ID,
        };
        console.log("sessionObject", userData);
        await Keychain.setGenericPassword(
          "session",
          JSON.stringify(userData),
          { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
        );

        // const currentSession = await SessionService.getSession();
        // console.log(currentSession,"currentSession")

        // await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
        // return {
        //   ...response?.data,
        //   loginTime: new Date().toISOString(),
        // };

        return response
      }
      Alert.alert("Login Failed", "Invalid credentials");
      return null;

    } catch (error) {
      Alert.alert("Login Failed", error?.message || "Something went wrong");
      // console.error("Login failed:", error?.message);
      throw error;
    }

  },


  loginFaculty: async (payload) => {
    // console.log("loginFaculty payload", payload);
    
    try {
      const adminApiList = getAdminApiList();
      const loginApi = adminApiList.login;
      const response = await HttpService.get(loginApi, payload);
      // console.log(response)
      // console.log(response?.data?.Result?.[0]?.Success === "1")
      if (response?.data?.Result?.[0]?.Success === "1") {
        let userData = {
          LoginDetail: response?.data?.LoginDetail
        };
        // console.log("sessionObject", userData);

        await Keychain.setGenericPassword(
          "session",
          JSON.stringify(userData),
          { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
        );

        return response;

        // get session code
        // try {
        //     const credentials = await Keychain.getGenericPassword();
        //     if (credentials && credentials.username === 'session') {
        //       const userData = JSON.parse(credentials.password);
        //       console.log(userData)
        //       return userData;
        //     } else {
        //       // No session found
        //       return null;
        //     }
        //   } catch (error) {
        //     console.error("Error getting session data:", error);
        //     return null;
        //   }



        // await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
        // return {
        //   ...response?.data,
        //   loginTime: new Date().toISOString(),
        // };
      }

      // Alert.alert("Login Failed", "Invalid credentials");
      // return null;

    } catch (error) {
      Alert.alert("Login Failed", error?.message || "Something went wrong");
      console.error("Login failed:", error?.message);
      throw error;
    }
  },





  logout: async () => {
    // console.log("ok reset")
    await Keychain.resetGenericPassword();
    await AsyncStorage.removeItem('userProfile');
    await AsyncStorage.clear();
  },

  getToken: async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  },

  verifyOtp: async (payload) => {
    // console.log(payload)
    const studentOTP = "8888";
    const facultyOTP = "9999";
    try {
      const response = {
        OTPValid: payload.OTP === dummyOTP,
        // studentDetails: {
        //   role: "IGKV",
        //   name: "IGKV Raipur",
        // },
      };
      if (!response || typeof response.OTPValid === "undefined") {
        const isValid = payload.OTP === dummyOTP;
        return {
          OTPValid: isValid,
          // studentDetails: {
          //   role: "student",
          //   name: "Static Test User",
          // },
        };
      }

      return response;
    } catch (error) {
      const isValid = payload.OTP === studentOTP || payload.OTP === facultyOTP;
      return {
        OTPValid: isValid,
        OTP: payload.OTP
        // studentDetails: {
        //   role: "student",
        //   name: "Offline Test User",
        // },
      };
    }
  },
};

export default AuthService;

