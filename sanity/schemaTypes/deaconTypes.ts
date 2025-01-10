// /sanity/schemaTypes/deaconTypes.ts

import { SchemaTypeDefinition } from 'sanity';
import { personFields } from './personFields';

export const deaconSchema: SchemaTypeDefinition = {
  name: 'deacon',
  title: 'Deacon',
  type: 'document',
  fields: [
    ...personFields, // Spread shared fields from personFields
    {
      name: 'churchAffiliation',
      title: 'Church Affiliation',
      type: 'reference',
      to: [{ type: 'churchAffiliation' }], // Reference to church affiliation document
    },
    {
      name: 'serviceArea',
      title: 'Service Area',
      type: 'string', // Specific area of ministry (e.g., community outreach, event coordination)
    },
    {
      name: 'activeSince',
      title: 'Active Since',
      type: 'datetime', // When they started serving as a deacon
    },
    {
      name: 'isCurrentlyActive',
      title: 'Currently Active',
      type: 'boolean', // Track whether they are actively serving or not
    },
  ],
};

