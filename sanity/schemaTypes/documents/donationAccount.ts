import { defineType, defineField } from 'sanity';

export const donationAccount = defineType({
  name: 'donationAccount',
  title: 'Cuenta de donación',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información general', default: true },
    { name: 'links', title: 'Enlaces' },
    { name: 'publishing', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Banco / plataforma',
      description: 'Nombre de la entidad o plataforma (ej: Banco Agrícola, Chivo Wallet, PayPal).',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platformType',
      title: 'Tipo de plataforma',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Banco', value: 'bank' },
          { title: 'Billetera digital', value: 'wallet' },
          { title: 'PayPal', value: 'paypal' },
          { title: 'Otra', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accountType',
      title: 'Tipo de cuenta',
      description: 'Ejemplo: Ahorros, Corriente, Billetera digital, Internacional.',
      type: 'string',
      group: 'general',
      initialValue: 'Ahorros',
    }),
    defineField({
      name: 'holder',
      title: 'Titular',
      description: 'Nombre de la persona o entidad titular (ej: Juliana Medina).',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accountNumber',
      title: 'Número de cuenta',
      description: 'Número para transferencias bancarias (si aplica).',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'identifier',
      title: 'Identificador / DUI / Usuario',
      description: 'Para Chivo Wallet (DUI) o usuario de PayPal (si aplica).',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'scope',
      title: 'Local / internacional',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Local (El Salvador)', value: 'local' },
          { title: 'Internacional', value: 'international' },
        ],
        layout: 'radio',
      },
      initialValue: 'local',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Enlace externo',
      description: 'Enlace directo de pago o cobro en línea (opcional).',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: 'Activa', value: 'active' },
          { title: 'Pendiente', value: 'pending' },
          { title: 'Deshabilitada', value: 'disabled' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Mostrar en la página',
      description: 'Desactívalo para conservar el registro sin mostrarlo públicamente.',
      type: 'boolean',
      group: 'publishing',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      description: 'Los números menores aparecerán primero.',
      type: 'number',
      group: 'publishing',
      initialValue: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      holder: 'holder',
      accountNumber: 'accountNumber',
      identifier: 'identifier',
      scope: 'scope',
      status: 'status',
      active: 'active',
    },
    prepare({ title, holder, accountNumber, identifier, scope, status, active }) {
      const dataLabel = accountNumber || identifier || 'Sin número';
      const statusIcon = status === 'active' ? '✅' : status === 'pending' ? '⏳' : '🚫';
      const visibilityLabel = active ? '' : ' [Oculto]';
      return {
        title: `${statusIcon} ${title} (${scope === 'local' ? 'Local' : 'Internacional'})${visibilityLabel}`,
        subtitle: `${holder || 'Sin titular'} · ${dataLabel}`,
      };
    },
  },
  orderings: [
    {
      title: 'Por orden de aparición',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

