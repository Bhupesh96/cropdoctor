import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  Easing, 
  Pressable
} from 'react-native';

import {
  Search,
  Bot,
  Leaf,
  Calendar,
  User,
  Bell,
  Activity,
  ShoppingBag,
  Sparkles,
  Zap,
  Percent,
  TrendingUp,
  Camera,
  MessageCircle,
  ScanLine, ArrowRight
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import Header from '../../shared/layouts/Header/Header';
import Footer from '../../shared/layouts/Footer/Footer';

const { width } = Dimensions.get('window');

// --- DIMENSION CALCULATIONS ---
const PADDING = 20;
const TOOL_GAP = 15;
// Exact math to fit 2 cards perfectly on screen
const TOOL_CARD_WIDTH = (width - (PADDING * 2) - TOOL_GAP) / 2; 

const CARD_MARGIN = 15;
const CARD_WIDTH = width * 0.85; 
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

const RECOMMEND_CARD_WIDTH = 170;
const RECOMMEND_MARGIN = 10;
const RECOMMEND_SNAP = RECOMMEND_CARD_WIDTH + RECOMMEND_MARGIN;

/* ================= COLORS ================= */
const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#4a7c2a',
  background: '#f8fafc', 
  glass: 'rgba(23, 40, 20, 0.6)',
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#6b7280',
  accent: '#eaf4ea',
  border: '#e2e8f0',
};

/* ================= DATA ================= */
const DASHBOARD_DATA = {
  profile: { name: 'Kisan Mitra', greeting: 'Namaste 🙏' },
  weather: [
    { id: 1, label: 'TEMP', value: '28°C', sub: 'Clear Sky' },
    { id: 2, label: 'HUMIDITY', value: '55%', sub: 'Optimal' },
    { id: 3, label: 'RAIN', value: '5%', sub: 'Dry Spell' },
  ],
  quickActions: [
    { id: 1, label: 'Crop Doctor', icon: Activity, screen: 'CropsDoctor' },
    { id: 2, label: 'Mandi Bhav', icon: ShoppingBag, screen: 'MandiBhav' },
    { id: 3, label: 'Schemes', icon: Calendar, screen: 'GovSchemes' },
    { id: 4, label: 'Advisory', icon: User, screen: 'Advisory' },
    { id: 5, label: 'Soil Health', icon: Leaf, screen: 'SoilHealth' },
    { id: 6, label: 'IGKV News', icon: Bell, screen: 'News' },
  ],
  emart: [
    {
      id: 1,
      title: 'Hybrid Wheat Seeds',
      tag: '98% Match',
      sub: 'Perfect for your soil type',
      imageUrl: 'https://images.unsplash.com/photo-1705937071617-a47ce6c89274?q=80&w=889',
      screen: 'Marketplace',
    },
    {
      id: 2,
      title: 'Neem Bio-Pesticide',
      tag: 'Eco Safe',
      sub: 'Safe for current humidity',
      imageUrl: 'https://images.unsplash.com/photo-1700977932725-bf8a069b82db?q=80&w=1075',
      screen: 'Marketplace',
    },
    {
      id: 3,
      title: 'Smart Sprayer',
      tag: 'High ROI',
      sub: 'Reduces waste by 40%',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1678655852520-ef100abce7f6?q=80&w=687',
      screen: 'Marketplace',
    },
  ],
  offers: [
    {
      id: 1,
      title: 'Ravi Crop Seminar',
      price: 'Free Entry',
      image: 'https://images.unsplash.com/photo-1738175186796-ca056cb132f0?q=80&w=629',
      screen: 'OfferDetails',
      badge: 'Trending',
    },
    {
      id: 2,
      title: 'Soil Testing Kit',
      price: '₹299',
      image: 'https://plus.unsplash.com/premium_photo-1661902899911-d7b89906e638?q=80&w=1191',
      screen: 'OfferDetails',
      badge: 'Hot Deal',
    },
    {
      id: 3,
      title: 'Drip Irrigation',
      price: '40% Subsidy',
      image: 'https://images.unsplash.com/photo-1738598665806-7ecc32c3594c?q=80&w=687',
      screen: 'OfferDetails',
      badge: 'Govt Scheme',
    },
  ],
};

const HERO_IMAGES = [
  { id: 1, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000' },
  { id: 2, image: 'https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=1074' },
];

/* ================= ANIMATION COMPONENTS ================= */

const FloatingWeather = ({ label, value, sub, delay }) => {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -6, duration: 2000, useNativeDriver: true, delay }),
        Animated.timing(float, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={[styles.glassCard, { transform: [{ translateY: float }] }]}>
      <Text style={styles.weatherLabel}>{label}</Text>
      <Text style={styles.weatherValue}>{value}</Text>
      <Text style={styles.weatherSub}>{sub}</Text>
    </Animated.View>
  );
};

