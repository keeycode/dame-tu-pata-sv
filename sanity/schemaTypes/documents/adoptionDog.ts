import { defineType, defineField } from 'sanity';

export const adoptionDog = defineType({
  name: 'adoptionDog',
  title: 'Perrito en adopción',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información general', default: true },
    { name: 'media', title: 'Fotografía' },
    { name: 'publishing', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      description: 'Nombre del perrito.',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador URL',
      description: 'Identificador único generado a partir del nombre.',
      type: 'slug',
      group: 'general',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sex',
      title: 'Sexo',
      type: 'string',
      group: 'general',
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
      title: 'Edad aproximada',
      description: 'Ejemplo: Cachorro (~4 meses), Joven (~1 año), Adulto (~2.5 años).',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'size',
      title: 'Tamaño',
      type: 'string',
      group: 'general',
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
      title: 'Descripción',
      description: 'Historia de rescate, temperamento y estado de salud.',
      type: 'text',
      rows: 4,
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotografía',
      description: 'Foto principal del perrito.',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto alternativo de la imagen',
      description: 'Breve descripción de la fotografía para accesibilidad.',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Reservado', value: 'reserved' },
          { title: 'Adoptado', value: 'adopted' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
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
      media: 'image',
      status: 'status',
      sex: 'sex',
      age: 'approximateAge',
      active: 'active',
    },
    prepare({ title, media, status, sex, age, active }) {
      const isExample = title && /modelo|ejemplo|prueba/i.test(title);
      const statusLabel =
        status === 'available'
          ? '🟢 Disponible'
          : status === 'reserved'
            ? '🟡 Reservado'
            : '🏠 Adoptado';
      const visibilityLabel = !active ? ' [Oculto]' : '';
      const displayTitle = isExample ? `⚠️ ${title}` : (title || 'Sin nombre');
      return {
        title: `${displayTitle}${visibilityLabel}`,
        subtitle: `${statusLabel} · ${sex || 'Sin sexo'} · ${age || 'Sin edad'}`,
        media,
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

