// src/data/siteConfig.ts
// Configuración general desacoplada, preparada para migración futura a Sanity CMS

export interface SiteConfig {
  name: string;
  tagline: string;
  domain: string;
  locale: string;
  whatsappNumber: string; // Formato internacional solo dígitos: e.g. 50378449676
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Dame Tu Pata',
  tagline: 'Rescate y Adopción Responsable en El Salvador',
  domain: 'https://dametupatasv.keeycode.com',
  locale: 'es_SV',
  // Número de WhatsApp oficial para recibir las consultas del formulario (solo dígitos)
  whatsappNumber: '50378449676',
  contactEmail: 'contacto@dametupatasv.keeycode.com',
  socialLinks: {
    instagram: 'https://instagram.com/dametupata_sv',
    whatsapp: 'https://wa.me/50378449676',
  },
};
