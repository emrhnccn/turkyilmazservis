import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { service } from './service'
import { caseStudy } from './caseStudy' // <-- Eklendi

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, caseStudy], // <-- caseStudy eklendi
}