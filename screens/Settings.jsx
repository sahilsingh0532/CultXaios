import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ThemeContext } from './ThemeContext';

const Settings = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const darkModeSetting = await firebase.firestore().collection('Settings').doc('darkMode').get();
      setDarkMode(darkModeSetting.data()?.enabled || false);

      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName !== null) {
          setStoredName(storedName);
        }
      } catch (error) {
        console.error('Error loading name:', error.message);
      }
    };
    loadSettings();
  }, []);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleNameSubmit = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      setStoredName(name);
      setShowNamePopup(false);
    } catch (error) {
      console.error('Error saving name:', error.message);
    }
  };

  const handleLocationClick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('Location:', location.coords);
  };

  const navigateToCreditScore = () => {
    Linking.openURL('https://creditreport.paisabazaar.com/credit-report/apply');
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <ImageBackground source={require('./4.gif')} style={styles.backgroundImage}>
        {storedName !== '' && (
          <View style={styles.upperHalf}>
            <Text style={[styles.greetingText, darkMode && styles.darkText]}>Hello,</Text>
            <Text style={[styles.usernameText, darkMode && styles.darkText]}>{storedName}</Text>
            <View style={styles.emailContainer}>
              <Text style={[styles.emailLabel, darkMode && styles.darkText]}>Email:</Text>
              <Text style={[styles.emailText, darkMode && styles.darkText]}>{email}</Text>
            </View>
          </View>
        )}
      </ImageBackground>
      <View style={[styles.lowerHalf, darkMode && styles.darkMode]}>
        <TouchableOpacity style={styles.settingButton} onPress={() => setShowNamePopup(true)}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkText]}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={handleLocationClick}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkText]}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={toggleDarkMode}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkText]}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={navigateToCreditScore}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkText]}>Show Credit Score</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={navigateToProfile}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkText]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showNamePopup} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowNamePopup(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
              <Text style={[styles.modalTitle, darkMode && styles.darkText]}>Enter Your Name</Text>
              <TextInput
                style={[styles.input, darkMode && styles.darkInput]}
                placeholder="Your Name"
                placeholderTextColor={darkMode ? '#ccc' : '#000'}
                value={name}
                onChangeText={handleNameChange}
              />
              <TouchableOpacity style={[styles.submitButton, darkMode && styles.darkSubmitButton]} onPress={handleNameSubmit}>
                <Text style={[styles.submitButtonText, darkMode && styles.darkText]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerHalf: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emailContainer: {
    flexDirection: 'row',
  },
  emailLabel: {
    fontSize: 16,
    color: '#fff',
  },
  emailText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  settingButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  darkMode: {
    backgroundColor: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  darkModalContent: {
    backgroundColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  darkSubmitButton: {
    backgroundColor: '#2e7d32',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Settings;
