import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { firebase } from '../firebase';
import { ThemeContext } from './ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setEmail(user.email);
        const userData = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userData.exists) {
          const data = userData.data();
          setName(data.name);
          setUsername(data.username);
          setImage(data.profileImage);
        }
      }
    };
    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      let imageUrl = image;

      console.log('Selected image URI:', image);

      if (image && image.startsWith('file://')) {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`profileImages/${user.uid}`);

        const uploadTask = ref.put(blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload error:', error);
            Alert.alert('Error', 'Failed to upload image');
          },
          async () => {
            imageUrl = await ref.getDownloadURL();
            console.log('Uploaded image URL:', imageUrl);

            await firebase.firestore().collection('users').doc(user.uid).set({
              name,
              username,
              profileImage: imageUrl,
              email,
            });

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
          }
        );
      } else {
        await firebase.firestore().collection('users').doc(user.uid).set({
          name,
          username,
          profileImage: imageUrl,
          email,
        });

        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Save profile error:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={darkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>Edit Profile</Text>
      </View>
      <Animatable.View animation="fadeIn" style={styles.content}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={[styles.imagePlaceholder, darkMode && styles.darkText]}>Select Image</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Name"
          placeholderTextColor={darkMode ? '#ccc' : '#000'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Username"
          placeholderTextColor={darkMode ? '#ccc' : '#000'}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Email"
          placeholderTextColor={darkMode ? '#ccc' : '#000'}
          value={email}
          editable={false}
        />
        <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
          <Text style={[styles.saveButtonText, darkMode && styles.darkText]}>Save</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c2c2c',
  },
  darkHeader: {
    backgroundColor: '#333',
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
  },
  darkText: {
    color: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 120,
    color: '#999',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 5,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  saveButton: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
