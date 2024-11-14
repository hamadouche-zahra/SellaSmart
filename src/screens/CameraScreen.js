
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking,
  Image,
  Alert
} from 'react-native';
import { Camera, useCameraDevice ,useCodeScanner,useCameraPermission} from 'react-native-vision-camera';
import { openExternalLink} from '../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import productData from '../utils/products.json'
import { useNavigation } from '@react-navigation/native';
function CameraScreen() {
  const [torchOn, settorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const device = useCameraDevice('back');
  const navigation = useNavigation()
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (enableOnCodeScanned) {
        const value = codes[0]?.value;

        // Recherche du produit dans product.json
        const product = productData.find((item) => item.barcode === value);

        if (product) {
          navigation.navigate('Product', { product });
        } else {
          // Si le produit n'est pas trouvé
          showAlert('Product not found', `Barcode: ${value}`, false);
        }

        setEnableOnCodeScanned(false);
      }
    },
  });
  
  const showAlert = (title, message, showMoreBtn = true) => {
    Alert.alert(
      title,
      message,
      showMoreBtn
        ? [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'More',
              onPress: () => {
                setTorchOn(false);
                setEnableOnCodeScanned(true);
                // Optionnel : Ouvrir une page produit ou une URL externe
                openExternalLink(`https://www.barcodelookup.com/${message}`);
              },
            },
          ]
        : [
            {
              text: 'Cancel',
              onPress: () => setEnableOnCodeScanned(true),
              style: 'cancel',
            },
          ],
      { cancelable: false }
    );
  };

  const RoundButtonWithImage = () => {
    return (
      <TouchableOpacity
        onPress={() => settorchOn(prev => !prev)}
        style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image
            source={
              torchOn
                ? require('../assets/flashlight_on.png')
                : require('../assets/torch_off.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      Alert.alert(
        'Camera permission is required to use the camera. Please grant permission in your device settings.',
      );
      // Optionally, you can use Linking API to open the App Settings
      Linking.openSettings();
    }
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);



  if (device == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{margin: 10}}>Camera Not Found</Text>
      </View>
    );

  return (
    <SafeAreaView style={{flex: 1}}>
    <RoundButtonWithImage />
    <Camera
      codeScanner={codeScanner}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      torch={torchOn ? 'on' : 'off'}
      onTouchEnd={() => setEnableOnCodeScanned(true)}
    />
  </SafeAreaView>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 20,
  },
  button: {
    backgroundColor: '#FFF', // Button background color
    borderRadius: 50, // Make it round (half of the width and height)
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 25, // Adjust the width and height of the image as needed
    height: 25,
  },
});
