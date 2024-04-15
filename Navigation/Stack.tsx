// StackNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Guide from '../screens/Guide';
import { TransitionPresets } from '@react-navigation/stack';


// Import screens
import Home from '../screens/Home';
// Import other screens as needed

// Create a Stack Navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS, // Use SlideFromRightIOS transition preset
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
        
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          presentation: 'modal', // Slide from bottom animation for this screen
        }}
      />
      <Stack.Screen name="Guide" component={Guide} />
   
      {/* Add more screens here */}
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
