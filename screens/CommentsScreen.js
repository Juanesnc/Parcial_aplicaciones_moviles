// src/screens/CommentsScreen.js
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import styles from '../styles/styles';

export default function CommentsScreen({ route }) {
  const { recipeId, recipeName } = route.params;
  const { comments, addComment, user } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const recipeComments = comments[recipeId] || [];

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      Alert.alert('Error', 'Ingresa un comentario');
      return;
    }
    addComment(recipeId, { username: user.username, text: newComment });
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios para {recipeName}</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {recipeComments.map((comm, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUser}>{comm.username}:</Text>
            <Text style={styles.commentText}>{comm.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        placeholderTextColor="#7D4C00"
        value={newComment}
        onChangeText={setNewComment}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Agregar Comentario</Text>
      </TouchableOpacity>
    </View>
  );
}
