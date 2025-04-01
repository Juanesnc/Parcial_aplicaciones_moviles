// src/screens/RecipeScreen.js
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function RecipeScreen({ route, navigation }) {
  const { item } = route.params;
  const { favorites, addFavorite, removeFavorite, planner, addToPlanner, removeFromPlanner } = useContext(AppContext);
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
    <ScrollView style={styles.recipeContainer}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} resizeMode="contain" />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.name}</Text>
        <Text style={styles.recipeRegion}>Hecho en {item.region}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          <View style={styles.ingredientList}>
            {item.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text>•</Text>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación:</Text>
          <View style={styles.stepContainer}>
            {item.recipe.split('\n').map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step.replace(/^\d+\.\s*/, '')}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.smallButton} onPress={handleToggleFavorite}>
            <Text style={styles.buttonText}>{isFavorite ? 'Quitar Favorito' : 'Agregar Favorito'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={handleTogglePlanner}>
            <Text style={styles.buttonText}>{inPlanner ? 'Quitar del Plan' : 'Agregar al Plan'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate('Comments', { recipeId: item.id, recipeName: item.name })}>
            <Text style={styles.buttonText}>Comentarios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
