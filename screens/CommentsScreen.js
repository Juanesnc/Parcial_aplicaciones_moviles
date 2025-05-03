// src/screens/CommentsScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';

export default function CommentsScreen({ route }) {
  const { vehicleId, vehicleName } = route.params;
  const { comments, addComment, user, loadComments } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');

  // ● Aquí va el hook, en el cuerpo principal:
  useEffect(() => {
    loadComments(vehicleId);
  }, [vehicleId]);

  const vehicleComments = comments[vehicleId] || [];

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ingresa un comentario'
      });
      return;
    }
    // Crea el objeto comentario
    const commentObj = {
      username: user.username,
      text: newComment.trim(),
      timestamp: Date.now()
    };

    addComment(vehicleId, commentObj);
    setNewComment('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Usa el locale del dispositivo para formato
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios para {vehicleName}</Text>

      <ScrollView style={{ maxHeight: 300 }}>
        {vehicleComments.map((comm, idx) => (
          <View key={idx} style={styles.commentItem}>
            <Text style={styles.commentUser}>{comm.username}:</Text>
            <Text style={styles.commentText}>{comm.text}</Text>
            <Text style={styles.commentTimestamp}>{formatTimestamp(comm.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        value={newComment}
        onChangeText={setNewComment}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Agregar Comentario</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
