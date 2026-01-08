import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { environment } from '../../../environments/environment.dev';

const { width } = Dimensions.get('window');

const DiseaseDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // 1. Get the data passed from handleStartAnalysis
  // We use the 'data' key as defined in: navigation.navigate('ProblemPrescription', { data: analysisData });
  const analysisData = route.params?.data || null;

  const [activeTab, setActiveTab] = useState('symptoms');

  // fallback data if navigation fails
  const displayName = analysisData?.selectedDamageName || "समस्या विवरण";
  const displayImage = analysisData?.damageImagePath 
    ? `${environment.API_BASE_URL_IMAGE}/${analysisData.damageImagePath}`
    : 'https://via.placeholder.com/400x250';

  const symptoms = [
    "छोटी इल्ली कोमल पत्तियों को खाती है, परिपक्व इल्ली गोलाकार छेद करती है।",
    "इल्ली केवल अपना सिर फल के अंदर घुसाकर और बाकी हिस्सा को बहार छोड़ करके फल के आंतरिक पदार्थ को खाती है।",
    "लार्वा हरे से भूरे रंग में विभिन्नता प्रदर्शित करता है।",
    "शंकी अवस्था भूरे रंग कि होता है जो कि मिट्टी, पत्ती, फल्ली और फसल अवशेषों में पाई जाती है।",
    "वयस्क : हल्के भूरे-पीले रंग का मोटा कीट, पिछला पंख हल्के धुएँ के रंग के सफ़ेद होते है और बाहरी किनार पर चौड़ी काली पट्टी होती है।"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <View style={styles.iconBadge}>
            <FontAwesome6 name="leaf" size={14} color="#fde047" />
          </View>
          <View>
            <Text style={styles.headerTitle}>समस्या समाधान</Text>
            <Text style={styles.headerSubtitle}>AI ENABLED ANALYSIS</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.translateBtn}>
          <FontAwesome6 name="language" size={20} color="white" />
          <View style={styles.redDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Main Image Section - Dynamic Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: displayImage }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          <View style={styles.severityBadge}>
            <Text style={styles.severityText}>High Severity Detected</Text>
          </View>
        </View>

        {/* Title Card - Dynamic Name */}
        <View style={styles.titleCard}>
          <FontAwesome6 name="bug" size={18} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.titleText}>{displayName}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('symptoms')}
            style={[styles.tab, activeTab === 'symptoms' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'symptoms' && styles.activeTabText]}>
              लक्षण (Symptoms)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('management')}
            style={[styles.tab, activeTab === 'management' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'management' && styles.activeTabText]}>
              प्रबंधन (Management)
            </Text>
          </TouchableOpacity>
        </View>

        {/* List Section */}
        <View style={styles.listContainer}>
          {activeTab === 'symptoms' ? (
            symptoms.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.listIndex, { backgroundColor: '#F97316' }]}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome6 name="kit-medical" size={40} color="#059669" />
              <Text style={styles.emptyStateText}>प्रबंधन जानकारी लोड हो रही है...</Text>
            </View>
          )}
        </View>

        {/* Source Badge */}
        <View style={styles.sourceContainer}>
          <View style={styles.sourceBadge}>
            <FontAwesome6 name="graduation-cap" size={12} color="#2563eb" />
            <Text style={styles.sourceText}>Verified by IGKV Experts</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome6 name="heart" size={18} color="#ef4444" solid />
            <Text style={styles.statText}>181</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome6 name="comment" size={18} color="#059669" />
            <Text style={styles.statText}>2</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome6 name="eye" size={18} color="#3b82f6" />
            <Text style={styles.statText}>9717</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.feedbackBtn}>
          <Text style={styles.feedbackBtnText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... Styles remain mostly the same, added emptyState styles
const styles = StyleSheet.create({
  // ... (Keep your existing styles here)
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 14,
  },
  // Update these for better UI
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#059669', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  iconBadge: { width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: { color: 'white', fontSize: 10, letterSpacing: 1, opacity: 0.9 },
  imageContainer: { height: 250, width: '100%' },
  mainImage: { width: '100%', height: '100%' },
  imageGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 },
  severityBadge: { position: 'absolute', bottom: 16, left: 16, backgroundColor: '#fee2e2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#fecaca' },
  severityText: { color: '#991b1b', fontSize: 12, fontWeight: '600' },
  titleCard: { backgroundColor: '#7C3AED', marginHorizontal: 16, marginTop: -15, paddingVertical: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  titleText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#e5e7eb', marginHorizontal: 16, marginTop: 24, borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#059669' },
  tabText: { fontSize: 14, color: '#374151', fontWeight: '500' },
  activeTabText: { color: 'white' },
  listContainer: { paddingHorizontal: 16, marginTop: 20 },
  listItem: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 1 },
  listIndex: { width: 48, justifyContent: 'center', alignItems: 'center' },
  indexText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  listContent: { flex: 1, padding: 12 },
  listText: { color: '#374151', fontSize: 14, lineHeight: 20 },
  sourceContainer: { alignItems: 'center', marginTop: 10 },
  sourceBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff6ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  sourceText: { marginLeft: 6, color: '#2563eb', fontSize: 12, fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  statsContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginRight: 15 },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  statText: { marginLeft: 5, fontSize: 13, color: '#374151' },
  feedbackBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 2, borderColor: '#059669' },
  feedbackBtnText: { color: '#059669', fontWeight: 'bold' }
});

export default DiseaseDetails;





 