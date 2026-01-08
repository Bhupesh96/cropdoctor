import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
const SessionService = {
  getSession: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      // console.log(credentials,"credentials")
      if (credentials) {
        return JSON.parse(credentials.password);
      }
      // Fallback to AsyncStorage
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile !== null) {
        return JSON.parse(storedProfile);
      }

      return null;
    } catch (error) {
      console.error("Failed to get session:", error);
      return null;
    }
  },
  saveSession: async (data) => {
    try {
      // console.log("Saving session data:", data);  
      await Keychain.setGenericPassword(
        "session",
        JSON.stringify(data),
        { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
      );
      await AsyncStorage.setItem("userProfile", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  },
  clearSession: async () => {
    try {
      await Keychain.resetGenericPassword();
      await AsyncStorage.removeItem("userProfile");
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  },


  //get 
  getdecripsession: async () => {
    try {
      const cookiesData = await AsyncStorage.getItem('cookiesData');
      console.log(cookiesData);
      if (cookiesData) {
        const jsdata = JSON.parse(cookiesData);
        // console.log(jsdata, "jsdata");
        return jsdata;
      } else {
        console.log("No cookiesData found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving cookiesData:", error);
      return null;
    }
  }

};

export default SessionService;
