import { defineType, defineField } from 'sanity';

export const aboutPillar = defineType({
  name: 'aboutPillar',
  title: 'Pilar institucional',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del pilar',
      type: 'string',
      description: 'Ejemplo: Historia, Misión, Visión, Labor y Cobertura.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Texto explicativo del pilar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono (ej: history_edu, flag, visibility, map).',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      description: 'Ejemplo: En preparación, Activo.',
      initialValue: 'En preparación',
    }),
  ],
});

