import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import CameraScreen from './src/screens/CameraScreen';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import { CartProvider } from './src/contexts/CartContext';
import ProductSearch from './src/screens/ProductSearch';
import CheckoutScreen from './src/screens/CheckoutScreen';
import Welcome from './src/screens/Welcome';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }}  
        /> 
          
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}  
        /> 
          
          <Stack.Screen name="CameraScreen" 
           component={CameraScreen}
           options={{ headerShown: false }}  />

          <Stack.Screen name="Product"
         component={Product} 
         options={{ headerShown: false }} />
        <Stack.Screen 
          name="ProductSearch" 
          component={ProductSearch} 
          options={{ headerShown: false }}  
        />
      
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default App;
