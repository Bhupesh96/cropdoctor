import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity,
  TextInput, Modal, KeyboardAvoidingView, Platform,
  PanResponder, Animated, Dimensions
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

// --- THEME ---
const THEME = {
  primary: '#059669',       
  primaryDark: '#047857',   
  bg: '#FFFFFF',            
  inputFill: '#F8FAFC',     
  textMain: '#1E293B',      
  textSub: '#94A3B8',       
  border: '#E2E8F0',
};

// --- COMPONENTS ---

const PremiumInput = ({ icon, label, value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <FontAwesome6 name={icon} size={16} color={THEME.primary} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={THEME.textSub}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const PremiumPicker = ({ label, icon, selectedValue, onValueChange, items }) => (
  <View style={[styles.fieldContainer, { flex: 1 }]}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <FontAwesome6 name={icon} size={16} color={THEME.primary} style={styles.inputIcon} />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={THEME.textSub}
          mode="dropdown"
        >
          <Picker.Item label="Select" value="" color={THEME.textSub} style={{fontSize: 14}} />
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} color={THEME.textMain} style={{fontSize: 14}} />
          ))}
        </Picker>
      </View>
    </View>
  </View>
);

const UpdateProfileModal = ({ visible, onClose, formData, setFormData, langId, onSave }) => {
  
  // --- DRAG LOGIC START ---
  const panY = useRef(new Animated.Value(0)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true, // improved performance
  });

  const closeAnim = Animated.timing(panY, {
    toValue: height,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Only allow dragging downwards (positive Y)
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        // If dragged down more than 150px, close the modal
        if (gestureState.dy > 150) {
          closeAnim.start(onClose);
        } else {
          // Otherwise, snap back to top
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  // Reset position when modal opens
  React.useEffect(() => {
    if (visible) {
      panY.setValue(0);
    }
  }, [visible]);
  // --- DRAG LOGIC END ---

  // Mock Data
  const countries = [{ label: "India", value: 1 }, { label: "Other", value: 2 }];
  const genders = [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }];
  const states = [{ label: "Chhattisgarh", value: "Chhattisgarh" }, { label: "Punjab", value: "Punjab" }];
  const districts = [{ label: "Raipur", value: "Raipur" }, { label: "Durg", value: "Durg" }];
  const blocks = [{ label: "Dharsiwa", value: "Dharsiwa" }, { label: "Abhanpur", value: "Abhanpur" }];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        
        <TouchableOpacity style={styles.dismissArea} onPress={onClose} activeOpacity={1} />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={styles.keyboardView}
        >
          {/* Animated View enables the drag movement */}
          <Animated.View 
            style={[styles.modalCard, { transform: [{ translateY: panY }] }]} 
          >
            
            {/* --- Header with PanResponder attached --- */}
            <View style={styles.header} {...panResponder.panHandlers}>
              {/* The Drag Pill visual */}
              <View style={styles.dragPillWrapper}>
                 <View style={styles.dragPill} />
              </View>

              <View style={styles.headerTitleRow}>
                <View>
                  <Text style={styles.modalTitle}>
                    {langId === "1" ? "प्रोफ़ाइल अपडेट" : "Edit Profile"}
                  </Text>
                  <Text style={styles.modalSubtitle}>Keep your farm details up to date</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <FontAwesome6 name="xmark" size={20} color={THEME.textMain} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={styles.scrollContent}
              // Prevent scroll from interfering with header drag
              bounces={false} 
            >
              
              <View style={styles.section}>
                <PremiumInput 
                  label="FULL NAME" icon="user" 
                  value={formData.name} 
                  onChangeText={(t) => setFormData({ ...formData, name: t })} 
                />

                <View style={styles.row}>
                  <PremiumPicker 
                    label="GENDER" icon="venus-mars"
                    selectedValue={formData.gender}
                    onValueChange={(v) => setFormData({ ...formData, gender: v })}
                    items={genders}
                  />
                  <View style={{ width: 16 }} />
                  <PremiumPicker 
                    label="COUNTRY" icon="earth-americas"
                    selectedValue={formData.countryId}
                    onValueChange={(v) => setFormData({ ...formData, countryId: v })}
                    items={countries}
                  />
                </View>

                <PremiumInput 
                  label="MOBILE NUMBER" icon="mobile-screen" 
                  value={formData.mobile} 
                  keyboardType="phone-pad" 
                  onChangeText={(t) => setFormData({ ...formData, mobile: t })} 
                />
                
                <PremiumInput 
                  label="EMAIL ADDRESS" icon="envelope" 
                  value={formData.email} 
                  keyboardType="email-address" 
                  onChangeText={(t) => setFormData({ ...formData, email: t })} 
                />
              </View>

              <View style={styles.divider} />
              
              <View style={styles.section}>
                <View style={styles.row}>
                  <PremiumPicker 
                    label="STATE" icon="map"
                    selectedValue={formData.state}
                    onValueChange={(v) => setFormData({ ...formData, state: v })}
                    items={states}
                  />
                  <View style={{ width: 16 }} />
                  <PremiumPicker 
                    label="DISTRICT" icon="location-dot"
                    selectedValue={formData.district}
                    onValueChange={(v) => setFormData({ ...formData, district: v })}
                    items={districts}
                  />
                </View>

                <PremiumPicker 
                  label="BLOCK / TEHSIL" icon="building"
                  selectedValue={formData.block}
                  onValueChange={(v) => setFormData({ ...formData, block: v })}
                  items={blocks}
                />
              </View>

              <View style={styles.cropCard}>
                <View style={styles.cropIconBg}>
                    <FontAwesome6 name="wheat-awn" size={18} color="#D97706" />
                </View>
                <View>
                    <Text style={styles.cropLabel}>REGISTERED CROPS</Text>
                    <Text style={styles.cropValue}>{formData.crops || "Wheat, Rice"}</Text>
                </View>
              </View>

              <View style={{ height: 100 }} /> 
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity activeOpacity={0.8} onPress={onSave} style={styles.saveBtnShadow}>
                <LinearGradient 
                  colors={[THEME.primary, THEME.primaryDark]} 
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                  style={styles.saveBtn}
                >
                  <Text style={styles.saveBtnText}>
                    {langId === "1" ? "परिवर्तन सहेजें" : "Save Changes"}
                  </Text>
                  <FontAwesome6 name="check" size={16} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  keyboardView: {
    width: '100%',
    height: '85%', 
  },
  modalCard: {
    flex: 1,
    backgroundColor: THEME.bg,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  
  // --- Header ---
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    zIndex: 10,
  },
  // Increased hit slop area for the drag pill
  dragPillWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10, // Gives area to grab
  },
  dragPill: {
    width: 48,
    height: 5,
    backgroundColor: '#CBD5E1', // Slightly darker for visibility
    borderRadius: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.textMain,
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: THEME.textSub,
    marginTop: 4,
    fontWeight: '500',
  },
  closeBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- Scroll Area ---
  scrollContent: {
    padding: 24,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 20,
  },

  // --- Inputs ---
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.inputFill,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent', 
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: THEME.textMain,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: Platform.OS === 'android' ? -8 : 0, 
  },
  picker: {
    width: '100%',
    color: THEME.textMain,
  },

  // --- Crops Card ---
  cropCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB', 
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: 20,
  },
  cropIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cropLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706', 
    marginBottom: 2,
  },
  cropValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },

  // --- Footer Button ---
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  saveBtnShadow: {
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  saveBtn: {
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default UpdateProfileModal;