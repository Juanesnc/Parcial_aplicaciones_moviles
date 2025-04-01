// src/screens/CreateRecipeScreen.js
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function CreateRecipeScreen({ navigation }) {
  const { addRecipe, recipes } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [recipeText, setRecipeText] = useState('');

  const handleCreateRecipe = () => {
    if (!name || !description || !image || !ingredientsText || !recipeText) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const newRecipe = {
      id: (recipes.length + 1).toString(),
      name,
      description,
      image,
      ingredients: ingredientsText.split(',').map(i => i.trim()),
      recipe: recipeText,
      region: '', // Puedes asignar una región por defecto o dejarla vacía
    };
    addRecipe(newRecipe);
    Alert.alert('Éxito', 'Receta creada');
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        placeholderTextColor="#7D4C00"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción breve"
        placeholderTextColor="#7D4C00"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        placeholderTextColor="#7D4C00"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes (separados por coma)"
        placeholderTextColor="#7D4C00"
        value={ingredientsText}
        onChangeText={setIngredientsText}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Preparación / Receta"
        placeholderTextColor="#7D4C00"
        value={recipeText}
        onChangeText={setRecipeText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateRecipe}>
        <Text style={styles.buttonText}>Crear Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
