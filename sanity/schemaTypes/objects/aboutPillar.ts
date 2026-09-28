import { defineType, defineField } from 'sanity';

export const aboutPillar = defineType({
  name: 'aboutPillar',
  title: 'Pilar Institucional',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Pilar',
      type: 'string',
      description: 'Ejemplo: Historia, Misión, Visión, Labor y Cobertura',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono Material Symbols',
      type: 'string',
      description: 'Ejemplo: history_edu, flag, visibility, map',
    }),
    defineField({
      name: 'status',
      title: 'Estado del Pilar',
      type: 'string',
      description: 'Ejemplo: En preparación, Activo',
      initialValue: 'En preparación',
    }),
  ],
});
