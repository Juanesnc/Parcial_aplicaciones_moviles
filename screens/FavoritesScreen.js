// src/screens/FavoritesScreen.js
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(AppContext);
  return (
    <ScrollView style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>
          No tienes recetas favoritas.
        </Text>
      ) : (
        <View style={styles.foodGrid}>
          {favorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.foodCard}
              onPress={() => navigation.navigate('Recipe', { item })}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
