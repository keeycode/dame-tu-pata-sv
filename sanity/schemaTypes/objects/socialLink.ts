import { defineType, defineField } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Enlace de red social',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Red social',
      description: 'Nombre de la red (ej: Instagram, TikTok, Facebook).',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Nombre de usuario',
      description: 'Ejemplo: @dametupatasv',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Enlace del perfil',
      description: 'Enlace directo al perfil en la red social.',
      type: 'url',
    }),
    defineField({
      name: 'active',
      title: 'Mostrar en la página',
      description: 'Desactívalo para conservar el registro sin mostrarlo públicamente.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

