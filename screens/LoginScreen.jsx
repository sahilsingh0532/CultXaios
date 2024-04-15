import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Check if the email is already in use
    auth
      .fetchSignInMethodsForEmail(email)
      .then(methods => {
        if (methods && methods.length > 0) {
          setError('The email address is already in use.');
        } else {
          // Email is not in use, proceed with registration
          auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registered with:', user.email);
            })
            .catch(error => setError(error.message));
        }
      })
      .catch(error => setError(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('Guide'); // Navigate to Guide.jsx on successful login
      })
      .catch(error => setError(error.message));
  };

  const handleForgotPassword = () => {
    // Send password reset email
    auth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        setError('Password reset email sent. Please check your email inbox.');
      })
      .catch(error => setError(error.message));
  };

  return (
    <ImageBackground source={require('../screens/1.gif')} style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#ffffff"
          />
        </View>

        <Text style={styles.errorText}>{error}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: '#ffffff',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'black',
    marginTop: 5,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});
