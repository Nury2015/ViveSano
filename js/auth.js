// ============================================================
// AUTH — Firebase Authentication + Firestore
// ============================================================

let _pendingAccion = null;

// ─── VERIFICAR ANTES DE GUARDAR ──────────────────────────────
function verificarYProceder(accion) {
  if (auth.currentUser) {
    accion();
  } else {
    _pendingAccion = accion;
    mostrarModalAuth();
  }
}

// ─── MOSTRAR / CERRAR MODAL ──────────────────────────────────
function mostrarModalAuth() {
  const modal = document.getElementById("modal-auth");
  if (modal) modal.style.display = "flex";
  cambiarTab("login");
}

function cerrarModalAuth() {
  const modal = document.getElementById("modal-auth");
  if (modal) modal.style.display = "none";
  _pendingAccion = null;
  _limpiarErrores();
}

// ─── TABS ────────────────────────────────────────────────────
function cambiarTab(tab) {
  const tabs   = { login: document.getElementById("tab-login"),
                   registro: document.getElementById("tab-registro") };
  const forms  = { login: document.getElementById("form-login"),
                   registro: document.getElementById("form-registro") };

  Object.keys(tabs).forEach(t => {
    if (!tabs[t]) return;
    const activa = t === tab;
    tabs[t].style.color       = activa ? "#2e7d32" : "#999";
    tabs[t].style.fontWeight  = activa ? "700"     : "600";
    tabs[t].style.borderBottom= activa ? "2px solid #2e7d32" : "2px solid transparent";
    if (forms[t]) forms[t].style.display = activa ? "flex" : "none";
  });
  _limpiarErrores();
}

function _limpiarErrores() {
  ["login","registro"].forEach(id => {
    const el = document.getElementById("error-" + id);
    if (el) el.textContent = "";
  });
}

function _mostrarError(formId, msg) {
  const el = document.getElementById("error-" + formId);
  if (el) el.textContent = msg;
}

// ─── FIRESTORE: GUARDAR PERFIL ───────────────────────────────
async function guardarPerfil(uid, datos) {
  try {
    await db.collection("usuarios").doc(uid).set(datos, { merge: true });
  } catch(e) {
    console.error("Error guardando perfil:", e);
  }
}

// ─── FIRESTORE: CARGAR PERFIL ────────────────────────────────
async function cargarPerfil(uid) {
  try {
    const doc = await db.collection("usuarios").doc(uid).get();
    if (doc.exists) {
      const datos = doc.data();
      localStorage.setItem("datosUsuario", JSON.stringify(datos));
      if (datos.caloriasObjetivo)
        localStorage.setItem("caloriasObjetivo", datos.caloriasObjetivo);
      return datos;
    }
  } catch(e) {
    console.error("Error cargando perfil:", e);
  }
  return null;
}

// ─── DESPUÉS DE AUTH EXITOSA ─────────────────────────────────
async function _despuesDeAuth(user, datosExtra) {
  if (datosExtra) {
    const prevLocal = JSON.parse(localStorage.getItem("datosUsuario") || "{}");
    const perfil = {
      nombre:      datosExtra.nombre || user.displayName || "",
      email:       user.email,
      uid:         user.uid,
      enfermedad:  datosExtra.enfermedad || "ninguna",
      objetivo:    datosExtra.objetivo   || "mantener",
      condicion:   "ninguna",
      // conservar datos de calculadora si los había
      ...(prevLocal.peso      ? { peso:      prevLocal.peso      } : {}),
      ...(prevLocal.estatura  ? { estatura:  prevLocal.estatura  } : {}),
      ...(prevLocal.edad      ? { edad:      prevLocal.edad      } : {}),
      ...(prevLocal.sexo      ? { sexo:      prevLocal.sexo      } : {}),
      ...(prevLocal.actividad ? { actividad: prevLocal.actividad } : {}),
    };
    localStorage.setItem("datosUsuario", JSON.stringify(perfil));
    await guardarPerfil(user.uid, perfil);
  } else {
    await cargarPerfil(user.uid);
  }

  actualizarNavUsuario(user);
  cerrarModalAuth();

  // Ejecutar acción pendiente (guardar plan, favoritos, etc.)
  if (_pendingAccion) {
    const accion = _pendingAccion;
    _pendingAccion = null;
    accion();
  }

  // Refrescar barra de progreso si aplica
  if (typeof actualizarProgreso === "function") actualizarProgreso();
}

