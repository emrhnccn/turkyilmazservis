import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { service } from './service'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service],
}