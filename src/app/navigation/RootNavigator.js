import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../../shared/SplashScreen/SplashScreen";
import LoginScreen from "../../core/Auth/Loginnodeotp";
// import LoginScreen from "../../core/Auth/LoginWithNode";
import SignUpScreen from "../../core/Auth/SignUpScreen";
import AuthLoadingScreen from "../../shared/Services/AuthLoadingScreen";
import ImageInput from "../../core/Services/imageinput/ImageInput";
import ProfileImageTest from "../../core/Services/imageinput/ProfileImageTest";

import HomeScreen from "../../features/Home/HomeScreen";
import Dabhboard from "../../features/Home/Dabhboard";
import Chats from "../../features/chats/Chats";
import Advisory from "../../features/expertAdviser/Advisory";
import AdvisoryDetails from "../../features/expertAdviser/AdvisoryDetails";
import Marketplace from "../../features/marketplace & custom hire/Marketplace";
import CropsDoctor from "../../features/CropsDoctor/CropsDoctor";
import CropsDoctorDetails from "../../features/CropsDoctor/CropsDoctorDetails";
import ProblemPrescription from "../../features/CropsDoctor/ProblemPrescription";
import ProductDetails from "../../features/marketplace & custom hire/ProductDetails";
import Weather from "../../features/weather/Weather";
import CropScann from "../../features/CropsDoctor/CropScann";
import Profile from "../../features/Profile/Profile";
const DEV_SKIP_AUTH = false;
// Create Stack Navigators
const AuthStack = createNativeStackNavigator();
const FarmerStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthLoading">
    <AuthStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

// Farmer Navigator
const FarmerNavigator = () => (
  <FarmerStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeLayout">
    <FarmerStack.Screen name="HomeLayout" component={HomeLayout} />
  </FarmerStack.Navigator>
);

// Admin Navigator
const AdminNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
    {/* <AdminStack.Screen name="AdminHomeLayout" component={AdminHomeLayout} /> */}
    <AdminStack.Screen name="HomeScreen" component={HomeScreen} />
    <AdminStack.Screen name="Dabhboard" component={Dabhboard} />
    <AdminStack.Screen name="Chats" component={Chats} />
    <AdminStack.Screen name="Advisory" component={Advisory} />
    <AdminStack.Screen name="AdvisoryDetails" component={AdvisoryDetails} />
    <AdminStack.Screen name="Marketplace" component={Marketplace} />
    <AdminStack.Screen name="ProductDetails" component={ProductDetails} />
    <AdminStack.Screen name="CropScann" component={CropScann} />
    <AdminStack.Screen name="CropsDoctor" component={CropsDoctor} />
    <AdminStack.Screen name="CropsDoctorDetails" component={CropsDoctorDetails} />
    <AdminStack.Screen name="ProblemPrescription" component={ProblemPrescription} />
    <AdminStack.Screen name="Weather" component={Weather} />
    <AdminStack.Screen name="ImageInput" component={ImageInput} />
    <AdminStack.Screen name="Profile" component={Profile} />
  </AdminStack.Navigator>
);

// Root Navigator (Handles routing based on user role)
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>

        {DEV_SKIP_AUTH ? (
          // 🔥 Direct entry for development
          <RootStack.Screen name="Admin" component={AdminNavigator} />
        ) : (
          // 🔐 Normal auth flow
          <>
            <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="Admin" component={AdminNavigator} />
          </>
        )}

      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

