import React, { useRef, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image,
  SafeAreaView, StatusBar, Dimensions, FlatList, Animated, Platform
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

// --- ICONS ---
import { 
  Search, Bell, CloudRain, Phone, MessageCircle, 
  Home, Sprout, Users, Settings, Tractor, Store, 
  Megaphone, Bot, CloudSun, Droplets, FlaskConical, 
  Truck, Wallet, ShieldCheck, Leaf, Warehouse, 
  GraduationCap, Bug, TrendingUp, Sun, Video, 
  MapPin, Scan, BookOpen, Calendar, ArrowRight, Filter
} from 'lucide-react-native';
import Header from '../../shared/layouts/Header/Header';

const { width } = Dimensions.get('window');

// --- MODERN THEME (Emerald & Slate) ---
const THEME = {
  primary: '#059669',       // Emerald 600
  primaryLight: '#D1FAE5',  // Emerald 100
  primaryDark: '#065F46',   // Emerald 800
  background: '#F1F5F9',    // Slate 100
  surface: '#FFFFFF',       // White
  textMain: '#0F172A',      // Slate 900
  textSub: '#64748B',       // Slate 500
  accent: '#3B82F6',        // Blue
  danger: '#EF4444',        // Red
  border: '#E2E8F0',        // Slate 200
};

// --- HELPER: Icon Map ---
const getServiceIcon = (iconName, color, size) => {
  const props = { color, size };
  switch (iconName) {
    case 'tractor': return <Tractor {...props} />;
    case 'shop': return <Store {...props} />;
    case 'bullhorn': return <Megaphone {...props} />;
    case 'robot': return <Bot {...props} />;
    case 'cloud-sun': return <CloudSun {...props} />;
    case 'line-chart': return <TrendingUp {...props} />;
    default: return <Sprout {...props} />;
  }
};

// --- DATA (RESTORED HINDI) ---
const servicesData = [
  { id: '1', icon: 'tractor', title: 'किराया', sub: 'मशीनरी', bgColor: '#DCFCE7', iconColor: '#15803D' },
  { id: '2', icon: 'shop', title: 'ई-हाट', sub: 'बाज़ार', bgColor: '#DBEAFE', iconColor: '#1D4ED8' },
  { id: '3', icon: 'bullhorn', title: 'योजनाएं', sub: 'सब्सिडी', bgColor: '#F3E8FF', iconColor: '#7E22CE' },
  { id: '4', icon: 'robot', title: 'कृषि-AI', sub: 'सहायक', bgColor: '#FFEDD5', iconColor: '#C2410C' },
  { id: '5', icon: 'cloud-sun', title: 'मौसम', sub: 'पूर्वानुमान', bgColor: '#E0F2FE', iconColor: '#0284C7' },
  { id: '16', icon: 'line-chart', title: 'मंडी भाव', sub: 'लाइव दरें', bgColor: '#FCE7F3', iconColor: '#BE185D' },
];

const expertsData = [
  { id: '1', name: 'डॉ. रमेश गुप्ता', role: 'फसल विशेषज्ञ', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '2', name: 'डॉ. अनीता सिंह', role: 'मृदा वैज्ञानिक', img: 'https://randomuser.me/api/portraits/women/45.jpg' },
  { id: '3', name: 'डॉ. विक्रम मेहरा', role: 'कीट विज्ञानी', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '4', name: 'डॉ. सारा खान', role: 'बागवानी', img: 'https://randomuser.me/api/portraits/women/32.jpg' },
];

// --- COMPONENTS ---

const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
      <Text style={styles.seeAllText}>View All</Text>
      <ArrowRight size={14} color={THEME.primary} />
    </TouchableOpacity>
  </View>
);

const ServiceCard = ({ item }) => (
  <TouchableOpacity style={styles.serviceCard} activeOpacity={0.8}>
    <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
      {getServiceIcon(item.icon, item.iconColor, 20)}
    </View>
    <View style={styles.serviceInfo}>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceSub}>{item.sub}</Text>
    </View>
  </TouchableOpacity>
);

