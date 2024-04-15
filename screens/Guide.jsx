import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const GuideScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('./3.gif')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Chats')} style={styles.button}>
          <Text style={styles.buttonText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Moments')} style={styles.button}>
          <Text style={styles.buttonText}>Moments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HelpAI')} style={styles.button}>
          <Text style={styles.buttonText}>HelpAI</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FamilyHood')} style={styles.button}>
          <Text style={styles.buttonText}>FamilyHood</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'blue',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'pink',
  },
});

export default GuideScreen;
