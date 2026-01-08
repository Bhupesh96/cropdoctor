import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
// import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// Updated Import
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function MyOrders() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    background: isDarkMode ? '#000000' : '#F1F3F6',
    surface: isDarkMode ? '#1C1C1E' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#212121',
    textSecondary: isDarkMode ? '#98989D' : '#878787',
    border: isDarkMode ? '#2C2C2E' : '#F0F0F0',
    primary: '#2874F0',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => {}}>
             <FontAwesome6 name="arrow-back" size={26} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>My Orders</Text>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome6 name="search" size={26} color={theme.textPrimary} style={styles.iconGap} />
          <View>
            <FontAwesome6 name="shopping-cart" size={26} color={theme.textPrimary} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={[styles.bannerContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.banner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000' }}
              style={styles.bannerImage}
            />
            {/* Updated LinearGradient Usage */}
            <LinearGradient
              colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.4)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bannerOverlay}
            >
              <Text style={styles.bannerTextMain}>Extra 
              <Text style={{ color: '#FB923C' }}>50% Off*</Text>
               on</Text>
              <Text style={styles.bannerTextMain}>Swiggy Scenes</Text>
              <Text style={styles.bannerSubtext}>Only on Flipkart Axis Bank Credit Card</Text>
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>Apply now</Text>
              </TouchableOpacity>
            </LinearGradient>
            
            <View style={styles.newYearTag}>
              <Text style={styles.newYearText}>New Year Offer</Text>
            </View>
          </View>
          
          <View style={styles.dotRow}>
            {[1, 0, 0, 0, 0].map((active, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: active ? theme.textPrimary : '#D1D1D1' }]} />
            ))}
          </View>
        </View>

        {/* Search & Filter Bar */}
        <View style={[styles.searchSection, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#2C2C2E' : '#F1F3F6' }]}>
            <FontAwesome6 name="search" size={20} color="#8E8E93" />
            <TextInput
              placeholder="Search your order here"
              placeholderTextColor="#8E8E93"
              style={[styles.searchInput, { color: theme.textPrimary }]}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <FontAwesome6 name="filter-list" size={20} color={theme.textPrimary} />
            <Text style={[styles.filterText, { color: theme.textPrimary }]}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Order Items */}
        <View style={styles.orderList}>
          <OrderItem
            theme={theme}
            title="Cancelled on Dec 19"
            subtitle="DRALIET RD-9102 Elegant S..."
            image="https://m.media-amazon.com/images/I/71Kx6rg7yFL._AC_UY1000_.jpg"
          />
          <OrderItem
            theme={theme}
            title="Delivered on Oct 03"
            subtitle="Abros Carter Running Shoes..."
            image="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4e04313-2d0a-472a-969c-29d9e79471d4/custom-nike-air-force-1-high-by-you-shoes.png"
            showRating
          />
        </View>

        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Showing all recent orders</Text>
      </ScrollView>

      {/* Footer Section */}
      <View style={[styles.bottomAction, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.shopMoreBtn}>
          <Text style={styles.shopMoreText}>Shop more from Flipkart</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Dark Mode FAB */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: isDarkMode ? 'white' : '#333' }]}
        onPress={() => setIsDarkMode(!isDarkMode)}
      >
        <FontAwesome6 name={isDarkMode ? "light-mode" : "dark-mode"} size={24} color={isDarkMode ? "black" : "white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Order Item Sub-component
const OrderItem = ({ theme, title, subtitle, image, showRating }) => (
  <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
    <View style={styles.itemRow}>
      <View style={[styles.imageWrapper, { borderColor: theme.border }]}>
        <Image source={{ uri: image }} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{title}</Text>
          <FontAwesome6 name="chevron-right" size={24} color="#C7C7CC" />
        </View>
        <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>{subtitle}</Text>
      </View>
    </View>
    {showRating && (
      <View style={[styles.ratingSection, { borderTopColor: theme.border }]}>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <FontAwesome6 key={s} name="star-border" size={24} color="#D1D1D1" />
          ))}
        </View>
        <Text style={[styles.rateLabel, { color: theme.textSecondary }]}>Rate this product now</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 0.5 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', marginLeft: 16, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconGap: { marginRight: 18 },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 1, borderWidth: 2, borderColor: 'white' },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  bannerContainer: { padding: 16, paddingBottom: 8 },
  banner: { height: 180, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', paddingHorizontal: 20 },
  bannerTextMain: { color: 'white', fontSize: 22, fontWeight: '800' },
  bannerSubtext: { color: '#D1D1D1', fontSize: 11, marginTop: 4, marginBottom: 12 },
  applyBtn: { backgroundColor: 'white', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  applyBtnText: { color: 'black', fontWeight: '700', fontSize: 13 },
  newYearTag: { position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.3)' },
  newYearText: { color: 'white', fontSize: 10 },
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  searchSection: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12, borderBottomWidth: 0.5 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 40, borderRadius: 10 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  filterText: { fontSize: 14, fontWeight: '600' },
  itemContainer: { padding: 16, marginBottom: 2 },
  itemRow: { flexDirection: 'row', gap: 12 },
  imageWrapper: { width: 80, height: 80, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  productImage: { width: '80%', height: '80%' },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, marginTop: 4 },
  ratingSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 0.5 },
  starRow: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  rateLabel: { fontSize: 12 },
  footerText: { textAlign: 'center', fontSize: 12, marginVertical: 20 },
  bottomAction: { padding: 16, borderTopWidth: 0.5 },
  shopMoreBtn: { borderColor: '#2874F0', borderWidth: 1, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  shopMoreText: { color: '#2874F0', fontWeight: '700', fontSize: 16 },
  fab: { position: 'absolute', bottom: 100, right: 16, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
});
