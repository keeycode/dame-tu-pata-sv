// src/data/collectionCenters.ts
// Estructura de datos desacoplada, preparada para migración futura a Sanity CMS

export interface CollectionCenter {
  id: string;
  nombre: string;
  zona: string;
  direccion: string;
  latitud: number;
  longitud: number;
  googleMapsUrl: string;
  wazeUrl: string;
  horario?: string;
  dias?: string;
  telefono?: string;
  activo: boolean;
  orden: number;
  icon?: string;
}

export const collectionCenters: CollectionCenter[] = [
  {
    id: 'menta-sweet-studio',
    nombre: 'Menta Sweet Studio',
    zona: 'Redondel Masferrer',
    direccion: 'Prolongación del Paseo General Escalón y 105 av. Sur, Centro Comercial 105, local 202, San Salvador.',
    latitud: 13.70425,
    longitud: -89.24352,
    googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+105+San+Salvador',
    wazeUrl: 'https://waze.com/ul?q=Centro+Comercial+105+San+Salvador',
    horario: '10:30 a. m. – 6:30 p. m.',
    dias: 'Mar – Sáb',
    activo: true,
    orden: 1,
    icon: 'storefront',
  },
  {
    id: 'mokafe-cannoli',
    nombre: 'Mokafe Cannoli',
    zona: 'San Benito',
    direccion: 'C.C. Olivos Plaza, boulevard El Hipódromo, local 4, Avenida La Capilla 705, San Salvador.',
    latitud: 13.69315,
    longitud: -89.24155,
    googleMapsUrl: 'https://maps.google.com/?q=Olivos+Plaza+Boulevard+El+Hipodromo+San+Salvador',
    wazeUrl: 'https://waze.com/ul?q=Olivos+Plaza+San+Salvador',
    horario: '8:00 a. m. – 10:00 p. m.',
    dias: 'Lun – Dom',
    activo: true,
    orden: 2,
    icon: 'local_cafe',
  },
  {
    id: 'animal-therapy',
    nombre: 'Animal Therapy',
    zona: 'Av. Bernal',
    direccion: 'Plaza Alcalá, Av. Bernal 201, San Salvador.',
    latitud: 13.72251,
    longitud: -89.21558,
    googleMapsUrl: 'https://maps.google.com/?q=Plaza+Alcala+Avenida+Bernal+San+Salvador',
    wazeUrl: 'https://waze.com/ul?q=Plaza+Alcala+San+Salvador',
    horario: '9:00 a. m. – 1:00 p. m.',
    dias: 'Lun, Mar, Jue, Vie, Sáb',
    activo: true,
    orden: 3,
    icon: 'pets',
  },
  {
    id: 'nails-by-abby',
    nombre: 'Nails by Abby',
    zona: 'Santa Tecla',
    direccion: 'Colonia Utila, final 14 calle oriente, casa 4, Santa Tecla.',
    latitud: 13.67105,
    longitud: -89.28102,
    googleMapsUrl: 'https://maps.google.com/?q=Colonia+Utila+Santa+Tecla',
    wazeUrl: 'https://waze.com/ul?q=Colonia+Utila+Santa+Tecla',
    horario: '8:00 a. m. – 6:00 p. m.',
    dias: 'Lun – Sáb',
    telefono: '+503 7844 9676',
    activo: true,
    orden: 4,
    icon: 'spa',
  },
  {
    id: 'mauwi',
    nombre: 'Mauwi',
    zona: 'Antiguo Cuscatlán',
    direccion: 'Calle Cuscatlán Oriente 28, local 1, Antiguo Cuscatlán.',
    latitud: 13.67402,
    longitud: -89.25208,
    googleMapsUrl: 'https://maps.google.com/?q=Calle+Cuscatlan+Oriente+28+Antiguo+Cuscatlan',
    wazeUrl: 'https://waze.com/ul?q=Calle+Cuscatlan+Oriente+28+Antiguo+Cuscatlan',
    horario: '3:00 p. m. – 8:00 p. m.',
    dias: 'Mar – Dom',
    activo: true,
    orden: 5,
    icon: 'storefront',
  },
];
