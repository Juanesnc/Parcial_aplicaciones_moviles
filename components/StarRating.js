// src/components/StarRating.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esta dependencia instalada

export default function StarRating({ rating = 0, setRating = () => {} }) {
  return (
    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Ionicons
            name={rating >= star ? 'star' : 'star-outline'}
            size={30}
            color="#f1c40f"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
