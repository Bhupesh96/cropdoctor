import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Platform
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function OrderDetails() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dynamic Styles based on Theme
  const theme = {
    background: isDarkMode ? '#000000' : '#f1f2f4',
    surface: isDarkMode ? '#1c1c1e' : '#ffffff',
    textPrimary: isDarkMode ? '#ffffff' : '#212121',
    textSecondary: isDarkMode ? '#8e8e93' : '#878787',
    border: isDarkMode ? '#333' : '#e0e0e0',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <FontAwesome6 name="arrow-back" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Order Details</Text>
        </View>
        <TouchableOpacity style={[styles.helpButton, { borderColor: theme.border }]}>
          <Text style={[styles.helpButtonText, { color: theme.textPrimary }]}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Order Status Card */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: '#2874f0', borderWidth: 1 }]}>
          <Text style={[styles.statusTitle, { color: theme.textPrimary }]}>Order Cancelled</Text>
          <Text style={[styles.statusSubtext, { color: theme.textSecondary }]}>
            Your order was cancelled as per your confirmation by sharing the OTP with the delivery executive.
          </Text>
          
          {/* Progress Tracker */}
          <View style={styles.trackerContainer}>
            <View style={styles.trackerLineBase} />
            <View style={[styles.trackerLineActive, { width: '100%' }]} />
            
            <View style={styles.trackerDotsRow}>
              <View style={[styles.dot, { backgroundColor: '#388e3c' }]}>
                <FontAwesome6 name="check" size={12} color="white" />
              </View>
              <View style={[styles.dot, { backgroundColor: theme.surface, borderColor: '#ef4444', borderWidth: 5 }]} />
            </View>
            
            <View style={styles.trackerLabelsRow}>
              <View>
                <Text style={[styles.trackerText, { color: theme.textSecondary }]}>Order Confirmed</Text>
                <Text style={[styles.trackerDate, { color: theme.textSecondary }]}>Dec 16</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.trackerText, { color: theme.textSecondary }]}>Cancelled</Text>
                <Text style={[styles.trackerDate, { color: theme.textSecondary }]}>Dec 19</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>See all updates</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Details */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Delivery details</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.infoRow}>
            <FontAwesome6 name="location-on" size={20} color={theme.textSecondary} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.boldLabel, { color: theme.textPrimary }]}>Other</Text>
              <Text style={[styles.addressText, { color: theme.textPrimary }]}>
                Dharampura Dharampura, Near Dharamp...
              </Text>
            </View>
          </View>
          <View style={[styles.infoRow, { marginTop: 15 }]}>
            <FontAwesome6 name="person" size={20} color={theme.textSecondary} />
            <Text style={[styles.boldLabel, { color: theme.textPrimary }]}>
              ANIL WASISTH <Text style={{ fontWeight: '400' }}>9174857381</Text>
            </Text>
          </View>
        </View>

        {/* Price Details */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Price details</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <PriceRow label="Listing price" value="₹2,199" color={theme.textPrimary} secondary={theme.textSecondary} strikethrough />
          <PriceRow label="Special price" value="₹309" color={theme.textPrimary} icon="info" />
          <PriceRow label="Total fees" value="₹16" color={theme.textPrimary} icon="expand-more" />
          <PriceRow label="Other discount" value="-₹31" color="#388e3c" icon="expand-more" />
          
          <View style={[styles.divider, { borderBottomColor: theme.border }]} />
          
          <View style={styles.totalRow}>
            <Text style={[styles.totalText, { color: theme.textPrimary }]}>Total amount</Text>
            <Text style={[styles.totalText, { color: theme.textPrimary }]}>₹294</Text>
          </View>

          <View style={[styles.paymentMethod, { backgroundColor: isDarkMode ? '#0d0d0d' : '#f9f9f9' }]}>
            <View>
              <Text style={[styles.paymentLabel, { color: theme.textPrimary }]}>Payment</Text>
              <Text style={[styles.paymentLabel, { color: theme.textPrimary }]}>method</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
               <View style={[styles.currencyBox, { borderColor: theme.textPrimary }]}>
                 <Text style={[styles.currencyText, { color: theme.textPrimary }]}>₹</Text>
               </View>
               <Text style={[styles.codText, { color: theme.textSecondary }]}>Cash On{'\n'}Delivery</Text>
            </View>
          </View>
        </View>

        {/* Order ID Section */}
        <View style={styles.orderIdSection}>
          <Text style={[styles.orderIdLabel, { color: theme.textPrimary }]}>Order ID</Text>
          <View style={styles.copyRow}>
            <Text style={[styles.orderIdValue, { color: theme.textSecondary }]}>OD436270615012424100</Text>
            <TouchableOpacity>
              <FontAwesome6 name="content-copy" size={16} color="#2874f0" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Shop more from Flipkart</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Toggle Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: isDarkMode ? 'white' : '#333' }]}
        onPress={() => setIsDarkMode(!isDarkMode)}
      >
        <FontAwesome6 name={isDarkMode ? "light-mode" : "dark-mode"} size={24} color={isDarkMode ? "black" : "white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Sub-component for Price Rows
const PriceRow = ({ label, value, color, secondary, strikethrough, icon }) => (
  <View style={styles.priceRow}>
    <View style={styles.flexRow}>
      <Text style={[styles.priceLabel, { color }]}>{label}</Text>
      {icon && <FontAwesome6 name={icon} size={14} color={color} style={{ marginLeft: 4 }} />}
    </View>
    <Text style={[
      styles.priceValue, 
      { color: secondary || color },
      strikethrough && { textDecorationLine: 'line-through' }
    ]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    ...Platform.select({ ios: { zIndex: 10 }, android: { elevation: 4 } }),
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16 },
  helpButton: { borderWidth: 1, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  helpButtonText: { fontSize: 14, fontWeight: '500' },
  scrollContent: { paddingBottom: 120, paddingTop: 16 },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statusTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  statusSubtext: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
  trackerContainer: { height: 80, marginTop: 10 },
  trackerLineBase: { position: 'absolute', top: 10, left: 0, right: 0, height: 2, backgroundColor: '#e0e0e0' },
  trackerLineActive: { position: 'absolute', top: 10, left: 0, height: 2, backgroundColor: '#388e3c' },
  trackerDotsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  dot: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  trackerLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  trackerText: { fontSize: 12 },
  trackerDate: { fontSize: 10, marginTop: 2 },
  updateButton: { borderTopWidth: 1, borderTopColor: '#f0f0f0', marginTop: 20, paddingTop: 15 },
  updateButtonText: { color: '#2874f0', textAlign: 'center', fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginHorizontal: 16, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start' },
  infoTextContainer: { marginLeft: 12 },
  boldLabel: { fontSize: 14, fontWeight: '600' },
  addressText: { fontSize: 14, marginTop: 4, lineHeight: 18 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  priceLabel: { fontSize: 14 },
  priceValue: { fontSize: 14 },
  divider: { borderBottomWidth: 1, borderStyle: 'dashed', marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalText: { fontSize: 16, fontWeight: '700' },
  paymentMethod: { borderRadius: 8, padding: 12, flexDirection: 'row', justifyContent: 'space-between' },
  paymentLabel: { fontSize: 14, fontWeight: '500' },
  currencyBox: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 4, marginBottom: 4 },
  currencyText: { fontSize: 12, fontWeight: 'bold' },
  codText: { fontSize: 11, textAlign: 'right' },
  orderIdSection: { paddingHorizontal: 16, marginTop: 10 },
  orderIdLabel: { fontSize: 14, fontWeight: '700' },
  copyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  orderIdValue: { fontSize: 12, marginRight: 8, letterSpacing: 0.5 },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
  },
  footerButton: {
    borderWidth: 1,
    borderColor: '#2874f0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  footerButtonText: { color: '#2874f0', fontWeight: '600', fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  }
});

