import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import the icon library

const GuideScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const menuWidth = width / 5;
  const menuIcons = ['comments', 'images', 'question-circle', 'users', 'cog']; // Icon names

  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideMenu = (toValue) => {
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateTo = (screen) => {
    if (screen === 'comments') {
      navigation.navigate('ChatList'); 
    } else if (screen === 'cog') {
      navigation.navigate('Settings'); 
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <ImageBackground source={require('./3.gif')} style={styles.background}>
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        {menuIcons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => navigateTo(icon)} style={[styles.menuItem, { width: menuWidth }]}>
            <Icon name={icon} size={30} color="white" />
          </TouchableOpacity>
        ))}
      </Animated.View>
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
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'blue',
    borderWidth: 20,
  },
});

export default GuideScreen;
