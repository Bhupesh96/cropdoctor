import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
  StatusBar, Dimensions, Alert, ImageBackground, FlatList,
  RefreshControl, ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { environment } from '../../../environments/environment.dev';
import getAdminApiList from '../../core/api/adminApiList';
import { HttpService } from '../../core/Services/HttpService';

const { height, width } = Dimensions.get('window');

const CropsDoctorDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || { product: { name: 'Crop', image_path: null } };

  // --- STATES ---
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [probleTypelist, setProbleTypelist] = useState([]);
  const [cropGroupList, setCropGroupList] = useState([]);

  const mainHeroImage = product.image_path 
    ? `${environment.API_BASE_URL_IMAGE}/${product.image_path}` 
    : 'https://via.placeholder.com/400';

  // --- API CALLS ---

  const getProbleTypelist = useCallback(async () => {
    setLoading(true);
    try {
      const adminApiList = getAdminApiList();
      const response = await HttpService.get(adminApiList.getProblemDetail, { 
        problemtype: true, 
        language_id: '1' 
      });
      
      const list = response?.data?.data?.filter(item => item.image_path !== null) || [];
      setProbleTypelist(list);

      if (list.length > 0) {
        setActiveTab(list[0].problem_type_id);
        getCropList(list[0].problem_type_id);
      }
    } catch (error) {
      console.error("Error fetching problem types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCropList = useCallback(async (problemId) => {
    setLoading(true);
    try {
      const adminApiList = getAdminApiList();
      const payload = { cropProblemDetail: true, problem_id: problemId };
      const response = await HttpService.get(adminApiList.getCropDetail, payload);
      setCropGroupList(response?.data?.data || []);
      setSelectedItem(null); // Reset selection when tab changes
    } catch (error) {
      Alert.alert("Error", "Could not fetch damage details");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProbleTypelist();
  }, [getProbleTypelist]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProbleTypelist().then(() => setRefreshing(false));
  }, [getProbleTypelist]);



const handleStartAnalysis = () => {
  if (!selectedItem) return;

  // Consolidating all selection data
  const analysisData = {
    cropId: product.id,
    cropName: product.name,
    problemTypeId: activeTab,
    problemTypeName: probleTypelist.find(p => p.problem_type_id === activeTab)?.problem_type_name,
    selectedDamageId: selectedItem.id,
    selectedDamageName: selectedItem.name,
    damageImagePath: selectedItem.image_path,
    timestamp: new Date().toISOString(),
  };

  console.log("Analysis Data Collected:", analysisData);

  // Example: Navigate to a Result Screen or call an API
  navigation.navigate('ProblemPrescription', { data: analysisData });
  
  Alert.alert(
    "Analysis Started",
    `Analyzing ${analysisData.selectedDamageName} for your ${analysisData.cropName}.`,
    [{ text: "OK" }]
  );
};

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* --- BACK BUTTON --- */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.circularBack} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="chevron-left" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground source={{ uri: mainHeroImage }} style={styles.heroImageMain}>
          <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent']} style={styles.imageOverlay} />
        </ImageBackground>

        <View style={styles.detailsSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.titleRow}>
            <Text style={styles.detailsName}>{product.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>AI Diagnosis</Text>
            </View>
          </View>

          <View style={styles.guideCard}>
             <FontAwesome6 name="circle-info" size={18} color="#2E7D32" />
             <Text style={styles.guideText}>Select visual symptoms from the library to help our AI identify the problem precisely.</Text>
          </View>

          <View style={styles.divider} />

          {/* 1. Problem Type Tabs */}
          <Text style={styles.stepHeader}>1. Select Issue Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
            {probleTypelist.map((tab) => {
              const isActive = activeTab === tab.problem_type_id;
              const tabImg = `${environment.API_BASE_URL_IMAGE}/${tab.image_path}`;

              return (
                <TouchableOpacity 
                  key={tab.problem_type_id} 
                  onPress={() => {
                    setActiveTab(tab.problem_type_id);
                    getCropList(tab.problem_type_id);
                  }}
                  style={[styles.tabItem, isActive && styles.activeTabItem]}>
                  <Image source={{ uri: tabImg }} style={styles.tabIconImage} />
                  <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                    {tab.problem_type_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* 2. Selection List */}
          <Text style={styles.stepHeader}>2. Choose Matching Damage</Text>
          {loading && cropGroupList.length === 0 ? (
            <ActivityIndicator color="#2E7D32" style={{ marginVertical: 20 }} />
          ) : (
            <FlatList
              data={cropGroupList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.card, selectedItem?.id === item.id && styles.selectedCard]}
                  onPress={() => setSelectedItem(item)}>
                  <Image 
                    source={{ uri: `${environment.API_BASE_URL_IMAGE}/${item.image_path}` }} 
                    style={styles.cardImage} 
                  />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardText} numberOfLines={1}>{item.name}</Text>
                    {selectedItem?.id === item.id && <FontAwesome6 name="circle-check" size={14} color="#2E7D32" />}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          {/* 3. Detailed Comparison View */}
          {selectedItem && (
            <View style={styles.previewHeroContainer}>
              <View style={styles.comparisonHeader}>
                <Text style={styles.stepHeader}>3. Detailed Comparison</Text>
                <TouchableOpacity onPress={() => setSelectedItem(null)}>
                  <Text style={{color: '#d32f2f', fontWeight: 'bold', fontSize: 12}}>Clear Selection</Text>
                </TouchableOpacity>
              </View>

              <Image 
                source={{ uri: `${environment.API_BASE_URL_IMAGE}/${selectedItem.image_path}` }} 
                style={styles.heroImageSmall} 
                resizeMode="cover"
              />
              
              <View style={styles.detailsBox}>
                <Text style={styles.selectedNameText}>{selectedItem.name}</Text>
                
                <Text style={styles.morePhotosTitle}>Visual Reference Library:</Text>
                <View style={styles.morePhotosGrid}>
                  {cropGroupList.slice(0, 4).map((imgItem, index) => (
                    <TouchableOpacity 
                      key={imgItem.id || index} 
                      style={[styles.smallPhotoItem, selectedItem.id === imgItem.id && styles.activeGalleryBorder]}
                      onPress={() => setSelectedItem(imgItem)}>
                      <Image 
                        source={{ uri: `${environment.API_BASE_URL_IMAGE}/${imgItem.image_path}` }} 
                        style={styles.galleryImg} 
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.descriptionBox}>
                  <Text style={styles.descriptionText}>
                    Does your crop look like this? If yes, click the button below to start the AI treatment plan.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Action Button */}
          {/* <TouchableOpacity 
            disabled={!selectedItem}
            style={[styles.primaryBtn, !selectedItem && { opacity: 0.5 }]} 
            onPress={() => Alert.alert("AI Analysis", `Starting diagnosis for ${selectedItem.name}...`)}>
            <LinearGradient colors={['#2E7D32', '#4CAF50']} style={styles.btnGradient}>
              <Text style={styles.btnText}>Start AI Analysis</Text>
              <FontAwesome6 name="wand-magic-sparkles" size={16} color="#FFF" style={{marginLeft: 10}} />
            </LinearGradient>
          </TouchableOpacity> */}


          {/* Action Button */}
          <TouchableOpacity 
            disabled={!selectedItem}
            style={[styles.primaryBtn, !selectedItem && { opacity: 0.5 }]} 
            onPress={handleStartAnalysis} // <--- Link the method here
          >
            <LinearGradient colors={['#2E7D32', '#4CAF50']} style={styles.btnGradient}>
              <Text style={styles.btnText}>Start AI Analysis</Text>
              <FontAwesome6 name="wand-magic-sparkles" size={16} color="#FFF" style={{marginLeft: 10}} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#121212' },
  topHeader: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  circularBack: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  heroImageMain: { width: width, height: height * 0.35 },
  imageOverlay: { flex: 1 },
  detailsSheet: { backgroundColor: '#F8F9FA', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: -35, padding: 25, minHeight: height * 0.7 },
  dragHandle: { width: 40, height: 4, backgroundColor: '#DDD', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  detailsName: { fontSize: 26, fontWeight: '800', color: '#1A1A1A' },
  priceTag: { backgroundColor: '#E8F5E9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  priceText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 12 },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 20 },
  guideCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 15, alignItems: 'center', elevation: 1 },
  guideText: { fontSize: 13, color: '#666', marginLeft: 12, flex: 1, lineHeight: 18 },
  
  stepHeader: { fontSize: 16, fontWeight: '800', color: '#2E7D32', marginBottom: 15, marginTop: 10 },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tabItem: { alignItems: 'center', marginRight: 20, padding: 10, borderRadius: 15, backgroundColor: '#EEE', width: 100 },
  activeTabItem: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#2E7D32' },
  tabIconImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  tabLabel: { fontSize: 12, color: '#777', fontWeight: '600' },
  activeTabLabel: { color: '#2E7D32' },

  card: { width: 140, marginRight: 15, backgroundColor: '#FFF', borderRadius: 18, elevation: 3, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: '#2E7D32' },
  cardImage: { width: '100%', height: 100 },
  cardInfo: { padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardText: { fontSize: 12, fontWeight: '700', color: '#444', flex: 1 },
  
  previewHeroContainer: { marginTop: 25, padding: 15, backgroundColor: '#FFF', borderRadius: 25, elevation: 2 },
  comparisonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroImageSmall: { width: '100%', height: 220, borderRadius: 20, marginTop: 10 },
  detailsBox: { paddingVertical: 15 },
  selectedNameText: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 15 },
  morePhotosTitle: { fontSize: 14, fontWeight: '700', color: '#666', marginBottom: 10 },
  morePhotosGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  smallPhotoItem: { width: (width - 120) / 4, height: 65, borderRadius: 12, overflow: 'hidden', backgroundColor: '#EEE' },
  activeGalleryBorder: { borderWidth: 2, borderColor: '#2E7D32' },
  galleryImg: { width: '100%', height: '100%' },
  
  descriptionBox: { backgroundColor: '#F1F8E9', padding: 15, borderRadius: 12, marginTop: 15, borderLeftWidth: 4, borderLeftColor: '#2E7D32' },
  descriptionText: { fontSize: 13, color: '#444', lineHeight: 20, fontStyle: 'italic' },

  primaryBtn: { marginTop: 25, borderRadius: 18, overflow: 'hidden', elevation: 4 },
  btnGradient: { paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default CropsDoctorDetails;




 