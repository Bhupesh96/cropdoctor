import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

// --- THEME CONSTANTS ---
const THEME = {
  // Deep lush gradient (Dark Emerald to Forest Green)
  bgGradient: ['#0f2027', '#203a43', '#2c5364'], 
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  textWhite: '#FFFFFF',
  textDim: 'rgba(255, 255, 255, 0.7)',
  accent: '#4ade80', // Bright Green
  warning: '#fbbf24',
};

// --- HELPER: Glass Card Component ---
const GlassCard = ({ children, style }) => (
  <View style={[styles.glassCard, style]}>
    {children}
  </View>
);

// --- COMPONENT: Immersive Hero Section ---
const HeroSection = () => (
  <View style={styles.heroContainer}>
    {/* Artistic Background Element */}
    <View style={styles.sunGlow} />
    <FontAwesome6 name="sun" size={200} color="#fbbf24" solid style={styles.bgIcon} />

    {/* Content */}
    <View style={styles.heroTopBar}>
      <View style={styles.locationTag}>
        <FontAwesome6 name="location-dot" size={14} color={THEME.accent} />
        <Text style={styles.locationText}>Napa Valley, CA</Text>
      </View>
      <TouchableOpacity style={styles.bellBtn}>
        <FontAwesome6 name="bell" size={18} color="#FFF" />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>

    <View style={styles.tempContainer}>
      <Text style={styles.tempText}>28°</Text>
      <View style={styles.conditionContainer}>
        <Text style={styles.conditionText}>Sunny</Text>
        <Text style={styles.highLowText}>H:32° L:19°</Text>
      </View>
    </View>

    {/* Glass Stats Row */}
    <View style={styles.heroStatsRow}>
      <GlassCard style={styles.statPill}>
        <FontAwesome6 name="droplet" size={14} color="#60a5fa" />
        <Text style={styles.statText}>60%</Text>
      </GlassCard>
      <GlassCard style={styles.statPill}>
        <FontAwesome6 name="wind" size={14} color="#a78bfa" />
        <Text style={styles.statText}>15 km/h</Text>
      </GlassCard>
      <GlassCard style={styles.statPill}>
        <FontAwesome6 name="leaf" size={14} color={THEME.accent} />
        <Text style={styles.statText}>AQI 55</Text>
      </GlassCard>
    </View>
  </View>
);

