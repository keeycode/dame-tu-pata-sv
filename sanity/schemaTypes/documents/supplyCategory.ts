import { defineType, defineField } from 'sanity';

export const supplyCategory = defineType({
  name: 'supplyCategory',
  title: 'Categoría de insumos',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información general', default: true },
    { name: 'publishing', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la categoría',
      description: 'Ejemplo: Alimentación, Higiene y descanso, Prevención, Curación.',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador URL',
      description: 'Identificador único para filtros en la página.',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
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
      title: 'title',
      order: 'order',
      active: 'active',
    },
    prepare({ title, order, active }) {
      const visibilityLabel = active ? '' : ' [Oculta]';
      return {
        title: `${title || 'Sin categoría'}${visibilityLabel}`,
        subtitle: `Orden: ${order ?? 10}`,
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

