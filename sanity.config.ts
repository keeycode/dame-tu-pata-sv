import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletonTypes = new Set(['siteSettings', 'landingPage']);

export default defineConfig({
  name: 'default',
  title: 'Dame Tu Pata CMS',

  projectId: 'agl1kfl3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
    // Ocultar singletons de la lista global "+" (Nuevo documento)
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Proteger singletons bloqueando duplicar o eliminar
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
});
