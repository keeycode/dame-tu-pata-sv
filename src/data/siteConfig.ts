// src/data/siteConfig.ts
// Configuración general desacoplada, preparada para migración futura a Sanity CMS

export interface SocialLink {
  label: string;
  username: string;
  url: string;
  active?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  domain: string;
  locale: string;
  whatsappNumber: string; // Formato internacional solo dígitos: e.g. 50378449676
  contactEmail: string;
  socials: {
    instagram: SocialLink;
    tiktok: SocialLink;
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
  socials: {
    instagram: {
      label: 'Instagram',
      username: '@dametupatasv',
      url: 'https://www.instagram.com/dametupatasv/',
      active: true,
    },
    tiktok: {
      label: 'TikTok',
      username: '@dametupata.sv',
      url: 'https://www.tiktok.com/@dametupata.sv',
      active: true,
    },
  },
};

