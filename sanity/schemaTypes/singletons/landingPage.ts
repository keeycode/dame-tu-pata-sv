import { defineType, defineField } from 'sanity';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page (Secciones)',
  type: 'document',
  fields: [
    // 1. SEO Exclusivo de la Landing Page
    defineField({
      name: 'seo',
      title: 'SEO y Metadatos de la Landing',
      type: 'seoSettings',
      description: 'Metadatos para Google, WhatsApp y redes sociales',
      validation: (Rule) => Rule.required(),
    }),

    // 2. Sección Hero
    defineField({
      name: 'heroBadge',
      title: 'Badge Superior del Hero',
      type: 'string',
      initialValue: 'Rescate y Adopción Responsable en El Salvador',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título Principal (H1)',
      type: 'string',
      description: 'Título visual principal de la landing',
      initialValue: 'Una pata puede cambiar una vida.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción del Hero',
      type: 'text',
      rows: 3,
      initialValue:
        'Dame Tu Pata promueve el rescate y la adopción de perros en El Salvador. Juntos podemos brindar apoyo a perritos rescatados y acompañarlos en su camino hacia un hogar lleno de cariño y protección.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaPrimaryText',
      title: 'Texto CTA Principal',
      type: 'string',
      initialValue: 'Donar ahora',
    }),
    defineField({
      name: 'heroCtaSecondaryText',
      title: 'Texto CTA Secundario',
      type: 'string',
      initialValue: 'Ver centros de acopio',
    }),
    defineField({
      name: 'heroImage',
      title: 'Fotografía Oficial del Hero',
      type: 'image',
      description: 'Imagen principal (aspecto 4:3 o 5:4)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Texto Alternativo de la Foto Hero',
      type: 'string',
      initialValue:
        'Voluntaria en El Salvador sosteniendo con ternura la patita de un perrito mestizo rescatado',
    }),
    defineField({
      name: 'heroCommunityText',
      title: 'Texto de la Píldora de Comunidad',
      type: 'string',
      initialValue: 'Uniendo corazones por el bienestar y cuidado canino.',
    }),

    // 3. Sección Quiénes Somos
    defineField({
      name: 'aboutBadge',
      title: 'Badge de Quiénes Somos',
      type: 'string',
      initialValue: 'Conoce nuestra labor',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Título de Quiénes Somos',
      type: 'string',
      initialValue: 'Quiénes somos',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Descripción de Quiénes Somos',
      type: 'text',
      rows: 2,
      initialValue:
        'Dame Tu Pata es una iniciativa salvadoreña dedicada al rescate, cuidado y reubicación responsable de perritos en necesidad.',
    }),
    defineField({
      name: 'pillars',
      title: 'Pilares Institucionales (4 Tarjetas)',
      type: 'array',
      of: [{ type: 'aboutPillar' }],
    }),

    // 4. Sección Cómo Ayudar
    defineField({
      name: 'howToHelpBadge',
      title: 'Badge de Cómo Ayudar',
      type: 'string',
      initialValue: 'Acciones solidarias',
    }),
    defineField({
      name: 'howToHelpTitle',
      title: 'Título de Cómo Ayudar',
      type: 'string',
      initialValue: 'Hay muchas formas de dar una pata',
    }),
    defineField({
      name: 'howToHelpDescription',
      title: 'Descripción de Cómo Ayudar',
      type: 'text',
      rows: 2,
      initialValue:
        'Cada muestra de apoyo suma para brindar una segunda oportunidad a perritos rescatados.',
    }),
    defineField({
      name: 'helpActions',
      title: 'Tarjetas de Formas de Apoyo',
      type: 'array',
      of: [{ type: 'helpAction' }],
    }),

    // 5. Banner Emocional de Conversión
    defineField({
      name: 'bannerBadge',
      title: 'Badge del Banner Emocional',
      type: 'string',
      initialValue: '🐾 Cada rescate transforma un destino',
    }),
    defineField({
      name: 'bannerTitle',
      title: 'Título del Banner Emocional',
      type: 'string',
      initialValue: 'Cada ayuda cuenta. Cada pata también.',
    }),
    defineField({
      name: 'bannerDescription',
      title: 'Descripción del Banner Emocional',
      type: 'text',
      rows: 3,
      initialValue:
        'Tu colaboración permite continuar apoyando a perritos en situación de vulnerabilidad para que tengan la oportunidad de vivir en un entorno seguro y con dignidad.',
    }),
    defineField({
      name: 'bannerCtaText',
      title: 'Texto del Botón del Banner',
      type: 'string',
      initialValue: 'Quiero ayudar',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Fotografía de Fondo del Banner Emocional',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bannerImageAlt',
      title: 'Texto Alternativo del Banner',
      type: 'string',
      initialValue:
        'Joven sonriendo feliz junto a su perrito rescatado adoptado paseando al aire libre',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: 'Landing Page Oficial',
        subtitle: title || 'Página de Inicio',
        media,
      };
    },
  },
});
