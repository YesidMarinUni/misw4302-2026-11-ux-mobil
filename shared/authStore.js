const USERS_KEY = 'alarm-app-users';
const CURRENT_USER_KEY = 'alarm-app-current-user';
const PENDING_CODE_KEY = 'alarm-app-pending-code';

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUserEmail() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

function setCurrentUserEmail(email) {
  localStorage.setItem(CURRENT_USER_KEY, email);
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function savePendingCode(email, code) {
  const data = {
    email,
    code,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  };
  localStorage.setItem(PENDING_CODE_KEY, JSON.stringify(data));
}

function getPendingCode(email) {
  try {
    const raw = localStorage.getItem(PENDING_CODE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.email !== email) return null;
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(PENDING_CODE_KEY);
      return null;
    }
    return data.code;
  } catch {
    return null;
  }
}

function clearPendingCode() {
  localStorage.removeItem(PENDING_CODE_KEY);
}

function validateEmail(email) {
  const emailRegex = /.+@.+\..+/;
  return emailRegex.test(email);
}

function validateCode(code) {
  return /^\d{6}$/.test(code);
}


export function register(email, password) {

  const users = loadUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'Este email ya está registrado' };
  }
  const newUser = {
    email,
    password,
    verified: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const code = generateCode();
  savePendingCode(email, code);

  console.log(`🔐 Código de verificación para ${email}: ${code}`);
  alert(`Código de verificación: ${code}\n(En producción se enviaría por email)`);

  return { success: true, code };
}

export function login(email, password) {

  if (!validateEmail(email)) {
    return { success: false, error: 'Email inválido' };
  }
  if (!password) {
    return { success: false, error: 'La contraseña es requerida' };
  }

  const users = loadUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Usuario no encontrado' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Contraseña incorrecta' };
  }

  if (user.verified) {
    setCurrentUserEmail(email);
    return { success: true, needsVerification: false };
  }

  const code = generateCode();
  savePendingCode(email, code);

  console.log(`🔐 Código de verificación para ${email}: ${code}`);
  alert(`Código de verificación: ${code}\n(En producción se enviaría por email)`);

  return { success: true, needsVerification: true, code };
}

export function verifyCode(email, code) {
  if (!validateCode(code)) {
    return { success: false, error: 'El código debe tener 6 dígitos' };
  }

  const pendingCode = getPendingCode(email);
  
  if (!pendingCode) {
    return { success: false, error: 'Código expirado o inválido' };
  }

  if (pendingCode !== code) {
    return { success: false, error: 'Código incorrecto' };
  }
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    return { success: false, error: 'Usuario no encontrado' };
  }

  users[userIndex].verified = true;
  saveUsers(users);

  setCurrentUserEmail(email);
  clearPendingCode();

  return { success: true };
}

export function resendCode(email) {
  const users = loadUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Usuario no encontrado' };
  }

  const code = generateCode();
  savePendingCode(email, code);

  console.log(`🔐 Código de verificación reenviado para ${email}: ${code}`);
  alert(`Nuevo código de verificación: ${code}\n(En producción se enviaría por email)`);

  return { success: true, code };
}

export function logout() {
  clearCurrentUser();
  clearPendingCode();
}


export function getCurrentUser() {
  const email = getCurrentUserEmail();
  if (!email) return null;

  const users = loadUsers();
  const user = users.find(u => u.email === email);
  
  if (!user || !user.verified) {
    clearCurrentUser();
    return null;
  }

  return {
    email: user.email,
    verified: user.verified,
    createdAt: user.createdAt,
  };
}


export function isAuthenticated() {
  const user = getCurrentUser();
  return user !== null && user.verified;
}
