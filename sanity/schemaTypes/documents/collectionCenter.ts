import { defineType, defineField } from 'sanity';
import { LeafletGeopointInput } from '../../components/LeafletGeopointInput';

export const collectionCenter = defineType({
  name: 'collectionCenter',
  title: 'Centro de acopio',
  type: 'document',
  groups: [
    { name: 'info', title: 'Información', default: true },
    { name: 'logo', title: 'Logo' },
    { name: 'location', title: 'Ubicación' },
    { name: 'links', title: 'Enlaces' },
    { name: 'publishing', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Nombre del establecimiento aliado (ej: Menta Sweet Studio, Mokafe Cannoli).',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador URL',
      description: 'Identificador único generado a partir del nombre.',
      type: 'slug',
      group: 'info',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zone',
      title: 'Zona',
      description: 'Zona o municipio (ej: Redondel Masferrer, San Benito, Santa Tecla).',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      description: 'Dirección física detallada del establecimiento.',
      type: 'text',
      rows: 3,
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schedule',
      title: 'Horario',
      description: 'Horario de atención (ej: 10:30 a. m. – 6:30 p. m.).',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'days',
      title: 'Días',
      description: 'Días de atención (ej: Mar – Sáb, Lun – Dom).',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      description: 'Teléfono de contacto del local (opcional).',
      type: 'string',
      group: 'info',
    }),

    // GRUPO LOGO
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Logo o isotipo del establecimiento (opcional).',
      type: 'image',
      group: 'logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Texto alternativo del logo',
      description: 'Descripción breve del logo para accesibilidad (opcional).',
      type: 'string',
      group: 'logo',
    }),

    // GRUPO UBICACIÓN (SELECTOR VISUAL LEAFLET)
    defineField({
      name: 'location',
      title: 'Ubicación en el mapa',
      description: 'Haz clic en el mapa o mueve el marcador para indicar la ubicación exacta.',
      type: 'geopoint',
      group: 'location',
      components: {
        input: LeafletGeopointInput,
      },
      validation: (Rule) => Rule.required(),
    }),

    // GRUPO ENLACES DE NAVEGACIÓN
    defineField({
      name: 'googleMapsUrl',
      title: 'Enlace de Google Maps',
      description: 'Pega aquí el enlace público de Google Maps.',
      type: 'url',
      group: 'links',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wazeUrl',
      title: 'Enlace de Waze',
      description: 'Pega aquí el enlace público de Waze.',
      type: 'url',
      group: 'links',
      validation: (Rule) => Rule.required(),
    }),

    // GRUPO PUBLICACIÓN
    defineField({
      name: 'active',
      title: 'Mostrar en la página',
      description: 'Desactívalo para conservar el registro sin mostrarlo públicamente.',
      type: 'boolean',
      group: 'publishing',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      description: 'Los números menores aparecerán primero.',
      type: 'number',
      group: 'publishing',
      initialValue: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      zone: 'zone',
      days: 'days',
      media: 'logo',
      active: 'active',
    },
    prepare({ title, zone, days, media, active }) {
      const visibilityLabel = active ? '' : ' [Oculto]';
      return {
        title: `${title || 'Sin nombre'}${visibilityLabel}`,
        subtitle: `${zone || 'Sin zona'} · ${days || 'Horario regular'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Por orden de aparición',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

