// src/screens/VehicleScreen.js
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';
import SimpleMap from '../components/SimpleMap';

export default function VehicleScreen({ route, navigation }) {
  const { item } = route.params;  // El vehículo seleccionado
  const {
    favorites,
    addFavorite,
    removeFavorite,
    comments
  } = useContext(AppContext);
  const isFavorite = favorites.find(fav => fav?.id === item.id);

  const vehicleComments = comments[item.id] || [];
  const averageRating = vehicleComments.length
    ? vehicleComments.reduce((sum, c) => sum + c.rating, 0) / vehicleComments.length
    : 0;

    console.log(item)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return (
    <ScrollView style={styles.vehicleDetailsContainer}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} resizeMode="contain" />
      <View style={styles.detailsContent}>
        <Text style={styles.detailsTitle}>{item.name}</Text>
        <Text style={{ color: '#f1c40f', fontSize: 16 }}>
          {'★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating))}
        </Text>
        <Text style={{ marginLeft: 8, fontSize: 12 }}>
          {vehicleComments.length} comentarios
        </Text>
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
        {item.branchLocation && (
          <SimpleMap
            latitude={item.branchLocation.latitude}
            longitude={item.branchLocation.longitude}
            title={item.branchLocation.title}
          />
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonComentarios} onPress={handleToggleFavorite}>
            <Text style={styles.buttonComentariosText}>
              {isFavorite ? 'Quitar Favorito' : 'Agregar Favorito'}
            </Text>
          </TouchableOpacity>
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
