import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dame Tu Pata — Contenido')
    .items([
      // 1. Configuración General (Singleton)
      S.listItem()
        .title('Configuración General')
        .id('siteSettingsListItem')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configuración General')
        ),

      // 2. Landing Page (Singleton)
      S.listItem()
        .title('Landing Page')
        .id('landingPageListItem')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
            .title('Landing Page (Secciones y SEO)')
        ),

      S.divider(),

      // 3. Perritos en Adopción (Colección)
      S.documentTypeListItem('adoptionDog').title('Perritos en Adopción'),

      // 4. Cuentas de Donación (Colección)
      S.documentTypeListItem('donationAccount').title('Cuentas de Donación'),

      // 5. Insumos y Alimentos (Colección)
      S.documentTypeListItem('supplyItem').title('Insumos y Alimentos'),

      // 6. Categorías de Insumos (Colección)
      S.documentTypeListItem('supplyCategory').title('Categorías de Insumos'),

      // 7. Centros de Acopio (Colección)
      S.documentTypeListItem('collectionCenter').title('Centros de Acopio'),
    ]);