// ─── LOGIN CON EMAIL ─────────────────────────────────────────
async function loginEmail() {
  const email = document.getElementById("login-email")?.value.trim();
  const pass  = document.getElementById("login-pass")?.value;

  if (!email || !pass) { _mostrarError("login", "Completa todos los campos"); return; }

  try {
    const r = await auth.signInWithEmailAndPassword(email, pass);
    await _despuesDeAuth(r.user, null);
  } catch(e) {
    const msgs = {
      "auth/user-not-found":    "No existe una cuenta con ese correo",
      "auth/wrong-password":    "Contraseña incorrecta",
      "auth/invalid-email":     "Correo inválido",
      "auth/invalid-credential":"Correo o contraseña incorrectos",
      "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
    };
    _mostrarError("login", msgs[e.code] || "Error al iniciar sesión");
  }
}

// ─── REGISTRO CON EMAIL ──────────────────────────────────────
async function registrarEmail() {
  const nombre     = document.getElementById("reg-nombre")?.value.trim();
  const email      = document.getElementById("reg-email")?.value.trim();
  const pass       = document.getElementById("reg-pass")?.value;
  const pass2      = document.getElementById("reg-pass2")?.value;
  const enfermedad = document.getElementById("reg-enfermedad")?.value || "ninguna";
  const objetivo   = document.getElementById("reg-objetivo")?.value   || "mantener";

  if (!nombre || !email || !pass) { _mostrarError("registro", "Completa todos los campos"); return; }
  if (pass.length < 6)            { _mostrarError("registro", "La contraseña debe tener al menos 6 caracteres"); return; }
  if (pass !== pass2)             { _mostrarError("registro", "Las contraseñas no coinciden"); return; }

  try {
    const r = await auth.createUserWithEmailAndPassword(email, pass);
    await r.user.updateProfile({ displayName: nombre });
    await _despuesDeAuth(r.user, { nombre, enfermedad, objetivo });
  } catch(e) {
    const msgs = {
      "auth/email-already-in-use":  "Ya existe una cuenta con ese correo",
      "auth/invalid-email":         "Correo inválido",
      "auth/weak-password":         "La contraseña es muy débil (mínimo 6 caracteres)",
      "auth/network-request-failed":"Sin conexión. Verifica tu internet.",
      "auth/too-many-requests":     "Demasiados intentos. Espera un momento.",
      "auth/unauthorized-domain":   "Dominio no autorizado. Contacta al administrador.",
      "auth/operation-not-allowed": "El registro por correo no está habilitado.",
    };
    _mostrarError("registro", msgs[e.code] || `Error: ${e.message}`);
  }
}

// ─── LOGIN CON GOOGLE ────────────────────────────────────────
async function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const r = await auth.signInWithPopup(provider);
    const isNew = r.additionalUserInfo?.isNewUser;
    await _despuesDeAuth(r.user, isNew
      ? { nombre: r.user.displayName || "", enfermedad: "ninguna", objetivo: "mantener" }
      : null
    );
  } catch(e) {
    if (e.code === "auth/popup-closed-by-user") return;
    if (e.code === "auth/unauthorized-domain")
      _mostrarError("login", "Dominio no autorizado en Firebase. Agrega nury2015.github.io en Firebase Console → Authentication → Authorized domains.");
    else
      _mostrarError("login", "Error con Google. Intenta con correo y contraseña.");
  }
}

// ─── CERRAR SESIÓN ───────────────────────────────────────────
async function cerrarSesion() {
  await auth.signOut();
  localStorage.removeItem("datosUsuario");
  localStorage.removeItem("caloriasObjetivo");
  actualizarNavUsuario(null);
}

// ─── ACTUALIZAR NOMBRE EN EL NAV ─────────────────────────────
function actualizarNavUsuario(user) {
  const elNombre   = document.getElementById("nav-user-nombre");
  const elLogout   = document.getElementById("nav-logout");
  const elLogin    = document.getElementById("nav-login");
  const elUserCard = document.getElementById("nav-user-card");

  if (user) {
    const nombre = user.displayName || user.email?.split("@")[0] || "Usuario";
    if (elNombre)   elNombre.textContent      = nombre;
    if (elLogout)   elLogout.style.display    = "flex";
    if (elLogin)    elLogin.style.display     = "none";
    if (elUserCard) elUserCard.style.display  = "flex";
  } else {
    if (elNombre)   elNombre.textContent      = "";
    if (elLogout)   elLogout.style.display    = "none";
    if (elLogin)    elLogin.style.display     = "flex";
    if (elUserCard) elUserCard.style.display  = "none";
  }
}

// ─── ESCUCHAR CAMBIOS DE AUTH ────────────────────────────────
auth.onAuthStateChanged(async (user) => {
  if (user) {
    await cargarPerfil(user.uid);
    // Esperar a que el menú esté en el DOM
    setTimeout(() => actualizarNavUsuario(user), 300);
    if (typeof actualizarProgreso === "function") actualizarProgreso();
  } else {
    setTimeout(() => actualizarNavUsuario(null), 300);
  }
});
