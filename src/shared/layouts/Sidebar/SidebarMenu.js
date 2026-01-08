import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  SafeAreaView
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// Using Lucide Icons for the "Modern/AI" look to replace emojis visually
import { 
  Home, 
  MessageCircle, 
  ShoppingBag, 
  Sprout, 
  CloudSun, 
  LogOut, 
  ChevronRight,
  User,
  Settings,
  HelpCircle
} from 'lucide-react-native';

import AuthService from "../../../core/Services/AuthService";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// FIXED: Restored to 0.75 so it matches your parent component's animation logic
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75; 

/* ================= THEME COLORS (Matches Home Page) ================= */
const COLORS = {
  primaryDark: '#4a7c2a', // Dark Green
  headerStart: '#1a2e12', // Deep Green/Black
  background: '#ffffff',
  surface: '#f8fafc',
  textMain: '#111827',
  textSub: '#6b7280',
  activeBg: '#ecfccb',    // Light Green Highlight
  activeText: '#365314',  // Dark Green Text
  border: '#e2e8f0',
};

// --- CONTENT RESTORED EXACTLY AS PROVIDED ---
const menuSections = [
  {
    title: "CROP MANAGEMENT",
    items: [
      { id: 0, title: "Home", icon: "🧐", screen: "Dabhboard" },
      { id: 0, title: "Chats", icon: "💬", screen: "Chats" },
      { id: 0, title: "Marketplace", icon: "🏪", screen: "Marketplace" },
      { id: 0, title: "Advisory", icon: "👨🏻‍🏫", screen: "Advisory" },
    ]
  },
  {
    title: "TOOLS & RESOURCES",
    items: [
      { id: 6, title: "Weather Forecast", icon: "🌦️", screen: "Weather" },
    ]
  },
  {
    title: "SUPPORT",
    items: []
  },
  {
    title: "ABOUT US",
    items: []
  },
  {
    title: "",
    items: [
      { id: 16, title: "Logout", icon: "🚪", screen: "Logout" },
    ]
  },
];

// Helper to map your existing items to Modern Icons
// We ignore the emoji inside the data and render a Lucide icon instead
const getModernIcon = (title, color, size = 20) => {
  const t = title.toLowerCase();
  if (t.includes('home')) return <Home size={size} color={color} />;
  if (t.includes('chat')) return <MessageCircle size={size} color={color} />;
  if (t.includes('market')) return <ShoppingBag size={size} color={color} />;
  if (t.includes('advisory')) return <Sprout size={size} color={color} />;
  if (t.includes('weather')) return <CloudSun size={size} color={color} />;
  if (t.includes('logout')) return <LogOut size={size} color={color} />;
  return <HelpCircle size={size} color={color} />;
};

export default function SidebarMenu({ sidebarX }) {
  const navigation = useNavigation();
  const [activeItem, setActiveItem] = useState("Home");
  const [profileData, setProfileData] = useState(null);

  const handleLogoutPress = () => {
    Alert.alert(
      "Logout", 
      "Are you sure you want to logout?", 
      [
        { text: "Stay", style: "cancel" },
        {
          text: "Yes, Logout",
          onPress: async () => {
            await AuthService.logout();
            navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleMenuItemPress = (item) => {
    setActiveItem(item.title);
    if (item.screen === 'Logout') {
      handleLogoutPress();
      return;
    }
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error("Link error", err));
      return;
    }
    if (item.screen) navigation.navigate(item.screen);
  };

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarX }] }]}>
      
      {/* 1. Header Section - Matches Home Page Header */}
      <LinearGradient
        colors={[COLORS.headerStart, COLORS.primaryDark]} 
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        style={styles.profileHeader}
      >
        <SafeAreaView>
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                 <Text style={styles.avatarText}>
                   {profileData?.Emp_Name?.charAt(0) || 'K'}
                 </Text>
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {profileData?.Emp_Name || 'Welcome Farmer'}
              </Text>
              <Text style={styles.profileSubtitle}>View Profile</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* 2. Scrollable Menu */}
      <View style={styles.menuContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          {menuSections.map((section, idx) => {
            // Skip empty sections (logic from your original code structure)
            if (section.items.length === 0) return null;

            return (
              <View key={idx} style={styles.section}>
                {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
                
                {section.items.map((item) => {
                  const isActive = activeItem === item.title;
                  const isLogout = item.screen === "Logout";
                  
                  // Color logic
                  let iconColor = COLORS.textSub;
                  let textColor = COLORS.textMain;
                  let bgColor = 'transparent';

                  if (isActive) {
                    iconColor = COLORS.activeText;
                    textColor = COLORS.activeText;
                    bgColor = COLORS.activeBg;
                  } else if (isLogout) {
                    iconColor = '#ef4444';
                    textColor = '#ef4444';
                    bgColor = '#fef2f2'; // Light red bg for logout
                  }

                  return (
                    <TouchableOpacity
                      key={item.title + item.id}
                      activeOpacity={0.7}
                      onPress={() => handleMenuItemPress(item)}
                      style={[
                        styles.menuItem,
                        { backgroundColor: bgColor }
                      ]}
                    >
                      <View style={styles.menuItemContent}>
                        {/* We use getModernIcon to replace the emoji with a sleek icon */}
                        <View style={styles.iconBox}>
                          {getModernIcon(item.title, iconColor, 20)}
                        </View>
                        <Text style={[styles.menuItemText, { color: textColor, fontWeight: isActive ? '700' : '500' }]}>
                          {item.title}
                        </Text>
                      </View>
                      
                      {/* Active Indicator Arrow */}
                      {isActive && <ChevronRight size={16} color={COLORS.activeText} />}
                    </TouchableOpacity>
                  );
                })}
                
                {/* Subtle Divider */}
                {idx < menuSections.length - 1 && section.title !== "" && <View style={styles.divider} />}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>v2.1.0 • Built for Farmers</Text>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH, // Fixed to 0.75
    backgroundColor: COLORS.background,
    zIndex: 100,
    // Modern shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  
  // --- HEADER STYLES ---
  profileHeader: {
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomRightRadius: 30,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 3,
  },
  avatarCircle: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  profileSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // --- MENU STYLES ---
  menuContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ca3af',
    marginBottom: 8,
    marginLeft: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14, // Modern rounded corners
    marginBottom: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 24,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
    marginHorizontal: 10,
    opacity: 0.6,
  },

  // --- FOOTER STYLES ---
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  versionText: {
    fontSize: 11,
    color: COLORS.textSub,
    fontWeight: '500',
  }
});