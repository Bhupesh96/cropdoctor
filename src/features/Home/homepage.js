import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Header from '../../shared/layouts/Header/Header'
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function AgriDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    primary: '#0df246',
    background: isDarkMode ? '#102214' : '#f5f8f6',
    surface: isDarkMode ? '#1a3320' : '#ffffff',
    textMain: isDarkMode ? '#ffffff' : '#0d1c11',
    textSub: isDarkMode ? '#98a79b' : '#4a594e',
    border: isDarkMode ? '#24422b' : '#e5e7eb',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

    {/* <Header/> */}

      {/* Top App Bar */}
      <View style={[styles.appBar, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.avatar} 
            />
            <View style={[styles.onlineIndicator, { borderColor: theme.surface }]} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.welcomeText, { color: theme.textSub }]}>Welcome Back</Text>
            <Text style={[styles.userName, { color: theme.textMain }]}>Kishan Kumar</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.notifBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <FontAwesome6 name="notifications-none" size={24} color={theme.textMain} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Overview Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.pageTitle, { color: theme.textMain }]}>Overview</Text>
            <View style={styles.locationRow}>
              <FontAwesome6 name="location-on" size={16} color={theme.primary} />
              <Text style={[styles.locationText, { color: theme.textSub }]}>Ludhiana, Punjab</Text>
            </View>
          </View>
          <View style={[styles.weatherBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <FontAwesome6 name="wb-sunny" size={18} color="#f59e0b" />
            <Text style={[styles.tempText, { color: theme.textMain }]}>28°C</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchPadding}>
          <View style={[styles.searchBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <FontAwesome6 name="search" size={22} color={theme.textSub} style={{ marginLeft: 12 }} />
            <TextInput 
              placeholder="Search services, crops, or tools..."
              placeholderTextColor="#9ca3af"
              style={[styles.searchInput, { color: theme.textMain }]}
            />
            <TouchableOpacity style={{ marginRight: 12 }}>
              <FontAwesome6 name="mic" size={22} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Horizontal Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
          <LinearGradient colors={['#3b82f6', '#1d4ed8']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.gradCard}>
            <View style={styles.gradCardTop}>
              <View>
                <Text style={styles.gradLabel}>Today's Forecast</Text>
                <Text style={styles.gradTitle}>Sunny & Clear</Text>
              </View>
              <FontAwesome6 name="wb-sunny" size={32} color="white" />
            </View>
            <View style={styles.gradCardBottom}>
              <Text style={styles.gradInfo}>Humidity: 45% • Wind: 12km/h</Text>
              <TouchableOpacity style={styles.gradBtn}><Text style={styles.gradBtnText}>Details</Text></TouchableOpacity>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#059669', '#064e3b']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.gradCard}>
            <View style={styles.gradCardTop}>
              <View>
                <Text style={styles.gradLabel}>Mandi Prices</Text>
                <Text style={styles.gradTitle}>Wheat Up by 2%</Text>
              </View>
              <FontAwesome6 name="trending-up" size={32} color="white" />
            </View>
            <View style={styles.gradCardBottom}>
              <Text style={styles.gradInfo}>Updated: 10 mins ago</Text>
              <TouchableOpacity style={styles.gradBtn}><Text style={styles.gradBtnText}>Rates</Text></TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Services Grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Services</Text>
          <TouchableOpacity><Text style={{ color: theme.primary, fontWeight: '600' }}>View All</Text></TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <ServiceCard theme={theme} icon="agriculture" title="Custom Hiring" sub="Rent Machinery" bgColor={isDarkMode ? '#1e3a5f' : '#eff6ff'} iconColor="#2563eb" />
          <ServiceCard theme={theme} icon="storefront" title="e-Haat" sub="Marketplace" bgColor={isDarkMode ? '#064e3b' : '#f0fdf4'} iconColor="#16a34a" />
          <ServiceCard theme={theme} icon="campaign" title="Govt Schemes" sub="Subsidies" bgColor={isDarkMode ? '#4c1d95' : '#f5f3ff'} iconColor="#7c3aed" />
          <ServiceCard theme={theme} icon="precision-manufacturing" title="Agri-Machine" sub="Buy & Sell" bgColor={isDarkMode ? '#7c2d12' : '#fff7ed'} iconColor="#ea580c" />
        </View>

        {/* Expert Advisor */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Expert Advisor</Text>
          <TouchableOpacity><Text style={{ color: theme.primary, fontWeight: '600' }}>View All</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
          <ExpertCard theme={theme} name="Dr. Ramesh Gupta" role="Crop Health Specialist" img="https://randomuser.me/api/portraits/men/45.jpg" />
          <ExpertCard theme={theme} name="Dr. Anita Singh" role="Soil Scientist" img="https://randomuser.me/api/portraits/women/45.jpg" />
        </ScrollView>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <NavBtn icon="home" label="Home" active color={theme.primary} />
        <NavBtn icon="eco" label="My Farm" color={theme.textSub} />
        <NavBtn icon="groups" label="Community" color={theme.textSub} />
        <NavBtn icon="person" label="Profile" color={theme.textSub} />
      </View>
    </SafeAreaView>
  );
}

const ServiceCard = ({ theme, icon, title, sub, bgColor, iconColor }) => (
  <TouchableOpacity style={[styles.sCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
    <View style={[styles.sIconBg, { backgroundColor: bgColor }]}>
      <FontAwesome6 name={icon} size={28} color={iconColor} />
    </View>
    <Text style={[styles.sTitle, { color: theme.textMain }]}>{title}</Text>
    <Text style={[styles.sSub, { color: theme.textSub }]}>{sub}</Text>
  </TouchableOpacity>
);

const ExpertCard = ({ theme, name, role, img }) => (
  <View style={[styles.eCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
    <Image source={{ uri: img }} style={styles.eImg} />
    <Text style={[styles.eName, { color: theme.textMain }]}>{name}</Text>
    <Text style={[styles.eRole, { color: theme.textSub }]}>{role}</Text>
    <View style={styles.eActions}>
      <TouchableOpacity style={[styles.eBtn, { backgroundColor: theme.primary }]}><FontAwesome6 name="phone" size={16} /><Text style={styles.eBtnText}>Call</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.eBtn, { backgroundColor: theme.border }]}><FontAwesome6 name="person" size={16} color={theme.textMain}/><Text style={[styles.eBtnText, {color: theme.textMain}]}>Chat</Text></TouchableOpacity>
    </View>
  </View>
);

const NavBtn = ({ icon, label, active, color }) => (
  <TouchableOpacity style={styles.navBtn}>
    <FontAwesome6 name={icon} size={26} color={color} />
    <Text style={[styles.navLabel, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  onlineIndicator: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#0df246', borderWidth: 2 },
  welcomeText: { fontSize: 11, fontWeight: '500' },
  userName: { fontSize: 14, fontWeight: '700' },
  notifBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 },
  pageTitle: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 13, marginLeft: 2 },
  weatherBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  tempText: { fontSize: 13, fontWeight: '700', marginLeft: 6 },
  searchPadding: { padding: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, paddingHorizontal: 12, fontSize: 15 },
  carouselContainer: { paddingLeft: 16, gap: 12, paddingBottom: 10 },
  gradCard: { width: 280, height: 144, borderRadius: 20, padding: 16, justifyContent: 'space-between' },
  gradCardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  gradLabel: { color: 'white', opacity: 0.8, fontSize: 11 },
  gradTitle: { color: 'white', fontSize: 18, fontWeight: '700' },
  gradCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gradInfo: { color: 'white', opacity: 0.8, fontSize: 11 },
  gradBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  gradBtnText: { color: 'white', fontSize: 11, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  sCard: { width: (width - 44) / 2, padding: 16, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
  sIconBg: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  sTitle: { fontSize: 14, fontWeight: '700' },
  sSub: { fontSize: 11 },
  eCard: { width: 240, padding: 16, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
  eImg: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  eName: { fontSize: 15, fontWeight: '700' },
  eRole: { fontSize: 12, marginBottom: 16 },
  eActions: { flexDirection: 'row', gap: 8 },
  eBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 8, gap: 4 },
  eBtnText: { fontSize: 13, fontWeight: '700' },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 75, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, paddingBottom: 15 },
  navBtn: { alignItems: 'center' },
  navLabel: { fontSize: 10, marginTop: 4, fontWeight: '500' },
});
