// Objetos
import { socialLink } from './objects/socialLink';
import { seoSettings } from './objects/seoSettings';
import { aboutPillar } from './objects/aboutPillar';
import { helpAction } from './objects/helpAction';

// Singletons
import { siteSettings } from './singletons/siteSettings';
import { landingPage } from './singletons/landingPage';

// Colecciones
import { adoptionDog } from './documents/adoptionDog';
import { donationAccount } from './documents/donationAccount';
import { supplyCategory } from './documents/supplyCategory';
import { supplyItem } from './documents/supplyItem';
import { collectionCenter } from './documents/collectionCenter';

export const schemaTypes = [
  // Objetos
  socialLink,
  seoSettings,
  aboutPillar,
  helpAction,

  // Singletons
  siteSettings,
  landingPage,

  // Colecciones
  adoptionDog,
  donationAccount,
  supplyCategory,
  supplyItem,
  collectionCenter,
];
