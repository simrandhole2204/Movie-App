// components/ShowItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ShowItem = ({ show }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: show.image?.medium || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.title}>{show.name}</Text>
      <Text style={styles.summary} numberOfLines={3}>
        {show.summary?.replace(/<[^>]+>/g, '') || 'No summary available.'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 150,
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#fff',
  },
  summary: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
});

export default ShowItem;