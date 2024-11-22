import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import SwiperFlowScreen from './SwiperFlowScreen';

const Stack = createStackNavigator();

const Welcome = () => {
  return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Swiper" 
          component={SwiperFlowScreen} 
          options={{ headerShown: false }} 
        />
       
        
      </Stack.Navigator>
  );
};

export default Welcome;