const ExpertCard = ({ item }) => (
  <TouchableOpacity style={styles.expertCard} activeOpacity={0.9}>
    <View style={styles.expertImgWrapper}>
        <Image source={{ uri: item.img }} style={styles.expertImg} />
        <View style={styles.onlineIndicator} />
    </View>
    <Text style={styles.expertName} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.expertRole} numberOfLines={1}>{item.role}</Text>
    
    <View style={styles.expertActions}>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]}>
        <Phone size={14} color="#3B82F6" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ECFDF5' }]}>
        <MessageCircle size={14} color="#059669" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// --- HOME SCREEN ---
function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <Header gradientColors={['#1a2e12', '#4a7c2a']} />
    
      
      {/* 1. Header (Clean & Minimal) */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.headerBar}>
          <View style={styles.userInfo}>
             <View style={styles.avatarWrap}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
             </View>
             <View>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.username}>Kishan Kumar</Text>
             </View>
          </View>
          {/* <TouchableOpacity style={styles.iconBtn}>
             <Bell size={20} color={THEME.textMain} />
             <View style={styles.badge} />
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* 2. Floating Search Pill */}
        <View style={styles.searchWrapper}>
            <View style={styles.searchBar}>
                <Search size={18} color={THEME.textSub} />
                <TextInput 
                    placeholder="Search crops, seeds, news..." 
                    placeholderTextColor="#94A3B8"
                    style={styles.searchInput}
                />
                <View style={styles.searchDivider} />
                <TouchableOpacity>
                    <Filter size={18} color={THEME.primary} />
                </TouchableOpacity>
            </View>
        </View>

        {/* 3. Hero Card (Modern Gradient) */}
        <View style={styles.heroContainer}>
            <LinearGradient 
                colors={[THEME.primary, THEME.primaryDark]} 
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                style={styles.heroCard}
            >
                {/* Decorative Elements */}
                <View style={[styles.circle, { top: -30, right: -30, width: 120, height: 120 }]} />
                <View style={[styles.circle, { bottom: -50, left: 10, width: 180, height: 180 }]} />
                
                <View style={styles.heroContent}>
                    <View style={styles.alertBadge}>
                        <CloudRain size={12} color="white" />
                        <Text style={styles.alertText}>WEATHER ALERT</Text>
                    </View>
                    <Text style={styles.heroTitle}>Heavy Rain Expected</Text>
                    <Text style={styles.heroDesc}>Protect harvested crops today.</Text>
                    
                    <TouchableOpacity style={styles.heroBtn}>
                        <Text style={styles.heroBtnText}>Check Forecast</Text>
                        <ArrowRight size={14} color={THEME.primaryDark} />
                    </TouchableOpacity>
                </View>
                <CloudRain size={90} color="rgba(255,255,255,0.15)" style={styles.heroBgIcon} />
            </LinearGradient>
        </View>

        {/* 4. Services Grid */}
        <SectionHeader title="Services" />
        <View style={styles.gridContainer}>
            {servicesData.map((item) => <ServiceCard key={item.id} item={item} />)}
        </View>

        {/* 5. Experts Horizontal List */}
        <SectionHeader title="Consult Experts" />
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={expertsData}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.expertList}
            renderItem={({item}) => <ExpertCard item={item} />}
        />

      </ScrollView>
    </View>
  );
}

