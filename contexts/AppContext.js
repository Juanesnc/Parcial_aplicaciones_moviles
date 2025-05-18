// src/contexts/AppContext.js
import React, { useState } from 'react';
import { ref, set, remove, get } from 'firebase/database';
import { db, loginUser, registerUser, fetchVehiclesFromDB, addCommentToDB, fetchCommentsFromDB } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor completa todos los campos'
      });
      return;
    }
    try {
      const userData = await registerUser(email, password);

      // Guardar el username en Realtime Database usando el UID
      await set(ref(db, 'users/' + userData.uid), {
        id: userData.uid,
        username: username,
        email: email,
      });

      // Establecer el estado del usuario incluyendo el username
      setUser({ ...userData, username });
      loadAllComments();

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error al registrar el usuario: ' + error.message
      });
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
        loadAllComments();
      });
      loadFavorites(userData.uid);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Credenciales inválidas'
      });
    }
  };

  const signOut = () => {
    setFavorites([]);
    setUser(null);
  };

  useEffect(() => {
    fetchVehiclesFromDB((firebaseVehicles) => {
      setVehicles(firebaseVehicles);
    });
  }, []);


  // Funciones para favoritos
  const addFavorite = async (vehicle) => {
    if (!user) return;
    const favRef = ref(db, `favorites/${user.uid}/${vehicle.id}`);
    await set(favRef, vehicle);
    setFavorites((prev) => [...prev, vehicle]);
  };

  const removeFavorite = async (vehicle) => {
    if (!user) return;
    const favRef = ref(db, `favorites/${user.uid}/${vehicle.id}`);
    await remove(favRef);
    setFavorites((prev) => prev.filter((fav) => fav.id !== vehicle.id));
  };

  const loadFavorites = async (uid) => {
    if (!uid) return;
    const favRef = await get(ref(db, 'favorites/' + uid));
    const favList = favRef.val();
    if (favList) {
      setFavorites(favList);
    }
  };

  // Funciones para planificador
  const addToPlanner = (vehicle) => setPlanner([...planner, vehicle]);
  const removeFromPlanner = (vehicle) => setPlanner(planner.filter(plan => plan.id !== vehicle.id));

  const addComment = (vehicleId, commentText) => {
    const comment = {
      text: commentText.text,
      username: user?.username || 'Anónimo',
      rating: commentText.rating,
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

  const loadAllComments = async () => {
    try {
      const snapshot = await get(ref(db, 'comments'));
      const data = snapshot.val();

      if (data) {
        const formattedComments = {};

        Object.entries(data).forEach(([vehicleId, commentGroup]) => {
          formattedComments[vehicleId] = Object.entries(commentGroup).map(([commentId, commentData]) => ({
            id: commentId,
            ...commentData,
          }));
        });

        setComments(formattedComments);
      }
    } catch (error) {
      console.error("Error al cargar todos los comentarios:", error);
    }
  };

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
      <Toast />
    </AppContext.Provider>
  );
}
