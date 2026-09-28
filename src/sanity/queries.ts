import { sanityClient } from './client';
import { siteConfig as fallbackSiteConfig } from '../data/siteConfig';
import { collectionCenters as fallbackCollectionCenters } from '../data/collectionCenters';
import { adoptionDogs as fallbackAdoptionDogs, type AdoptionDog } from '../data/adoptionDogs';

// ============================================================
// Tipos TypeScript para datos de Sanity
// ============================================================

export interface SanitySiteSettings {
  organizationName: string;
  siteUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  contactEmail: string;
  phone?: string;
  logoUrl?: string;
  logoAlt?: string;
  socials: {
    instagram: { label: string; username: string; url: string; active?: boolean };
    tiktok: { label: string; username: string; url: string; active?: boolean };
    facebook?: { label: string; username: string; url: string; active?: boolean };
  };
}

export interface SanityLandingPage {
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
  };
  heroBadge?: string;
  heroTitle: string;
  heroDescription: string;
  heroCtaPrimaryText?: string;
  heroCtaSecondaryText?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroCommunityText?: string;
  aboutBadge?: string;
  aboutTitle: string;
  aboutDescription: string;
  pillars: Array<{
    title: string;
    description: string;
    icon?: string;
    status?: string;
  }>;
  howToHelpBadge?: string;
  howToHelpTitle: string;
  howToHelpDescription: string;
  helpActions: Array<{
    title: string;
    description: string;
    icon?: string;
    ctaText: string;
    ctaLink: string;
  }>;
  bannerBadge?: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerCtaText?: string;
  bannerImageUrl?: string;
  bannerImageAlt?: string;
}

export interface SanityDonationAccount {
  id: string;
  name: string;
  platformType: 'bank' | 'wallet' | 'paypal' | 'other';
  accountType?: string;
  holder: string;
  accountNumber?: string;
  identifier?: string;
  scope: 'local' | 'international';
  externalUrl?: string;
  status: 'active' | 'pending' | 'disabled';
  order: number;
}

