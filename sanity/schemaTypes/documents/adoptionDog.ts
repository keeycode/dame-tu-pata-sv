import { defineType, defineField } from 'sanity';

export const adoptionDog = defineType({
  name: 'adoptionDog',
  title: 'Perrito en Adopción',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Perrito',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Identificador URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotografía Oficial',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto Alternativo (Alt)',
      type: 'string',
      description: 'Descripción de la fotografía para accesibilidad',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sex',
      title: 'Sexo',
      type: 'string',
      options: {
        list: [
          { title: 'Macho', value: 'Macho' },
          { title: 'Hembra', value: 'Hembra' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approximateAge',
      title: 'Edad Aproximada',
      type: 'string',
      description: 'Ejemplo: Cachorro (~4 meses), Joven (~1 año), Adulto (~2.5 años)',
    }),
    defineField({
      name: 'size',
      title: 'Tamaño',
      type: 'string',
      options: {
        list: [
          { title: 'Pequeño', value: 'Pequeño' },
          { title: 'Mediano', value: 'Mediano' },
          { title: 'Grande', value: 'Grande' },
          { title: 'Mediano en desarrollo', value: 'Mediano en desarrollo' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Historia y Detalles',
      type: 'text',
      rows: 4,
      description: 'Historia de rescate, temperamento y estado de salud',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado de Adopción',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible (Visible en landing)', value: 'available' },
          { title: 'En Proceso / Reservado', value: 'reserved' },
          { title: 'Adoptado', value: 'adopted' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      description: 'Interruptor general para mostrar u ocultar en el catálogo',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Menor número aparece primero (1, 2, 3...)',
      initialValue: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      status: 'status',
      sex: 'sex',
      age: 'approximateAge',
      active: 'active',
    },
    prepare({ title, media, status, sex, age, active }) {
      const statusLabel =
        status === 'available'
          ? '🟢 Disponible'
          : status === 'reserved'
            ? '🟡 Reservado'
            : '🏠 Adoptado';
      const activeLabel = active ? '' : ' [INACTIVO]';
      return {
        title: `${title || 'Sin nombre'}${activeLabel}`,
        subtitle: `${statusLabel} · ${sex || 'Sin sexo'} · ${age || 'Sin edad'}`,
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
