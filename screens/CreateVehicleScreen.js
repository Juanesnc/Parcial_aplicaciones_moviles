// src/screens/CreateVehicleScreen.js
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function CreateVehicleScreen({ navigation }) {
  const { addVehicle, vehicles } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [vehicleText, setVehicleText] = useState('');

  const handleCreateVehicle = () => {
    if (!name || !description || !image || !ingredientsText || !vehicleText) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const newVehicle = {
      id: (vehicles.length + 1).toString(),
      name,
      description,
      image,
      ingredients: ingredientsText.split(',').map(i => i.trim()),
      vehicle: vehicleText,
      region: '', // Puedes asignar una región por defecto o dejarla vacía
    };
    addVehicle(newVehicle);
    Alert.alert('Éxito', 'Receta creada');
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción breve"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes (separados por coma)"
        value={ingredientsText}
        onChangeText={setIngredientsText}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Preparación / Receta"
        value={vehicleText}
        onChangeText={setVehicleText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateVehicle}>
        <Text style={styles.buttonText}>Crear Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
