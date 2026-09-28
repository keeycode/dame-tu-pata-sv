import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración General',
  type: 'document',
  fields: [
    defineField({
      name: 'organizationName',
      title: 'Nombre de la Organización',
      type: 'string',
      description: 'Nombre oficial (ej: Dame Tu Pata)',
      validation: (Rule) => Rule.required(),
      initialValue: 'Dame Tu Pata',
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL Oficial del Sitio',
      type: 'url',
      description: 'URL principal de producción (ej: https://dametupatasv.keeycode.com)',
      validation: (Rule) => Rule.required(),
      initialValue: 'https://dametupatasv.keeycode.com',
    }),
    defineField({
      name: 'logo',
      title: 'Logo / Emblema Institucional',
      type: 'image',
      description: 'Logo circular oficial para Navbar y Footer',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo (Alt)',
          type: 'string',
          initialValue: 'Dame Tu Pata',
        }),
      ],
    }),

    // WhatsApp Central
    defineField({
      name: 'whatsappNumber',
      title: 'Número Técnico de WhatsApp (wa.me)',
      type: 'string',
      description: 'ÚNICA FUENTE DE VERDAD. Formato internacional SOLO dígitos, sin signos (+), espacios ni guiones. Ej: 50374747002',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]+$/, { name: 'solo dígitos', invert: false })
          .error('El número de WhatsApp solo debe contener dígitos numéricos (ej: 50374747002)'),
      initialValue: '50374747002',
    }),
    defineField({
      name: 'whatsappDisplay',
      title: 'Número de WhatsApp Formateado (Visual)',
      type: 'string',
      description: 'Formato legible para mostrar en pantalla. Ej: +503 7474 7002',
      initialValue: '+503 7474 7002',
    }),

    // Medios de Contacto
    defineField({
      name: 'contactEmail',
      title: 'Correo Electrónico de Contacto',
      type: 'string',
      description: 'Correo oficial para recibir consultas (ej: contacto@dametupatasv.keeycode.com)',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'contacto@dametupatasv.keeycode.com',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono Fijo / Alternativo (Opcional)',
      type: 'string',
      description: 'Número complementario si aplica',
    }),

    // Redes Sociales
    defineField({
      name: 'socials',
      title: 'Redes Sociales Oficiales',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'socialLink',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'socialLink',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'socialLink',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'organizationName',
      subtitle: 'siteUrl',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Configuración General',
        subtitle: subtitle || 'Dame Tu Pata',
        media,
      };
    },
  },
});
