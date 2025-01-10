// /sanity/schemaTypes/pastorTypes.ts

import { SchemaTypeDefinition } from 'sanity';
import { personFields } from './personFields';

export const pastorSchema: SchemaTypeDefinition = {
  name: 'pastor',
  title: 'Pastor',
  type: 'document',
  fields: [
    ...personFields, // Spread shared fields from personFields
    {
      name: 'specialty',
      title: 'Specialty',
      type: 'string', // Unique field for pastors
      description: 'The area of expertise or focus of the pastor (e.g., youth, marriage counseling)',
    },
    {
      name: 'sermonLinks',
      title: 'Sermon Links',
      type: 'array',
      of: [
        {
          type: 'url',
          title: 'Sermon URL',
        },
      ], // For sermon archive or links to recorded sermons
    },
    {
      name: 'churchAffiliation',
      title: 'Church Affiliation',
      type: 'reference',
      to: [{ type: 'churchAffiliation' }], // Reference to a church or ministry affiliation document
    },
  ],
};
