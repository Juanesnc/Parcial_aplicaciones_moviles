// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStack';
import FavoritesStackScreen from './FavoritesStack';
import PlannerScreen from '../screens/PlannerScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="InicioTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>🏠</Text>),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesStackScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>❤️</Text>),
        }}
      />
      <Tab.Screen
        name="Planificador"
        component={PlannerScreen}
        options={{
          tabBarLabel: 'Planificador',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>📅</Text>),
        }}
      />
      <Tab.Screen
        name="CrearReceta"
        component={CreateRecipeScreen}
        options={{
          tabBarLabel: 'Crear',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>✍️</Text>),
        }}
      />
    </Tab.Navigator>
  );
}
