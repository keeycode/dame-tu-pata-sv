import { defineType, defineField } from 'sanity';

export const supplyItem = defineType({
  name: 'supplyItem',
  title: 'Insumo o Alimento',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Insumo / Alimento',
      type: 'string',
      description: 'Ejemplo: Royal Canin Puppy, Pads de Entrenamiento, Bravecto / Credelio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'supplyCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Uso Indicado',
      type: 'text',
      rows: 3,
      description: 'Para qué sirve o qué animales lo necesitan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceLabel',
      title: 'Lugar Sugerido de Compra',
      type: 'string',
      description: 'Ejemplo: Veterinarias / Tiendas, Comercios / Súper, Farmacias / Online',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Enlace Directo de Compra (Opcional)',
      type: 'url',
      description: 'Si se dispone de un enlace online oficial',
    }),
    defineField({
      name: 'linkStatus',
      title: 'Estado del Enlace en la Tarjeta',
      type: 'string',
      options: {
        list: [
          { title: 'Enlace Próximamente', value: 'pending' },
          { title: 'Aceptado en Acopios / Físico', value: 'in_person' },
          { title: 'Enlace Activo de Compra', value: 'available' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recommendation',
      title: 'Recomendación Adicional (Opcional)',
      type: 'string',
      description: 'Ejemplo: Seleccionar según peso sugerido, Limpias y en buen estado',
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      description: 'Mostrar en la sección de donaciones en especie',
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
      categoryTitle: 'category.title',
      sourceLabel: 'sourceLabel',
      active: 'active',
    },
    prepare({ title, categoryTitle, sourceLabel, active }) {
      const activeText = active ? '' : ' [INACTIVO]';
      return {
        title: `${title}${activeText}`,
        subtitle: `${categoryTitle || 'Sin categoría'} · ${sourceLabel || ''}`,
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
