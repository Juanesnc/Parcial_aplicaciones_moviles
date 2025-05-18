// src/screens/CommentsScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';
import StarRating from '../components/StarRating'; // Importa el nuevo componente

export default function CommentsScreen({ route }) {
  const { vehicleId, vehicleName } = route.params;
  const { comments, addComment, user, loadComments } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0); // Estado para la calificación

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

    const commentObj = {
      username: user.username,
      text: newComment.trim(),
      rating: rating,
      timestamp: Date.now()
    };

    addComment(vehicleId, commentObj);
    setNewComment('');
    setRating(0); // Reinicia la calificación después de agregar el comentario
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
            <Text style={styles.commentRating}>
              {'★'.repeat(comm.rating) + '☆'.repeat(5 - comm.rating)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        value={newComment}
        onChangeText={setNewComment}
      />

      <Text style={{ marginTop: 10 }}>Califica de 0 a 5 estrellas:</Text>
      <StarRating rating={rating} setRating={setRating} />

      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Agregar Comentario</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