// Dummy Screen
const PlaceholderScreen = ({ name }) => (
  <View style={styles.centerScreen}>
    <Text style={styles.placeholderText}>{name}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          switch (route.name) {
            case 'Home': IconComponent = Home; break;
            case 'Farm': IconComponent = Sprout; break;
            case 'Community': IconComponent = Users; break;
            case 'Profile': IconComponent = Settings; break;
            default: IconComponent = Home;
          }
          return (
            <View style={[styles.iconCircle, focused && styles.iconCircleActive]}>
                <IconComponent 
                    size={22} 
                    color={focused ? 'white' : THEME.textSub} 
                    strokeWidth={focused ? 2.5 : 2} 
                />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Farm" component={() => <PlaceholderScreen name="Farm" />} />
      <Tab.Screen name="Community" component={() => <PlaceholderScreen name="Community" />} />
      <Tab.Screen name="Profile" component={() => <PlaceholderScreen name="Profile" />} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.background },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.background },
  placeholderText: { color: THEME.textMain, fontWeight: 'bold' },

  // --- HEADER ---
  safeHeader: { backgroundColor: THEME.background },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarWrap: { 
    padding: 2, 
    backgroundColor: 'white', 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: THEME.border,
    marginRight: 12,
    elevation: 1
  },
  avatar: { width: 40, height: 40, borderRadius: 16 },
  greeting: { fontSize: 12, color: THEME.textSub, fontWeight: '500' },
  username: { fontSize: 16, color: THEME.textMain, fontWeight: '800' },
  iconBtn: {
    width: 42, height: 42,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: THEME.border,
    elevation: 2, shadowColor: THEME.shadowColor, shadowOpacity: 0.05, shadowRadius: 5
  },
  badge: {
    position: 'absolute', top: 11, right: 11,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: THEME.danger,
    borderWidth: 1.5, borderColor: 'white'
  },

  // --- SEARCH ---
  searchWrapper: { paddingHorizontal: 20, marginBottom: 25 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'white',
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1, borderColor: THEME.border,
    elevation: 3, shadowColor: THEME.shadowColor, shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: THEME.textMain },
  searchDivider: { width: 1, height: 20, backgroundColor: THEME.border, marginHorizontal: 10 },

  // --- HERO ---
  heroContainer: { paddingHorizontal: 20, marginBottom: 30 },
  heroCard: {
    borderRadius: 26,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    elevation: 8, shadowColor: THEME.primary, shadowOpacity: 0.4, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: { zIndex: 1 },
  alertBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 8, alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  alertText: { color: 'white', fontSize: 10, fontWeight: '800', marginLeft: 6, letterSpacing: 0.5 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: 'white', marginBottom: 6 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginBottom: 20, lineHeight: 20 },
  heroBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12, alignSelf: 'flex-start',
    flexDirection: 'row', alignItems: 'center', gap: 6,
    elevation: 2
  },
  heroBtnText: { color: THEME.primaryDark, fontWeight: '700', fontSize: 13 },
  heroBgIcon: { position: 'absolute', right: 20, bottom: 20, transform: [{ rotate: '-10deg' }] },

  // --- SECTIONS ---
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 15
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: THEME.textMain },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center' },
  seeAllText: { fontSize: 13, color: THEME.primary, fontWeight: '600', marginRight: 4 },

  // --- GRID ---
  gridContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 20, justifyContent: 'space-between',
    marginBottom: 15
  },
  serviceCard: {
    width: (width - 55) / 2, 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: THEME.border,
    elevation: 2, shadowColor: THEME.shadowColor, shadowOpacity: 0.05, shadowRadius: 5
  },
  iconContainer: {
    width: 44, height: 44,
    borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12
  },
  serviceInfo: { flex: 1 },
  serviceTitle: { fontSize: 13, fontWeight: '700', color: THEME.textMain },
  serviceSub: { fontSize: 11, color: THEME.textSub, marginTop: 2 },

  // --- EXPERTS ---
  expertList: { paddingLeft: 20, paddingRight: 10 },
  expertCard: {
    width: 140,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1, borderColor: THEME.border,
    elevation: 2, shadowColor: THEME.shadowColor, shadowOpacity: 0.05, shadowRadius: 5,
    marginBottom: 5
  },
  expertImgWrapper: { position: 'relative', marginBottom: 10 },
  expertImg: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#f1f5f9' },
  onlineIndicator: {
    position: 'absolute', bottom: 0, right: 0,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2, borderColor: 'white'
  },
  expertName: { fontSize: 13, fontWeight: '700', color: THEME.textMain, textAlign: 'center' },
  expertRole: { fontSize: 11, color: THEME.textSub, textAlign: 'center', marginBottom: 12 },
  expertActions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    width: 32, height: 32, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },

  // --- TAB BAR ---
  tabBar: {
    position: 'absolute',
   
    height: 60,
   
    backgroundColor: '#FFFFFF',
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    elevation: 10, shadowColor: '#0F172A', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 5 },
    borderWidth: 1, borderColor: THEME.border,
    paddingBottom: 0 // Override default padding
  },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    bottom: "50%",
  },
  iconCircleActive: {
    backgroundColor: THEME.primary,
    elevation: 4, shadowColor: THEME.primary, shadowOpacity: 0.3, shadowRadius: 6,
  },
});