// src/screens/HomeScreen.js
import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import { fetchEuropeanCountries } from '../firebase/firebaseConfig';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  const { recipes, openProfileModal } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetchEuropeanCountries();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openProfileModal} style={{ marginRight: 10 }}>
          <Text style={styles.headerButton}>Perfil</Text>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#F57C00' },
      headerTintColor: '#fff',
    });
  }, [navigation, openProfileModal]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delicias K</Text>
      <TextInput
        style={[styles.input, { marginBottom: 15 }]}
        placeholder="Filtrar recetas..."
        placeholderTextColor="#7D4C00"
        value={filter}
        onChangeText={setFilter}
      />
      <View style={styles.foodGrid}>
        {filteredRecipes.map((item) => (
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
    </ScrollView>
  );
}
