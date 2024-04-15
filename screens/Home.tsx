// Home.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

type Props = {
  navigation: any; // Adjust the type according to your navigation setup
};

const Home: React.FC<Props> = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('LoginScreen'); // Navigate to the 'Login' screen
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./2.gif')} style={styles.background} blurRadius={5}>
        <Text style={styles.title}>CultX</Text>
        <TouchableOpacity style={styles.buttonClass} onPress={handleNext}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    zIndex: 1,
    marginBottom: 50,
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClass: {
    width: 160,
    height: 60,
    borderWidth: 2,
    borderColor: '#00ff15',
    borderRadius: 25,
    backgroundColor: 'linear-gradient(rgba(141, 21, 182, 1), rgba(229, 68, 233, 1))',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    padding: 10,
    shadowColor: '#810e05',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Home;
