import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet,
  SafeAreaView, Modal, StatusBar, Dimensions, FlatList, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Header from '../../shared/layouts/Header/Header';

const { width } = Dimensions.get('window');

/* ================= THEME CONSTANTS ================= */
const COLORS = {
  primary: '#8dc63f',        // Light Green
  primaryDark: '#4a7c2a',    // Dark Green
  background: '#f8fafc',     // Slate 50
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#6b7280',
  border: '#e2e8f0',
  accent: '#eaf4ea',
};

// Background Image for Advisory Header
const ADVISORY_HEADER_IMG = 'https://images.unsplash.com/photo-1595116708764-a34f787e97d8?q=80&w=1000';

const AdvisoryData = [
  { id: 1, name: 'Dr. S. K. Patil', specialty: 'Agronomy', location: 'Raipur, CG', reviews: 156, rating: 5, imageUrl: 'https://media.istockphoto.com/id/1358202423/photo/senior-farmer-standing-in-soybean-field-examining-crop-at-sunset.jpg?s=2048x2048&w=is&k=20&c=LQ7OyjuUEoA9D41QvGgHw_AkvPDg39rabMbW_VEv2VI=' },
  { id: 2, name: 'Dr. P. K. Tiwari', specialty: 'Pathology', location: 'Bhilai, CG', reviews: 189, rating: 4, imageUrl: 'https://media.istockphoto.com/id/957982608/photo/brown-skin-farmer-and-his-rice-field.jpg?s=2048x2048&w=is&k=20&c=oUpHGnLmv6-SKysx4kPSWu9wkHVy48FCn7D9Wckchc8=' },
  { id: 3, name: 'Dr. Neha Sharma', specialty: 'Horticulture', location: 'Durg, CG', reviews: 142, rating: 5, imageUrl: 'https://media.istockphoto.com/id/1029797636/photo/school-girl-stock-image.jpg?s=2048x2048&w=is&k=20&c=PYmmp2B0cGNEah3YkU7cj71QlRjP1Dt-P0pf49dyOw4=' },
  { id: 4, name: 'Dr. Amit Verma', specialty: 'Soil Science', location: 'Bilaspur, CG', reviews: 98, rating: 4, imageUrl: 'https://media.istockphoto.com/id/503646846/photo/senior-indian-man.jpg?s=2048x2048&w=is&k=20&c=yF7uX8eH6v_0J7b5H4e7g3jK5l6m9n0o1p2q3r4s5' },
];

const CATEGORIES = ['All', 'Agronomy', 'Pathology', 'Horticulture', 'Soil Science'];