// --- COMPONENT: Forecast Strip ---
const ForecastStrip = () => {
  const data = [
    { time: 'Now', icon: 'sun', temp: '28°', active: true },
    { time: '1 PM', icon: 'cloud-sun', temp: '29°' },
    { time: '2 PM', icon: 'cloud', temp: '27°' },
    { time: '3 PM', icon: 'cloud-showers-heavy', temp: '24°' },
    { time: '4 PM', icon: 'cloud-moon', temp: '22°' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20 }}>
        {data.map((item, index) => (
          <View 
            key={index} 
            style={[styles.forecastItem, item.active && styles.forecastItemActive]}
          >
            <Text style={[styles.fcTime, item.active && { color: '#0f2027' }]}>{item.time}</Text>
            <FontAwesome6 
              name={item.icon} 
              size={20} 
              color={item.active ? '#0f2027' : '#FFF'} 
              style={{ marginVertical: 8 }}
            />
            <Text style={[styles.fcTemp, item.active && { color: '#0f2027' }]}>{item.temp}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// --- COMPONENT: Smart Insights (The "Action" Area) ---
const SmartInsights = () => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Farm Intelligence</Text>
    
    {/* Main Insight Card */}
    <LinearGradient 
      colors={['#4ade80', '#22c55e']} 
      start={{x:0, y:0}} end={{x:1, y:0}}
      style={styles.insightCard}
    >
      <View style={styles.insightContent}>
        <View style={styles.insightIconBox}>
          <FontAwesome6 name="faucet-drip" size={20} color="#14532d" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.insightTitle}>Irrigation Window Open</Text>
          <Text style={styles.insightSub}>Optimal moisture absorption until 5 PM.</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Start</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>

    {/* Secondary Alert */}
    <GlassCard style={styles.alertRow}>
       <View style={[styles.dot, { backgroundColor: '#fbbf24' }]} />
       <Text style={styles.alertText}>Heat Advisory warning for tomorrow morning.</Text>
    </GlassCard>
  </View>
);

// --- COMPONENT: Soil Matrix (Grid Layout) ---
const SoilMatrix = () => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Soil Conditions</Text>
    <View style={styles.grid}>
      
      {/* Moisture Block */}
      <GlassCard style={styles.gridBox}>
        <View style={styles.gridHeader}>
           <FontAwesome6 name="layer-group" size={16} color={THEME.accent} />
           <Text style={styles.gridLabel}>Moisture</Text>
        </View>
        <Text style={styles.gridValue}>75<Text style={styles.unit}>%</Text></Text>
        <View style={styles.progressBarBg}>
           <View style={[styles.progressBarFill, { width: '75%' }]} />
        </View>
      </GlassCard>

      {/* Temp Block */}
      <GlassCard style={styles.gridBox}>
        <View style={styles.gridHeader}>
           <FontAwesome6 name="temperature-low" size={16} color="#f87171" />
           <Text style={styles.gridLabel}>Temp</Text>
        </View>
        <Text style={styles.gridValue}>22<Text style={styles.unit}>°c</Text></Text>
        <View style={styles.progressBarBg}>
           <View style={[styles.progressBarFill, { width: '45%', backgroundColor: '#f87171' }]} />
        </View>
      </GlassCard>

    </View>
  </View>
);

// --- MAIN SCREEN ---
const WeatherForecastScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Gradient */}
      <LinearGradient 
        colors={THEME.bgGradient} 
        style={StyleSheet.absoluteFillObject} 
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          <HeroSection />
          
          <View style={styles.curvedSheet}>
             <ForecastStrip />
             <SmartInsights />
             <SoilMatrix />
             
             {/* Yield Graph Placeholder */}
             <View style={styles.section}>
                <Text style={styles.sectionHeader}>Projected Yield</Text>
                <GlassCard style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome6 name="chart-line" size={40} color="rgba(255,255,255,0.3)" />
                    <Text style={{ color: THEME.textDim, marginTop: 10 }}>+5% vs Last Season</Text>
                </GlassCard>
             </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Glass Effect
  glassCard: {
    backgroundColor: THEME.glass,
    borderColor: THEME.glassBorder,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Hero Styles
  heroContainer: {
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  sunGlow: {
    position: 'absolute',
    top: -50, right: -50,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(251, 191, 36, 0.3)', // Glow effect
    blurRadius: 50,
  },
  bgIcon: {
    position: 'absolute',
    top: 20,
    right: -40,
    opacity: 0.15, // Subtle background icon
  },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8
  },
  locationText: { color: '#FFF', fontWeight: '600' },
  bellBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  notificationDot: {
    position: 'absolute', top: 10, right: 10,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#f87171'
  },
  
  // Big Temp
  tempContainer: { marginBottom: 30 },
  tempText: {
    fontSize: 92,
    fontWeight: '800',
    color: '#FFF',
    includeFontPadding: false,
    lineHeight: 92,
  },
  conditionContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingLeft: 5 },
  conditionText: { fontSize: 24, color: THEME.accent, fontWeight: '600' },
  highLowText: { fontSize: 16, color: THEME.textDim, marginBottom: 4 },

  // Stats Row
  heroStatsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  statText: { color: '#FFF', fontWeight: '600', fontSize: 13 },

  // Content Sheet
  curvedSheet: {
    flex: 1,
    // Note: We aren't using a white sheet, we keep it transparent but add padding
    paddingTop: 10,
  },

  // Sections
  section: { marginBottom: 30, paddingHorizontal: 20 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 15,
    opacity: 0.9,
  },

  // Forecast
  forecastItem: {
    width: 65,
    height: 110,
    borderRadius: 35, // High radius for pill shape
    backgroundColor: 'rgba(0,0,0,0.2)', // Darker translucent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  forecastItemActive: {
    backgroundColor: THEME.accent,
  },
  fcTime: { fontSize: 12, color: THEME.textDim, fontWeight: '600' },
  fcTemp: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },

  // Insights
  insightCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 10,
  },
  insightContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  insightIconBox: {
    width: 45, height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    justifyContent: 'center', alignItems: 'center'
  },
  insightTitle: { fontSize: 16, fontWeight: 'bold', color: '#064e3b' },
  insightSub: { fontSize: 12, color: '#065f46', marginTop: 2, flexWrap: 'wrap' },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 12,
  },
  actionBtnText: { color: '#064e3b', fontWeight: '700', fontSize: 12 },
  
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 12
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  alertText: { color: THEME.textDim, fontSize: 13, flex: 1 },

  // Grid
  grid: { flexDirection: 'row', gap: 15 },
  gridBox: {
    flex: 1,
    padding: 20,
    aspectRatio: 1.1, // Square-ish
    justifyContent: 'space-between'
  },
  gridHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gridLabel: { color: THEME.textDim, fontSize: 14, fontWeight: '600' },
  gridValue: { fontSize: 32, fontWeight: '700', color: '#FFF' },
  unit: { fontSize: 14, color: THEME.textDim, fontWeight: '400' },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginTop: 10
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.accent,
    borderRadius: 3,
  }
});

export default WeatherForecastScreen;