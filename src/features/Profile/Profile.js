import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,
  SafeAreaView, StatusBar, Dimensions, LayoutAnimation, Platform, UIManager, Alert,
  RefreshControl
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import UpdateProfileModal from './UpdateProfileModal';
import getdecripsession from '../../core/Services/SessionService';

// Assumed Header Component
import Header from '../../shared/layouts/Header/Header'; 

const { width } = Dimensions.get('window');

// --- THEME PALETTE ---
const THEME = {
  primary: '#059669',       // Emerald 600
  primaryDark: '#022c22',   // Emerald 950
  secondary: '#3b82f6',     // Blue 500
  background: '#F8FAFC',    // Slate 50
  cardBg: '#FFFFFF',
  textMain: '#1e293b',      // Slate 800
  textSub: '#64748b',       // Slate 500
  border: '#e2e8f0',
  shadow: '#059669',        // Colored shadow
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- MODERN COMPONENTS ---

// 1. Info Tile (Used inside cards)
const InfoTile = ({ label, value, icon, isLast }) => (
  <View style={[styles.infoTile, !isLast && styles.infoTileBorder]}>
    <View style={styles.infoIconBox}>
      <FontAwesome6 name={icon} size={14} color={THEME.primary} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>{value || 'N/A'}</Text>
    </View>
  </View>
);

// 2. Section Container
const SectionCard = ({ title, icon, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <FontAwesome6 name={icon} size={14} color={THEME.textSub} style={{ marginRight: 8 }} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const ProfileSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [langId, setLangId] = useState("2");
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop');
  const [refreshing, setRefreshing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: 'Kishan Kumar',
    mobile: '9158746565',
    email: 'kisan@agri.com',
    gender: 'Male',
    state: 'Chhattisgarh',
    district: 'Raipur',
    block: 'Dharsiwa',
    designation: 'Farmer',
    officeName: 'IGKV Raipur',
    empId: 'F-2024001',
  });

  // Fetch Logic
  const fetchSessionData = async () => {
    try {
      const response = await getdecripsession.getdecripsession();
      const office = response.officeDetails?.[0] || {};

      setFormData(prev => ({
        ...prev,
        name: response.designation_name || prev.name, 
        empId: response.emp_id ? response.emp_id.toString() : prev.empId, 
        designation: response.designation_name || prev.designation, 
        officeName: office.Office_Name || prev.officeName, 
        district: response.Office_Short_Name || prev.district, 
      }));
    } catch (error) {
      console.error("Error binding session data:", error);
    }
  };

  useEffect(() => { fetchSessionData(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSessionData();
    setRefreshing(false);
  }, []);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (res) => {
      if (res.assets?.[0]) setProfileImage(res.assets[0].uri);
    });
  };

  const handleSaveUpdate = () => {
    setModalVisible(false);
    Alert.alert("Success", "Profile Updated Successfully");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
           <Header gradientColors={['#1a2e12', '#4a7c2a']} />
      
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" progressViewOffset={50} />
        }
      >
        {/* --- 1. MODERN CURVED HEADER --- */}
        <View style={styles.headerContainer}>
          <LinearGradient 
            colors={['#1a2e12', '#4a7c2a']} 
            style={styles.headerGradient}
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          >
            {/* Background Pattern Circles */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />

            <SafeAreaView>
              <View style={styles.topNav}>
                <Text style={styles.screenTitle}>My Profile</Text>
                <TouchableOpacity 
                  style={styles.langBtn} 
                  onPress={() => setLangId(prev => prev === "1" ? "2" : "1")}
                >
                  <FontAwesome6 name="globe" size={12} color="white" style={{ marginRight: 5 }} />
                  <Text style={styles.langText}>{langId === "1" ? "हिंदी" : "EN"}</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </View>

        {/* --- 2. FLOATING ID CARD --- */}
        <View style={styles.idCardWrapper}>
          <View style={styles.idCard}>
            <View style={styles.idCardTop}>
              <TouchableOpacity onPress={handleImagePick} style={styles.avatarContainer}>
                <Image source={{ uri: profileImage }} style={styles.avatar} />
                <View style={styles.editBadge}>
                  <FontAwesome6 name="camera" size={10} color="white" />
                </View>
              </TouchableOpacity>
              
              <View style={styles.idTextContainer}>
                <Text style={styles.userName}>{formData.name}</Text>
                <Text style={styles.userRole}>{formData.designation}</Text>
                <View style={styles.idBadgeContainer}>
                  <Text style={styles.idLabel}>ID:</Text>
                  <Text style={styles.idValue}>{formData.empId}</Text>
                </View>
              </View>
            </View>
            
            {/* Mini Stats Divider */}
            <View style={styles.idDivider} />
            <View style={styles.miniStatsRow}>
                <View style={styles.miniStat}>
                    <Text style={styles.miniStatLabel}>Gender</Text>
                    <Text style={styles.miniStatValue}>{formData.gender}</Text>
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.miniStat}>
                    <Text style={styles.miniStatLabel}>Location</Text>
                    <Text style={styles.miniStatValue}>{formData.district}</Text>
                </View>
            </View>
          </View>
        </View>

        {/* --- 3. DATA SECTIONS --- */}
        <View style={styles.bodyContainer}>
          
          {/* Contact Details */}
          <SectionCard title={langId === "1" ? "संपर्क विवरण" : "Contact Details"} icon="address-card">
            <InfoTile label="Mobile Number" value={formData.mobile} icon="phone" />
            <InfoTile label="Email Address" value={formData.email} icon="envelope" isLast />
          </SectionCard>

          {/* Professional Details */}
          <SectionCard title={langId === "1" ? "कार्यालय विवरण" : "Office Details"} icon="building">
            <InfoTile label="Designation" value={formData.designation} icon="id-card" />
            <InfoTile label="Office Name" value={formData.officeName} icon="building-columns" isLast />
          </SectionCard>

          {/* Location Details */}
          <SectionCard title={langId === "1" ? "स्थान विवरण" : "Address Details"} icon="map-location-dot">
            <InfoTile label="State" value={formData.state} icon="map" />
            <InfoTile label="District" value={formData.district} icon="location-dot" />
            <InfoTile label="Block" value={formData.block} icon="city" isLast />
          </SectionCard>

        </View>
      </ScrollView>

      {/* --- 4. FLOATING ACTION BUTTON --- */}
    <View style={styles.fabContainer}>
        <TouchableOpacity 
          style={styles.fabButton}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <LinearGradient 
            colors={['#059669', '#047857']} 
            style={styles.fabGradient}
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          >
            <FontAwesome6 name="pen" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <UpdateProfileModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        formData={formData} 
        setFormData={setFormData} 
        langId={langId} 
        onSave={handleSaveUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.background },

  // --- HEADER STYLES ---
  headerContainer: {
    height: "18%",
    backgroundColor: THEME.primaryDark,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerGradient: { flex: 1, paddingHorizontal: 20 },
  topNav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 10,
  },
  screenTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', letterSpacing: 0.5 },
  langBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  langText: { color: 'white', fontSize: 12, fontWeight: '700' },
  // Decorative Circles
  circle1: {
    position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  circle2: {
    position: 'absolute', bottom: -50, left: -50, width: 150, height: 150, borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)'
  },

  // --- ID CARD STYLES ---
  idCardWrapper: {
    paddingHorizontal: 20,
    marginTop: -100, // Pulls the card up into the header
    zIndex: 10,
  },
  idCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  idCardTop: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { marginRight: 16, position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#f1f5f9' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: THEME.primary,
    width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'white'
  },
  idTextContainer: { flex: 1 },
  userName: { fontSize: 20, fontWeight: '800', color: THEME.textMain, marginBottom: 2 },
  userRole: { fontSize: 13, color: THEME.textSub, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  idBadgeContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start'
  },
  idLabel: { fontSize: 11, color: THEME.primaryDark, fontWeight: '700', marginRight: 4 },
  idValue: { fontSize: 12, color: THEME.primary, fontWeight: '700' },
  
  idDivider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 15 },
  miniStatsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  miniStat: { alignItems: 'center', flex: 1 },
  miniStatLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginBottom: 2, textTransform: 'uppercase' },
  miniStatValue: { fontSize: 14, color: THEME.textMain, fontWeight: '700' },
  verticalLine: { width: 1, height: 30, backgroundColor: '#f1f5f9' },

  // --- CONTENT BODY ---
  bodyContainer: { paddingHorizontal: 20, paddingTop: 25 },
  
  // Section Card
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f8fafc'
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 15,
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10
  },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase' },

  // Info Tile
  infoTile: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  infoTileBorder: { borderBottomWidth: 1, borderBottomColor: '#f8fafc' },
  infoIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#f0fdf4',
    justifyContent: 'center', alignItems: 'center', marginRight: 14
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#64748b', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#1e293b', fontWeight: '600' },

  // --- FAB ---
fabContainer: {
    position: 'absolute', 
    bottom: 30, 
    right: 25, // Moved to right
    zIndex: 20,
  },
  fabButton: {
    width: 56,  // Fixed width for circle
    height: 56, // Fixed height for circle
    borderRadius: 28, // Half of width/height
    overflow: 'hidden',
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { fontSize: 16, color: 'white', fontWeight: '700', letterSpacing: 0.5 },
});

export default ProfileSettings;