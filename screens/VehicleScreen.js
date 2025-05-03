// src/screens/VehicleScreen.js
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function VehicleScreen({ route, navigation }) {
  const { item } = route.params;  // El vehículo seleccionado
  const {
    favorites,
    addFavorite,
    removeFavorite,
    planner,
    addToPlanner,
    removeFromPlanner
  } = useContext(AppContext);
  const isFavorite = favorites.find(fav => fav.id === item.id);
  const inPlanner = planner.find(plan => plan.id === item.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  const handleTogglePlanner = () => {
    if (inPlanner) {
      removeFromPlanner(item);
    } else {
      addToPlanner(item);
    }
  };

  return (
    <ScrollView style={styles.vehicleDetailsContainer}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} resizeMode="contain" />
      <View style={styles.detailsContent}>
        <Text style={styles.detailsTitle}>{item.name}</Text>
        {/* En lugar de "Hecho en {item.region}", mostramos quizás el año o motor */}
        <Text style={styles.detailsText}>Año: {item.year}</Text>
        <Text style={styles.detailsText}>Descripción: {item.description}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Características:</Text>
          <View style={styles.featureList}>
            {item.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles Adicionales:</Text>
          <Text style={styles.detailsText}>{item.details}</Text>
        </View>
        <View style={styles.buttonGroup}>
          {/* <TouchableOpacity style={styles.smallButton} onPress={handleToggleFavorite}>
            <Text style={styles.buttonText}>{isFavorite ? 'Quitar Favorito' : 'Agregar Favorito'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={handleTogglePlanner}>
            <Text style={styles.buttonText}>{inPlanner ? 'Quitar del Plan' : 'Agregar al Plan'}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.buttonComentarios}
            onPress={() =>
              navigation.navigate('Comments', { vehicleId: item.id, vehicleName: item.name })
            }
          >
            <Text style={styles.buttonComentariosText}>Comentarios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
