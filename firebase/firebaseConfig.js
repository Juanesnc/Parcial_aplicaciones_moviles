// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDa1NHRNOTEm552aMbmx-pKgtJp9m_qbtg",
  authDomain: "react-native-af78e.firebaseapp.com",
  projectId: "react-native-af78e",
  storageBucket: "react-native-af78e.firebasestorage.app",
  messagingSenderId: "250277254654",
  appId: "1:250277254654:web:06f87c99193e863e8f9caf",
  measurementId: "G-KRCNG8S6DT"
};

export function fetchVehiclesFromDB(callback) {
  const vehiclesRef = ref(db, 'Vehiculos');

  onValue(vehiclesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const vehiclesArray = Object.entries(data).map(([id, vehicle]) => ({
        id,
        ...vehicle,
      }));
      callback(vehiclesArray);
    } else {
      callback([]);
    }
  });
}

// Inicializa la app y los servicios
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

// Comprobación de conexión a Firebase Realtime Database
const connectionRef = ref(db, ".info/connected");
onValue(connectionRef, (snapshot) => {
  if (snapshot.val() === true) {
    console.log("Conectado a Firebase");
  } else {
    console.log("Desconectado de Firebase");
  }
});

// Función para obtener países de Europa (ejemplo)
export function fetchEuropeanCountries() {
  fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(data => {
      // Aquí puedes manipular los datos para asignar la propiedad "region"
    })
    .catch(error => console.error("Error al obtener países:", error));
}

// Función para registrar un usuario con email y contraseña
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Registro exitoso
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error en registro:", error);
      throw error;
    });
}

// Función para iniciar sesión con email y contraseña
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error en inicio de sesión:", error);
      throw error;
    });
}

// Agregar un comentario a la base de datos
export function addCommentToDB(vehicleId, comment) {
  const commentsRef = ref(db, `comments/${vehicleId}`);
  return push(commentsRef, comment);
}

// Escuchar los comentarios en tiempo real
export function fetchCommentsFromDB(vehicleId, callback) {
  const commentsRef = ref(db, `comments/${vehicleId}`);
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const commentsArray = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    callback(commentsArray);
  });
}

// Exporta los servicios que necesites en otras partes de tu aplicación
export { app, analytics, db, auth };