const InteractiveCard = ({ children, style, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
};

// --- NEW COMPONENT: Waving Robot Hand ---
const WavingHand = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const wave = Animated.sequence([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(800), // 👈 rest between waves
      Animated.timing(rotate, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(wave).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-12deg', '12deg'], // 👈 smaller, realistic angle
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate: rotation }],
        transformOrigin: 'bottom center', // 👈 wrist pivot (RN supports visually)
      }}
    >
      <Text style={{ fontSize: 18 }}>👋</Text>
    </Animated.View>
  );
};


/* ================= MAIN COMPONENT ================= */
const SmartFarmDashboard = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // -- AUTO SCROLL REFS & STATE --
  const offersScrollRef = useRef(null);
  const recommendScrollRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Initial Fade In
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }).start();
  }, []);

  // --- AUTO SCROLL LOGIC ---
  useEffect(() => {
    const interval = setInterval(() => {
        offersScrollRef.current?.scrollTo({ x: (Date.now() % DASHBOARD_DATA.offers.length) * SNAP_INTERVAL, animated: true });
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        recommendScrollRef.current?.scrollTo({ x: (Date.now() % DASHBOARD_DATA.emart.length) * RECOMMEND_SNAP, animated: true });
    }, 5000); 
    return () => clearInterval(interval);
  }, []);


  const headerScale = scrollY.interpolate({
    inputRange: [-150, 0],
    outputRange: [1.25, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header gradientColors={['#1a2e12', '#4a7c2a']} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* ===== HERO & PROFILE SECTION ===== */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.imageBackgroundContainer}
            onPress={() => setImageIndex((imageIndex + 1) % HERO_IMAGES.length)}
          >
            <Animated.Image
              source={{ uri: HERO_IMAGES[imageIndex].image }}
              style={[
                styles.headerImage,
                { transform: [{ scale: headerScale }] },
              ]}
            />
             <View style={styles.darkGradient} />
          </TouchableOpacity>

          <SafeAreaView style={{flex: 1}}>
             {/* 1. PROFILE (Top) */}
            <View style={styles.headerTop}>
              <TouchableOpacity style={styles.profileRow} onPress={() => navigation.navigate('Profile')}>
                <View style={styles.avatar}>
                   <User size={20} color="white" />
                </View>
                <View>
                  <Text style={styles.greetingText}>{DASHBOARD_DATA.profile.greeting}</Text>
                  <Text style={styles.userName}>{DASHBOARD_DATA.profile.name}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                <Bell color="white" size={20} />
                <View style={styles.notificationDot} />
              </TouchableOpacity> */}
            </View>

            {/* 2. HERO CONTENT (Bottom) */}
            <View style={styles.heroContent}>
              <Animated.View style={[styles.heroGlass, { opacity: fadeAnim }]}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                   <Sparkles size={12} color="#c8f7c5" />
                   <Text style={styles.heroBadge}>AI POWERED</Text>
                </View>
                <Text style={styles.heroTitle}>Smart Farm Intelligence</Text>
                <Text style={styles.heroSub}>Crop • Weather • Advisory • Diagnosis</Text>
              </Animated.View>

              <View style={styles.weatherGrid}>
                {DASHBOARD_DATA.weather.map((item, idx) => (
                  <FloatingWeather key={item.id} {...item} delay={idx * 150} />
                ))}
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* ===== SEARCH ===== */}
        <Animated.View style={[styles.searchContainer, { opacity: fadeAnim }]}>
          <Search size={20} color={COLORS.textSub} />
          <TextInput
            placeholder="Ask AI about crops, pests, weather…"
            placeholderTextColor="#888"
            style={styles.searchInput}
            onFocus={() => navigation.navigate('SearchScreen')}
          />
        </Animated.View>

        {/* ===== QUICK ACTIONS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Shortcuts</Text>
          <View style={styles.quickActionGrid}>
            {DASHBOARD_DATA.quickActions.map((item) => (
              <View key={item.id} style={styles.actionItem}>
                <InteractiveCard 
                  style={styles.actionCircle} 
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <item.icon size={22} color={COLORS.primaryDark} />
                </InteractiveCard>
                <Text style={styles.actionLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== AI TOOLS (FIXED LAYOUT & WAVING ROBOT) ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Tools</Text>
          <View style={styles.toolsRow}>
            
            {/* 1. Crop Doctor */}
            <InteractiveCard
                style={styles.toolCard}
                onPress={() => navigation.navigate('CropDoctor')}
            >
                <View style={styles.toolHeader}>
                    <View style={[styles.toolIcon, { backgroundColor: '#F0FDF4' }]}>
                        <ScanLine color="#16A34A" size={24} />
                    </View>
                    <View style={styles.liveBadge}><Text style={styles.liveText}>CAMERA</Text></View>
                </View>
                <Text style={styles.toolTitle}>Crop Doctor</Text>
                <Text style={styles.toolSub}>Scan leaf for disease</Text>
                
                <TouchableOpacity style={[styles.toolActionBtn, { backgroundColor: '#16A34A' }]} onPress={() => navigation.navigate('CropDoctor')}>
                    <Text style={styles.toolBtnText}>Open Camera</Text>
                    <Camera size={16} color="white" />
                </TouchableOpacity>
            </InteractiveCard>

             {/* 2. Kisan Sahayak (WITH WAVING ROBOT) */}
             <InteractiveCard
                style={styles.toolCard}
                onPress={() => navigation.navigate('ChatAdvisor')}
            >
                <View style={styles.toolHeader}>
                    <View style={[styles.toolIcon, { backgroundColor: '#EFF6FF' }]}>
                        <Bot color="#2563EB" size={24} />
                    </View>
                    {/* ANIMATED WAVING HAND */}
                    <View style={styles.robotBubble}>
                        <Text style={styles.robotText}>Hi! </Text>
                        <WavingHand />
                    </View>
                </View>
                <Text style={styles.toolTitle}>Kisan Sahayak</Text>
                <Text style={styles.toolSub}>Chat with Expert AI</Text>

                 <TouchableOpacity style={[styles.toolActionBtn, { backgroundColor: '#2563EB' }]} onPress={() => navigation.navigate('ChatAdvisor')}>
                    <Text style={styles.toolBtnText}>Start Chat</Text>
                    <MessageCircle size={16} color="white" />
                </TouchableOpacity>
            </InteractiveCard>

          </View>
        </View>


        {/* ===== AI RECOMMENDATIONS ===== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
               <Zap size={18} color={COLORS.primaryDark} fill={COLORS.primaryDark}/>
               <Text style={styles.sectionTitle}>Smart Recommendations</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
               <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            ref={recommendScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            snapToInterval={RECOMMEND_SNAP}
            decelerationRate="fast"
          >
            {DASHBOARD_DATA.emart.map((item) => (
              <InteractiveCard
                key={item.id}
                style={styles.recommendCard}
                onPress={() => navigation.navigate(item.screen)}
              >
                <ImageBackground
                  source={{ uri: item.imageUrl }}
                  style={styles.recommendImg}
                  imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                >
                    <View style={styles.scoreBadge}>
                        <Percent size={10} color="white" />
                        <Text style={styles.scoreText}>{item.tag}</Text>
                    </View>
                </ImageBackground>
                
              <View style={styles.recommendContent}>
                    <Text style={styles.recommendTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.recommendSub} numberOfLines={2}>{item.sub}</Text>
                    <View style={styles.recommendFooter}>
                       <Text style={styles.recommendLink}>View Details</Text>
                       {/* FIXED: Changed ArrowUpRight to ArrowRight */}
                       <ArrowRight size={14} color={COLORS.primaryDark} />
                    </View>
                </View>
              </InteractiveCard>
            ))}
          </ScrollView>
        </View>

        {/* ===== BEST OFFERS CAROUSEL ===== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
               <TrendingUp size={18} color="#e11d48" />
               <Text style={styles.sectionTitle}>Exclusive Offers</Text>
            </View>
          </View>

          <ScrollView 
            ref={offersScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={SNAP_INTERVAL}
            snapToAlignment="start"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {DASHBOARD_DATA.offers.map((offer) => (
              <InteractiveCard 
                key={offer.id} 
                style={styles.carouselCard}
                onPress={() => navigation.navigate(offer.screen)}
              >
                <ImageBackground
                  source={{ uri: offer.image }}
                  style={styles.carouselImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <View style={styles.carouselOverlay} />
                  <View style={styles.badgeContainer}>
                      <Text style={styles.badgeLabel}>{offer.badge}</Text>
                  </View>
                 {/* Glass Footer */}
                  <View style={styles.carouselGlassFooter}>
                    <View style={{flex: 1}}>
                        <Text style={styles.carouselTitle}>{offer.title}</Text>
                        <Text style={styles.carouselPrice}>{offer.price}</Text>
                    </View>
                    <View style={styles.btnCircle}>
                        {/* FIXED: Changed ArrowUpRight to ArrowRight */}
                        <ArrowRight size={20} color="black" />
                    </View>
                  </View>
                </ImageBackground>
              </InteractiveCard>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>

      <Footer />
    </View>
  );
};

