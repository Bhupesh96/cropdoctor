import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  RefreshControl,
  Animated,
  Easing,
  StatusBar
} from 'react-native';

import { 
  Camera, 
  CheckCircle2, 
  ScanLine, 
  ArrowRight, 
  AlertCircle, 
  Bug, 
  RotateCcw 
} from 'lucide-react-native';

import LinearGradient from 'react-native-linear-gradient';
// Assuming ImageInput is your existing component wrapper
import ImageInput from '../../core/Services/imageinput/ImageInput';
import Header from '../../shared/layouts/Header/Header';
import Footer from '../../shared/layouts/Footer/Footer';

const { width } = Dimensions.get('window');

/* ================= THEME COLORS ================= */
const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#4a7c2a',
  background: '#f8fafc',
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  error: '#ef4444',
  scanLine: '#38bdf8' // Cyan for the "AI Scan" effect
};

const InsectAnalysis = () => {
  const [images, setImages] = useState({ front: null, side: null, top: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState(null);

  // Animation for the scanning line
  const scanAnim = useRef(new Animated.Value(0)).current;

  const startScanAnimation = () => {
    scanAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopScanAnimation = () => {
    scanAnim.stopAnimation();
    scanAnim.setValue(0);
  };

  const handleImageSelect = (selectedImage, angle) => {
    if (selectedImage?.uri) {
      setImages((prev) => ({ ...prev, [angle]: selectedImage.uri }));
      // Reset result if user changes image
      setResult(null); 
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setImages({ front: null, side: null, top: null });
    setResult(null);
    setRefreshing(false);
  }, []);

  const analyzeInsect = () => {
    if (!images.front || !images.side || !images.top) {
      Alert.alert('Incomplete Data', 'Please provide images for all three angles for accurate detection.');
      return;
    }
    
    setIsProcessing(true);
    startScanAnimation();

    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      stopScanAnimation();
      setResult({
        name: 'Seven-Spotted Ladybug',
        scientific: 'Coccinella septempunctata',
        accuracy: '94%',
        description: 'Beneficial insect. Preys on aphids and scale insects.',
        status: 'Safe'
      });
    }, 3000);
  };

  // --- RENDER COMPONENT: IMAGE SLOT ---
  const renderImageSlot = (angle, label) => {
    const uri = images[angle];
    const isFilled = !!uri;

    // Interpolate scan line movement
    const translateY = scanAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Adjust based on box height
    });

    return (
      <View style={styles.slotContainer}>
        <View style={[
          styles.imageBox, 
          isFilled ? styles.imageBoxFilled : styles.imageBoxEmpty,
          isProcessing && styles.imageBoxScanning
        ]}>
          
          {/* CONTENT */}
          {isFilled ? (
            <>
              <Image source={{ uri }} style={styles.fullImage} />
              {/* Overlay while scanning */}
              {isProcessing && (
                <View style={styles.scanOverlay}>
                   <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
                </View>
              )}
              {/* Success Badge */}
              {!isProcessing && (
                <View style={styles.checkBadge}>
                  <CheckCircle2 size={12} color="white" strokeWidth={4} />
                </View>
              )}
            </>
          ) : (
            // Placeholder / Input
            <View style={styles.placeholderContent}>
               <View style={styles.iconCircle}>
                 <Camera size={20} color={COLORS.primaryDark} />
               </View>
               <Text style={styles.placeholderText}>Add Photo</Text>
               
               {/* Invisible Overlay for Touch */}
               <View style={StyleSheet.absoluteFill}>
                 <ImageInput onImageSelect={(img) => handleImageSelect(img, angle)} />
               </View>
            </View>
          )}

        </View>
        <Text style={styles.slotLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <Header gradientColors={['#1a2e12', '#4a7c2a']} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
      >
        
        {/* --- HEADER SECTION --- */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Bug size={24} color={COLORS.primaryDark} />
            <Text style={styles.mainTitle}>Pest Diagnosis</Text>
          </View>
          <Text style={styles.subtitle}>
            Upload photos from 3 different angles for AI identification.
          </Text>
        </View>

        {/* --- IMAGE GRID --- */}
        <View style={styles.gridContainer}>
          {renderImageSlot('front', 'Front View')}
          {renderImageSlot('side', 'Side View')}
          {renderImageSlot('top', 'Top View')}
        </View>

        {/* --- ACTION OR RESULT --- */}
        {result ? (
           // RESULT CARD
           <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                  <View style={[styles.resultBadge, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={[styles.resultBadgeText, { color: '#166534' }]}>{result.accuracy} Match</Text>
                  </View>
                  <Text style={styles.resultStatus}>{result.status}</Text>
              </View>
              
              <Text style={styles.pestName}>{result.name}</Text>
              <Text style={styles.scientificName}>{result.scientific}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.description}>{result.description}</Text>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setResult(null)}>
                  <RotateCcw size={16} color={COLORS.primaryDark} />
                  <Text style={styles.secondaryBtnText}>Analyze Another</Text>
              </TouchableOpacity>
           </View>
        ) : (
           // INFO CARD (BEFORE ANALYSIS)
           <View style={styles.infoCard}>
             <AlertCircle size={20} color={COLORS.textSub} />
             <Text style={styles.infoText}>
                {isProcessing 
                  ? "AI is scanning your crop samples..." 
                  : "Ensure photos are clear and focused."}
             </Text>
           </View>
        )}

        {/* --- MAIN BUTTON --- */}
        {!result && (
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={analyzeInsect}
            disabled={isProcessing}
            style={[styles.analyzeBtn, isProcessing && styles.btnDisabled]}
          >
            {isProcessing ? (
               <Text style={styles.btnText}>ANALYZING...</Text>
            ) : (
               <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                 <ScanLine size={20} color="white" />
                 <Text style={styles.btnText}>DETECT PEST</Text>
               </View>
            )}
          </TouchableOpacity>
        )}

      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 100 
  },

  // --- TITLE ---
  titleSection: { 
    marginBottom: 25,
    marginTop: 10
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  mainTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: COLORS.textMain, 
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 14, 
    color: COLORS.textSub, 
    lineHeight: 20 
  },

  // --- GRID ---
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10
  },
  slotContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative'
  },
  imageBoxEmpty: {
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBoxFilled: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
    borderStyle: 'solid',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  imageBoxScanning: {
    borderColor: COLORS.scanLine,
    borderWidth: 2
  },

  // Content inside Box
  placeholderContent: {
    alignItems: 'center',
    gap: 8
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    fontSize: 11,
    color: COLORS.textSub,
    fontWeight: '600'
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    padding: 2,
    zIndex: 10
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMain,
    marginTop: 8,
    textTransform: 'uppercase'
  },

  // --- SCANNING ANIMATION ---
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 5
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.scanLine,
    shadowColor: COLORS.scanLine,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5
  },

  // --- INFO / RESULTS ---
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSub,
    flex: 1
  },

  // Result Card
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  resultBadgeText: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  resultStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSub
  },
  pestName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textSub,
    marginBottom: 16
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 16
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: 12
  },
  secondaryBtnText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    fontSize: 13
  },

  // --- BUTTON ---
  analyzeBtn: {
    backgroundColor: COLORS.primaryDark,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20
  },
  btnDisabled: {
    backgroundColor: COLORS.textSub,
    elevation: 0
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default InsectAnalysis;