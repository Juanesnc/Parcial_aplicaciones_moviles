// src/navigation/FavoritesStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecipeScreen from '../screens/RecipeScreen';

const FavoritesStack = createStackNavigator();

export default function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoritesMain"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <FavoritesStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => ({ title: route.params.item.name, headerTitleAlign: 'center' })}
      />
    </FavoritesStack.Navigator>
  );
}
