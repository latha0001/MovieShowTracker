// src/screens/MovieDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://api.rapidmock.com/api/vikuman/v1/movies?id=${movieId}`)
      .then(response => setDetails(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  const addToList = (status) => {
    axios.post('https://api.rapidmock.com/api/vikuman/v1/mylist/add', {
      movieId,
      status,
    });
  };

  if (!details) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{details.title}</Text>
      <Text>{details.description}</Text>
      <Button title="To Watch" onPress={() => addToList('To Watch')} />
      <Button title="Watched" onPress={() => addToList('Watched')} />
    </View>
  );
};

export default MovieDetailsScreen;
