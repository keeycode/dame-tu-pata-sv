import { defineType, defineField } from 'sanity';

export const supplyItem = defineType({
  name: 'supplyItem',
  title: 'Insumo o alimento',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información general', default: true },
    { name: 'links', title: 'Enlaces' },
    { name: 'publishing', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Nombre del insumo o alimento (ej: Royal Canin Puppy, Pads de Entrenamiento).',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      description: 'Selecciona la categoría a la que pertenece.',
      type: 'reference',
      to: [{ type: 'supplyCategory' }],
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      description: 'Para qué sirve o qué animales lo necesitan.',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceLabel',
      title: 'Lugar recomendado',
      description: 'Lugar sugerido de compra (ej: Veterinarias / Tiendas, Supermercados).',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recommendation',
      title: 'Recomendación',
      description: 'Indicación o sugerencia adicional (ej: Seleccionar según peso sugerido).',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Enlace de compra',
      description: 'Pega aquí el enlace directo para compra en línea (opcional).',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'linkStatus',
      title: 'Estado del enlace',
      type: 'string',
      group: 'links',
      options: {
        list: [
          { title: 'Enlace próximamente', value: 'pending' },
          { title: 'Aceptado en acopios / físico', value: 'in_person' },
          { title: 'Enlace activo de compra', value: 'available' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
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
      title: 'name',
      categoryTitle: 'category.title',
      sourceLabel: 'sourceLabel',
      active: 'active',
    },
    prepare({ title, categoryTitle, sourceLabel, active }) {
      const visibilityLabel = active ? '' : ' [Oculto]';
      return {
        title: `${title || 'Sin nombre'}${visibilityLabel}`,
        subtitle: `${categoryTitle || 'Sin categoría'}${sourceLabel ? ` · ${sourceLabel}` : ''}`,
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

