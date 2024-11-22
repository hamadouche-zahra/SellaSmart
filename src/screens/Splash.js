import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({ navigation }) => {
 
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Swiper');
        }, 2000);
      }, [navigation]);
  return (
    <LinearGradient 
    colors={['#ec8f22', '#FF9003']} 
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/home.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25543f" />
        <Text style={styles.text}>Chargement</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 3, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  text: {
    fontSize: 18,
    color: '#25543f',
    marginTop: 10,
  },
});

export default Splash;
