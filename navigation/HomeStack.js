// src/navigation/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import CommentsScreen from '../screens/CommentsScreen';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={HomeScreen} options={{ headerTitleAlign: 'center' }} />
      <HomeStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => ({ title: route.params.item.name, headerTitleAlign: 'center' })}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => ({ title: `Comentarios: ${route.params.recipeName}`, headerTitleAlign: 'center' })}
      />
    </HomeStack.Navigator>
  );
}
