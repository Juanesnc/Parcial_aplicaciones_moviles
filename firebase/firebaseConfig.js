// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDa1NHRNOTEm552aMbmx-pKgtJp9m_qbtg",
  authDomain: "react-native-af78e.firebaseapp.com",
  projectId: "react-native-af78e",
  storageBucket: "react-native-af78e.firebasestorage.app",
  messagingSenderId: "250277254654",
  appId: "1:250277254654:web:06f87c99193e863e8f9caf",
  measurementId: "G-KRCNG8S6DT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Comprobación de conexión a Firebase
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

export { app, analytics, db };
