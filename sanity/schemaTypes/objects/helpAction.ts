import { defineType, defineField } from 'sanity';

export const helpAction = defineType({
  name: 'helpAction',
  title: 'Forma de apoyo',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la forma de apoyo',
      type: 'string',
      description: 'Ejemplo: Donación monetaria, Donación en especie, Centros de acopio.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Breve explicación de cómo ayuda esta acción.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono (ej: favorite, inventory_2, storefront).',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón',
      type: 'string',
      description: 'Ejemplo: Ver cuentas de donación, Ver lista de insumos.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace del botón',
      type: 'string',
      description: 'Sección a la que dirige (ej: #donaciones, #donaciones-especie, #centros-acopio).',
    }),
  ],
});

