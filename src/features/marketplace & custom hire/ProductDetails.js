import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Image,Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;  

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={24} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Details Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={product.imageUrl ? { uri: product.imageUrl } : require('../../../assets/home.png')}
          style={styles.detailsImage}
          resizeMode="cover"
        />
        <Text style={styles.detailsName}>{product.name}</Text>
        <Text style={styles.detailsBrand}>Brand: {product.brand}</Text>
        <Text style={styles.detailsPrice}>{product.price}</Text>
        <Text style={styles.detailsDescription}>{product.description}</Text>
 
        <View style={styles.buttnCard}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Buy now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  content: {
    padding: 15,
  },
  detailsImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsBrand: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  detailsPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 15,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  buttnCard:{
    flexDirection:'row',
    // alignItems: 'center',
    justifyContent:'center',
    position:'relative'
  },
  addToCartButton: {
    backgroundColor: '#071771ff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    padding:30,
    margin:20
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetails;