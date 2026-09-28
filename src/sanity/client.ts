import { createClient } from '@sanity/client';

export const projectId =
  import.meta.env.SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  'agl1kfl3';

export const dataset =
  import.meta.env.SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production';

export const apiVersion =
  import.meta.env.SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  '2024-03-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // En builds estáticos consultamos directamente la versión publicada más reciente
});
