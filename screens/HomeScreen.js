import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Fetch data from the API
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Filter shows based on search query
  const filteredShows = shows.filter((item) =>
    item.show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each show item in a grid layout
  const renderShowItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { show: item.show })}
      style={styles.card}
    >
      <Image
        source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/210x295' }}
        style={styles.thumbnail}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.show.name}
      </Text>
      <Text style={styles.summary} numberOfLines={3}>
        {item.show.summary?.replace(/<[^>]+>/g, '') || 'No summary available.'}
      </Text>
    </TouchableOpacity>
  );

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    
    <LinearGradient
    colors={['#000000', '#1a1a1a', '#330000']} // Same gradient as SplashScreen
    style={styles.container}
  >
      {/* Header with App Name */}
      <View style={styles.header}>
        <Text style={styles.appName}>MovieFlex</Text>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchTab')} // Navigate to SearchScreen
      >
        <View style={styles.searchBar}>
          <Text style={styles.searchBarPlaceholder}>Search for shows...</Text>
        </View>
      </TouchableOpacity>

      {/* List of Shows */}
      <FlatList
        data={filteredShows}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderShowItem}
        numColumns={2} // Display 2 items per row
        contentContainerStyle={styles.list}
      />
     </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  appName: {
    color: '#e50914',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 36,
    fontStyle: 'italic',
  },
  searchBar: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  searchBarPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  list: {
    justifyContent: 'space-between', // Space between cards
  },
  card: {
    width: '48%', // Each card takes 48% of the screen width
    marginBottom: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginRight: 15,
  },
  thumbnail: {
    width: '100%',
    height: width * 0.6, // Adjust height based on screen width
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  summary: {
    color: '#fff',
    fontSize: 14,
    margin: 10,
    marginTop: 0, // Reduce margin top to bring summary closer to the title
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  error: {
    color: '#ff0000',
    fontSize: 18,
  },
});

export default HomeScreen;