import { defineType, defineField } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Enlace de Red Social',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta / Nombre',
      type: 'string',
      description: 'Ejemplo: Instagram, TikTok, Facebook',
    }),
    defineField({
      name: 'username',
      title: 'Nombre de usuario / Handle',
      type: 'string',
      description: 'Ejemplo: @dametupatasv',
    }),
    defineField({
      name: 'url',
      title: 'URL del Perfil',
      type: 'url',
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
