// /sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'
import { pastorSchema } from './pastorTypes'
import { deaconSchema } from './deaconTypes'
import { churchAffiliationSchema } from './churchAffiliationTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pastorSchema, deaconSchema,churchAffiliationSchema],
}
