import { defineType, defineField } from 'sanity';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Contenido de la landing',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Inicio (Hero)', default: true },
    { name: 'about', title: 'Quiénes somos' },
    { name: 'howToHelp', title: 'Cómo ayudar' },
    { name: 'banner', title: 'Banner emocional' },
    { name: 'seo', title: 'SEO y redes sociales' },
  ],
  fields: [
    // 1. Grupo SEO y redes sociales
    defineField({
      name: 'seo',
      title: 'SEO y redes sociales',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configuración para Google, buscadores y redes sociales.',
      validation: (Rule) => Rule.required(),
    }),

    // 2. Sección Inicio (Hero)
    defineField({
      name: 'heroBadge',
      title: 'Etiqueta superior',
      type: 'string',
      group: 'hero',
      description: 'Texto introductorio sobre el título principal.',
      initialValue: 'Rescate y Adopción Responsable en El Salvador',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título principal',
      type: 'string',
      group: 'hero',
      description: 'Título visual principal de la página (H1).',
      initialValue: 'Una pata puede cambiar una vida.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Párrafo principal de presentación.',
      initialValue:
        'Dame Tu Pata promueve el rescate y la adopción de perros en El Salvador. Juntos podemos brindar apoyo a perritos rescatados y acompañarlos en su camino hacia un hogar lleno de cariño y protección.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaPrimaryText',
      title: 'Texto del botón principal',
      type: 'string',
      group: 'hero',
      initialValue: 'Donar ahora',
    }),
    defineField({
      name: 'heroCtaSecondaryText',
      title: 'Texto del botón secundario',
      type: 'string',
      group: 'hero',
      initialValue: 'Ver centros de acopio',
    }),
    defineField({
      name: 'heroImage',
      title: 'Fotografía principal',
      type: 'image',
      group: 'hero',
      description: 'Imagen destacada de la portada (aspecto 4:3 o 5:4).',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Texto alternativo de la fotografía',
      type: 'string',
      group: 'hero',
      description: 'Descripción breve de la foto para accesibilidad.',
      initialValue:
        'Voluntaria en El Salvador sosteniendo con ternura la patita de un perrito mestizo rescatado',
    }),
    defineField({
      name: 'heroCommunityText',
      title: 'Texto del distintivo de comunidad',
      type: 'string',
      group: 'hero',
      initialValue: 'Uniendo corazones por el bienestar y cuidado canino.',
    }),

    // 3. Sección Quiénes somos
    defineField({
      name: 'aboutBadge',
      title: 'Etiqueta superior',
      type: 'string',
      group: 'about',
      initialValue: 'Conoce nuestra labor',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Título de la sección',
      type: 'string',
      group: 'about',
      initialValue: 'Quiénes somos',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      group: 'about',
      initialValue:
        'Dame Tu Pata es una iniciativa salvadoreña dedicada al rescate, cuidado y reubicación responsable de perritos en necesidad.',
    }),
    defineField({
      name: 'pillars',
      title: 'Pilares institucionales',
      type: 'array',
      group: 'about',
      description: 'Tarjetas informativas (Historia, Misión, Visión, Cobertura).',
      of: [{ type: 'aboutPillar' }],
    }),

    // 4. Sección Cómo ayudar
    defineField({
      name: 'howToHelpBadge',
      title: 'Etiqueta superior',
      type: 'string',
      group: 'howToHelp',
      initialValue: 'Acciones solidarias',
    }),
    defineField({
      name: 'howToHelpTitle',
      title: 'Título de la sección',
      type: 'string',
      group: 'howToHelp',
      initialValue: 'Hay muchas formas de dar una pata',
    }),
    defineField({
      name: 'howToHelpDescription',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      group: 'howToHelp',
      initialValue:
        'Cada muestra de apoyo suma para brindar una segunda oportunidad a perritos rescatados.',
    }),
    defineField({
      name: 'helpActions',
      title: 'Tarjetas de formas de apoyo',
      type: 'array',
      group: 'howToHelp',
      description: 'Acciones solidarias (donación monetaria, donación en especie, centros de acopio).',
      of: [{ type: 'helpAction' }],
    }),

    // 5. Banner emocional de conversión
    defineField({
      name: 'bannerBadge',
      title: 'Etiqueta superior',
      type: 'string',
      group: 'banner',
      initialValue: '🐾 Cada rescate transforma un destino',
    }),
    defineField({
      name: 'bannerTitle',
      title: 'Título del banner',
      type: 'string',
      group: 'banner',
      initialValue: 'Cada ayuda cuenta. Cada pata también.',
    }),
    defineField({
      name: 'bannerDescription',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      group: 'banner',
      initialValue:
        'Tu colaboración permite continuar apoyando a perritos en situación de vulnerabilidad para que tengan la oportunidad de vivir en un entorno seguro y con dignidad.',
    }),
    defineField({
      name: 'bannerCtaText',
      title: 'Texto del botón',
      type: 'string',
      group: 'banner',
      initialValue: 'Quiero ayudar',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Fotografía de fondo',
      type: 'image',
      group: 'banner',
      description: 'Imagen de fondo del banner emocional.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bannerImageAlt',
      title: 'Texto alternativo de la fotografía',
      type: 'string',
      group: 'banner',
      description: 'Descripción breve de la foto para accesibilidad.',
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
        title: 'Contenido de la landing',
        subtitle: title || 'Página de inicio',
        media,
      };
    },
  },
});

