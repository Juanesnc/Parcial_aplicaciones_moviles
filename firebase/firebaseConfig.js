// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJXezfeQQzciAfB5Ir5LO-jF2LHUeNbyc",
  authDomain: "curso-vue-edb1c.firebaseapp.com",
  projectId: "curso-vue-edb1c",
  storageBucket: "curso-vue-edb1c.firebasestorage.app",
  messagingSenderId: "113743827410",
  appId: "1:113743827410:web:9ef1fff7c5607be610380b",
  measurementId: "G-P8GW93N4X9"
};

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
      console.log(data);
    })
    .catch(error => console.error("Error al obtener países:", error));
}

// Función para registrar un usuario con email y contraseña
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Registro exitoso
      console.log("Usuario registrado:", userCredential.user);
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
      console.log("Usuario logueado:", userCredential.user);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error en inicio de sesión:", error);
      throw error;
    });
}

// Exporta los servicios que necesites en otras partes de tu aplicación
export { app, analytics, db, auth };
