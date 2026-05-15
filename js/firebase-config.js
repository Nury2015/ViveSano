// ============================================================
// FIREBASE — Configuración e inicialización
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyB6KqvLF21MoUJLX4rFvMW4nmYWnMizNVo",
  authDomain:        "vivesano-a81b0.firebaseapp.com",
  projectId:         "vivesano-a81b0",
  storageBucket:     "vivesano-a81b0.firebasestorage.app",
  messagingSenderId: "763249266170",
  appId:             "1:763249266170:web:084a72d9098db3c2896843",
  measurementId:     "G-WQTGXJCMD0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();
