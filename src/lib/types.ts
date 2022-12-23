import { ElementNode } from '@graphcms/rich-text-types'

export type PriceVariant = {
  weight: number
  price: number
}

export type Picture = {
  fileName: string
  url: string
  alt?: string
}

export type Product = {
  id: string
  name: string
  subtitle: string
  description: { raw: { children: ElementNode[] } }
  roastDate: string
  roastLevel: string
  priceVariants: PriceVariant[]
  pictures: Picture[]
  thumbnail: Picture
}

export type Props = {
  products: Product[]
}
