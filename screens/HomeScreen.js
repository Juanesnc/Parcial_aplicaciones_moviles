// src/screens/HomeScreen.js
import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  const { vehicles, openProfileModal, comments } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(filter.toLowerCase())
  );

  console.log(comments);

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
        {filteredVehicles.map((item) => {
          const vehicleComments = comments[item.id] || [];
          const averageRating = vehicleComments.length
            ? vehicleComments.reduce((sum, c) => sum + c.rating, 0) / vehicleComments.length
            : 0;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.vehicleCard}
              onPress={() => navigation.navigate('VehicleDetails', { item })}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDetail}>Año: {item.year}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ color: '#f1c40f', fontSize: 16 }}>
                    {'★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating))}
                  </Text>
                  <Text style={{ marginLeft: 8, fontSize: 12 }}>
                    {vehicleComments.length} comentarios
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}