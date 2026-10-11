import { defineType, defineField } from 'sanity';

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO y redes sociales',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Título optimizado para motores de búsqueda (50 a 60 caracteres recomendados).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción resumida para Google (120 a 155 caracteres recomendados).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canónica',
      type: 'url',
      description: 'Dirección oficial de la página (ej: https://dametupatasv.keeycode.com/).',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Título para compartir',
      type: 'string',
      description: 'Título visualizado al compartir en WhatsApp, Facebook y otras redes.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Descripción para compartir',
      type: 'text',
      rows: 2,
      description: 'Descripción que acompaña al enlace al compartir en redes sociales.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para compartir',
      type: 'image',
      description: 'Imagen previa al compartir (tamaño recomendado: 1200x630 px).',
      options: {
        hotspot: true,
      },
    }),
  ],
});

