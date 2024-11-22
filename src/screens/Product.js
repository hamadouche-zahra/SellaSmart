import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import CartHeader from './CartHeader';

function Product({route}) {
  const navigation = useNavigation();
  const { product } = route.params;
  const handleScanPress = () => {
    navigation.navigate('CameraScreen'); 
  };
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  
  
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert("Added to Cart", `${product.name} added with quantity ${quantity}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CartHeader 
        title='Product Details'
        onBackPress={()=>{navigation.navigate('Home')}}
        />
        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productInfo}>Aisle: {product.aisle}</Text>
          <Text style={styles.productInfo}>Position: {product.position}</Text>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{product.price}DA</Text>
          </View>

          {/* Quantity Control */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Scan More Button */}
        <TouchableOpacity style={styles.scanMoreButton} onPress={handleScanPress}>
          <Text style={styles.scanMoreButtonText}>Scan More</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  scrollContainer: {
    
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FF9003',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  productDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
    marginHorizontal: 20,
    marginTop:20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  productInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  priceLabel: {
    fontSize: 18,
    color: '#FF9003',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FF9003',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,

  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#FF9003',
    fontWeight: 'bold',
  },
  scanMoreButton: {
    backgroundColor: '#FF9003',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,

  },
  scanMoreButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
