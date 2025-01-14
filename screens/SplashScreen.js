import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // For zoom-in effect
  const floatAnim = useRef(new Animated.Value(0)).current; // For floating effect

  // Navigate to HomeScreen after 4 seconds
  useEffect(() => {
    // Fade-in and zoom-in animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.elastic(1.4), // Add a bouncy effect
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation (up and down motion)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate after 4 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  // Interpolate floating animation
  const floatInterpolation = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Move up and down by 20 units
  });

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#330000']} // Dark gradient background
      style={styles.container}
    >
      {/* App Name with Fade-In, Zoom-In, and Floating Effects */}
      <Animated.View
        style={[
          styles.appNameContainer,
          {
            opacity: fadeAnim, // Fade-in effect
            transform: [
              { scale: scaleAnim }, // Zoom-in effect
              { translateY: floatInterpolation }, // Floating effect
            ],
          },
        ]}
      >
        <Text style={styles.appName}>MovieFlex</Text>
        <Text style={styles.tagline}>Your Gateway to Cinematic Magic</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameContainer: {
    alignItems: 'center',
  },
  appName: {
    color: '#e50914', // Netflix-like red text color
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Oswald', // Custom font (ensure it's loaded in your project)
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Subtle shadow for depth
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    color: '#fff', // White text color
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Oswald', // Custom font
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default SplashScreen;