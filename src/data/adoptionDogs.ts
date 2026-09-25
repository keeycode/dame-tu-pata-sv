// src/data/adoptionDogs.ts
// Estructura desacoplada y tipada preparada para futura administración mediante Sanity CMS

export type DogStatus = 'available' | 'reserved' | 'adopted';
export type DogSex = 'Macho' | 'Hembra' | string;
export type DogSize = 'Pequeño' | 'Mediano' | 'Grande' | string;

export interface AdoptionDog {
  id: string;
  name: string;
  image: string;
  alt: string;
  sex?: DogSex;
  age?: string;
  size?: DogSize;
  description: string;
  status: DogStatus;
  active: boolean;
  order: number;
}

/**
 * Catálogo inicial de perritos para adopción.
 * NOTA: Esta estructura está preparada para ser reemplazada directamente por consultas a Sanity.
 * Los registros actuales son fichas modelo claramente identificadas que ilustran la presentación visual
 * sin publicar información ficticia como si fuesen rescates reales.
 */
export const adoptionDogs: AdoptionDog[] = [
  {
    id: 'ficha-modelo-01',
    name: 'Espacio para Adopción #1 (Ficha de muestra)',
    image: '/assets/images/adopciones/perrito-adopcion-1.jpg',
    alt: 'Fotografía de muestra para cachorro mestizo en espera de un hogar responsable',
    sex: 'Macho',
    age: 'Cachorro (~4 meses)',
    size: 'Mediano en desarrollo',
    description: 'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
    status: 'available',
    active: true,
    order: 1,
  },
  {
    id: 'ficha-modelo-02',
    name: 'Espacio para Adopción #2 (Ficha de muestra)',
    image: '/assets/images/adopciones/perrito-adopcion-2.jpg',
    alt: 'Fotografía de muestra para perrito joven en espera de un hogar responsable',
    sex: 'Hembra',
    age: 'Joven (~1 año)',
    size: 'Mediano',
    description: 'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
    status: 'available',
    active: true,
    order: 2,
  },
  {
    id: 'ficha-modelo-03',
    name: 'Espacio para Adopción #3 (Ficha de muestra)',
    image: '/assets/images/adopciones/perrito-adopcion-3.jpg',
    alt: 'Fotografía de muestra para perrito adulto en espera de un hogar responsable',
    sex: 'Macho',
    age: 'Adulto (~2.5 años)',
    size: 'Grande',
    description: 'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
    status: 'available',
    active: true,
    order: 3,
  },
  {
    // Registro de prueba inactivo para verificar el filtro en la landing
    id: 'ficha-modelo-inactiva',
    name: 'Espacio de Demostración (Adoptado)',
    image: '/assets/images/adopciones/perrito-adopcion-1.jpg',
    alt: 'Registro inactivo para validación de filtros',
    sex: 'Hembra',
    age: 'Adulto',
    size: 'Pequeño',
    description: 'Registro de validación para garantizar que los perritos no activos o con estado diferente a disponible no se listen en la interfaz.',
    status: 'adopted',
    active: false,
    order: 4,
  },
];
