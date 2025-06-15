# 🎓 Patrones Hermosos

Gestión integral de datos y procesos para el evento Patrones Hermosos.

---

## 🚀 Tecnologías principales

- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend/API:** Node.js + Express
- **ORM:** Prisma (MySQL)
- **Testing:** Jest, Testing Library, Cypress
- **Control de versiones:** Git + GitHub

---

## 📁 Estructura del proyecto

```
├── prisma/                # Esquema, migraciones y datos semilla de la base de datos
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
├── public/                # Archivos estáticos (imágenes, PDFs, íconos, diplomas)
│   ├── assets/
│   └── diplomas/
├── scripts/               # Utilidades y scripts de automatización (íconos, SQL, releases)
├── src/                   # Código fuente principal
│   ├── app/               # Entradas de Next.js, layouts, páginas y estilos globales
│   ├── components/        # Componentes reutilizables (UI, íconos, hooks, tablas, etc.)
│   ├── controllers/       # Lógica de negocio y controladores Express
│   ├── middlewares/       # Middlewares de Express
│   ├── routes/            # Definición de rutas Express
│   ├── services/          # Servicios auxiliares (correo, archivos, etc.)
│   ├── types/             # Tipos y definiciones TypeScript
│   ├── uploads/           # Archivos temporales y subidas
│   ├── validators/        # Validaciones de datos
│   └── __tests__/         # Pruebas unitarias y de integración
├── .env                   # Variables de entorno (no versionado)
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
└── README.md
```

---

## ⚙️ Instalación y primer uso

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/usuario/proyecto.git
   cd proyecto
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura el entorno:**

   Crea un archivo `.env` en la raíz con el siguiente contenido (ajusta según tu entorno):

   ```env
   DATABASE_URL="mysql://root@localhost:3306/patrones-hermosos"
   DATABASE_NAME=patrones-hermosos
   JWT_SECRET=mi_clave_secreta
   NEXT_PUBLIC_API_URL=http://localhost:3000
   EMAIL_USER=TU_EMAIL
   EMAIL_PASS=TU_CONTRASEÑA (Para saber cómo conectar tu cuenta de Gmail a este programa, puedes ver la siguiente página https://support.google.com/mail/answer/185833?hl=es-419)
   ```

4. **Prepara la base de datos:**

   ```bash
   npx prisma migrate reset
   ```
   Esto elimina la base de datos, aplica migraciones y ejecuta el seed.

5. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

---

## 🛠️ Scripts útiles

- `npm run dev`         – Inicia el servidor Express y Next.js en modo desarrollo
- `npm run build`       – Compila backend y frontend para producción
- `npm run start`       – Ejecuta la app en modo producción
- `npm run icons`       – Genera componentes React desde SVGs en `public/assets/icons`
- `npm run sql`         – Convierte los JSON de `prisma/seed` a SQL
- `npm run test`        – Ejecuta pruebas unitarias con Jest

---

## 🧑‍💻 Contribución

1. Crea una rama para tu feature o fix:

   ```bash
   git checkout -b feature/nombre-de-la-rama
   ```
2. Realiza tus cambios y súbelos:

   ```bash
   git add .
   git commit -m "feat: descripción clara"
   git push origin feature/nombre-de-la-rama
   ```
3. Abre un Pull Request hacia `main`.

Consulta la [Guía de Contribución](./COLABORACIÓN.md) para más detalles.

---

## 🧠 Buenas prácticas

- No trabajes directamente sobre `main`.
- Usa mensajes de commit claros (`feat:`, `fix:`, etc.).
- Mantén ramas pequeñas y enfocadas.
- Prueba tus cambios antes de subirlos.
- Documenta nuevas funciones/componentes.

---

## 📚 Recursos adicionales

- [Documentación oficial Next.js](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js](https://expressjs.com/es/)

---

Proyecto desarrollado y mantenido por el equipo de ByteForge. 

This software is based on the original work by Diego López Romero, Fernando Maggi Llerandi, Alejandro Guzmán Sánchez and Rodrigo López Guerra for the organization Patrones Hermosos, 2025.
