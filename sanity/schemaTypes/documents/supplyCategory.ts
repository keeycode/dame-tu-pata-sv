import { defineType, defineField } from 'sanity';

export const supplyCategory = defineType({
  name: 'supplyCategory',
  title: 'Categoría de Insumos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Categoría',
      type: 'string',
      description: 'Ejemplo: Alimentación, Higiene y descanso, Prevención, Curación',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Identificador para filtros)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Activa',
      type: 'boolean',
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
      title: 'title',
      slug: 'slug.current',
      order: 'order',
      active: 'active',
    },
    prepare({ title, slug, order, active }) {
      const activeText = active ? '' : ' [INACTIVA]';
      return {
        title: `${order}. ${title}${activeText}`,
        subtitle: `slug: ${slug || 'sin-slug'}`,
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
