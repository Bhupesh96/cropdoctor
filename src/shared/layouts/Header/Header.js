import React, { useState, useRef } from 'react';
import {View,StyleSheet,TouchableOpacity,Text,StatusBar,Dimensions,Animated,} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Added Gradient
import colors from '../../theme/colors';
import AdminSidemenu from "../Sidebar/SidebarMenu";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

export default function Header({ title, gradientColors }) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const insets = useSafeAreaInsets();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: isSidebarOpen ? -SIDEBAR_WIDTH : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarOpen(!isSidebarOpen);
  };

  // const defaultGradient = [colors.primary || '#4c669f', colors.secondary || '#3b5998', '#192f6a'];
  const defaultGradient = ['#032663ff' || '#032663ff', colors.secondary || '#2575fc',  '#032663ff'];

  const activeGradient = gradientColors || defaultGradient;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Sidebar */}
      <AdminSidemenu sidebarX={slideAnim} />

      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}

      {/* Modern Gradient Header */}
      <LinearGradient
        colors={activeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientContainer, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          {/* Left Icon: Back or Menu */}
          <View style={styles.iconContainer}>
            {canGoBack ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.actionButton}>
                <FontAwesome6 name="chevron-left" size={20} color={colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleSidebar} style={styles.actionButton}>
                <FontAwesome6 name="bars-staggered" size={22} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>

          {/* Title with Letter Spacing */}
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title || 'Crop Doctor 2.0'}
          </Text>

          {/* Right Icon: Notification */}
          <View style={styles.iconContainer}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Notification')}
                style={styles.actionButton}>
              <FontAwesome6 name="bell" size={22} color={colors.white} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerContent: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism effect
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  notificationDot: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4B4B', // High contrast red
    borderWidth: 2,
    borderColor: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 15,
  },
});