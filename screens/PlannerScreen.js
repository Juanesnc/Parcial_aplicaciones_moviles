// src/screens/PlannerScreen.js
import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function PlannerScreen() {
  const { planner } = useContext(AppContext);
  const aggregatedIngredients = {};
  planner.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      aggregatedIngredients[ing] = (aggregatedIngredients[ing] || 0) + 1;
    });
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Planificador</Text>
      <Text style={styles.sectionTitle}>Recetas Planificadas:</Text>
      {planner.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>No has agregado recetas al plan.</Text>
      ) : (
        planner.map(item => (
          <View key={item.id} style={styles.plannerItem}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        ))
      )}
      <Text style={styles.sectionTitle}>Lista de Compras:</Text>
      {Object.keys(aggregatedIngredients).length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>No hay ingredientes.</Text>
      ) : (
        Object.entries(aggregatedIngredients).map(([ingredient, count]) => (
          <Text key={ingredient} style={styles.ingredientText}>
            • {ingredient} {count > 1 ? `x${count}` : ''}
          </Text>
        ))
      )}
    </ScrollView>
  );
}
