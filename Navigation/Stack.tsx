// StackNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Guide from '../screens/Guide';
import Settings from '../screens/Settings';
import ChatListPage from '../screens/ChatList';

import ProfileScreen from '../screens/ProfileScreen';
import { ThemeProvider } from '../screens/ThemeContext';
import { TransitionPresets } from '@react-navigation/stack';


// Import screens
import Home from '../screens/Home';
// Import other screens as needed

// Create a Stack Navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <ThemeProvider>

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
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChatList" component={ChatListPage} />
        
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        {/* Add other screens here */}
        
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default StackNavigator;
