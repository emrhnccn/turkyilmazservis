import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { service } from './service'
import { caseStudy } from './caseStudy' // <-- Eklendi
import { maintenanceType } from './maintenance'
import { sparePartType } from './sparePart'
// diğer importlar (siteSettings, service, caseStudy vb.)



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, caseStudy, maintenanceType, sparePartType], // <-- caseStudy, maintenanceType ve sparePartType eklendi
}