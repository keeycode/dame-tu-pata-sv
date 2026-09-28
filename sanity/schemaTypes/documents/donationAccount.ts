import { defineType, defineField } from 'sanity';

export const donationAccount = defineType({
  name: 'donationAccount',
  title: 'Cuenta para Donaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Entidad / Plataforma',
      type: 'string',
      description: 'Ejemplo: Banco Agrícola, Banco Cuscatlán, Chivo Wallet, PayPal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platformType',
      title: 'Tipo de Plataforma',
      type: 'string',
      options: {
        list: [
          { title: 'Banco', value: 'bank' },
          { title: 'Billetera Digital', value: 'wallet' },
          { title: 'PayPal', value: 'paypal' },
          { title: 'Otra', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accountType',
      title: 'Tipo de Cuenta / Etiqueta',
      type: 'string',
      description: 'Ejemplo: Ahorros, Corriente, Billetera, Internacional',
      initialValue: 'Ahorros',
    }),
    defineField({
      name: 'holder',
      title: 'Titular de la Cuenta',
      type: 'string',
      description: 'Nombre de la persona o entidad titular (ej: Juliana Medina)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accountNumber',
      title: 'Número de Cuenta',
      type: 'string',
      description: 'Número para transferencias bancarias (ej: 313343941)',
    }),
    defineField({
      name: 'identifier',
      title: 'Identificador / DUI / Usuario Alternativo',
      type: 'string',
      description: 'Para Chivo Wallet (DUI 04885311-2) o PayPal (usuario juliemedbell)',
    }),
    defineField({
      name: 'scope',
      title: 'Alcance Geográfico',
      type: 'string',
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
      title: 'URL Externa de Pago (Opcional)',
      type: 'url',
      description: 'Enlace directo de cobro (ej: enlace PayPal.me cuando esté activo)',
    }),
    defineField({
      name: 'status',
      title: 'Estado de la Cuenta',
      type: 'string',
      options: {
        list: [
          { title: 'Activa y Verificada', value: 'active' },
          { title: 'Pendiente de Confirmación', value: 'pending' },
          { title: 'Deshabilitada', value: 'disabled' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      description: 'Si está desactivado, no se mostrará en la landing',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
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
      const activeText = active ? '' : ' [INACTIVO]';
      return {
        title: `${statusIcon} ${title} (${scope === 'local' ? 'Local' : 'Internacional'})${activeText}`,
        subtitle: `${holder} · ${dataLabel}`,
      };
    },
  },
  orderings: [
    {
      title: 'Por Orden Ascendente',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
