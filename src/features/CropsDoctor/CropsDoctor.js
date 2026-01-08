import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
    FlatList, Image, ActivityIndicator, StatusBar, Dimensions,
    Animated, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Search, 
    Filter, 
    ChevronRight, 
    Leaf, 
    Activity, 
    Sprout,
    Stethoscope 
} from 'lucide-react-native';

import { HttpService } from '../../core/Services/HttpService';
import { API_BASE_URL } from '../../config/constants';
import { environment } from '../../../environments/environment.dev';
import getAdminApiList from '../../core/api/adminApiList';
import Header from '../../shared/layouts/Header/Header';
import Footer from '../../shared/layouts/Footer/Footer';

const { width } = Dimensions.get('window');
const FALLBACK_IMAGE_PATH = 'dssnew/images/imgfruit.jpg';

// --- THEME COLORS ---
const COLORS = {
    primary: '#8dc63f',
    primaryDark: '#4a7c2a',
    headerBg: '#1a2e12',
    background: '#f8fafc',
    surface: '#ffffff',
    textMain: '#111827',
    textSub: '#6b7280',
    border: '#e2e8f0',
};

// --- COMPONENT: CATEGORY PILL ---
const CategoryPill = React.memo(({ item, onPress, isActive }) => {
    const imageUri = item.image_path ? `${environment.API_BASE_URL_IMAGE}/${item.image_path}` : `${API_BASE_URL}/${FALLBACK_IMAGE_PATH}`;

    return (
        <TouchableOpacity
            style={[styles.catPill, isActive && styles.catPillActive]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.catImageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.catImage} />
            </View>
            <Text style={[styles.catText, isActive && styles.catTextActive]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
});

// --- COMPONENT: CROP CARD ---
const CropCard = React.memo(({ product, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const imageUri = product.image_path ? `${environment.API_BASE_URL_IMAGE}/${product.image_path}` : `${API_BASE_URL}/${FALLBACK_IMAGE_PATH}`;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={onPress} 
            style={styles.cardContainer}
        >
            <Animated.View style={[styles.cardInner, { transform: [{ scale: scaleAnim }] }]}>
                {/* Image Section */}
                <View style={styles.cardImageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.cardBadge}>
                        <Activity size={10} color="white" />
                        <Text style={styles.cardBadgeText}>AI Ready</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.cardSub} numberOfLines={1}>Diagnose health</Text>
                    
                    <View style={styles.cardActionRow}>
                        <View style={styles.miniTag}>
                            <Leaf size={10} color={COLORS.primaryDark} />
                            <Text style={styles.miniTagText}>Healthy?</Text>
                        </View>
                        <View style={styles.actionBtn}>
                             <ChevronRight size={14} color="white" />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
});

const CropsDoctor = () => {
    const [loading, setLoading] = useState(false);
    const [cropGroupList, setCropGroupList] = useState([]);
    const [CropList, setCropList] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const navigation = useNavigation();

    // --- API LOGIC (Kept exactly as provided) ---
    const getCropList = useCallback(async (item) => {
        setLoading(true);
        try {
            const adminApiList = getAdminApiList();
            const payload = { crop: true, language_id: '1', crop_group_id: item.crop_group_id || '1' };
            const response = await HttpService.get(adminApiList.getCropDetail, payload);
            setCropList(response?.data?.data || []);
        } catch (error) {
            // Silently fail or show toast
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const adminApiList = getAdminApiList();
                const response = await HttpService.get(adminApiList.getCropDetail, { cropgroup: true, mcgl_id: '1' });
                const list = response?.data?.data.filter(item => item.image_path !== null) || [];
                setCropGroupList(list);
                if (list.length > 0) {
                    setActiveTab(list[0].name);
                    getCropList(list[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialData();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                 <Header gradientColors={['#1a2e12', '#4a7c2a']} />

            {/* --- 1. HEADER & SEARCH --- */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>Crop Doctor</Text>
                        <Text style={styles.headerSub}>Select a crop to diagnose</Text>
                    </View>
                    <View style={styles.headerIconCircle}>
                        <Stethoscope size={24} color="#a3e635" />
                    </View>
                </View>

                {/* Floating Search Bar */}
                <View style={styles.searchFloating}>
                    <Search size={20} color={COLORS.textSub} style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder="Search crops (e.g., Wheat, Rice)..."
                        placeholderTextColor={COLORS.textSub}
                        style={styles.searchInput}
                    />
                    <View style={styles.filterBtn}>
                        <Filter size={18} color="white" />
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: 30 }}> 
                 {/* Gap for floating search bar */}
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    
                    {/* --- 2. CATEGORIES --- */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <FlatList
                            data={cropGroupList}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
                            renderItem={({ item }) => (
                                <CategoryPill
                                    item={item}
                                    isActive={activeTab === item.name}
                                    onPress={() => {
                                        setActiveTab(item.name);
                                        getCropList(item);
                                    }}
                                />
                            )}
                            keyExtractor={item => item.crop_group_id?.toString()}
                        />
                    </View>

                    {/* --- 3. CROP GRID --- */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.resultHeader}>
                            <View style={{flexDirection:'row', alignItems:'center', gap: 6}}>
                                <Sprout size={16} color={COLORS.primaryDark} />
                                <Text style={styles.sectionTitle}>{activeTab} Crops</Text>
                            </View>
                            <Text style={styles.countBadge}>{CropList.length} Found</Text>
                        </View>

                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={COLORS.primary} />
                                <Text style={styles.loadingText}>Fetching crops...</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={CropList}
                                numColumns={2}
                                scrollEnabled={false}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                renderItem={({ item }) => (
                                    <CropCard 
                                        product={item} 
                                        onPress={() => navigation.navigate('CropsDoctorDetails', { product: item })} 
                                    />
                                )}
                                keyExtractor={item => item.crop_id?.toString()}
                                ListEmptyComponent={
                                    <View style={styles.emptyState}>
                                        <Leaf size={40} color="#cbd5e1" />
                                        <Text style={styles.emptyText}>No crops found in this category</Text>
                                    </View>
                                }
                            />
                        )}
                    </View>

                </ScrollView>
            </View>
            
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLORS.background },

    // --- HEADER ---
    headerContainer: {
        backgroundColor: COLORS.headerBg,
        paddingHorizontal: 20,
        paddingBottom: 45, // Space for floating search
        paddingTop: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 1
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5
    },
    headerSub: {
        color: '#a3e635', // Lime green
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4
    },
    headerIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },

    // --- SEARCH ---
    searchFloating: {
        position: 'absolute',
        bottom: -25,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 15,
        color: COLORS.textMain
    },
    filterBtn: {
        backgroundColor: COLORS.primaryDark,
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // --- SECTIONS ---
    sectionContainer: {
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        paddingHorizontal: 20,
        marginBottom: 15
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    countBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSub,
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },

    // --- CATEGORY PILLS ---
    catPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 8,
        paddingRight: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 1,
    },
    catPillActive: {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryDark,
        elevation: 3
    },
    catImageWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f1f5f9'
    },
    catImage: { width: '100%', height: '100%' },
    catText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textMain,
        marginLeft: 8
    },
    catTextActive: {
        color: 'white'
    },

    // --- CROP CARD ---
    cardContainer: {
        width: (width - 50) / 2, // 2 column with spacing
        marginBottom: 20,
    },
    cardInner: {
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    cardImageContainer: {
        height: 120,
        width: '100%',
        position: 'relative'
    },
    cardImage: { width: '100%', height: '100%' },
    cardBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8
    },
    cardBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 2
    },
    cardSub: {
        fontSize: 11,
        color: COLORS.textSub,
        marginBottom: 10
    },
    cardActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    miniTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#ecfccb',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6
    },
    miniTagText: { fontSize: 10, color: '#3f6212', fontWeight: '600' },
    actionBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // --- STATES ---
    loadingContainer: {
        alignItems: 'center',
        marginTop: 50,
        gap: 10
    },
    loadingText: { color: COLORS.textSub },
    emptyState: {
        alignItems: 'center',
        marginTop: 40,
        gap: 10
    },
    emptyText: { color: COLORS.textSub, fontStyle: 'italic' }
});

export default CropsDoctor;