import { defineType, defineField } from 'sanity';
import { LeafletGeopointInput } from '../../components/LeafletGeopointInput';

export const collectionCenter = defineType({
  name: 'collectionCenter',
  title: 'Centro de Acopio / Punto Físico',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Establecimiento Aliado',
      type: 'string',
      description: 'Ejemplo: Menta Sweet Studio, Mokafe Cannoli, Animal Therapy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Aliado (Opcional)',
      type: 'image',
      description: 'Isotipo o logo del establecimiento',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Texto Alternativo del Logo',
      type: 'string',
      description: 'Ejemplo: Logo de Menta Sweet Studio',
    }),
    defineField({
      name: 'zone',
      title: 'Zona / Municipio',
      type: 'string',
      description: 'Ejemplo: Redondel Masferrer, San Benito, Santa Tecla, Antiguo Cuscatlán',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Dirección Completa',
      type: 'text',
      rows: 3,
      description: 'Dirección física detallada del establecimiento',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schedule',
      title: 'Horario de Atención',
      type: 'string',
      description: 'Ejemplo: 10:30 a. m. – 6:30 p. m.',
    }),
    defineField({
      name: 'days',
      title: 'Días de Atención',
      type: 'string',
      description: 'Ejemplo: Mar – Sáb, Lun – Dom',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono de Contacto del Local',
      type: 'string',
      description: 'Ejemplo: +503 7844 9676',
    }),

    // UBICACIÓN DEL MARCADOR LEAFLET (SELECTOR VISUAL CUSTOM INPUT)
    defineField({
      name: 'location',
      title: 'Ubicación Geográfica en el Mapa (Leaflet)',
      type: 'geopoint',
      description: 'Posición exacta para el marcador en el mapa interactivo de la landing.',
      components: {
        input: LeafletGeopointInput,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ENLACES EXTERNOS DE NAVEGACIÓN
    defineField({
      name: 'googleMapsUrl',
      title: 'Enlace a Google Maps',
      type: 'url',
      description: 'Enlace externo para abrir la app Google Maps y trazar ruta.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wazeUrl',
      title: 'Enlace a Waze',
      type: 'url',
      description: 'Enlace externo para abrir la app Waze y trazar ruta.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      description: 'Mostrar en la landing y en el mapa',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
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
      const activeText = active ? '' : ' [INACTIVO]';
      return {
        title: `${title}${activeText}`,
        subtitle: `${zone} · ${days || 'Horario regular'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Por Orden Ascendente',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
