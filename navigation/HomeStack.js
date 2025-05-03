// src/navigation/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VehicleScreen from '../screens/VehicleScreen'; // Renombra VehicleScreen a VehicleScreen
import CommentsScreen from '../screens/CommentsScreen'; // Si sigues necesitando comentarios, actualizalo según corresponda

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={HomeScreen} options={{ headerTitleAlign: 'center' }} />
      <HomeStack.Screen
        name="VehicleDetails" // Cambio de nombre
        component={VehicleScreen} // Asegurate de renombrar VehicleScreen a VehicleScreen en tu proyecto
        options={({ route }) => ({
          title: route.params.item.name,
          headerTitleAlign: 'center'
        })}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => ({
          title: `Comentarios: ${route.params.vehicleName}`, // Actualizalo si fuera necesario
          headerTitleAlign: 'center'
        })}
      />
    </HomeStack.Navigator>
  );
}
