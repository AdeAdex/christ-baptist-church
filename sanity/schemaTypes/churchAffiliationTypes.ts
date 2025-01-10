// /sanity/schemaTypes/churchAffiliationTypes.ts

import { SchemaTypeDefinition } from 'sanity';

export const churchAffiliationSchema: SchemaTypeDefinition = {
        name: 'churchAffiliation',
        title: 'Church Affiliation',
        type: 'document',
        fields: [
          {
            name: 'churchName',
            title: 'Church Name',
            type: 'string',
          },
          {
            name: 'location',
            title: 'Location',
            type: 'string',
          },
          {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
          },
          {
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
          },
        ],
      };
      