export default SmartFarmDashboard;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // --- HEADER & HERO ---
  headerWrapper: {
    height: 420, 
    backgroundColor: '#1a2e12',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  imageBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  headerImage: { width: '100%', height: '100%' },
  darkGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },

  // FIXED PROFILE HEADER
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  greetingText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '500' },
  userName: { color: 'white', fontWeight: 'bold', fontSize: 18, letterSpacing: 0.5 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4d4d',
    borderWidth: 1,
    borderColor: 'white'
  },

  // HERO CONTENT
  heroContent: {
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 40,
  },
  heroGlass: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroBadge: {
    color: '#c8f7c5',
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    fontSize: 13,
  },
  weatherGrid: { flexDirection: 'row', gap: 10, marginTop: 20 },
  glassCard: {
    flex: 1,
    backgroundColor: COLORS.glass,
    padding: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  weatherLabel: { color: '#cfe7cf', fontSize: 10, fontWeight: 'bold' },
  weatherValue: { color: 'white', fontSize: 20, fontWeight: '900' },
  weatherSub: { color: 'white', fontSize: 10 },

  // --- SEARCH ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: 55,
    borderRadius: 30,
    marginTop: -28,
    paddingHorizontal: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

  // --- SECTIONS ---
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, marginBottom: 15 },
  sectionLink: { color: COLORS.primaryDark, fontSize: 13, fontWeight: 'bold' },

  // --- QUICK ACTIONS ---
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionItem: { width: '33%', alignItems: 'center', marginBottom: 20 },
  actionCircle: {
    width: 58,
    height: 58,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textSub },

  // --- TOOLS (FIXED LAYOUT) ---
  toolsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: TOOL_GAP 
  },
  toolCard: {
      width: TOOL_CARD_WIDTH, // Precise width to prevent overflow
      backgroundColor: 'white',
      borderRadius: 24,
      padding: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  liveText: { fontSize: 9, fontWeight: 'bold', color: '#16A34A' },
  
  robotBubble: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  robotText: { fontSize: 10, fontWeight: 'bold', color: '#111827' },

  toolTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  toolSub: { fontSize: 12, color: '#6b7280', marginTop: 2, marginBottom: 16 },

  toolActionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 12,
      gap: 6,
      width: '100%'
  },
  toolBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },


  // --- RECOMMENDATIONS ---
