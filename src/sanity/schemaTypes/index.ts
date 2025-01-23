
import { type SchemaTypeDefinition } from 'sanity'
import {blog} from '../../sanity/schemaTypes/blog'
import {hero} from '../../sanity/schemaTypes/hero'
import {productDetails}from '../../sanity/schemaTypes/product/cardproduct'
import faq from '../../sanity/schemaTypes/faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog,hero,productDetails,faq],
}