export interface SanitySupplyCategory {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export interface SanitySupplyItem {
  id: string;
  name: string;
  categorySlug: string;
  categoryTitle: string;
  description: string;
  sourceLabel: string;
  purchaseUrl?: string;
  linkStatus?: 'available' | 'pending' | 'in_person';
  recommendation?: string;
  order: number;
}

export interface SanityCollectionCenter {
  id: string;
  nombre: string;
  zona: string;
  direccion: string;
  latitud: number;
  longitud: number;
  googleMapsUrl: string;
  wazeUrl: string;
  horario?: string;
  dias?: string;
  telefono?: string;
  logoUrl?: string;
  logoAlt?: string;
  orden: number;
}

// ============================================================
// Fallbacks Locales Estáticos
// ============================================================

const defaultLandingPage: SanityLandingPage = {
  seo: {
    metaTitle: 'Dame Tu Pata — Rescate y Adopción en El Salvador',
    metaDescription:
      'Dame Tu Pata promueve el rescate, rehabilitación y adopción responsable de perros en situación de vulnerabilidad en El Salvador. Juntos podemos brindar apoyo y acompañarlos hacia un hogar lleno de cariño.',
    canonicalUrl: 'https://dametupatasv.keeycode.com/',
    ogTitle: 'Dame Tu Pata — Rescate y Adopción en El Salvador',
    ogDescription:
      'Dame Tu Pata promueve el rescate, rehabilitación y adopción responsable de perros en situación de vulnerabilidad en El Salvador. Juntos podemos brindar apoyo y acompañarlos hacia un hogar lleno de cariño.',
    ogImageUrl: '/assets/images/og-image.jpg',
  },
  heroBadge: 'Rescate y Adopción Responsable en El Salvador',
  heroTitle: 'Una pata puede cambiar una vida.',
  heroDescription:
    'Dame Tu Pata promueve el rescate y la adopción de perros en El Salvador. Juntos podemos brindar apoyo a perritos rescatados y acompañarlos en su camino hacia un hogar lleno de cariño y protección.',
  heroCtaPrimaryText: 'Donar ahora',
  heroCtaSecondaryText: 'Ver centros de acopio',
  heroImageUrl: '/assets/images/hero-perrito-rescatado.jpg',
  heroImageAlt:
    'Voluntaria en El Salvador sosteniendo con ternura la patita de un perrito mestizo rescatado',
  heroCommunityText: 'Uniendo corazones por el bienestar y cuidado canino.',
  aboutBadge: 'Conoce nuestra labor',
  aboutTitle: 'Quiénes somos',
  aboutDescription:
    'Dame Tu Pata es una iniciativa salvadoreña dedicada al rescate, cuidado y reubicación responsable de perritos en necesidad.',
  pillars: [
    {
      title: 'Historia',
      description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
      icon: 'history_edu',
      status: 'En preparación',
    },
    {
      title: 'Misión',
      description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
      icon: 'flag',
      status: 'En preparación',
    },
    {
      title: 'Visión',
      description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
      icon: 'visibility',
      status: 'En preparación',
    },
    {
      title: 'Labor y Cobertura',
      description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
      icon: 'map',
      status: 'En preparación',
    },
  ],
  howToHelpBadge: 'Acciones solidarias',
  howToHelpTitle: 'Hay muchas formas de dar una pata',
  howToHelpDescription:
    'Cada muestra de apoyo suma para brindar una segunda oportunidad a perritos rescatados.',
  helpActions: [
    {
      title: 'Donación monetaria',
      description:
        'Tu aporte económico voluntario contribuye al cuidado, alimentación y atenciones médicas que requieren los perritos rescatados.',
      icon: 'favorite',
      ctaText: 'Ver cuentas de donación',
      ctaLink: '#donaciones',
    },
    {
      title: 'Donación en especie',
      description:
        'Puedes colaborar con alimento para cachorros y adultos, artículos de higiene, cobijas y suministros para su bienestar cotidiano.',
      icon: 'inventory_2',
      ctaText: 'Ver lista de insumos',
      ctaLink: '#donaciones-especie',
    },
    {
      title: 'Centros de acopio',
      description:
        'Entrega tus donaciones físicas en los establecimientos aliados en San Salvador, Santa Tecla y Antiguo Cuscatlán.',
      icon: 'storefront',
      ctaText: 'Ubicar centros de acopio',
      ctaLink: '#centros-acopio',
    },
  ],
  bannerBadge: '🐾 Cada rescate transforma un destino',
  bannerTitle: 'Cada ayuda cuenta. Cada pata también.',
  bannerDescription:
    'Tu colaboración permite continuar apoyando a perritos en situación de vulnerabilidad para que tengan la oportunidad de vivir en un entorno seguro y con dignidad.',
  bannerCtaText: 'Quiero ayudar',
  bannerImageUrl: '/assets/images/banner-adopcion-parque.jpg',
  bannerImageAlt:
    'Joven sonriendo feliz junto a su perrito rescatado adoptado paseando al aire libre',
};

const fallbackDonationAccounts: SanityDonationAccount[] = [
  {
    id: 'banco-agricola',
    name: 'Banco Agrícola',
    platformType: 'bank',
    accountType: 'Ahorros',
    holder: 'Juliana Medina',
    accountNumber: '313343941',
    scope: 'local',
    status: 'active',
    order: 1,
  },
  {
    id: 'banco-cuscatlan',
    name: 'Banco Cuscatlán',
    platformType: 'bank',
    accountType: 'Ahorros',
    holder: 'Juliana Medina',
    accountNumber: '4014 9500 1489 432',
    scope: 'local',
    status: 'active',
    order: 2,
  },
  {
    id: 'banco-bac',
    name: 'Banco América Central',
    platformType: 'bank',
    accountType: 'Ahorros',
    holder: 'Juliana Medina',
    accountNumber: '1124 2031 0',
    scope: 'local',
    status: 'active',
    order: 3,
  },
  {
    id: 'banco-davivienda',
    name: 'Banco Davivienda',
    platformType: 'bank',
    accountType: 'Ahorros',
    holder: 'Juliana Medina',
    accountNumber: '7775 4314 3702',
    scope: 'local',
    status: 'active',
    order: 4,
  },
  {
    id: 'banco-promerica',
    name: 'Banco Promerica',
    platformType: 'bank',
    accountType: 'Ahorros',
    holder: 'Juliana Medina',
    accountNumber: '200 0029 0387 28',
    scope: 'local',
    status: 'active',
    order: 5,
  },
  {
    id: 'chivo-wallet',
    name: 'Chivo Wallet',
    platformType: 'wallet',
    accountType: 'Billetera',
    holder: 'Herbert Armas',
    identifier: '04885311-2',
    scope: 'local',
    status: 'active',
    order: 6,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    platformType: 'paypal',
    accountType: 'Internacional',
    holder: 'Juliana Medina',
    identifier: 'juliemedbell',
    scope: 'international',
    status: 'pending',
    order: 7,
  },
];

const fallbackSupplyCategories: SanitySupplyCategory[] = [
  { id: 'alimentacion', title: 'Alimentación', slug: 'alimentacion', order: 1 },
  { id: 'higiene', title: 'Higiene y descanso', slug: 'higiene', order: 2 },
  { id: 'prevencion', title: 'Prevención', slug: 'prevencion', order: 3 },
  { id: 'curacion', title: 'Curación', slug: 'curacion', order: 4 },
];

const fallbackSupplyItems: SanitySupplyItem[] = [
  {
    id: 'rc-puppy',
    name: 'Royal Canin Puppy',
    categorySlug: 'alimentacion',
    categoryTitle: 'Alimentación',
    description: 'Para cachorros en proceso de desarrollo y lactantes sin madre.',
    sourceLabel: 'Veterinarias / Tiendas',
    linkStatus: 'pending',
    order: 1,
  },
  {
    id: 'hills-ad',
    name: 'Hills A/D Diet',
    categorySlug: 'alimentacion',
    categoryTitle: 'Alimentación',
    description: 'Alimento húmedo hipercalórico para animales convalecientes o desnutridos.',
    sourceLabel: 'Veterinarias',
    linkStatus: 'pending',
    order: 2,
  },
  {
    id: 'rc-recovery',
    name: 'Royal Canin Recovery',
    categorySlug: 'alimentacion',
    categoryTitle: 'Alimentación',
    description: 'Fórmula de fácil ingesta para pacientes en proceso de recuperación.',
    sourceLabel: 'Veterinarias',
    linkStatus: 'pending',
    order: 3,
  },
  {
    id: 'alimento-seco',
    name: 'Alimento Seco y Húmedo',
    categorySlug: 'alimentacion',
    categoryTitle: 'Alimentación',
    description: 'Croquetas para perros adultos y latitas de paté para administración de medicina.',
    sourceLabel: 'Supermercados',
    linkStatus: 'in_person',
    recommendation: 'Aceptado en acopios',
    order: 4,
  },
  {
    id: 'pads',
    name: 'Pads de Entrenamiento',
    categorySlug: 'higiene',
    categoryTitle: 'Higiene y descanso',
    description: 'Almohadillas absorbentes para cachorros y perritos en recuperación inmóviles.',
    sourceLabel: 'Comercios / Súper',
    linkStatus: 'pending',
    order: 5,
  },
  {
    id: 'colchitas',
    name: 'Colchitas y Mantas',
    categorySlug: 'higiene',
    categoryTitle: 'Higiene y descanso',
    description: 'Cobijas limpias para dar abrigo, confort y protección térmica en sus camas.',
    sourceLabel: 'Donación directa',
    linkStatus: 'in_person',
    recommendation: 'Limpias y en buen estado',
    order: 6,
  },
  {
    id: 'toallitas',
    name: 'Toallitas y Bolsas',
    categorySlug: 'higiene',
    categoryTitle: 'Higiene y descanso',
    description: 'Toallitas húmedas desinfectantes hipoalergénicas y bolsas para residuos sanitarios.',
    sourceLabel: 'Uso diario',
    linkStatus: 'pending',
    order: 7,
  },
  {
    id: 'bravecto',
    name: 'Bravecto / Credelio',
    categorySlug: 'prevencion',
    categoryTitle: 'Prevención',
    description: 'Antipulgas y garrapatas masticables para la protección de perros rescatados.',
    sourceLabel: 'Veterinarias',
    linkStatus: 'pending',
    recommendation: 'Seleccionar según peso sugerido',
    order: 8,
  },
  {
    id: 'vendas-coban',
    name: 'Vendas Coban',
    categorySlug: 'curacion',
    categoryTitle: 'Curación',
    description: 'Vendas autoadhesivas para fijar apósitos sin adherirse al pelaje.',
    sourceLabel: 'Farmacias / Online',
    linkStatus: 'pending',
    order: 9,
  },
  {
    id: 'silvrstat',
    name: 'Silvrstat & Skintegrity',
    categorySlug: 'curacion',
    categoryTitle: 'Curación',
    description: 'Hidrogeles y apósitos de plata para regeneración celular en lesiones dérmicas.',
    sourceLabel: 'Insumo médico',
    linkStatus: 'pending',
    order: 10,
  },
  {
    id: 'silver-alginate',
    name: 'Silver Alginate Dressing',
    categorySlug: 'curacion',
    categoryTitle: 'Curación',
    description: 'Apósitos estériles para el tratamiento y curación de heridas.',
    sourceLabel: 'Farmacias / Online',
    linkStatus: 'pending',
    order: 11,
  },
];

// ============================================================
// Funciones de Consulta GROQ con Fallbacks Resilientes
// ============================================================

/**
 * 1. Obtiene la configuración general del sitio (siteSettings)
 */
export async function getSiteSettings(): Promise<SanitySiteSettings> {
  try {
    const data = await sanityClient.fetch(`*[_type == "siteSettings"][0]{
      organizationName,
      siteUrl,
      whatsappNumber,
      whatsappDisplay,
      contactEmail,
      phone,
      "logoUrl": logo.asset->url,
      "logoAlt": logo.alt,
      socials {
        instagram { label, username, url, active },
        tiktok { label, username, url, active },
        facebook { label, username, url, active }
      }
    }`);

    if (data && data.whatsappNumber) {
      return data;
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener siteSettings. Utilizando fallback local.', error);
  }

  return {
    organizationName: fallbackSiteConfig.name,
    siteUrl: fallbackSiteConfig.domain,
    whatsappNumber: fallbackSiteConfig.whatsappNumber,
    whatsappDisplay: '+503 7474 7002',
    contactEmail: fallbackSiteConfig.contactEmail,
    logoUrl: '/assets/images/logo-dametupata.png',
    logoAlt: 'Dame Tu Pata',
    socials: {
      instagram: fallbackSiteConfig.socials.instagram,
      tiktok: fallbackSiteConfig.socials.tiktok,
    },
  };
}

/**
 * 2. Obtiene la estructura editorial y SEO de la Landing Page
 */
export async function getLandingPageData(): Promise<SanityLandingPage> {
  try {
    const data = await sanityClient.fetch(`*[_type == "landingPage"][0]{
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle,
        ogDescription,
        "ogImageUrl": ogImage.asset->url
      },
      heroBadge,
      heroTitle,
      heroDescription,
      heroCtaPrimaryText,
      heroCtaSecondaryText,
      "heroImageUrl": heroImage.asset->url,
      heroImageAlt,
      heroCommunityText,
      aboutBadge,
      aboutTitle,
      aboutDescription,
      pillars[] { title, description, icon, status },
      howToHelpBadge,
      howToHelpTitle,
      howToHelpDescription,
      helpActions[] { title, description, icon, ctaText, ctaLink },
      bannerBadge,
      bannerTitle,
      bannerDescription,
      bannerCtaText,
      "bannerImageUrl": bannerImage.asset->url,
      bannerImageAlt
    }`);

    if (data && data.heroTitle) {
      return {
        ...defaultLandingPage,
        ...data,
        seo: {
          ...defaultLandingPage.seo,
          ...(data.seo || {}),
        },
      };
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener landingPage. Utilizando fallback local.', error);
  }

  return defaultLandingPage;
}

/**
 * 3. Obtiene el catálogo de perritos disponibles para adopción
 */
export async function getAdoptionDogs(): Promise<AdoptionDog[]> {
  try {
    const dogs = await sanityClient.fetch(`*[_type == "adoptionDog" && active == true && status == "available"] | order(order asc) {
      "id": _id,
      name,
      "image": coalesce(image.asset->url, "/assets/images/adopciones/perrito-adopcion-1.jpg"),
      "alt": imageAlt,
      sex,
      "age": approximateAge,
      size,
      description,
      status,
      active,
      order
    }`);

    if (Array.isArray(dogs)) {
      return dogs;
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener adoptionDogs. Utilizando fallback local.', error);
  }

  return fallbackAdoptionDogs.filter((d) => d.active && d.status === 'available');
}

/**
 * 4. Obtiene las cuentas de donación bancarias y billeteras
 */
export async function getDonationAccounts(): Promise<SanityDonationAccount[]> {
  try {
    const accounts = await sanityClient.fetch(`*[_type == "donationAccount" && active == true && status != "disabled"] | order(order asc) {
      "id": _id,
      name,
      platformType,
      accountType,
      holder,
      accountNumber,
      identifier,
      scope,
      externalUrl,
      status,
      order
    }`);

    if (Array.isArray(accounts) && accounts.length > 0) {
      return accounts;
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener donationAccounts. Utilizando fallback local.', error);
  }

  return fallbackDonationAccounts;
}

/**
 * 5. Obtiene las categorías de insumos y sus productos asociados
 */
export async function getSuppliesData(): Promise<{
  categories: SanitySupplyCategory[];
  items: SanitySupplyItem[];
}> {
  try {
    const [categories, items] = await Promise.all([
      sanityClient.fetch(`*[_type == "supplyCategory" && active == true] | order(order asc) {
        "id": _id,
        title,
        "slug": slug.current,
        order
      }`),
      sanityClient.fetch(`*[_type == "supplyItem" && active == true] | order(order asc) {
        "id": _id,
        name,
        "categorySlug": category->slug.current,
        "categoryTitle": category->title,
        description,
        sourceLabel,
        purchaseUrl,
        linkStatus,
        recommendation,
        order
      }`),
    ]);

    if (Array.isArray(categories) && categories.length > 0 && Array.isArray(items) && items.length > 0) {
      return { categories, items };
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener supplies. Utilizando fallback local.', error);
  }

  return {
    categories: fallbackSupplyCategories,
    items: fallbackSupplyItems,
  };
}

/**
 * 6. Obtiene los centros de acopio con geolocalización para Leaflet y enlaces
 */
export async function getCollectionCenters(): Promise<SanityCollectionCenter[]> {
  try {
    const centers = await sanityClient.fetch(`*[_type == "collectionCenter" && active == true] | order(order asc) {
      "id": coalesce(slug.current, _id),
      "nombre": name,
      "zona": zone,
      "direccion": address,
      "latitud": location.lat,
      "longitud": location.lng,
      googleMapsUrl,
      wazeUrl,
      schedule,
      days,
      phone,
      "logoUrl": logo.asset->url,
      logoAlt,
      "orden": order
    }`);

    if (Array.isArray(centers) && centers.length > 0) {
      return centers.map((c) => ({
        ...c,
        horario: c.schedule,
        dias: c.days,
        telefono: c.phone,
      }));
    }
  } catch (error) {
    console.warn('⚠️ [Sanity] Error al obtener collectionCenters. Utilizando fallback local.', error);
  }

  return fallbackCollectionCenters.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    zona: c.zona,
    direccion: c.direccion,
    latitud: c.latitud,
    longitud: c.longitud,
    googleMapsUrl: c.googleMapsUrl,
    wazeUrl: c.wazeUrl,
    horario: c.horario,
    dias: c.dias,
    telefono: c.telefono,
    orden: c.orden,
  }));
}
