// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function ProfileScreen({ onClose }) {
  const { user, signOut } = useContext(AppContext);
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.profileTitle}>Perfil</Text>
        <Text style={styles.profileText}>Usuario: {user.username}</Text>
        <Text style={styles.profileText}>Email: {user.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onClose();
            signOut();
          }}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
