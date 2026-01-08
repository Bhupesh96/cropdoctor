import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Header from '../../shared/layouts/Header/Header';

const { width } = Dimensions.get('window');
// Adjusted size for better spacing
const categoryItemSize = (width - 60) / 4; 

/* ================= THEME CONSTANTS ================= */
// Extracted from your SmartFarmDashboard
const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#4a7c2a',
   headerBg: '#1a2e12',
  background: '#f8fafc',
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#6b7280',
  border: '#e2e8f0',
  accent: '#eaf4ea',
};

// Data (Unchanged Structure)
const categories = [
  { id: '1', name: 'Pesticides', icon: 'spray-can', color: '#B068F9' },
  { id: '2', name: 'Fertilizers', icon: 'seedling', color: '#68B0F9' },
  { id: '3', name: 'Seeds', icon: 'leaf', color: '#68F9B0' },
  { id: '4', name: 'Organic', icon: 'recycle', color: '#B068F9' }, // Shortened name for UI fit
  { id: '5', name: 'Nutrition', icon: 'sun', color: '#F9D468' }, // Shortened name for UI fit
  { id: '6', name: 'Feed', icon: 'cow', color: '#B068F9' },
  { id: '7', name: 'Tools', icon: 'scissors', color: '#B068F9' },
];

const mainProducts = [
  { id: 'p1', name: 'Acrobat', brand: 'BASF', category: 'Pesticides', imageUrl: 'https://cdn.pixabay.com/photo/2017/07/28/16/30/bee-pollen-2549125_1280.jpg', description: 'High-quality pesticide.', price: '₹550' },
  { id: 'p2', name: 'Pest Control X', brand: 'BrandX', category: 'Pesticides', imageUrl: 'https://cdn.pixabay.com/photo/2017/07/20/15/21/chickens-2522623_1280.jpg', description: 'Effective against pests.', price: '₹420' },
  { id: 'p3', name: 'Super Grow', brand: 'BrandY', category: 'Fertilizers', imageUrl: 'https://media.istockphoto.com/id/1316675881/photo/hand-holding-agriculture-fertilizer-or-fertiliser-granules-with-background-of-farm-or-field.jpg?s=2048x2048&w=is&k=20&c=YpkOuoaFWk8kT1YcHDsuf8hzQyH5JWCwMc13DBqGjVI=', description: 'Nutrient-rich fertilizer.', price: '₹300' },
  { id: 'p4', name: 'Wheat Seeds', brand: 'BrandZ', category: 'Seeds', imageUrl: 'https://media.istockphoto.com/id/685888694/photo/planting-soybeans-in-the-soil.jpg?s=2048x2048&w=is&k=20&c=6BmYKM53dgNwe8yf5dozjfWfQZ3_5E9QYew3yE6qOAM=', description: 'High-yield seeds.', price: '₹250' },
  // ... added a few duplicates to fill grid for demo ...
  { id: 'p5', name: 'Neem Oil', brand: 'Organic India', category: 'Pesticides', imageUrl: 'https://cdn.pixabay.com/photo/2022/07/04/10/45/garden-radish-7300875_1280.jpg', description: 'Organic protection.', price: '₹180' },
  { id: 'p6', name: 'Sprayer Can', brand: 'AgriTools', category: 'Pesticides', imageUrl: 'https://cdn.pixabay.com/photo/2014/07/06/17/20/tractor-385681_1280.jpg', description: 'Heavy duty.', price: '₹1200' },
];

/* ================= COMPONENTS ================= */

const CategoryItem = ({ item }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={[styles.iconContainer, { backgroundColor: COLORS.surface }]}>
      <FontAwesome6 name={item.icon} size={20} color={COLORS.primaryDark} />
    </View>
    <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
  </TouchableOpacity>
);

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.9}>
    {/* Image Section */}
    <View style={styles.imageWrapper}>
        <Image
        source={product.imageUrl ? { uri: product.imageUrl } : require('../../../assets/home.png')}
        style={styles.productImage}
        resizeMode="cover"
        />
        <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{product.price}</Text>
        </View>
    </View>

    {/* Content Section */}
    <View style={styles.productContent}>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
      
      <View style={styles.addButton}>
        <Text style={styles.addText}>Add</Text>
        <FontAwesome6 name="plus" size={10} color={COLORS.primaryDark} />
      </View>
    </View>
  </TouchableOpacity>
);

