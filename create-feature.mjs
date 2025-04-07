// Guarda este archivo como, por ejemplo, create-feature.mjs
import fs from "fs";
import path from "path";

// Obtiene el nombre de la feature desde los argumentos del script
const featureName = process.argv[2]; // Ejemplo: node create-feature.mjs lostPets
if (!featureName) {
  console.error("Error: Debes proporcionar un nombre para la feature.");
  process.exit(1);
}

// --- Configuración de directorios ---

// Ruta base para la feature en "src/features"
const featuresBaseDir = path.join(
  process.cwd(),
  "src",
  "features",
  featureName
);
const featureSubDirs = ["adapters", "models", "services"];
// Tipamos el objeto para que solo acepte las claves definidas en featureSubDirs
const featureFileNames = {
  adapters: `${featureName}.adapters.ts`,
  models: `${featureName}.models.ts`,
  services: `${featureName}.services.ts`,
};

// Ruta base para la página en "src/app"
const appBaseDir = path.join(process.cwd(), "src", "app", featureName);

// --- Creación de la estructura en features ---

// Crea la carpeta principal para la feature
if (!fs.existsSync(featuresBaseDir)) {
  fs.mkdirSync(featuresBaseDir, { recursive: true });
  console.log(`Directorio de feature creado: ${featuresBaseDir}`);
} else {
  console.log(`El directorio de feature ya existe: ${featuresBaseDir}`);
}

// Crea subdirectorios y archivos en la feature
for (const subDir of featureSubDirs) {
  const subDirPath = path.join(featuresBaseDir, subDir);
  if (!fs.existsSync(subDirPath)) {
    fs.mkdirSync(subDirPath, { recursive: true });
    console.log(`Subdirectorio creado: ${subDirPath}`);
  } else {
    console.log(`El subdirectorio ya existe: ${subDirPath}`);
  }

  // Ahora TypeScript sabe que 'subDir' es una clave válida en featureFileNames
  const filePath = path.join(subDirPath, featureFileNames[subDir]);
  if (!fs.existsSync(filePath)) {
    const content = `// ${subDir} - ${featureName}\n`;
    fs.writeFileSync(filePath, content);
    console.log(`Archivo creado: ${filePath}`);
  } else {
    console.log(`El archivo ya existe: ${filePath}`);
  }
}

// --- Creación de la estructura en app ---

// Crea la carpeta principal en app para la feature
if (!fs.existsSync(appBaseDir)) {
  fs.mkdirSync(appBaseDir, { recursive: true });
  console.log(`Directorio en app creado: ${appBaseDir}`);
} else {
  console.log(`El directorio en app ya existe: ${appBaseDir}`);
}

// Crea el archivo page.tsx en app
const pageFilePath = path.join(appBaseDir, "page.tsx");
const pageContent = `import React from 'react';

const ${capitalizeFirstLetter(featureName)}Page = () => {
  return (
    <div>
      <h1>${capitalizeFirstLetter(featureName)} Page</h1>
      <p>Bienvenido a la página de ${capitalizeFirstLetter(featureName)}.</p>
    </div>
  );
};

export default ${capitalizeFirstLetter(featureName)}Page;
`;
if (!fs.existsSync(pageFilePath)) {
  fs.writeFileSync(pageFilePath, pageContent);
  console.log(`Archivo page.tsx creado en app: ${pageFilePath}`);
} else {
  console.log(`El archivo page.tsx ya existe en app: ${pageFilePath}`);
}

// Crea la estructura para la ruta de detalles: src/app/<featureName>/details/[id]/page.tsx
const detailsDirPath = path.join(appBaseDir, "details", "[id]");
if (!fs.existsSync(detailsDirPath)) {
  fs.mkdirSync(detailsDirPath, { recursive: true });
  console.log(`Directorio de details creado: ${detailsDirPath}`);
} else {
  console.log(`El directorio de details ya existe: ${detailsDirPath}`);
}

const detailsPageFilePath = path.join(detailsDirPath, "page.tsx");
const detailsPageContent = `import React from 'react';

const ${capitalizeFirstLetter(
  featureName
)}DetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Detalles de ${capitalizeFirstLetter(featureName)}</h1>
      <p>ID: {params.id}</p>
    </div>
  );
};

export default ${capitalizeFirstLetter(featureName)}DetailsPage;
`;
if (!fs.existsSync(detailsPageFilePath)) {
  fs.writeFileSync(detailsPageFilePath, detailsPageContent);
  console.log(`Archivo details/page.tsx creado: ${detailsPageFilePath}`);
} else {
  console.log(`El archivo details/page.tsx ya existe: ${detailsPageFilePath}`);
}

// Función para capitalizar la primera letra de un string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
