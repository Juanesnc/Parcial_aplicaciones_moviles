// src/contexts/AppContext.js
import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { db, loginUser, registerUser, fetchVehiclesFromDB, addCommentToDB, fetchCommentsFromDB } from '../firebase/firebaseConfig';
import { useEffect } from 'react';

export const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState();
  const [favorites, setFavorites] = useState([]);
  const [planner, setPlanner] = useState([]);
  const [comments, setComments] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Función para iniciar sesión usando Firebase Authentication
  const signUp = async (username, email, password) => {
    if (!username || !email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      const userData = await registerUser(email, password);

      // Guardar el username en Realtime Database usando el UID
      await set(ref(db, 'users/' + userData.uid), {
        username: username,
        email: email,
      });

      // Establecer el estado del usuario incluyendo el username
      setUser({ ...userData, username });

    } catch (error) {
      alert('Error al registrar el usuario: ' + error.message);
      console.error("Error en registro:", error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userData = await loginUser(email, password);

      // Buscar el username en la base de datos
      const snapshot = await get(ref(db, 'users/' + userData.uid));
      const userInfo = snapshot.val();

      if (userInfo) {
        setUser({ ...userData, username: userInfo.username });
      } else {
        setUser(userData); // fallback si no hay username
      }

      fetchVehiclesFromDB((firebaseVehicles) => {
        setVehicles(firebaseVehicles);
      });
    } catch (error) {
      alert('Credenciales inválidas');
      console.error("Error en inicio de sesión:", error);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  useEffect(() => {
    fetchVehiclesFromDB((firebaseVehicles) => {
      setVehicles(firebaseVehicles);
    });
  }, []);


  // Funciones para favoritos
  const addFavorite = (vehicle) => setFavorites([...favorites, vehicle]);
  const removeFavorite = (vehicle) => setFavorites(favorites.filter(fav => fav.id !== vehicle.id));

  // Funciones para planificador
  const addToPlanner = (vehicle) => setPlanner([...planner, vehicle]);
  const removeFromPlanner = (vehicle) => setPlanner(planner.filter(plan => plan.id !== vehicle.id));

  const addComment = (vehicleId, commentText) => {
    console.log(commentText.text);
    const comment = {
      text: commentText.text,
      username: user?.username || 'Anónimo',
      timestamp: Date.now()
    };

    setComments((prev) => ({
      ...prev,
      [vehicleId]: prev[vehicleId] ? [...prev[vehicleId], comment] : [comment]
    }));

    addCommentToDB(vehicleId, comment);
  };

  const loadComments = (vehicleId) => {
    fetchCommentsFromDB(vehicleId, (fetchedComments) => {
      setComments((prevComments) => ({
        ...prevComments,
        [vehicleId]: fetchedComments,
      }));
    });
  };

  // Función para crear recetas
  const addVehicle = (newVehicle) => setVehicles([...vehicles, newVehicle]);

  // Funciones para mostrar/ocultar modal de perfil
  const openProfileModal = () => setProfileModalVisible(true);
  const closeProfileModal = () => setProfileModalVisible(false);

  const appContextValue = {
    user,
    signIn,
    signUp,
    signOut,
    vehicles,
    addVehicle,
    favorites,
    addFavorite,
    removeFavorite,
    planner,
    addToPlanner,
    removeFromPlanner,
    comments,
    addComment,
    openProfileModal,
    closeProfileModal,
    profileModalVisible,
    loadComments,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