const MarketplaceUI = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState('Pesticides');

  const filteredProducts = mainProducts.filter(product => product.category === activeTab);

  // Helper for footer (Visual only)
  const renderFooterIcon = (name, label, isActive, isMarket = false) => (
    <TouchableOpacity style={styles.footerTab}>
      <View style={isActive ? styles.activeFooterIcon : null}>
        <FontAwesome6
            name={name}
            size={isMarket ? 20 : 18}
            color={isActive ? COLORS.primaryDark : '#9ca3af'}
            solid
        />
      </View>
      <Text style={[styles.footerText, { color: isActive ? COLORS.primaryDark : '#9ca3af', fontWeight: isActive ? '700':'400' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Header gradientColors={['#1a2e12', '#4a7c2a']} />
      
      
      {/* 1. HEADER (Redesigned to match Dashboard) */}
      <View style={styles.headerBackground}>
        <SafeAreaView>
            <View style={styles.headerTop}>
                <View>
                    <Text style={styles.headerTitle}>Agri Market</Text>
                    <Text style={styles.headerSub}>Best supplies for your farm</Text>
                </View>
                <TouchableOpacity style={styles.cartBtn}>
                    <FontAwesome6 name="cart-shopping" size={18} color="white" />
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      </View>

      {/* 2. FLOATING SEARCH */}
      <View style={styles.searchContainer}>
         <FontAwesome6 name="magnifying-glass" size={16} color={COLORS.textSub} style={{marginRight: 10}} />
         <TextInput 
            placeholder="Search seeds, tools, pesticides..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
         />
         <View style={styles.filterBtn}>
            <FontAwesome6 name="sliders" size={14} color="white" />
         </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* 3. CATEGORIES GRID */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
        </View>
        
        <View style={styles.categoryGridWrapper}>
             {/* Using Map instead of FlatList inside ScrollView to avoid Virtualization Error */}
             <View style={styles.gridRow}>
                {categories.slice(0, 4).map(item => <CategoryItem key={item.id} item={item} />)}
             </View>
             <View style={styles.gridRow}>
                {categories.slice(4, 8).map(item => <CategoryItem key={item.id} item={item} />)}
             </View>
        </View>

        {/* 4. TABS (Pill Style) */}
        <View style={styles.tabsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
            {categories.map((cat) => (
                <TouchableOpacity
                key={cat.id}
                style={[
                    styles.tabPill,
                    activeTab === cat.name && styles.activeTabPill,
                ]}
                onPress={() => setActiveTab(cat.name)}>
                <Text style={[
                    styles.tabText,
                    activeTab === cat.name && styles.activeTabText,
                ]}>
                    {cat.name}
                </Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>

        {/* 5. PRODUCT GRID */}
        <View style={styles.productsHeader}>
            <Text style={styles.sectionTitle}>{activeTab}</Text>
            <Text style={styles.countBadge}>{filteredProducts.length} items</Text>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetails', { product })}
            />
          ))}
        </View>

        {/* Spacer for Footer */}
        <View style={{height: 80}} />
      </ScrollView>

      {/* 6. FOOTER (Styled to match) */}
      <View style={styles.footer}>
        {renderFooterIcon('seedling', 'Crops', false)}
        {renderFooterIcon('users', 'Community', false)}
        {renderFooterIcon('store', 'Market', true, true)}
        {renderFooterIcon('user', 'Profile', false)}
      </View>
    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // --- Header ---
  headerBackground: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 20,
    paddingBottom: 45, // Space for search bar overlap
    paddingTop: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
  headerSub: {
    color: '#dcfce7',
    fontSize: 12,
    marginTop: 2,
  },
  cartBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },

  // --- Search ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -25, // Overlap effect
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 15,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMain,
    height: '100%',
  },
  filterBtn: {
    backgroundColor: COLORS.primaryDark,
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    paddingTop: 15,
  },
  
  // --- Categories ---
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  categoryGridWrapper: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    width: categoryItemSize,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Soft shadow
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryName: {
    fontSize: 11,
    color: COLORS.textSub,
    fontWeight: '600',
  },

  // --- Tabs (Pills) ---
  tabsWrapper: {
    marginBottom: 20,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTabPill: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  tabText: {
    fontSize: 13,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '700',
  },

  // --- Product Grid ---
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  countBadge: {
    backgroundColor: COLORS.accent,
    color: COLORS.primaryDark,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  
  // --- Product Card ---
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    padding: 8, // Inner padding for cleaner look
  },
  imageWrapper: {
    width: '100%',
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#f1f5f9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productContent: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  productBrand: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  addText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '700',
  },

  // --- Footer ---
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Taller footer
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 10,
  },
  footerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeFooterIcon: {
    marginBottom: 2,
  },
  footerText: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default MarketplaceUI;