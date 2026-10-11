import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración general',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información general', default: true },
    { name: 'contact', title: 'Contacto y WhatsApp' },
    { name: 'socials', title: 'Redes sociales' },
  ],
  fields: [
    defineField({
      name: 'organizationName',
      title: 'Nombre de la organización',
      type: 'string',
      description: 'Nombre oficial (ej: Dame Tu Pata).',
      group: 'general',
      validation: (Rule) => Rule.required(),
      initialValue: 'Dame Tu Pata',
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL del sitio',
      type: 'url',
      description: 'Dirección web pública del sitio (ej: https://dametupatasv.keeycode.com).',
      group: 'general',
      validation: (Rule) => Rule.required(),
      initialValue: 'https://dametupatasv.keeycode.com',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo oficial para la barra de navegación y el pie de página.',
      group: 'general',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo del logo',
          type: 'string',
          initialValue: 'Dame Tu Pata',
        }),
      ],
    }),

    // Contacto y WhatsApp
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Número utilizado para abrir los chats de WhatsApp (solo números, con código de país. Ej: 50374747002).',
      group: 'contact',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]+$/, { name: 'solo dígitos', invert: false })
          .error('Ingresa únicamente dígitos numéricos sin signos ni espacios (ej: 50374747002)'),
      initialValue: '50374747002',
    }),
    defineField({
      name: 'whatsappDisplay',
      title: 'WhatsApp visible',
      type: 'string',
      description: 'Formato legible para mostrar en pantalla (ej: +503 7474 7002).',
      group: 'contact',
      initialValue: '+503 7474 7002',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo',
      type: 'string',
      description: 'Correo electrónico oficial de contacto.',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'contacto@dametupatasv.keeycode.com',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono secundario',
      type: 'string',
      description: 'Número de teléfono adicional (opcional).',
      group: 'contact',
    }),

    // Redes Sociales
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      type: 'object',
      group: 'socials',
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
        title: title || 'Configuración general',
        subtitle: subtitle || 'Dame Tu Pata',
        media,
      };
    },
  },
});