const Advisory = () => {
  const navigation = useNavigation();
  
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filteredData = useMemo(() => {
    return AdvisoryData.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            doctor.specialty.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || doctor.specialty === selectedCategory;
      const matchesRating = doctor.rating >= minRating;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [searchText, selectedCategory, minRating]);

  const renderDoctor = ({ item }) => (
    <TouchableOpacity 
      style={styles.expertCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('AdvisoryDetails', { doctor: item })}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.expertImg} />
        <View style={styles.onlineStatus} />
      </View>
      
      <View style={styles.expertInfo}>
        <View style={styles.cardHeader}>
             <Text style={styles.expertName}>{item.name}</Text>
             <View style={styles.ratingBadge}>
                <FontAwesome6 name="star" size={10} color="#FFF" solid />
                <Text style={styles.ratingVal}>{item.rating}.0</Text>
             </View>
        </View>

        <Text style={styles.expertSpec}>{item.specialty} Specialist</Text>
        
        <View style={styles.metaRow}>
            <View style={styles.locationRow}>
                <FontAwesome6 name="location-dot" size={10} color={COLORS.textSub} />
                <Text style={styles.expertLoc}>{item.location}</Text>
            </View>
            <Text style={styles.reviewVal}>• {item.reviews} reviews</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.chatBtn}>
        <FontAwesome6 name="comment-dots" size={18} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header gradientColors={['#1a2e12', '#4a7c2a']} />

      
      {/* 1. HEADER (Image Background + Overlay) */}
      <View style={styles.headerContainer}>
        <ImageBackground 
            source={{ uri: ADVISORY_HEADER_IMG }} 
            style={styles.headerImage}
        >
            <View style={styles.headerOverlay}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerContent}>
                        {/* <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesome6 name="arrow-left" size={20} color="#FFF" />
                        </TouchableOpacity> */}
                        
                        <View style={{flex: 1, marginLeft: 15}}>
                            <Text style={styles.headerTitle}>Find Advisor</Text>
                            <Text style={styles.headerSub}>Connect with agricultural experts</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
      </View>

      {/* 2. FLOATING SEARCH */}
      <View style={styles.searchContainer}>
         <FontAwesome6 name="magnifying-glass" size={16} color={COLORS.textSub} style={{marginRight: 10}} />
         <TextInput 
            placeholder="Search doctors, specialty..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
         />
         <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible(true)}>
            <FontAwesome6 name="sliders" size={14} color="white" />
         </TouchableOpacity>
      </View>

      {/* 3. CONTENT AREA */}
      <View style={styles.contentContainer}>
        {/* Categories */}
        <View style={styles.chipContainer}>
            <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipPadding}
            renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={() => setSelectedCategory(item)}
                style={[styles.chip, selectedCategory === item && styles.activeChip]}
                >
                <Text style={[styles.chipText, selectedCategory === item && styles.activeChipText]}>{item}</Text>
                </TouchableOpacity>
            )}
            />
        </View>

        {/* List of Experts */}
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDoctor}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View style={styles.listHeader}>
                    <Text style={styles.resultsText}>
                        {filteredData.length} Experts Available
                    </Text>
                </View>
            )}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <FontAwesome6 name="user-doctor" size={40} color="#ccc" />
                    <Text style={styles.emptyText}>No experts found for this selection.</Text>
                </View>
            )}
        />
      </View>

      {/* 4. MODAL (Updated Theme) */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragBar} />
            
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Refine Search</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
                    <FontAwesome6 name="xmark" size={16} color={COLORS.textSub} />
                </TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <View style={styles.ratingRowModal}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity 
                        key={star} 
                        style={[styles.starBtn, minRating >= star && styles.activeStar]}
                        onPress={() => setMinRating(star)}
                    >
                        <FontAwesome6 name="star" size={14} color={minRating >= star ? "#FFF" : "#CCC"} solid />
                        <Text style={[styles.starText, minRating >= star && styles.activeStarText]}>{star}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
                style={styles.applyBtn} 
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetBtn} onPress={() => {setMinRating(0); setSelectedCategory('All');}}>
                <Text style={styles.resetBtnText}>Reset All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // --- HEADER ---
  headerContainer: {
    height: "11.5%",
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryDark,
  },
  headerImage: { width: '100%', height: '100%' },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 46, 18, 0.7)', // Green-tinted dark overlay
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  headerSub: { fontSize: 13, color: '#dcfce7', marginTop: 2 },

  // --- SEARCH ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -25, // Overlap
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.textMain, height: '100%' },
  filterBtn: {
    width: 30, height: 30,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 8,
    justifyContent: 'center', alignItems: 'center'
  },

  // --- CONTENT ---
  contentContainer: { flex: 1, paddingTop: 15 },
  
  // Chips
  chipContainer: { marginBottom: 10 },
  chipPadding: { paddingHorizontal: 20 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginRight: 8,
    borderWidth: 1, borderColor: COLORS.border,
  },
  activeChip: { backgroundColor: COLORS.primaryDark, borderColor: COLORS.primaryDark },
  chipText: { fontSize: 13, color: COLORS.textSub, fontWeight: '600' },
  activeChipText: { color: 'white', fontWeight: '700' },

  // List
  listPadding: { paddingBottom: 50, paddingHorizontal: 20 },
  listHeader: { marginBottom: 10, marginTop: 5 },
  resultsText: { fontSize: 12, color: COLORS.textSub, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 10, color: COLORS.textSub },

  // Expert Card
  expertCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrapper: { position: 'relative', marginRight: 15 },
  expertImg: { width: 70, height: 70, borderRadius: 18, backgroundColor: '#f1f5f9' },
  onlineStatus: {
    position: 'absolute', right: -2, bottom: -2,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#4ade80', borderWidth: 2.5, borderColor: 'white'
  },
  expertInfo: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expertName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 2 },
  expertSpec: { fontSize: 13, color: COLORS.primaryDark, fontWeight: '600', marginBottom: 6 },
  
  ratingBadge: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#f59e0b', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 3
  },
  ratingVal: { fontSize: 10, fontWeight: 'bold', color: 'white' },

  metaRow: { flexDirection: 'row', alignItems: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expertLoc: { fontSize: 12, color: COLORS.textSub },
  reviewVal: { fontSize: 12, color: COLORS.textSub, marginLeft: 5 },

  chatBtn: {
    width: 44, height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },

  // --- MODAL ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  modalDragBar: { width: 40, height: 4, backgroundColor: '#e2e8f0', alignSelf: 'center', borderRadius: 2, marginBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
  closeModalBtn: { padding: 5 },
  
  filterLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textMain, marginBottom: 15 },
  ratingRowModal: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  starBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, width: width * 0.15,
    borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, gap: 4
  },
  activeStar: { backgroundColor: COLORS.primaryDark, borderColor: COLORS.primaryDark },
  starText: { fontWeight: 'bold', color: COLORS.textSub, fontSize: 14 },
  activeStarText: { color: 'white' },

  applyBtn: { backgroundColor: COLORS.primaryDark, padding: 16, borderRadius: 16, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  applyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resetBtn: { marginTop: 15, alignItems: 'center', padding: 10 },
  resetBtnText: { color: COLORS.textSub, fontWeight: '600' }
});

export default Advisory;