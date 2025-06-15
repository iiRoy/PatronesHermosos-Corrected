# 🎓 Patrones HermososMore actions

Este proyecto está diseñado para gestionar datos del evento de Patrones Hermosos.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React.js + Tailwind
- **Backend/API**: Node.js + Express
- **Base de datos**: MySQL (Prisma ORM)
- **Control de versiones**: Git + GitHub

---

## 🌿 Estructura de ramas

```plaintext
main
├── feature/
│   ├── components
│   ├── correo
│   ├── rutasAPI
│   └── sqlProcedures
└── pages/
    ├── coordinator
    ├── forms
    ├── home
    ├── login
    └── superuser
```

---

## 📦 Instalación

Esta sección describe cómo poner en marcha **Patrones Hermosos** de manera local.

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/usuario/proyecto.git
   cd proyecto
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Crea el archivo `.env`** en la raíz del proyecto con la siguiente
   configuración (ajusta los valores según tu entorno):

   ```env
   # Base de datos (para Prisma)
   DATABASE_URL="mysql://root@localhost:3306/patrones-hermosos"
   DATABASE_NAME=patrones-hermosos

   # Backend (Express) configuraciones
   JWT_SECRET=mi_clave_secreta

   # Frontend (Next.js) configuraciones accesibles en el navegador
   NEXT_PUBLIC_API_URL=http://localhost:3000

   # Configuración de correo electrónico
   EMAIL_USER=TU_EMAIL
   EMAIL_PASS=TU_CONTRASEÑA (Para saber cómo conectar tu cuenta de Gmail a este programa, puedes ver la siguiente página https://support.google.com/mail/answer/185833?hl=es-419)
   ```

4. **Crea o reinicia la base de datos** e instala el cliente de Prisma:

   ```bash
   npx prisma migrate reset
   ```

   Este comando elimina la base de datos existente (si la hay), aplica las
   migraciones y ejecuta el _seed_ incluido.

5. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

6. **Comandos adicionales**:

   - `npm run icons` – Genera los componentes React a partir de los SVG
     almacenados en `public/assets/icons`.
   - `npm run sql` – Convierte los archivos JSON de la carpeta `prisma/seed`
     en un script SQL (`prisma/inserts.sql`).

---

## 🧑‍💻 Contribución

1. Crea una rama:

```bash
git checkout -b feature/nombre-de-la-rama
```

2. Haz tus cambios, súbelos y crea un Pull Request hacia `main`.

Consulta la [Guía de Contribución](./COLABORACIÓN.md) para más detalles.

---

## 🧠 Buenas prácticas

- No trabajes directamente sobre `main`.
- Usa mensajes de commit claros con formato `feat:`, `fix:`, etc.
- Mantén ramas pequeñas y con enfoque único.
- Siempre prueba antes de subir tus cambios.

---
