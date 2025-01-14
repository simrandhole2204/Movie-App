import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);
  const navigation = useNavigation();

  // Predefined popular searches
  const popularSearches = ['Action', 'Comedy', 'Drama', 'Thriller', 'Sci-Fi'];

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
  useEffect(() => {
    if (searchQuery) {
      const filtered = shows.filter((item) =>
        item.show.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredShows(filtered);
    } else {
      setFilteredShows([]);
    }
  }, [searchQuery, shows]);

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

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#330000']} // Same gradient as SplashScreen
      style={styles.container}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for shows..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
        />
        {searchQuery && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Popular Searches */}
      {!searchQuery && (
        <View style={styles.popularSearchesContainer}>
          <Text style={styles.popularSearchesTitle}>Popular Searches</Text>
          <View style={styles.popularSearchesList}>
            {popularSearches.map((query, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSearchQuery(query)}
                style={styles.popularSearchItem}
              >
                <Text style={styles.popularSearchText}>{query}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Search Results */}
      {searchQuery && filteredShows.length > 0 && (
        <FlatList
          data={filteredShows}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderShowItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}

      {/* No Results Message */}
      {searchQuery && filteredShows.length === 0 && (
        <Text style={styles.noResults}>No results found for "{searchQuery}".</Text>
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00bfff" />
        </View>
      )}

      {/* Error Message */}
      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 60,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
  clearButton: {
    color: '#00bfff',
    fontSize: 16,
    marginLeft: 10,
  },
  popularSearchesContainer: {
    marginBottom: 20,
  },
  popularSearchesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popularSearchesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularSearchItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  popularSearchText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  thumbnail: {
    width: '100%',
    height: width * 0.6,
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
    marginTop: 0,
  },
  noResults: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;