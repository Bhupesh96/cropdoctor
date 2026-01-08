import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StatusBar,
  Animated,
  LayoutAnimation,
  Easing,
  UIManager,
  Keyboard
} from 'react-native';

import {
  Smartphone,
  ArrowRight,
  ChevronLeft,
  Leaf,
  CheckCircle2,
  Sparkles,
  Wind // New icon for visual variety if needed, but we use Leaf mostly
} from 'lucide-react-native';

import getAdminApiList from '../../core/api/adminApiList';
import { HttpService } from '../../core/Services/HttpService';

const { width, height } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#4a7c2a',
  white: '#ffffff',
  textMain: '#111827',
  textSub: '#9CA3AF',
  glass: 'rgba(255, 255, 255, 0.95)',
  darkGlass: 'rgba(12, 24, 10, 0.75)', // Slightly darker for better contrast with fireflies
  accent: '#EAB308',
};

// --- 1. NEW COMPONENT: FALLING LEAF ---
// Leaves that fall from top, sway side-to-side, and rotate
const FallingLeaf = ({ delay, startX, scale }) => {
  const transY = useRef(new Animated.Value(-50)).current;
  const transX = useRef(new Animated.Value(startX)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 5000 + Math.random() * 4000;

    Animated.loop(
      Animated.parallel([
        // Fall down
        Animated.sequence([
          Animated.timing(transY, { toValue: -50, duration: 0, useNativeDriver: true }), // Reset
          Animated.delay(delay),
          Animated.timing(transY, {
            toValue: height * 0.55, // Stop around the middle/logo area
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ]),
        // Sway X
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(transX, {
            toValue: startX + 50, // Drift right
            duration: duration,
            useNativeDriver: true
          })
        ]),
        // Rotate
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(rotate, {
            toValue: 1, // 360deg
            duration: duration,
            useNativeDriver: true
          })
        ])
      ])
    ).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          { translateY: transY },
          { translateX: transX },
          { rotate: rotation },
          { scale: scale }
        ],
        opacity: 0.6
      }}
    >
      <Leaf size={24} color={COLORS.primary} fill={COLORS.primaryDark} />
    </Animated.View>
  );
};

// --- 2. NEW COMPONENT: BLINKING FIREFLY ---
// Dots that fade in/out and float gently
const Firefly = ({ delay, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const transY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Blinking effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1500, delay: delay, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.2, duration: 1500, useNativeDriver: true })
      ])
    ).start();

    // Floating effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(transY, { toValue: -30, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(transY, { toValue: 0, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY: transY }] }]} />
  );
};

// --- 3. NEW COMPONENT: ROTATING HALO ---
// Subtle rotating light behind the logo
const RotatingHalo = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 20000, // Very slow rotation
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const rotation = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.05)',
        borderStyle: 'dashed',
        transform: [{ rotate: rotation }]
      }}
    />
  );
}