recommendCard: {
  width: RECOMMEND_CARD_WIDTH,
  marginLeft: 20,          // first card spacing
  marginRight: 0,          // handled by gap
  borderRadius: 20,
  backgroundColor: '#fff',
  overflow: 'hidden',
},

  recommendImg: { 
      width: '100%', 
      height: 100, 
      justifyContent: 'flex-start',
      padding: 10 
  },
  scoreBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primaryDark,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-end',
      gap: 4
  },
  scoreText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  recommendContent: { padding: 12 },
  recommendTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  recommendSub: { fontSize: 11, color: COLORS.textSub, lineHeight: 16, marginBottom: 10 },
  recommendFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recommendLink: { fontSize: 11, fontWeight: '700', color: COLORS.primaryDark },

  // --- CAROUSEL ---
  carouselCard: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: CARD_MARGIN,
    borderRadius: 24,
    backgroundColor: 'white',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 15,
  },
  carouselImage: { width: '100%', height: '100%', justifyContent: 'space-between', padding: 0 },
  carouselOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 24 },
  badgeContainer: { 
      marginTop: 15,
      marginLeft: 15,
      backgroundColor: 'white', 
      alignSelf: 'flex-start', 
      paddingHorizontal: 12, 
      paddingVertical: 6, 
      borderRadius: 12 
  },
  badgeLabel: { fontSize: 11, fontWeight: 'bold', color: 'black' },
  carouselGlassFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.90)',
      margin: 10,
      padding: 15,
      borderRadius: 18,
  },
  carouselTitle: { color: COLORS.textMain, fontSize: 16, fontWeight: 'bold' },
  carouselPrice: { color: COLORS.primaryDark, fontSize: 15, fontWeight: '800', marginTop: 2 },
  btnCircle: { 
      width: 40, 
      height: 40, 
      borderRadius: 20, 
      backgroundColor: COLORS.background, 
      justifyContent: 'center', 
      alignItems: 'center' 
  },
});