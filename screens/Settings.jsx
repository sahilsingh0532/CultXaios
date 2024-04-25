import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    // Load settings from Firestore on component mount
    const loadSettings = async () => {
      // Load dark mode setting from Firestore
      const darkModeSetting = await firebase.firestore().collection('Settings').doc('darkMode').get();
      setDarkMode(darkModeSetting.data()?.enabled || false);

      // Load name from AsyncStorage
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Update dark mode setting in Firestore
    firebase.firestore().collection('settings').doc('darkMode').set({ enabled: !darkMode });
  };

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
    // Replace 'https://www.policybazaar.com/credit-score/' with the actual URL for credit score website
    Linking.openURL('https://creditreport.paisabazaar.com/credit-report/apply?utm_source=google_search&utm_medium=ppc0paisabazaar&utm_term=credit%20score&utm_campaign=LS_Top3Kw_Phrase_13thApr2200Credit_Score&utm_network=g&utm_matchtype=p&utm_device=c&utm_placement=&utm_content=676846002668&utm_Adposition=&utm_location=9302159&utm_Sitelink=&utm_Audience=kwd-10124391&utm_Promotion=&utm_Price=&utm_campaignid=20646528617&gad_source=1&gclid=Cj0KCQjwwYSwBhDcARIsAOyL0fiNcO0qnMlxITkJaycxZuKYCU01XY179c-0CxUuZCh2EOu_qRgPYBQaArlNEALw_wcB');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./4.gif')} style={styles.backgroundImage}>
        {storedName !== '' && (
          <View style={styles.upperHalf}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.usernameText}>{storedName}</Text>
          </View>
        )}
      </ImageBackground>
      <View style={[styles.lowerHalf, darkMode ? styles.darkMode : null]}>
        <TouchableOpacity style={styles.settingButton} onPress={() => setShowNamePopup(true)}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkModeText]}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={handleLocationClick}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkModeText]}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={toggleDarkMode}>
          <Text style={[styles.settingButtonText, darkMode && { color: 'white' }]}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={navigateToCreditScore}>
          <Text style={[styles.settingButtonText, darkMode && styles.darkModeText]}>Show Credit Score</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showNamePopup} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowNamePopup(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={handleNameChange}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleNameSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
  darkMode: {
    backgroundColor: '#000',
  },
  darkModeText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Settings;
