# 👩‍💻 Portfolio Personal - Andrea Pineda

![Web Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **"Transformando problemas complejos en soluciones digitales eficientes."**

Bienvenido/a al repositorio del código fuente de mi portafolio personal. Este proyecto no solo es una vitrina de mis trabajos, sino una demostración práctica de mis habilidades en desarrollo Frontend, optimización UX y maquetación responsiva.

---

## 🚀 Demo en Vivo

Puedes visitar el sitio web desplegado aquí:
👉 **[https://Apine15.github.io/portfolio-personal/]**

---

## 💡 Sobre el Proyecto

Este portafolio fue diseñado para reflejar mi perfil híbrido: **Formación en Ingeniería Agronómica + Desarrollo de Software**. 

El objetivo principal fue crear una "Single Page Application" (SPA) estática que fuera rápida, accesible y visualmente atractiva, sin depender de frameworks pesados para la carga inicial.

### ✨ Características Destacadas

* **🎨 UI/UX Moderna:** Diseño "Dark Mode" con paleta de colores personalizada (Russian Violet & Caribbean Current).
* **✨ Efectos Visuales:** Fondo animado con HTML5 Canvas (sistema de partículas interactivo con el mouse).
* **⚡ Formulario AJAX:** Sistema de contacto integrado con Formspree que **no recarga la página** al enviar (Fetch API + Feedback visual asíncrono).
* **📱 Diseño Responsivo:** Adaptable a móviles, tablets y escritorio usando Bootstrap 5 + CSS Grid/Flexbox.
* **🔍 SEO Optimized:** Implementación de metaetiquetas Open Graph para previsualización social profesional en LinkedIn y WhatsApp.
* **♿ Accesibilidad:** Navegación por teclado, textos alternativos y contrastes cuidados.


**Galería — Soporte de video e index.json dinámico**

- La galería del portafolio ahora detecta y reproduce archivos de video (`.mp4`, `.webm`, `.ogg`) además de imágenes.
- Si una tarjeta de proyecto no incluye rutas en su atributo `data-images`, el JavaScript intentará cargar `assets/projects/{ID}/index.json` (donde `{ID}` es el valor de `data-project`) y usar los archivos listados allí como recursos de la galería.
- Esto permite mantener los archivos multimedia de cada proyecto en `assets/projects/{ID}/` y evitar duplicar rutas en el HTML.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto se construyó utilizando tecnologías estándar de la web, priorizando el rendimiento:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font%20Awesome-538DD7?style=for-the-badge&logo=font-awesome&logoColor=white)

---

## 📂 Estructura del Proyecto

Organización semántica de los archivos para facilitar el mantenimiento:

```bash
portfolio/
├── assets/
│   ├── projects/      # Imágenes organizadas por ID de proyecto
│   ├── logo.svg       # Branding
│   └── favicon.svg
├── css/
│   └── style.css      # Variables CSS personalizadas y media queries
├── js/
│   └── script.js      # Lógica de partículas, galería modal y envío de formularios
├── index.html         # Estructura semántica y SEO
└── README.md          # Documentación
```

---

## Instalación y Uso

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/Apine15/portfolio-personal.git
   cd portfolio-personal
   ```

2. **Abre el archivo `index.html` en tu navegador**  
   Ejecuta el proyecto: Simplemente abre el archivo index.html en tu navegador.
   Recomendado: Usa la extensión Live Server en VS Code para ver los cambios en tiempo real.

3. **Personalización**  
   - Modifica los textos, proyectos y datos de contacto en `index.html` según tus necesidades.
   - Cambia el logo en `assets/logo.svg` si lo deseas.

## Accesibilidad

- Todos los enlaces y botones incluyen texto discernible, visible o accesible solo para lectores de pantalla.
- El sitio es navegable con teclado y compatible con lectores de pantalla.

## Contacto

¿Tienes alguna idea interesante o quieres colaborar en un proyecto? ¡Hablemos!

- **Email:** belluccia15@gmail.com
- **GitHub:** [Apine15](https://github.com/Apine15)
- **LinkedIn:** [andreapinedalink](https://www.linkedin.com/in/andreapinedalink/)

---

<p align="center"> Hecho con ❤️ y mucho código por Andrea Pineda.


&copy; 2025 Todos los derechos reservados. </p>---
