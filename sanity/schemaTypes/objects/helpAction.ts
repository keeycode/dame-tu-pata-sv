import { defineType, defineField } from 'sanity';

export const helpAction = defineType({
  name: 'helpAction',
  title: 'Forma de Apoyo',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Acción',
      type: 'string',
      description: 'Ejemplo: Donación monetaria, Donación en especie, Centros de acopio',
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
      description: 'Ejemplo: favorite, inventory_2, storefront',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Enlace / Botón',
      type: 'string',
      description: 'Ejemplo: Ver cuentas de donación',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace del Botón',
      type: 'string',
      description: 'Ejemplo: #donaciones, #donaciones-especie, #centros-acopio',
    }),
  ],
});
