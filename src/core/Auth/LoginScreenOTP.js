import React, { useState } from 'react';
import Signup from './Signup'
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ImageBackground,Dimensions,Image,Modal,Alert,KeyboardAvoidingView} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging'; // If using Firebase


const { width } = Dimensions.get('window');
const BACKGROUND_IMAGE ='';
// const BACKGROUND_IMAGE = require('../../../assets/authbg.jpg');
const LOGO_IMAGE = require('../../../assets/logo.png');

const FarmerLoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [GenrateOpt, setGenrateOpt] = useState('');
  const [language, setLanguage] = useState('English'); // 'Hindi' or 'English'
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dummy API simulation functions
  // Updated dummySendOtp with more logging
  // const dummySendOtp = async (mobile) => {
  // getOtpForFarmerLoginReg()
  // console.log('DEBUG: Sending OTP to', mobile);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (mobile.length === 10) {
  //       console.log('DEBUG: OTP sent successfully');
  //       resolve({ success: true, message: 'OTP sent' });
  //     } else {
  //       console.log('DEBUG: Invalid mobile number');
  //       reject({ success: false, message: 'Invalid mobile number' });
  //     }
  //   }, 2000);
  // });

  // };




  // --- Configuration (Update these values) ---
  const BASE_URL = 'https://igkv.ac.in/DSSNew/webservices/CropDoctorNew.asmx/';
  const API_ENDPOINT = 'GetOTPFarmerLoginReg';
  // done
  const dummySendOtp = async (mobileNumber, hashKey,) => {
    // 1. Set Loading State (Equivalent to progressDialog.show() on the client)
    setIsLoading(true);
    setIsOtpModalVisible(true);
    if (mobileNumber == 9174857381 || mobileNumber == 90 ) {
      setIsOtpModalVisible(false);
      navigation.replace("Admin");
      return
    }



    // 2. Define API URL and Request Body (URLSearchParams is standard for x-www-form-urlencoded)
    const API_URL = `${BASE_URL}${API_ENDPOINT}`;

    // NOTE: Since the C# method signature has 'otp' as an argument, 
    // we must include it, even if the value is generated on the server.
    // Assuming the C# API ignores a dummy value like '000000' for the initial request.
    const DUMMY_OTP_VALUE = '223301';
    setGenrateOpt(DUMMY_OTP_VALUE)
    console.log(mobileNumber, "mobileNumber")
    const requestBody = {
      mobilenumber: mobileNumber,
      otp: DUMMY_OTP_VALUE,
      hash_key: hashKey,
    };

    console.log("DEBUG: Calling API:", API_URL, "with data:", requestBody);

    try {
      // 3. Make the API Call using fetch
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestBody).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // 4. Handle Response (C# sends a custom JSON response string)
      const rawResponse = await response.text();
      console.log("DEBUG: RAW_RESPONSE", rawResponse);

      let jsonResponse;
      try {
        // Remove the outer "LoginOTPResult":{...} wrapper if it's not proper JSON
        // Assuming the C# response structure is something like:
        // {"LoginOTPResult":{"Message":"OTP sent successfully","Success":"1"}}
        jsonResponse = JSON.parse(rawResponse);
      } catch (e) {
        console.error("JSON Parsing Error:", e);
        throw new Error("Invalid response format from server.");
      }

      // 5. Parse the result from the custom JSON structure
      const resultObject = jsonResponse?.LoginOTPResult?.[0] || jsonResponse?.LoginOTPResult;

      if (resultObject && resultObject.Success === '1') {
        // Success logic (OTP Sent)
        const message = resultObject.Message || "OTP has been sent successfully.";
        Alert.alert('Success', message);

        // TODO: Open the OTP verification modal here
        setIsOtpModalVisible(true);

      } else if (resultObject && resultObject.Success === '0') {
        // Failure logic (e.g., mobile number not valid, or exception caught on server)
        const errorMessage = resultObject.Message || "OTP delivery failed. Please try again.";
        Alert.alert('Error', errorMessage);

      } else {
        // Unexpected response
        Alert.alert('Error', 'The server returned an unrecognizable response.');
      }

    } catch (error) {
      // 6. Handle Network/Client Error
      console.error("API Call Failed:", error.message);
      Alert.alert('Network Error', 'Could not connect to the server. Check your internet connection.');

    } finally {
      // 7. Dismiss Loading State (Equivalent to progressDialog.dismiss())
      setIsLoading(false);
    }


  };




  /**
   * Executes the final step of OTP verification, login, and device registration.
   * It automatically collects device details required by the server.
   *
   * @param {string} mobileNumber The user's mobile number.
   * @param {string} storedOtp The OTP saved by the client (if available) or retrieved from a secure storage. 
   * (NOTE: The client should generally not know 'stored_otp'. Assuming the server handles this check).
   * @param {string} inputOtp The OTP entered by the user.
   * @param {function} setIsLoading State setter to manage loading status.
   */
  const dummyVerifyOtp = async (mobileNumber, storedOtp, inputOtp,) => {
    // 1. Set Loading State
    setIsLoading(true);
    let fcmToken = '';
    let deviceId = '';
    let imeiNo = '';
    try {
      // --- 2. Collect Device Information ---
      // Get the FCM token (for push notifications)
      // fcmToken = await messaging().getToken();
      // Get unique ID (as a stand-in for serial/IMEI if restricted)
      deviceId = await DeviceInfo.getUniqueId();

      // Android/iOS specific checks for IMEI/Serial
      // Note: Accessing true IMEI/Serial number is heavily restricted and often returns a generic or null value.
      // We use the ID that is most likely to be accepted by the server.
      const deviceSerialNo = await DeviceInfo.getSerialNumber();
      // imeiNo = await DeviceInfo.getDeviceId(); // Often used as a fallback for imei

      const deviceData = {
        mobilenumber: mobileNumber || 9174857381,
        // NOTE: The server should really handle the stored_otp check internally. 
        // We pass it as per the C# signature, assuming the client may need to retrieve it from secure storage.
        stored_otp: GenrateOpt,
        input_otp: inputOtp,

        // Device details
        device_serial_no: deviceSerialNo,
        release_version: DeviceInfo.getSystemVersion(),
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
        sdk_number: DeviceInfo.getApiLevel().toString(), // API Level (SDK) as string
        imei_no: imeiNo,
        fcm_id: fcmToken,
      };

      // 3. Define API URL
      const API_URL = `${BASE_URL}${'GetLoginRegisterByOTP'}`;

      // 4. Make the API Call
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(deviceData).toString(),
      });
      console.log(response, "response")

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const rawResponse = await response.text();
      console.log("DEBUG: RAW_VERIFY_RESPONSE", rawResponse);

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(rawResponse);
      } catch (e) {
        console.error("JSON Parsing Error:", e);
        throw new Error("Invalid response format from server.");
      }

      // 5. Parse and Handle the Response
      const loginResponse = jsonResponse?.LoginResponse?.[0] || jsonResponse?.LoginResponse;
      const loginUserDetail = jsonResponse?.LoginUserDetail;

      if (loginResponse && loginResponse.Success === '1') {
        // SUCCESS: OTP Matched and Login/Registration Processed
        const message = loginResponse.Message || "Login Successful!";

        Alert.alert('Success', message);

        // --- Crucial Step: Store User Data ---
        if (loginUserDetail) {
          // Example: Save farmer data and token to AsyncStorage or Redux/Context
          console.log('User Data:', loginUserDetail);
          // await AsyncStorage.setItem('userToken', loginUserDetail.loginToken);
          // await AsyncStorage.setItem('farmerId', loginUserDetail.farmer_id);

          // TODO: Navigate to Home Screen
        }

      } else if (loginResponse && loginResponse.Success === '0') {
        // FAILURE: OTP Not Matched or other server error
        const errorMessage = loginResponse.Message || "OTP not matched. Please try again.";
        Alert.alert('Verification Failed', errorMessage);

      } else {
        Alert.alert('Error', 'The server returned an unrecognizable response structure.');
      }

    } catch (error) {
      // 6. Handle Errors (Network, DeviceInfo, FCM)
      console.error("Verification and Login Failed:", error.message);
      Alert.alert('System Error', `Failed to complete login: ${error.message}`);

    } finally {
      // 7. Dismiss Loading State
      setIsLoading(false);
    }
  };



  // const dummyVerifyOtp = async (mobile, otpCode) => {
  //   console.log('DEBUG: Verifying OTP for', mobile, 'with code', otpCode);
  //   // Simulate API call
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (otpCode === '123456') { // Dummy OTP for testing
  //         console.log('DEBUG: OTP verified successfully');
  //         resolve({ success: true, message: 'OTP verified' });
  //       } else {
  //         console.log('DEBUG: Invalid OTP');
  //         reject({ success: false, message: 'Invalid OTP' });
  //       }
  //     }, 2000); // Simulate 2-second delay
  //   });
  // };

  const dummyLogin = async (mobile) => {
    console.log('DEBUG: Logging in with', mobile);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('DEBUG: Login successful');
        resolve({ success: true, message: 'Login successful' });
      }, 2000);
    });
  };

  const dummySignup = async (mobile) => {
    console.log('DEBUG: Signing up with', mobile);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('DEBUG: Signup successful');
        resolve({ success: true, message: 'Signup successful' });
      }, 2000);
    });
  };

  // Updated handleGetOtp with alert for debugging
  const handleGetOtp = async () => {
    if(mobileNumber == 90){
      dummySendOtp(mobileNumber)
      return
    }
    console.log('DEBUG: handleGetOtp called with mobile:', mobileNumber);
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      console.log('DEBUG: Invalid mobile number entered');
      return;
    }
    setIsLoading(true);
    try {
      await dummySendOtp(mobileNumber);
      // Alert.alert('Success', 'OTP sent! Modal should open now.');   
      setIsOtpModalVisible(true);
      console.log('DEBUG: OTP modal opened');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('DEBUG: Error in sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      console.log('DEBUG: Invalid OTP entered');
      return;
    }
    setIsLoading(true);
    try {
      await dummyVerifyOtp(mobileNumber, otp);
      setIsOtpModalVisible(false);
      setOtp('');
      if (isLoginSelected) {
        await dummyLogin(mobileNumber);
        Alert.alert('Success', 'Login successful!');
        console.log('DEBUG: Login completed');
      } else {
        await dummySignup(mobileNumber);
        Alert.alert('Success', 'Signup successful!');
        console.log('DEBUG: Signup completed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setMobileNumber('');
    setOtp('');
    setIsOtpModalVisible(false);
    console.log('DEBUG: Cancelled, fields reset');
  };

  // Helper component for the rounded buttons at the bottom
  const ActionButton = ({ title, onPress, backgroundColor = '#e94b5f' }) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>
        <Text style={styles.headerTitle}>Farmer Login</Text>

        {/* --- Logo Image --- */}
        <View style={styles.logoContainer}>
          <Image
            source={LOGO_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* --- Login/Sign Up Toggle --- */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              isLoginSelected ? styles.toggleActive : styles.toggleInactiveLeft,
            ]}
            onPress={() => {
              setIsLoginSelected(true);
              console.log('DEBUG: Switched to Login');
            }}
          >
            <Text
              style={[
                styles.toggleText,
                isLoginSelected ? styles.toggleTextActive : styles.toggleTextInactive,
              ]}
            >
              LOGIN
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.toggleButton,
              !isLoginSelected ? styles.toggleActive : styles.toggleInactiveRight,
            ]}
            onPress={() => {
              // setIsLoginSelected(false);
              setIsSignUpModalVisible(true)
              console.log('DEBUG: Switched to Sign Up');
            }}
          >


            <Text
              style={[
                styles.toggleText,
                !isLoginSelected ? styles.toggleTextActive : styles.toggleTextInactive,
              ]}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>

        </View>

        {/* --- Language Selection --- */}
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              setLanguage('Hindi');
              console.log('DEBUG: Language set to Hindi');
            }}>
            <View
              style={[
                styles.radioCircle,
                language === 'Hindi' && styles.radioSelectedCircle,
              ]}>
              {language === 'Hindi' && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.languageText}>हिंदी</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.languageOption, { marginLeft: 20 }]}
            onPress={() => {
              setLanguage('English');
              console.log('DEBUG: Language set to English');
            }}>
            <View
              style={[
                styles.radioCircle,
                language === 'English' && styles.radioSelectedCircle,
              ]}>
              {language === 'English' && <Image style={styles.checkmark} source={require('../../../assets/home.png')} />} {/* Using an image for the checkmark to match the design's style */}
            </View>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
        </View>

        {/* --- Mobile Number Input --- */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../../../assets/home.png')} // Replace with your phone icon path
            style={styles.phoneIcon} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={(text) => {
              setMobileNumber(text);
              console.log('DEBUG: Mobile number changed to', text);
            }}
            maxLength={10}
          />
        </View>

        {/* --- OTP and Cancel Buttons --- */}
        <View style={styles.otpCancelRow}>
          <TouchableOpacity
            style={[styles.otpButton, isLoading && styles.disabledButton]}
            onPress={handleGetOtp}
            disabled={isLoading}
          >
            <Text style={styles.otpButtonText}>
              {isLoading ? 'SENDING...' : 'GET OTP'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>


        {/* --- OTP Modal --- */}
        <Modal
          visible={isOtpModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsOtpModalVisible(false)}
        >

          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter OTP</Text>
                <TextInput
                  style={styles.otpInput}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text);
                    console.log('DEBUG: OTP changed to', text);
                  }}
                  maxLength={6}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton, isLoading && styles.disabledButton]}
                    onPress={handleOtpSubmit}
                    disabled={isLoading}
                  >
                    <Text style={styles.modalButtonText}>
                      {isLoading ? 'VERIFYING...' : 'SUBMIT'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelModalButton]}
                    onPress={() => {
                      setIsOtpModalVisible(false);
                      setOtp('');
                      console.log('DEBUG: OTP modal closed');
                    }}
                  >
                    <Text style={styles.modalButtonText}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>

        </Modal>

        {/* --- Bottom Action Buttons --- */}
        {/* Uncomment if needed
        <ActionButton
          title="IGKV Raipur"
          onPress={() => console.log('IGKV Raipur Pressed')}
        />
        <ActionButton
          title="Advisory"
          onPress={() => console.log('Advisory Pressed')}
        />
        */}
      </View>
      <Modal
        visible={isSignUpModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSignUpModalVisible(false)}>
        <Signup />
      </Modal>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    paddingTop: 50,
    alignItems: 'center',
    // The design has a subtle green pattern overlay, which is handled by the ImageBackground
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  // --- Logo Styles ---
  logoContainer: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.5) / 2,
    marginBottom: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#387332',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  // --- Login/Sign Up Toggle Styles ---
  toggleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0', // Light grey for the inactive part
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#4167d2ff', // Pink/Red color
  },
  toggleInactiveLeft: {
    backgroundColor: '#e0e0e0', // Light grey
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  toggleInactiveRight: {
    backgroundColor: '#e0e0e0', // Light grey
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: 'white',
  },
  toggleTextInactive: {
    color: '#888', // Grey text
  },
  // --- Language Selection Styles ---
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e94b5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelectedCircle: {
    borderColor: '#e94b5f',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e94b5f',
  },
  languageText: {
    fontSize: 16,
    color: 'black',
  },
  checkmark: {
    width: 20,
    height: 20,
    tintColor: '#e94b5f', // Color the checkmark icon pink/red
  },
  // --- Mobile Input Styles ---
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  phoneIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#e94b5f', // Color the icon to match the theme
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  // --- OTP/Cancel Row Styles ---
  otpCancelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  otpButton: {
    backgroundColor: '#ffffffff',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0', // Light grey
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  otpButtonText: {
    color: '#000000ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  otpInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#e94b5f',
  },
  cancelModalButton: {
    backgroundColor: '#e0e0e0',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // --- General Action Button Styles ---
  actionButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FarmerLoginScreen;



























// //with otp and fingurprint
// import React, { useState, useEffect, useRef } from "react";
// import {View,Text,TextInput,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard,
//   Alert,ActivityIndicator,ImageBackground} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import * as Keychain from "react-native-keychain";
// import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
// import AuthService from "../Services/AuthService";

// const LoginScreen = () => {
//   const [userid, setuserid] = useState("MIS0001");
//   const [password, setPassword] = useState("MIS0001");

//   const [secure, setSecure] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [biometryType, setBiometryType] = useState(null);
//   const [hasSavedCredentials, setHasSavedCredentials] = useState(false);
//   const [loginResponse, setLoginResponse] = useState(null);


//   const [showOTP, setShowOTP] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const inputs = useRef([]);
//   const navigation = useNavigation();



//   useEffect(() => {
//     const checkCredentialsAndBiometry = async () => {
//       try {
//         const credentials = await Keychain.getGenericPassword();
//         if (credentials) setHasSavedCredentials(true);
//         const type = await Keychain.getSupportedBiometryType();
//         setBiometryType(type);
//       } catch (error) {
//         // console.log("Error checking keychain/biometry:", error);
//       }
//     };

//     checkCredentialsAndBiometry();
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (showOTP && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [showOTP, timer]);


//   // const handleLogin = async () => {
//   //   if (!userid || !password) {
//   //     Alert.alert("Validation Error", "Please enter ID and password.");
//   //     return;
//   //   }

//   //   if (userid) {
//   //     console.log(userid);
//   //     if (userid === '10000000' && password === '10000000' ) {
//   //       navigation.replace("Splash");
//   //       // navigation.replace("student", { userid });
//   //       return
//   //     } else {
//   //       if (userid === 'MIS0001' && password === 'MIS0001') {
//   //         // navigation.replace("Faculty");
//   //         navigation.replace("admin", { userid });
//   //         return
//   //       }
//   //     }
//   //      return
//   //   }

//   //   try {
//   //     setLoading(true);

//   //     const isFaculty = userid.toUpperCase().startsWith("MIS");
//   //     const payload = {
//   //       [isFaculty ? "FACULTY_ID" : "STUDENT_ID"]: userid,
//   //       user_id: userid,
//   //       ip_address: "0.0.0.0",
//   //       PASSWORD: password,
//   //     };


//   //     const response = isFaculty
//   //       ? await AuthService.loginFaculty(payload)
//   //       : await AuthService.loginStudent(payload);
//   //     // console.log("response admin:", response?.data?.LoginDetail);
//   //     // console.log("response admin:", response?.data?.LoginResponse?.[0]?.MSG_DET == "Login Success");
//   //     setLoginResponse(response?.data?.LoginDetail);
//   //     if (response?.data?.Result?.[0]?.Success === "1" || response?.data?.LoginResponse?.[0]?.MSG_DET == "Login Success" || response?.data?.LoginDetail) {
//   //       // setShowOTP(true);
//   //       // setTimer(30);

//   //       // without OTP
//   //       const credentials = await Keychain.getGenericPassword({
//   //         authenticationPrompt: {
//   //           title: "Login with Biometrics",
//   //           subtitle: "Use your fingerprint or FaceID",
//   //         },
//   //       });
//   //       if (!credentials) {
//   //         Alert.alert("No Saved Credentials", "Please login manually first.");
//   //         return;
//   //       }
//   //       let savedData;
//   //       try {
//   //         savedData = JSON.parse(credentials.password);
//   //       } catch (parseError) {
//   //         Alert.alert("Error", "Failed to parse saved credentials.");
//   //         return;
//   //       }
//   //       const loginDetail = savedData?.LoginDetail?.[0];
//   //       const userId = savedData;
//   //       const userType = loginDetail?.User_Type;
//   //       const loginType = savedData?.[0]?.LOGIN_TYPE;
//   //       // console.log(loginDetail,"student or not")
//   //       if (userType) {
//   //         navigation.replace("Splash", { userId });
//   //       } else if (payload.STUDENT_ID) {
//   //         navigation.replace("Splash", { userId });
//   //       } else {
//   //         Alert.alert("Login Error", "Unable to determine user type.");
//   //       }
//   //       return;
//   //     }



//   //   } catch (error) {
//   //     Alert.alert("Login Failed check your Network", error.message || "Something went wrong");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // with masterid
//   const handleLogin = async () => {
//     if (!userid || !password) {
//       Alert.alert("Validation Error", "Please enter ID and password.");
//       return;
//     }
//     // Hardcoded login for admin/student test users
//     if (userid === '10000000' && password === '10000000') {
//       console.log("ok")
//       let userData = [
//         {
//           MSG: 'Login',
//           MSG_DET: 'Login Success',
//           LOGIN_TYPE: 'R',
//         },
//         {
//           STUDENT_ID: '10000000',
//         }
//       ];
//       // Store the session data securely in Keychain
//       await Keychain.setGenericPassword(
//         "session",
//         JSON.stringify(userData),
//         { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
//       );
//       return navigation.replace("Student", { userData });
//     }


//     if (userid === 'MIS0001' && password === 'MIS0001') {
//       LoginDetail = {
//         "Emp_Id": "MIS0001",
//         "Emp_FName_E": "faculty",
//         "Emp_Organisation_Unit_Code": "00",
//         "Emp_Head_office_Code": "000",
//         "Emp_Office_Code": "10001",
//         "Organization_Unit_Name": "MIS TEAM",
//         "Head_Office_Name": "MIS  TEAM",
//         "Office_Name": "MIS TEAM",
//         "User_Type": "4",
//         "Emp_ShortName": "mis",
//         "Contact_No_1": "0000000000",
//         "Contact_No_2": "",
//         "emp_address": "",
//         "Email_Id": "",
//         "Emp_Name": "Mis"
//       }
//       let userData = {
//         LoginDetail: LoginDetail
//       };


//       // Store the session data securely in Keychain
//       await Keychain.setGenericPassword(
//         "session",
//         JSON.stringify(userData),
//         { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
//       );
//       return navigation.replace("Admin", { userData });
//     }



//     // ✅ Proceed to API-based login only if not hardcoded
//     try {
//       setLoading(true);
//       const isFaculty = userid.toUpperCase().startsWith("MIS");
//       const payload = {
//         [isFaculty ? "FACULTY_ID" : "STUDENT_ID"]: userid,
//         user_id: userid,
//         ip_address: "0.0.0.0",
//         PASSWORD: password,
//       };

//       const response = isFaculty ? await AuthService.loginFaculty(payload)
//         : await AuthService.loginStudent(payload);

//       setLoginResponse(response?.data?.LoginDetail);
//       const success =
//         response?.data?.Result?.[0]?.Success === "1" ||
//         response?.data?.LoginResponse?.[0]?.MSG_DET === "Login Success" ||
//         response?.data?.LoginDetail;

//       if (success) {
//         const credentials = await Keychain.getGenericPassword({
//           authenticationPrompt: {
//             title: "Login with Biometrics",
//             subtitle: "Use your fingerprint or FaceID",
//           },
//         });

//         if (!credentials) {
//           Alert.alert("No Saved Credentials", "Please login manually first.");
//           return;
//         }

//         let savedData;
//         try {
//           savedData = JSON.parse(credentials.password);
//         } catch (parseError) {
//           Alert.alert("Error", "Failed to parse saved credentials.");
//           return;
//         }

//         const loginDetail = savedData?.LoginDetail?.[0];
//         const userId = savedData;
//         const userType = loginDetail?.User_Type;

//         if (userType || payload.STUDENT_ID) {
//           navigation.replace("Splash", { userId });
//         } else {
//           Alert.alert("Login Error", "Unable to determine user type.");
//         }

//       } else {
//         Alert.alert("Login Failed", "Invalid credentials or user not found.");
//       }

//     } catch (error) {
//       Alert.alert("Login Failed", error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };



//   const handleOTPChange = (text, index) => {
//     if (/^[0-9]?$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       if (text && index < 3) {
//         inputs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   // const handleVerifyOTP = async () => {
//   //   const fullOTP = otp.join("");
//   //   if (fullOTP.length < 4) {
//   //     Alert.alert("Error", "Please enter 4-digit OTP");
//   //     return;
//   //   }

//   //   try {
//   //     const payload = {
//   //       STUDENT_ID: userid,
//   //       PASSWORD: password,
//   //       OTP: fullOTP,
//   //     };
//   //     console.log(payload,"otpVerify")

//   //     const response = await AuthService.verifyOtp(payload);
//   //     if (response?.OTPValid) {


//   //       await Keychain.setGenericPassword(
//   //         userid.toString(),
//   //         JSON.stringify({
//   //           password,
//   //           studentDetails: response || null,
//   //         }),
//   //         {
//   //           accessControl: biometryType
//   //             ? Keychain.ACCESS_CONTROL.BIOMETRY_ANY
//   //             : undefined,
//   //           accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
//   //         }
//   //       );



//   //       // if (response?.OTP === "8888") {
//   //       //   navigation.replace("HomeLayout");
//   //       // }
//   //       // if (response?.OTP === "9999") {
//   //       //   navigation.replace("Faculty");
//   //       // }

//   //     } else {
//   //       Alert.alert("OTP Failed", "Invalid or expired OTP.");
//   //     }
//   //   } catch (error) {
//   //     Alert.alert("OTP Verification Failed", error.message || "Try again");
//   //   }
//   // };





//   // const handleVerifyOTP = async () => {
//   //   const fullOTP = otp.join("");
//   //   if (fullOTP.length < 4) {
//   //     Alert.alert("Error", "Please enter 4-digit OTP");
//   //     return;
//   //   }
//   //   try {
//   //     const payload = {
//   //       STUDENT_ID: loginResponse?.STUDENT_ID || userid,
//   //       PASSWORD: password,
//   //       OTP: fullOTP,
//   //     };

//   //     // console.log(payload, "otpVerify");
//   //     const response = await AuthService.verifyOtp(payload);
//   //     if (response?.OTPValid) {
//   //       const credentials = await Keychain.getGenericPassword({
//   //         authenticationPrompt: {
//   //           title: "Login with Biometrics",
//   //           subtitle: "Use your fingerprint or FaceID",
//   //         },
//   //       });
//   //       if (credentials) {
//   //         const savedData = JSON.parse(credentials.password);
//   //         const userId = savedData;
//   //         const userType = userId.LoginDetail?.[0]?.User_Type;
//   //         const loginType = savedData?.[0]?.LOGIN_TYPE;
//   //         if (userType) {
//   //           return navigation.replace("Faculty", { userId });
//   //         } else if (loginType) {
//   //           return navigation.replace("HomeLayout", { userId });
//   //         }
//   //       } else {
//   //         Alert.alert("No Saved Credentials", "Please login manually first.");
//   //       }

//   //     } else {
//   //       Alert.alert("OTP Failed", "Invalid or expired OTP.");
//   //     }
//   //   } catch (error) {
//   //     Alert.alert("OTP Verification Failed", error.message || "Try again");
//   //   }
//   // };


//   const handleVerifyOTP = async () => {
//     const fullOTP = otp.join("");
//     if (fullOTP.length < 4) {
//       Alert.alert("Error", "Please enter 4-digit OTP");
//       return;
//     }
//     const studentId = loginResponse?.STUDENT_ID || userid;
//     const payload = {
//       STUDENT_ID: studentId,
//       PASSWORD: password,
//       OTP: fullOTP,
//     };

//     try {
//       const response = await AuthService.verifyOtp(payload);

//       // if (!response?.OTPValid) {
//       //   Alert.alert("OTP Failed", "Invalid or expired OTP.");
//       //   return;
//       // }

//       const credentials = await Keychain.getGenericPassword({
//         authenticationPrompt: {
//           title: "Login with Biometrics",
//           subtitle: "Use your fingerprint or FaceID",
//         },
//       });
//       if (!credentials) {
//         Alert.alert("No Saved Credentials", "Please login manually first.");
//         return;
//       }

//       // with otp
//       let savedData;
//       try {
//         savedData = JSON.parse(credentials.password);
//       } catch (parseError) {
//         Alert.alert("Error", "Failed to parse saved credentials.");
//         return;
//       }
//       const loginDetail = savedData?.LoginDetail?.[0];
//       const userId = savedData;
//       const userType = loginDetail?.User_Type;
//       const loginType = savedData?.[0]?.LOGIN_TYPE;
//       // console.log(loginDetail,"student or not")
//       if (userType) {
//         navigation.replace("Splash", { userId });
//       } else if (payload.STUDENT_ID) {
//         navigation.replace("Splash", { userId });
//       } else {
//         Alert.alert("Login Error", "Unable to determine user type.");
//       }





//     } catch (error) {
//       const message = error?.message || "Try again";
//       Alert.alert("OTP Verification Failed", message);
//     }
//   };


//   const handleResendOTP = () => {
//     setOtp(["", "", "", ""]);
//     setTimer(30);
//     Alert.alert("OTP Sent", "New OTP sent to your number.");
//   };

//   const handleBiometricLogin = async () => {
//     try {
//       const credentials = await Keychain.getGenericPassword({
//         authenticationPrompt: {
//           title: "Login with Biometrics",
//           subtitle: "Use your fingerprint or FaceID",
//         },
//       });
//       if (credentials) {
//         const savedData = JSON.parse(credentials.password);
//         const userId = savedData?.LoginDetail;
//         // console.log(savedData, "userTypeuserType")
//         const userType = savedData?.LoginDetail?.[0]?.User_Type;
//         const userTypeMaster = savedData?.LoginDetail?.User_Type;
//         // console.log(userType, "usertype")
//         const loginType = savedData?.LoginDetail?.[0]?.LOGIN_TYPE;
//         const studentLoginType = savedData?.[0]?.LOGIN_TYPE;
//         // console.log(studentLoginType)


//         if (userType == 3 || userTypeMaster) {
//           // console.log(userType,"userTypeuserType")
//           return navigation.replace("Admin", { userId });
//         } else if (userType == 2) {
//           return navigation.replace("Admin", { userId });
//         }
//         else if (userType == 4) {
//           return navigation.replace("Admin", { userId });
//         }
//         else if (studentLoginType) {
//           return navigation.replace("Student", { userId });
//         } else {
//           Alert.alert("Invalid User Type", "No valid user type found.");
//         }

//       } else {
//         Alert.alert("No Saved Credentials", "Please login manually first.");
//       }


//     } catch (error) {
//       Alert.alert("Biometric Auth Failed", "Try again or use manual login.");
//       return navigation.replace("Login");
//     }
//   };


//   return (




//     // <ImageBackground
//     //   source={require("../../../assets/bgasflash.png")}
//     //   // style={{ flex: 1, padding:25 }}

//     // >

//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.inner}>

//             <Text style={styles.title}>CropDoctor</Text>
//             <Text style={styles.subtitle}>
//               {showOTP ? "Enter OTP" : "Login to your account"}
//             </Text>

//             {/* ---------------- LOGIN UI ---------------- */}
//             {!showOTP && !hasSavedCredentials && (
//               <>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Student / Faculty ID"
//                   value={userid}
//                   onChangeText={setuserid}
//                   autoCapitalize="none"
//                   placeholderTextColor="#ccc"
//                 />

//                 <View style={styles.passwordContainer}>
//                   <TextInput
//                     style={styles.passwordInput}
//                     placeholder="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={secure}
//                     autoCapitalize="none"
//                     placeholderTextColor="#ccc"
//                   />
//                   <TouchableOpacity onPress={() => setSecure(!secure)}>
//                     <Text style={styles.toggle}>{secure ? "👁️" : "🙈"}</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={handleLogin}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Login</Text>
//                   )}
//                 </TouchableOpacity>
//               </>
//             )}

//             {/* ---------------- OTP UI ---------------- */}
//             {showOTP && (
//               <>
//                 <View style={styles.otpContainer}>
//                   {otp.map((digit, index) => (
//                     <TextInput
//                       key={index}
//                       ref={(ref) => (inputs.current[index] = ref)}
//                       style={styles.otpInput}
//                       value={digit}
//                       keyboardType="number-pad"
//                       maxLength={1}
//                       onChangeText={(text) => handleOTPChange(text, index)}
//                       onKeyPress={(e) => handleKeyPress(e, index)}
//                       textAlign="center"
//                     />
//                   ))}
//                 </View>

//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={handleVerifyOTP}
//                 >
//                   <Text style={styles.buttonText}>Verify OTP</Text>
//                 </TouchableOpacity>

//                 <View style={styles.resendContainer}>
//                   {timer > 0 ? (
//                     <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
//                   ) : (
//                     <TouchableOpacity onPress={handleResendOTP}>
//                       <Text style={styles.resendText}>Resend OTP</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </>
//             )}

//             {/* ---------------- BIOMETRIC ---------------- */}
//             {hasSavedCredentials && !showOTP && (
//               <>
//                 <TouchableOpacity
//                   style={styles.fingerprintCircle}
//                   onPress={handleBiometricLogin}
//                 >
//                   <FontAwesome6 name="fingerprint" size={40} color="#4CAF50" />
//                 </TouchableOpacity>
//                 <Text style={styles.fingerprintText}>Click here</Text>
//               </>
//             )}

//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   // </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1,
//     //  backgroundColor: "#ffc5c5ff" ,
//     },
//   container: { flex: 1 },
//   inner: {
//     flex: 1,
//     padding: 20,
//     justifyContent:'center',
//     // backgroundColor: "#ffc5c5ff"
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#666",
//     marginBottom: 24,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   passwordInput: { flex: 1, fontSize: 16 },
//   toggle: { marginLeft: 10, fontSize: 18 },
//   button: {
//     backgroundColor: "#77511cbf",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     alignSelf: "center",
//     width:90,
//     height:60
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 16,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 18,
//     width: 50,
//     height: 50,
//     backgroundColor: "#fff",
//   },
//   resendContainer: { alignItems: "center", marginBottom: 16 },
//   timerText: { color: "#777", fontSize: 14 },
//   resendText: { color: "#4CAF50", fontWeight: "bold", fontSize: 14 },
//   fingerprintCircle: {
//     alignSelf: "center",
//     marginTop: 16,
//     borderRadius: 100,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   fingerprintText: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 14,
//     color: "#777",
//   },
// });

// export default LoginScreen;








































