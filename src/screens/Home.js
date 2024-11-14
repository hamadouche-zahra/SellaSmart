import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import CartHeader from './CartHeader';
function Home() {
    const navigation = useNavigation();
    const handleScanPress = () => {
        navigation.navigate('CameraScreen'); 
      };
    const handleSearchPress = () => {
        navigation.navigate('ProductSearch'); 
      };
  return (
    <View style={styles.container}>
      <CartHeader />
      {/* Promotions Section */}
      <View style={styles.promoSection}>
        <Text style={styles.promoTitle}>Sella Smart</Text>
        <Text style={styles.promoDescription}>
          Discover our latest healthy food promotions and enjoy fresh products!
        </Text>
        <Image
          source={require('../assets/10929810.png')}
          style={styles.promoImage}
        />
      </View>

      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Image
          source={require('../assets/barcode.png')} 
          style={styles.buttonIcon}
        />
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress} >
          <Icon name="search-outline" size={26} color="#4A90E2" style={styles.buttonIcon} />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    alignItems: 'center',
  },
  header:{
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
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoSection: {
    margin:20,
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  promoTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2', 
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 16,
    color: '#6B7280', 
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  promoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
 
  buttonIcon: {
    width: 26,
    height: 26,
    marginRight: 10,  
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 40,
  },
  scanButton: {
    flexDirection: 'column',  
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width:'45%'
  },
  searchButton: {
    flexDirection: 'column',  
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width:'45%'

  },
 
  scanButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: '600',
    letterSpacing: 0.5,
  },

});
