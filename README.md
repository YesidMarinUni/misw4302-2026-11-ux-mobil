# AlarmApp

Aplicacion movil de alarmas construida con React Native para Android. El proyecto incluye flujo de autenticacion, gestion de alarmas, configuracion de proposito al despertar, pantallas de sueno, herramientas de enfoque y una experiencia de rutina matutina.


## Autores

| Nombre | Email |
|---|---|
| Yesdi Marin | y.marinr@uniandes.edu.co |
| Alejandro Forero | ja.forerog1@uniandes.edu.co |

---

## Caracteristicas

- Flujo de autenticacion con pantallas de login, registro y verificacion por codigo.
- Creacion y edicion de alarmas con prioridad, color, tono y acciones configurables.
- Pantalla principal con listado de alarmas y control de activacion.
- Seccion de sueno para acompanar la rutina nocturna.
- Seccion de morning routine con experiencias posteriores al despertar.
- Herramientas adicionales como focus mode y otras utilidades.
- Contexto global para el estado de alarmas.
- Registro de eventos relacionados con snooze y cumplimiento usando store en la nube.

## Stack Tecnologico

- React Native 0.84.1
- React 19.2.3
- React Navigation
- react-native-screens
- react-native-safe-area-context
- Jest
- ESLint
- TypeScript configurado en el proyecto

## Requisitos Minimos

Para correr el proyecto en Android necesitas como minimo:

- Node.js 22.11.0 o superior
- npm instalado
- JDK 17
- Android Studio instalado
- Android SDK configurado
- Android SDK Platform-Tools
- Un emulador Android o un dispositivo fisico con depuracion USB habilitada

## Configuracion del entorno

Antes de ejecutar la app, verifica que React Native para Android este correctamente configurado en tu maquina.

Variables de entorno recomendadas en macOS:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
## Instalacion

Desde la raiz del proyecto:

```sh
npm install
```

## Como correr el proyecto

### 1. Iniciar Metro

En una terminal, desde la raiz del proyecto:

```sh
npm start
```

### 2. Iniciar Android

En otra terminal, desde la raiz del proyecto:

```sh
npm run android
```

Esto compila la aplicacion e instala la app en un emulador Android abierto o en un dispositivo conectado.

### 3. Verificar dispositivos disponibles

Si Android no detecta el emulador o el dispositivo, puedes validar la conexion con:

```sh
adb devices
```

## Scripts Disponibles

- `npm start`: inicia el servidor Metro.
- `npm run android`: compila y ejecuta la app en Android.
- `npm test`: ejecuta los tests con Jest.
- `npm run lint`: ejecuta ESLint sobre el proyecto.

## Estructura del proyecto

```text
AlarmApp/
├── App.jsx
├── index.js
├── src/
│   ├── AlarmContext.js
│   ├── components/
│   ├── navigation/
│   │   └── AppNavigator.jsx
│   ├── screens/
│   │   ├── MainScreen.jsx
│   │   ├── auth/
│   │   └── main/
│   └── stores/
├── android/
└── __tests__/
```

### Organizacion principal

- `App.jsx`: punto de entrada principal de la app.
- `src/navigation/AppNavigator.jsx`: define la navegacion principal entre login, registro, verificacion y flujo principal.
- `src/screens/auth/`: pantallas del flujo de autenticacion.
- `src/screens/main/`: pantallas principales de alarmas, sueno, morning flow, tools y experiencias relacionadas.
- `src/components/`: componentes reutilizables de UI.
- `src/AlarmContext.js`: manejo del estado global relacionado con alarmas y navegacion interna.
- `src/stores/`: stores compartidas.

## Flujo funcional de la app

De forma general, la app sigue este flujo:

1. El usuario entra por autenticacion.
2. Accede al contenedor principal de la aplicacion.
3. Administra alarmas desde Home.
4. Navega entre tabs de sueno, morning y tools.
5. Configura experiencias complementarias como proposito, snooze, alarma activa, feedback y good morning.
