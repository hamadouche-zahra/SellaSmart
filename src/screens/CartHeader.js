import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
const CartHeader = ({title="",onBackPress}) => {
  const navigation=useNavigation()
  const { cart, removeFromCart, calculateTotal } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const handleCheckout=()=>{
    if(cart.length===0){
      Alert.alert("Your cart is empty!", "Please add items to your cart before checking out.");
    }else{
      const totalPrice = calculateTotal();
      navigation.navigate('Checkout',{cart,totalPrice})
    }
  }
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemValue}>Quantity:{item.quantity} | {item.price} DA</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {onBackPress &&
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      }
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Icône de panier avec badge */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cartIconWrapper}>
        <Icon name="cart-outline" size={28} color="#333" />
        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal du panier */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Cart</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id?.toString()}
              style={styles.cartList}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{calculateTotal()} DA</Text>
            </View>


            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cartIconWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF3D00',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -14 }],
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  closeButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,

  },
  cartList: {
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    elevation: 2, 
  },
  itemDetails: {
    flex: 1,
    marginRight: 15,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom:8
  },
  itemValue:{
    fontSize: 15,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db', 
  },
  removeButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  viewCartButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCartButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
