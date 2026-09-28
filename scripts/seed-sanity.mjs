import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCliClient } from 'sanity/cli';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Cliente Sanity con autenticación de CLI y permisos de escritura
const client = getCliClient().withConfig({
  apiVersion: '2024-03-01',
});

/**
 * Sube una imagen a Sanity Assets de forma estrictamente IDEMPOTENTE.
 * Si ya existe un asset con el mismo nombre de archivo, reutiliza su _id.
 */
async function getOrUploadAsset(relativeFilePath) {
  const absolutePath = path.join(rootDir, relativeFilePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠️ Archivo no encontrado: ${relativeFilePath}`);
    return null;
  }

  const filename = path.basename(absolutePath);

  // 1. Verificar si ya existe en el dataset
  const existingAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );

  if (existingAsset) {
    console.log(`  ✓ Asset existente reutilizado: ${filename} (${existingAsset})`);
    return existingAsset;
  }

  // 2. Si no existe, subirlo
  console.log(`  ↑ Subiendo nuevo asset a Sanity: ${filename}...`);
  const readStream = fs.createReadStream(absolutePath);
  const uploaded = await client.assets.upload('image', readStream, {
    filename,
  });

  console.log(`  ✓ Asset subido con éxito: ${filename} (${uploaded._id})`);
  return uploaded._id;
}

async function runSeed() {
  console.log('====================================================');
  console.log('🚀 Iniciando Siembra y Migración Idempotente a Sanity');
  console.log(`🎯 Proyecto: agl1kfl3 | Dataset: production`);
  console.log('====================================================\n');

  // ----------------------------------------------------
  // 1. Assets Requeridos
  // ----------------------------------------------------
  console.log('📁 1/6 Sincronizando Assets de Imágenes...');
  const logoAssetId = await getOrUploadAsset('public/assets/images/logo-dametupata.png');
  const heroAssetId = await getOrUploadAsset('public/assets/images/hero-perrito-rescatado.jpg');
  const bannerAssetId = await getOrUploadAsset('public/assets/images/banner-adopcion-parque.jpg');
  const ogAssetId = await getOrUploadAsset('public/assets/images/og-image.jpg');

  const dog1AssetId = await getOrUploadAsset('public/assets/images/adopciones/perrito-adopcion-1.jpg');
  const dog2AssetId = await getOrUploadAsset('public/assets/images/adopciones/perrito-adopcion-2.jpg');
  const dog3AssetId = await getOrUploadAsset('public/assets/images/adopciones/perrito-adopcion-3.jpg');

  // ----------------------------------------------------
  // 2. Singleton: siteSettings
  // ----------------------------------------------------
  console.log('\n⚙️ 2/6 Migrando Singleton: siteSettings...');
  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    organizationName: 'Dame Tu Pata',
    siteUrl: 'https://dametupatasv.keeycode.com',
    whatsappNumber: '50374747002',
    whatsappDisplay: '+503 7474 7002',
    contactEmail: 'contacto@dametupatasv.keeycode.com',
    logo: logoAssetId
      ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: logoAssetId },
          alt: 'Dame Tu Pata',
        }
      : undefined,
    socials: {
      _type: 'object',
      instagram: {
        _type: 'socialLink',
        label: 'Instagram',
        username: '@dametupatasv',
        url: 'https://www.instagram.com/dametupatasv/',
        active: true,
      },
      tiktok: {
        _type: 'socialLink',
        label: 'TikTok',
        username: '@dametupata.sv',
        url: 'https://www.tiktok.com/@dametupata.sv',
        active: true,
      },
    },
  };
  await client.createOrReplace(siteSettingsDoc);
  console.log('  ✓ siteSettings creado/actualizado.');

  // ----------------------------------------------------
  // 3. Singleton: landingPage (Secciones y SEO)
  // ----------------------------------------------------
  console.log('\n📄 3/6 Migrando Singleton: landingPage...');
  const landingPageDoc = {
    _id: 'landingPage',
    _type: 'landingPage',
    seo: {
      _type: 'seoSettings',
      metaTitle: 'Dame Tu Pata — Rescate y Adopción en El Salvador',
      metaDescription:
        'Dame Tu Pata promueve el rescate, rehabilitación y adopción responsable de perros en situación de vulnerabilidad en El Salvador. Juntos podemos brindar apoyo y acompañarlos hacia un hogar lleno de cariño.',
      canonicalUrl: 'https://dametupatasv.keeycode.com/',
      ogTitle: 'Dame Tu Pata — Rescate y Adopción en El Salvador',
      ogDescription:
        'Dame Tu Pata promueve el rescate, rehabilitación y adopción responsable de perros en situación de vulnerabilidad en El Salvador. Juntos podemos brindar apoyo y acompañarlos hacia un hogar lleno de cariño.',
      ogImage: ogAssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: ogAssetId },
          }
        : undefined,
    },
    // Hero
    heroBadge: 'Rescate y Adopción Responsable en El Salvador',
    heroTitle: 'Una pata puede cambiar una vida.',
    heroDescription:
      'Dame Tu Pata promueve el rescate y la adopción de perros en El Salvador. Juntos podemos brindar apoyo a perritos rescatados y acompañarlos en su camino hacia un hogar lleno de cariño y protección.',
    heroCtaPrimaryText: 'Donar ahora',
    heroCtaSecondaryText: 'Ver centros de acopio',
    heroImage: heroAssetId
      ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: heroAssetId },
        }
      : undefined,
    heroImageAlt:
      'Voluntaria en El Salvador sosteniendo con ternura la patita de un perrito mestizo rescatado',
    heroCommunityText: 'Uniendo corazones por el bienestar y cuidado canino.',

    // Quiénes somos
    aboutBadge: 'Conoce nuestra labor',
    aboutTitle: 'Quiénes somos',
    aboutDescription:
      'Dame Tu Pata es una iniciativa salvadoreña dedicada al rescate, cuidado y reubicación responsable de perritos en necesidad.',
    pillars: [
      {
        _key: 'pillar-historia',
        _type: 'aboutPillar',
        title: 'Historia',
        description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
        icon: 'history_edu',
        status: 'En preparación',
      },
      {
        _key: 'pillar-mision',
        _type: 'aboutPillar',
        title: 'Misión',
        description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
        icon: 'flag',
        status: 'En preparación',
      },
      {
        _key: 'pillar-vision',
        _type: 'aboutPillar',
        title: 'Visión',
        description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
        icon: 'visibility',
        status: 'En preparación',
      },
      {
        _key: 'pillar-cobertura',
        _type: 'aboutPillar',
        title: 'Labor y Cobertura',
        description: 'Contenido institucional en proceso de validación oficial por Dame Tu Pata.',
        icon: 'map',
        status: 'En preparación',
      },
    ],

    // Cómo ayudar
    howToHelpBadge: 'Acciones solidarias',
    howToHelpTitle: 'Hay muchas formas de dar una pata',
    howToHelpDescription:
      'Cada muestra de apoyo suma para brindar una segunda oportunidad a perritos rescatados.',
    helpActions: [
      {
        _key: 'help-monetaria',
        _type: 'helpAction',
        title: 'Donación monetaria',
        description:
          'Tu aporte económico voluntario contribuye al cuidado, alimentación y atenciones médicas que requieren los perritos rescatados.',
        icon: 'favorite',
        ctaText: 'Ver cuentas de donación',
        ctaLink: '#donaciones',
      },
      {
        _key: 'help-especie',
        _type: 'helpAction',
        title: 'Donación en especie',
        description:
          'Puedes colaborar con alimento para cachorros y adultos, artículos de higiene, cobijas y suministros para su bienestar cotidiano.',
        icon: 'inventory_2',
        ctaText: 'Ver lista de insumos',
        ctaLink: '#donaciones-especie',
      },
      {
        _key: 'help-acopio',
        _type: 'helpAction',
        title: 'Centros de acopio',
        description:
          'Entrega tus donaciones físicas en los establecimientos aliados en San Salvador, Santa Tecla y Antiguo Cuscatlán.',
        icon: 'storefront',
        ctaText: 'Ubicar centros de acopio',
        ctaLink: '#centros-acopio',
      },
    ],

    // Banner emocional
    bannerBadge: '🐾 Cada rescate transforma un destino',
    bannerTitle: 'Cada ayuda cuenta. Cada pata también.',
    bannerDescription:
      'Tu colaboración permite continuar apoyando a perritos en situación de vulnerabilidad para que tengan la oportunidad de vivir en un entorno seguro y con dignidad.',
    bannerCtaText: 'Quiero ayudar',
    bannerImage: bannerAssetId
      ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: bannerAssetId },
        }
      : undefined,
    bannerImageAlt:
      'Joven sonriendo feliz junto a su perrito rescatado adoptado paseando al aire libre',
  };
  await client.createOrReplace(landingPageDoc);
  console.log('  ✓ landingPage creado/actualizado.');

  // ----------------------------------------------------
  // 4. Colección: adoptionDogs
  // ----------------------------------------------------
  console.log('\n🐶 4/6 Migrando Perritos en Adopción...');
  const dogs = [
    {
      _id: 'dog-ficha-modelo-01',
      _type: 'adoptionDog',
      name: 'Perrito en Adopción #1',
      slug: { _type: 'slug', current: 'perrito-adopcion-1' },
      image: dog1AssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: dog1AssetId },
          }
        : undefined,
      imageAlt: 'Fotografía de muestra para cachorro mestizo en espera de un hogar responsable',
      sex: 'Macho',
      approximateAge: 'Cachorro (~4 meses)',
      size: 'Mediano en desarrollo',
      description:
        'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
      status: 'available',
      active: false,
      order: 1,
    },
    {
      _id: 'dog-ficha-modelo-02',
      _type: 'adoptionDog',
      name: 'Perrito en Adopción #2',
      slug: { _type: 'slug', current: 'perrito-adopcion-2' },
      image: dog2AssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: dog2AssetId },
          }
        : undefined,
      imageAlt: 'Fotografía de muestra para perrito joven en espera de un hogar responsable',
      sex: 'Hembra',
      approximateAge: 'Joven (~1 año)',
      size: 'Mediano',
      description:
        'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
      status: 'available',
      active: false,
      order: 2,
    },
    {
      _id: 'dog-ficha-modelo-03',
      _type: 'adoptionDog',
      name: 'Perrito en Adopción #3',
      slug: { _type: 'slug', current: 'perrito-adopcion-3' },
      image: dog3AssetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: dog3AssetId },
          }
        : undefined,
      imageAlt: 'Fotografía de muestra para perrito adulto en espera de un hogar responsable',
      sex: 'Macho',
      approximateAge: 'Adulto (~2.5 años)',
      size: 'Grande',
      description:
        'Ficha modelo preparada para sincronización con Sanity CMS. Al publicar casos reales de Dame Tu Pata, aquí se mostrará su historia de rescate, temperamento y estado de salud.',
      status: 'available',
      active: false,
      order: 3,
    },
  ];

  for (const dog of dogs) {
    await client.createOrReplace(dog);
    console.log(`  ✓ ${dog.name} creado/actualizado.`);
  }

  // ----------------------------------------------------
  // 5. Cuentas de Donación
  // ----------------------------------------------------
  console.log('\n💳 5/6 Migrando Cuentas de Donación...');
  const donationAccounts = [
    {
      _id: 'donation-banco-agricola',
      _type: 'donationAccount',
      name: 'Banco Agrícola',
      platformType: 'bank',
      accountType: 'Ahorros',
      holder: 'Juliana Medina',
      accountNumber: '313343941',
      scope: 'local',
      status: 'active',
      active: true,
      order: 1,
    },
    {
      _id: 'donation-banco-cuscatlan',
      _type: 'donationAccount',
      name: 'Banco Cuscatlán',
      platformType: 'bank',
      accountType: 'Ahorros',
      holder: 'Juliana Medina',
      accountNumber: '4014 9500 1489 432',
      scope: 'local',
      status: 'active',
      active: true,
      order: 2,
    },
    {
      _id: 'donation-banco-bac',
      _type: 'donationAccount',
      name: 'Banco América Central',
      platformType: 'bank',
      accountType: 'Ahorros',
      holder: 'Juliana Medina',
      accountNumber: '1124 2031 0',
      scope: 'local',
      status: 'active',
      active: true,
      order: 3,
    },
    {
      _id: 'donation-banco-davivienda',
      _type: 'donationAccount',
      name: 'Banco Davivienda',
      platformType: 'bank',
      accountType: 'Ahorros',
      holder: 'Juliana Medina',
      accountNumber: '7775 4314 3702',
      scope: 'local',
      status: 'active',
      active: true,
      order: 4,
    },
    {
      _id: 'donation-banco-promerica',
      _type: 'donationAccount',
      name: 'Banco Promerica',
      platformType: 'bank',
      accountType: 'Ahorros',
      holder: 'Juliana Medina',
      accountNumber: '200 0029 0387 28',
      scope: 'local',
      status: 'active',
      active: true,
      order: 5,
    },
    {
      _id: 'donation-chivo-wallet',
      _type: 'donationAccount',
      name: 'Chivo Wallet',
      platformType: 'wallet',
      accountType: 'Billetera',
      holder: 'Herbert Armas',
      identifier: '04885311-2',
      scope: 'local',
      status: 'active',
      active: true,
      order: 6,
    },
    {
      _id: 'donation-paypal',
      _type: 'donationAccount',
      name: 'PayPal',
      platformType: 'paypal',
      accountType: 'Internacional',
      holder: 'Juliana Medina',
      identifier: 'juliemedbell',
      scope: 'international',
      status: 'pending',
      active: true,
      order: 7,
    },
  ];

  for (const account of donationAccounts) {
    await client.createOrReplace(account);
    console.log(`  ✓ ${account.name} creado/actualizado.`);
  }

  // ----------------------------------------------------
  // 6. Categorías e Insumos
  // ----------------------------------------------------
  console.log('\n🥫 6/6 Migrando Categorías e Insumos...');
  const categories = [
    {
      _id: 'cat-alimentacion',
      _type: 'supplyCategory',
      title: 'Alimentación',
      slug: { _type: 'slug', current: 'alimentacion' },
      active: true,
      order: 1,
    },
    {
      _id: 'cat-higiene',
      _type: 'supplyCategory',
      title: 'Higiene y descanso',
      slug: { _type: 'slug', current: 'higiene' },
      active: true,
      order: 2,
    },
    {
      _id: 'cat-prevencion',
      _type: 'supplyCategory',
      title: 'Prevención',
      slug: { _type: 'slug', current: 'prevencion' },
      active: true,
      order: 3,
    },
    {
      _id: 'cat-curacion',
      _type: 'supplyCategory',
      title: 'Curación',
      slug: { _type: 'slug', current: 'curacion' },
      active: true,
      order: 4,
    },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`  ✓ Categoría: ${cat.title} creada/actualizada.`);
  }

  const supplyItems = [
    {
      _id: 'supply-rc-puppy',
      _type: 'supplyItem',
      name: 'Royal Canin Puppy',
      category: { _type: 'reference', _ref: 'cat-alimentacion' },
      description: 'Para cachorros en proceso de desarrollo y lactantes sin madre.',
      sourceLabel: 'Veterinarias / Tiendas',
      linkStatus: 'pending',
      active: true,
      order: 1,
    },
    {
      _id: 'supply-hills-ad',
      _type: 'supplyItem',
      name: 'Hills A/D Diet',
      category: { _type: 'reference', _ref: 'cat-alimentacion' },
      description: 'Alimento húmedo hipercalórico para animales convalecientes o desnutridos.',
      sourceLabel: 'Veterinarias',
      linkStatus: 'pending',
      active: true,
      order: 2,
    },
    {
      _id: 'supply-rc-recovery',
      _type: 'supplyItem',
      name: 'Royal Canin Recovery',
      category: { _type: 'reference', _ref: 'cat-alimentacion' },
      description: 'Fórmula de fácil ingesta para pacientes en proceso de recuperación.',
      sourceLabel: 'Veterinarias',
      linkStatus: 'pending',
      active: true,
      order: 3,
    },
    {
      _id: 'supply-alimento-seco',
      _type: 'supplyItem',
      name: 'Alimento Seco y Húmedo',
      category: { _type: 'reference', _ref: 'cat-alimentacion' },
      description: 'Croquetas para perros adultos y latitas de paté para administración de medicina.',
      sourceLabel: 'Supermercados',
      linkStatus: 'in_person',
      recommendation: 'Aceptado en acopios',
      active: true,
      order: 4,
    },
    {
      _id: 'supply-pads',
      _type: 'supplyItem',
      name: 'Pads de Entrenamiento',
      category: { _type: 'reference', _ref: 'cat-higiene' },
      description: 'Almohadillas absorbentes para cachorros y perritos en recuperación inmóviles.',
      sourceLabel: 'Comercios / Súper',
      linkStatus: 'pending',
      active: true,
      order: 5,
    },
    {
      _id: 'supply-colchitas',
      _type: 'supplyItem',
      name: 'Colchitas y Mantas',
      category: { _type: 'reference', _ref: 'cat-higiene' },
      description: 'Cobijas limpias para dar abrigo, confort y protección térmica en sus camas.',
      sourceLabel: 'Donación directa',
      linkStatus: 'in_person',
      recommendation: 'Limpias y en buen estado',
      active: true,
      order: 6,
    },
    {
      _id: 'supply-toallitas',
      _type: 'supplyItem',
      name: 'Toallitas y Bolsas',
      category: { _type: 'reference', _ref: 'cat-higiene' },
      description: 'Toallitas húmedas desinfectantes hipoalergénicas y bolsas para residuos sanitarios.',
      sourceLabel: 'Uso diario',
      linkStatus: 'pending',
      active: true,
      order: 7,
    },
    {
      _id: 'supply-bravecto',
      _type: 'supplyItem',
      name: 'Bravecto / Credelio',
      category: { _type: 'reference', _ref: 'cat-prevencion' },
      description: 'Antipulgas y garrapatas masticables para la protección de perros rescatados.',
      sourceLabel: 'Veterinarias',
      linkStatus: 'pending',
      recommendation: 'Seleccionar según peso sugerido',
      active: true,
      order: 8,
    },
    {
      _id: 'supply-vendas-coban',
      _type: 'supplyItem',
      name: 'Vendas Coban',
      category: { _type: 'reference', _ref: 'cat-curacion' },
      description: 'Vendas autoadhesivas para fijar apósitos sin adherirse al pelaje.',
      sourceLabel: 'Farmacias / Online',
      linkStatus: 'pending',
      active: true,
      order: 9,
    },
    {
      _id: 'supply-silvrstat',
      _type: 'supplyItem',
      name: 'Silvrstat & Skintegrity',
      category: { _type: 'reference', _ref: 'cat-curacion' },
      description: 'Hidrogeles y apósitos de plata para regeneración celular en lesiones dérmicas.',
      sourceLabel: 'Insumo médico',
      linkStatus: 'pending',
      active: true,
      order: 10,
    },
    {
      _id: 'supply-silver-alginate',
      _type: 'supplyItem',
      name: 'Silver Alginate Dressing',
      category: { _type: 'reference', _ref: 'cat-curacion' },
      description: 'Apósitos estériles para el tratamiento y curación de heridas.',
      sourceLabel: 'Farmacias / Online',
      linkStatus: 'pending',
      active: true,
      order: 11,
    },
  ];

  for (const item of supplyItems) {
    await client.createOrReplace(item);
    console.log(`  ✓ Insumo: ${item.name} creado/actualizado.`);
  }

  // ----------------------------------------------------
  // 7. Centros de Acopio con Geopoint Leaflet
  // ----------------------------------------------------
  console.log('\n📍 7/7 Migrando Centros de Acopio...');
  const collectionCenters = [
    {
      _id: 'center-menta-sweet-studio',
      _type: 'collectionCenter',
      name: 'Menta Sweet Studio',
      slug: { _type: 'slug', current: 'menta-sweet-studio' },
      zone: 'Redondel Masferrer',
      address:
        'Prolongación del Paseo General Escalón y 105 av. Sur, Centro Comercial 105, local 202, San Salvador.',
      location: {
        _type: 'geopoint',
        lat: 13.70425,
        lng: -89.24352,
      },
      googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+105+San+Salvador',
      wazeUrl: 'https://waze.com/ul?q=Centro+Comercial+105+San+Salvador',
      schedule: '10:30 a. m. – 6:30 p. m.',
      days: 'Mar – Sáb',
      active: true,
      order: 1,
    },
    {
      _id: 'center-mokafe-cannoli',
      _type: 'collectionCenter',
      name: 'Mokafe Cannoli',
      slug: { _type: 'slug', current: 'mokafe-cannoli' },
      zone: 'San Benito',
      address:
        'C.C. Olivos Plaza, boulevard El Hipódromo, local 4, Avenida La Capilla 705, San Salvador.',
      location: {
        _type: 'geopoint',
        lat: 13.69315,
        lng: -89.24155,
      },
      googleMapsUrl:
        'https://maps.google.com/?q=Olivos+Plaza+Boulevard+El+Hipodromo+San+Salvador',
      wazeUrl: 'https://waze.com/ul?q=Olivos+Plaza+San+Salvador',
      schedule: '8:00 a. m. – 10:00 p. m.',
      days: 'Lun – Dom',
      active: true,
      order: 2,
    },
    {
      _id: 'center-animal-therapy',
      _type: 'collectionCenter',
      name: 'Animal Therapy',
      slug: { _type: 'slug', current: 'animal-therapy' },
      zone: 'Av. Bernal',
      address: 'Plaza Alcalá, Av. Bernal 201, San Salvador.',
      location: {
        _type: 'geopoint',
        lat: 13.72251,
        lng: -89.21558,
      },
      googleMapsUrl: 'https://maps.google.com/?q=Plaza+Alcala+Avenida+Bernal+San+Salvador',
      wazeUrl: 'https://waze.com/ul?q=Plaza+Alcala+San+Salvador',
      schedule: '9:00 a. m. – 1:00 p. m.',
      days: 'Lun, Mar, Jue, Vie, Sáb',
      active: true,
      order: 3,
    },
    {
      _id: 'center-nails-by-abby',
      _type: 'collectionCenter',
      name: 'Nails by Abby',
      slug: { _type: 'slug', current: 'nails-by-abby' },
      zone: 'Santa Tecla',
      address: 'Colonia Utila, final 14 calle oriente, casa 4, Santa Tecla.',
      location: {
        _type: 'geopoint',
        lat: 13.67105,
        lng: -89.28102,
      },
      googleMapsUrl: 'https://maps.google.com/?q=Colonia+Utila+Santa+Tecla',
      wazeUrl: 'https://waze.com/ul?q=Colonia+Utila+Santa+Tecla',
      schedule: '8:00 a. m. – 6:00 p. m.',
      days: 'Lun – Sáb',
      phone: '+503 7844 9676',
      active: true,
      order: 4,
    },
    {
      _id: 'center-mauwi',
      _type: 'collectionCenter',
      name: 'Mauwi',
      slug: { _type: 'slug', current: 'mauwi' },
      zone: 'Antiguo Cuscatlán',
      address: 'Calle Cuscatlán Oriente 28, local 1, Antiguo Cuscatlán.',
      location: {
        _type: 'geopoint',
        lat: 13.67402,
        lng: -89.25208,
      },
      googleMapsUrl:
        'https://maps.google.com/?q=Calle+Cuscatlan+Oriente+28+Antiguo+Cuscatlan',
      wazeUrl: 'https://waze.com/ul?q=Calle+Cuscatlan+Oriente+28+Antiguo+Cuscatlan',
      schedule: '3:00 p. m. – 8:00 p. m.',
      days: 'Mar – Dom',
      active: true,
      order: 5,
    },
  ];

  for (const center of collectionCenters) {
    await client.createOrReplace(center);
    console.log(`  ✓ ${center.name} creado/actualizado.`);
  }

  console.log('\n====================================================');
  console.log('🎉 Migración completada exitosamente.');
  console.log('Todos los documentos fueron creados con IDs deterministas.');
  console.log('====================================================\n');
}

runSeed().catch((err) => {
  console.error('\n❌ Error durante la migración:', err);
  process.exit(1);
});
