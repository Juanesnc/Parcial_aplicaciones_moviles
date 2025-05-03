// src/screens/HomeScreen.js
import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  const { vehicles, openProfileModal } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredVehicles  = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(filter.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openProfileModal} style={{ marginRight: 10 }}>
          <Text style={styles.headerButton}>Perfil</Text>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#0D1B2A' },
      headerTintColor: '#fff',
    });
  }, [navigation, openProfileModal]);

  return (
    <ScrollView style={styles.container}>
      {/* Título actualizado */}
      <Text style={styles.title}>Concesionaria K</Text>
      <TextInput
        style={[styles.input, { marginBottom: 15 }]}
        placeholder="Buscar vehículo..."
        placeholderTextColor="#3E4C59"
        value={filter}
        onChangeText={setFilter}
      />
      {/* Usamos estilos adaptados a la nueva temática: vehicleGrid y vehicleCard */}
      <View style={styles.vehicleGrid}>
        {filteredVehicles.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.vehicleCard}
            // Navegamos a la pantalla de detalles del vehículo (VehicleScreen)
            onPress={() => navigation.navigate('VehicleDetails', { item })}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              {/* Mostramos, por ejemplo, el año o algún detalle relevante */}
              <Text style={styles.cardDetail}>Año: {item.year}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}