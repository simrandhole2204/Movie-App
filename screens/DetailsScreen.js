import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { show } = route.params; // Get the show data passed from HomeScreen
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#330000']} // Same gradient as SplashScreen
      style={styles.container}
    >
      <ScrollView>
        {/* Full-Screen Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: show.image?.original || 'https://via.placeholder.com/800x450' }}
            style={styles.image}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradientOverlay}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => console.log('Play Trailer')}
          >
            <Icon name="play-circle" size={60} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Show Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{show.name}</Text>
          <Text style={styles.summary}>
            {show.summary?.replace(/<[^>]+>/g, '') || 'No summary available.'}
          </Text>

          {/* Additional Details */}
          <View style={styles.metaData}>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Genre: </Text>
              {show.genres?.join(', ') || 'N/A'}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Status: </Text>
              {show.status || 'N/A'}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Rating: </Text>
              {show.rating?.average || 'N/A'}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Runtime: </Text>
              {show.runtime || 'N/A'} minutes
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: width * 1.1, // Adjust height based on screen width
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  metaData: {
    marginTop: 10,
  },
  metaText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  metaLabel: {
    fontWeight: 'bold',
    color: '#ccc',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }], // Center the button
  },
});

export default DetailsScreen;