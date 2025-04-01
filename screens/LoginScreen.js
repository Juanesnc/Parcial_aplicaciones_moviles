// src/screens/LoginScreen.js
import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AppContext);

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#7D4C00"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7D4C00"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={() => signIn(username, password)}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}
