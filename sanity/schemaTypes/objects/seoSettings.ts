import { defineType, defineField } from 'sanity';

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'Configuración SEO y Open Graph',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Título optimizado para motores de búsqueda (50-60 caracteres)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Descripción resumida para Google (120-155 caracteres)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL Canónica',
      type: 'url',
      description: 'URL canónica oficial de la landing (ej: https://dametupatasv.keeycode.com/)',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title (Redes Sociales)',
      type: 'string',
      description: 'Título al compartir en WhatsApp, Facebook, etc.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 2,
      description: 'Descripción al compartir en redes sociales',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen Open Graph (1200x630 px recomendada)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
