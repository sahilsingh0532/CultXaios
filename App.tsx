// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './Navigation/Stack';
import { StatusBar } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const App = () => {
  return (
    <>
    <StatusBar hidden />
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
    </>
  );
};

export default App;
