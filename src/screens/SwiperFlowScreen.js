import React from 'react';
import { View, Text, StyleSheet, Button ,TouchableOpacity,ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 

const SwiperFlowScreen = () => {
    const  navigation=useNavigation()
  return (
    <Swiper
      showsPagination={true}
      loop={false}
      showsButtons={true}
      prevButton={
        <TouchableOpacity style={styles.button}>
          <Icon name="arrow-back" size={24} color='#ede8e3' />
        </TouchableOpacity>
      }
      nextButton={
        <TouchableOpacity style={styles.button}>
          <Icon name="arrow-forward" size={24} color="#ede8e3" />
        </TouchableOpacity>
      }
      dotStyle={{
        backgroundColor: 'gray', 
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
      }}
      activeDotStyle={{
        backgroundColor: '#FF9003', 
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
      }}
    
    >
   <ImageBackground 
        source={require('../assets/barcode-1024x683.jpg')}
        resizeMode="cover"
        style={styles.imageBackground}
   >
      <View style={[styles.overlay, { backgroundColor: 'rgba(128, 128, 128, 0.5)' }]}>
          <Text style={[styles.text, { marginBottom: 60 }]}
          >Scan the barcode to continue</Text>
        </View>
       
    </ImageBackground>
    <ImageBackground 
        source={require('../assets/payment.jpg')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
       
    <View style={[styles.overlay, { backgroundColor: 'rgba(128, 128, 128, 0.5)' }]}>
          <Text style={styles.text}>Proceed with secure payment</Text>
          <TouchableOpacity
      style={styles.homeButton}
      onPress={() => navigation.navigate('Home')} // Assure-toi que "Home" correspond au nom de ta route dans React Navigation
    >
      <Text style={styles.homeButtonText}>Go to Home</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
      

    
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    paddingVertical: 50,
    alignItems: 'center',
    width: '100%',
  },
 
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  button: {
    marginHorizontal: 10,
  },
  homeButton: {
    marginTop: 20, // Ajoute un espace au-dessus du bouton

    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#FF9003', // Orange vif pour un style moderne
    borderRadius: 25, // Boutons avec coins très arrondis
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 10, // Ombre moderne pour Android
    marginBottom: 30,

  },
  homeButtonText: {
    color: '#FFFFFF', // Couleur blanche pour le texte
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Texte en majuscule pour un style professionnel
    textAlign: 'center',
  },
});

export default SwiperFlowScreen;
