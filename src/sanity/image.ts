import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/**
 * Generador de URLs optimizadas para Sanity Assets con soporte de hotspot y recorte
 */
export function urlFor(source: any) {
  return builder.image(source);
}
