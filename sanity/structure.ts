import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dame Tu Pata')
    .items([
      // 1. Configuración general (Singleton)
      S.listItem()
        .title('Configuración general')
        .id('siteSettingsListItem')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configuración general')
        ),

      // 2. Contenido de la landing (Singleton)
      S.listItem()
        .title('Contenido de la landing')
        .id('landingPageListItem')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
            .title('Contenido de la landing')
        ),

      // 3. Perritos en adopción (Colección)
      S.documentTypeListItem('adoptionDog').title('Perritos en adopción'),

      // 4. Cuentas de donación (Colección)
      S.documentTypeListItem('donationAccount').title('Cuentas de donación'),

      // 5. Insumos y alimentos (Colección)
      S.documentTypeListItem('supplyItem').title('Insumos y alimentos'),

      // 6. Categorías de insumos (Colección)
      S.documentTypeListItem('supplyCategory').title('Categorías de insumos'),

      // 7. Centros de acopio (Colección)
      S.documentTypeListItem('collectionCenter').title('Centros de acopio'),
    ]);