const AuthScreen = ({ navigation }) => {
  const [stage, setStage] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Animation Refs
  const bgScale = useRef(new Animated.Value(1)).current;
  const formSlide = useRef(new Animated.Value(300)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(1)).current; // New ref for logo breathing
  const otpInputs = useRef([]);

  useEffect(() => {
    // 1. Ken Burns Background
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgScale, { toValue: 1.15, duration: 12000, useNativeDriver: true }),
        Animated.timing(bgScale, { toValue: 1, duration: 12000, useNativeDriver: true })
      ])
    ).start();

    // 2. Logo Breathing (New)
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, { toValue: 1.1, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(logoScale, { toValue: 1, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])
    ).start();

    // 3. Form Slide
    Animated.spring(formSlide, { toValue: 0, damping: 15, mass: 1, useNativeDriver: true, delay: 300 }).start();

    // 4. Button Pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(buttonPulse, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ).start();

    const kShow = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const kHide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { kShow.remove(); kHide.remove(); };
  }, []);

  /* --- LOGIC --- */
  const sendOtp = async () => {
    if (phoneNumber == '90') {
      setStage('otp');
    }
    if (phoneNumber.length < 10) { Alert.alert('Invalid Number', 'Please enter a 10-digit mobile number.'); return; }
    setLoading(true);

    try {
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
      const adminApiList = getAdminApiList();
      const payload = { mobile_number: phoneNumber, otp: randomOtp };
      await HttpService.get(adminApiList.farmerLoginSendOtp, payload);
      setGeneratedOtp(randomOtp);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setStage('otp');
    } catch (error) { Alert.alert('Error', 'Failed to send OTP.'); } finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) return;
    setLoading(true);
    try {
      const adminApiList = getAdminApiList();
      const payload = { mobile_number: phoneNumber, otp: generatedOtp, enteredOtp };
      const response = await HttpService.get(adminApiList.verifyFarmer, payload);
      if (response?.status == '200') { navigation.replace('Admin'); } else { Alert.alert('Invalid', 'Incorrect OTP.'); }
    } catch (error) { Alert.alert('Error', 'Server unreachable'); } finally { setLoading(false); }
  };

  const handleOtpChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;
    const newOtp = [...otp]; newOtp[index] = text; setOtp(newOtp);
    if (text && index < 3) otpInputs.current[index + 1].focus();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      // If the current field is empty and we are not in the first field
      if (otp[index] === '' && index > 0) {
        // Move focus to previous input
        otpInputs.current[index - 1].focus();
        
        // Optional: Clear the previous input value immediately for smoother deletion
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleBackToPhone = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setStage('phone'); setOtp(['', '', '', '']);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 1. BACKGROUND IMAGE */}
      <Animated.View style={[styles.bgContainer, { transform: [{ scale: bgScale }] }]}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000' }} // Night field
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* 2. OVERLAY & ATMOSPHERE */}
      <View style={styles.overlay}>

        {/* A. BLINKING FIREFLIES */}
        {[...Array(10)].map((_, i) => (
          <Firefly
            key={`fly-${i}`}
            delay={i * 800}
            style={{
              position: 'absolute',
              left: Math.random() * width,
              top: Math.random() * (height * 0.5), // Keep them in top half
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              borderRadius: 3,
              backgroundColor: COLORS.accent, // Gold color fireflies
              shadowColor: COLORS.accent,
              shadowOpacity: 0.8,
              shadowRadius: 10
            }}
          />
        ))}

        {/* B. FALLING LEAVES */}
        {[...Array(4)].map((_, i) => (
          <FallingLeaf
            key={`leaf-${i}`}
            delay={i * 1200}
            startX={Math.random() * width}
            scale={0.5 + Math.random() * 0.5}
          />
        ))}

      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* 3. LOGO SECTION */}
        <Animated.View style={[styles.logoArea, isKeyboardVisible && { flex: 0.4 }]}>

          {/* Rotating Halo behind Logo */}
          <RotatingHalo />

          {/* Breathing Logo */}
          <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }] }]}>
            <Leaf size={44} color="#fff" fill={COLORS.primary} />
            <View style={styles.glow} />
          </Animated.View>

          <Text style={styles.brandTitle}>CROP DOCTOR</Text>
          <View style={styles.taglineContainer}>
            <Sparkles size={12} color={COLORS.accent} />
            <Text style={styles.tagline}>Smart Farming Solutions</Text>
          </View>
        </Animated.View>

        {/* 4. BOTTOM SHEET FORM */}
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: formSlide }] }
          ]}
        >
          {/* Header */}
          <View style={styles.sheetHeader}>
            {stage === 'otp' && (
              <TouchableOpacity onPress={handleBackToPhone} style={styles.backBtn}>
                <ChevronLeft size={24} color={COLORS.textMain} />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.welcomeText}>
                {stage === 'phone' ? 'Hello, Kisan!' : 'Verify Code'}
              </Text>
              <Text style={styles.instructionText}>
                {stage === 'phone' ? 'Login to monitor your crops' : `OTP sent to +91 ${phoneNumber}`}
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formArea}>
            {stage === 'phone' ? (
              <View style={[
                styles.inputWrapper,
                phoneNumber.length === 10 && styles.inputWrapperActive
              ]}>
                <View style={styles.iconBox}>
                  <Smartphone size={20} color={phoneNumber.length === 10 ? COLORS.primaryDark : COLORS.textSub} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  selectionColor={COLORS.primaryDark}
                />
                {phoneNumber.length === 10 && (
                  <Animated.View entering={LayoutAnimation.Presets.spring}>
                    <CheckCircle2 size={20} color={COLORS.primaryDark} fill="#DCFCE7" />
                  </Animated.View>
                )}
              </View>
            ) : (
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                    style={[styles.otpInput, digit && styles.otpInputFilled]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>
            )}

            {/* Button */}
            <TouchableOpacity onPress={stage === 'phone' ? sendOtp : verifyOtp} disabled={loading}>
              <Animated.View style={[
                styles.primaryBtn,
                { transform: [{ scale: stage === 'phone' && phoneNumber.length === 10 ? buttonPulse : 1 }] }
              ]}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text style={styles.btnText}>{stage === 'phone' ? 'Get OTP' : 'Login'}</Text>
                    <ArrowRight size={20} color="white" strokeWidth={2.5} />
                  </>
                )}
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.safeAreaPadding} />
          </View>
          <View style={styles.bottomFiller} />
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  bgContainer: { ...StyleSheet.absoluteFillObject },
  backgroundImage: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.darkGlass
  },

  keyboardView: { flex: 1, justifyContent: 'flex-end' },

  logoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  logoCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    elevation: 20, shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 20
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    transform: [{ scale: 1.3 }],
    zIndex: -1,
  },
  brandTitle: {
    fontSize: 36, fontWeight: '900', color: 'white',
    letterSpacing: 1, textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10
  },
  taglineContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 10, backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  tagline: { color: '#F0FDF4', fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },

  // Bottom Sheet
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    minHeight: height * 0.45,
    shadowColor: '#000', shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 25,
    overflow: 'visible'
  },
  bottomFiller: {
    position: 'absolute', top: '100%', left: 0, right: 0,
    height: 1000, backgroundColor: 'white',
  },
  sheetHeader: { marginBottom: 30, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15, padding: 5 },
  welcomeText: { fontSize: 26, fontWeight: '800', color: COLORS.textMain },
  instructionText: { fontSize: 15, color: COLORS.textSub, marginTop: 6 },

  formArea: { gap: 24 },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F3F4F6', borderRadius: 16, height: 64,
    paddingHorizontal: 20, borderWidth: 1, borderColor: '#F3F4F6'
  },
  inputWrapperActive: {
    backgroundColor: '#fff', borderColor: COLORS.primaryDark,
    shadowColor: COLORS.primary, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2
  },
  iconBox: { marginRight: 14 },
  input: { flex: 1, fontSize: 18, color: COLORS.textMain, fontWeight: '600' },

  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  otpInput: {
    flex: 1, height: 64, backgroundColor: '#F3F4F6', borderRadius: 16,
    fontSize: 24, fontWeight: 'bold', textAlign: 'center',
    color: COLORS.textMain, borderWidth: 1, borderColor: 'transparent'
  },
  otpInputFilled: {
    backgroundColor: '#fff', borderColor: COLORS.primaryDark, color: COLORS.primaryDark,
    shadowColor: COLORS.primary, shadowOpacity: 0.1, shadowRadius: 4
  },

  primaryBtn: {
    height: 64, backgroundColor: COLORS.primaryDark,
    borderRadius: 16, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', gap: 12,
    shadowColor: COLORS.primaryDark, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8
  },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  safeAreaPadding: { height: 30 }
});