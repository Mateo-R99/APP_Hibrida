# CuentaFácil - Control Financiero para Negocios

CuentaFácil es una aplicación híbrida diseñada para emprendedores y pequeños negocios. Permite llevar un control rápido y sencillo de ingresos y gastos sin complicaciones, ideal para registrar movimientos en el día a día.

## 🚀 Características Principales

*   **Registro rápido:** Anota ingresos y gastos con unos pocos clics.
*   **Balance en tiempo real:** Visualiza tus ingresos, gastos y la ganancia neta del mes actual al instante.
*   **Categorización:** Clasifica tus gastos para saber en qué estás invirtiendo el dinero (insumos, transporte, etc.).
*   **Indicadores clave:** Conoce cuál ha sido tu mejor cliente y cuántos días has tenido ventas.
*   **Diseño intuitivo y responsivo:** Interfaz moderna y adaptable a cualquier dispositivo móvil.
*   **Persistencia local:** Tus datos se guardan en el dispositivo, asegurando que estén siempre disponibles incluso sin conexión a internet.

## 📁 Estructura del Repositorio

El proyecto tiene una arquitectura de Múltiples Páginas (MPA) y está construido con tecnologías web estándar (HTML, CSS/SCSS, JavaScript) empaquetadas con Vite y Capacitor.

```
/
├── android/               # Código nativo generado por Capacitor para la app Android.
├── dist/                  # Archivos compilados listos para producción (creado al hacer build).
├── public/                # Archivos estáticos públicos.
├── src/                   # Código fuente principal de la aplicación.
│   ├── assets/            # Imágenes, iconos (logo.svg, etc).
│   ├── js/                # Lógica JavaScript (servicios, componentes).
│   ├── scss/              # Estilos modulares en Sass.
│   └── main.js            # Punto de entrada principal de JavaScript.
├── index.html             # Pantalla de inicio (Dashboard).
├── ingresos.html          # Pantalla para registrar ingresos.
├── gastos.html            # Pantalla para registrar gastos.
├── movimientos.html       # Historial de todos los movimientos.
├── metas.html             # Pantalla de metas financieras.
├── capacitor.config.json  # Configuración de Capacitor (para la compilación móvil).
├── package.json           # Dependencias del proyecto NPM.
└── vite.config.js         # Configuración del empaquetador web Vite.
```

## ⚙️ Configuración y Ejecución

Puedes ejecutar y probar la aplicación de dos formas: como un proyecto web en tu computadora, o compilando e instalando el APK en un dispositivo Android.

### Opción 1: Ejecución Web (PC o Mac)

Esta es la forma más rápida de probar la aplicación y realizar cambios, abriéndola directamente en tu navegador.

1.  **Clona o descarga el repositorio** en tu computadora.
2.  Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
3.  Abre una terminal en la raíz del proyecto.
4.  Instala las dependencias:
    ```bash
    npm install
    ```
5.  Inicia el servidor de desarrollo local:
    ```bash
    npm run dev
    ```
6.  Abre la URL proporcionada por la terminal (usualmente `http://localhost:5173`) en tu navegador de preferencia. Recomendamos usar el "Modo Dispositivo" o "Developer Tools" de Chrome para simular la vista móvil.

### Opción 2: Compilación de APK (Android)

Si deseas probar la aplicación como una app nativa en tu teléfono Android, debes usar Capacitor para sincronizar el código web al proyecto de Android.

1.  Asegúrate de tener instalado [Android Studio](https://developer.android.com/studio) y el SDK de Android.
2.  Abre una terminal en la raíz del proyecto.
3.  Instala las dependencias y construye el proyecto web para producción:
    ```bash
    npm install
    npm run build
    ```
4.  Sincroniza los archivos web construidos con el proyecto de Android:
    ```bash
    npx cap sync android
    ```
5.  Abre el proyecto en Android Studio:
    ```bash
    npx cap open android
    ```
6.  Desde Android Studio, espera a que Gradle termine de sincronizar el proyecto. Luego, presiona el botón **"Run"** (▶️) para instalar la aplicación en un emulador o en tu dispositivo físico conectado por USB. 
7.  *Alternativa:* En Android Studio puedes ir a `Build > Build Bundle(s) / APK(s) > Build APK(s)` para generar el archivo instalable de forma manual.

---

## 🛠 Tecnologías Utilizadas

*   **HTML5 & Sass (SCSS):** Estructuración y diseño estilizado, con variables, mixins y control de estilos avanzados.
*   **JavaScript (Vanilla ES6+):** Lógica del negocio e interacción (sin frameworks pesados para un rendimiento óptimo).
*   **Vite:** Herramienta de construcción y servidor de desarrollo ultrarrápido.
*   **Capacitor:** Puente para transformar la aplicación web en una aplicación nativa para Android/iOS con acceso a plugins nativos.
