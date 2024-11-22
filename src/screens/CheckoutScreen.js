import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import CartHeader from './CartHeader';
import { useCart } from '../contexts/CartContext';
function CheckoutScreen({route}) {
    const { cart, totalPrice }=route.params
    const [paymentStatus, setPaymentStatus] = useState(null); 
    const {setCart}=useCart()
    const handlePayement=()=>{
        setPaymentStatus("pending")
        setTimeout(()=>{
            setPaymentStatus('success')
            Alert.alert('Payment Successful', 'Your payment was successful!')
            setCart([])
            navigation.navigate('Home')
        },2000)
    }

    const navigation=useNavigation()
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem} key={item.id}>
           <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
           <Text style={styles.itemValue}>Quantity:{item.quantity} | {item.price} DA</Text>
      </View>
        </View>
      );
    return(
        <ScrollView style={styles.container}>
            <CartHeader 
            title='Order Summary'
            onBackPress={() => navigation.goBack()} 
            />
            {cart?.map(item => renderCartItem({ item }))}

            <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>Total: {totalPrice} DA</Text>
            </View>

           
              <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handlePayement}
              disabled={paymentStatus === 'pending'} 
              >
              <Text style={styles.confirmButtonText}>
              {paymentStatus === 'pending' ? 'Processing...' : 'Complete Order'}
              </Text>
              </TouchableOpacity>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    cartItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginVertical: 12,
        marginHorizontal:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 5,
        borderColor: '#FF9003', 
        position: 'relative',
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
      totalsContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 20,
        padding: 18,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
      },
      totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
    clientInfo: {
      fontSize: 14,
      marginBottom: 5,
    },
    paymentMethod: {
      fontSize: 14,
      color: '#3498db',
      marginBottom: 15,
    },
    confirmButton: {
      backgroundColor: '#FF9003',
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal:20
    },
    confirmButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default CheckoutScreen