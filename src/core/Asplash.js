
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* HEADER */}
        <LinearGradient
          colors={['#6366f1', '#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <Text style={styles.brand}>MOFINOW</Text>
          </View>
        </LinearGradient>

        {/* BODY */}
        <View style={styles.body}>
          <Text style={styles.welcome}>Welcome !</Text>

          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#8b5cf6', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
            <Text style={styles.outlineText}>Login</Text>
          </TouchableOpacity>

          {/* SOCIAL ICONS */}
          <View style={styles.socialRow}>
            <SocialButton color="#1DA1F2" icon="twitter" />
            <SocialButton color="#0A66C2" icon="linkedin" />
            <SocialButton color="#1877F2" icon="facebook" />
            <SocialButton color="#DB4437" icon="google" />
          </View>

          <Text style={styles.subText}>
            Sign in with another account
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* SOCIAL BUTTON */
const SocialButton = ({ color, icon }) => (
  <TouchableOpacity style={[styles.socialButton, { backgroundColor: color }]}>
    <FontAwesome name={icon} size={18} color="#fff" />
  </TouchableOpacity>
);

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '92%',
    height: '92%',
    backgroundColor: '#fff',
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 10,
  },
  header: {
    height: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  brand: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 3,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 30,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 40,
    color: '#1f2937',
  },
  primaryButton: {
    width: 280,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  outlineButton: {
    width: 280,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    marginBottom: 50,
  },
  outlineText: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 4,
  },
  subText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
