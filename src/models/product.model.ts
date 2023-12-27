import slugify from 'slugify'
import mongoose, { Document, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'products'

interface ProductDoc extends Document {
  product_name: string
  product_thumb: string
  product_description: string
  product_slug: string
  product_price: number
  product_quantity: number
  product_type: string
  product_category: { type: Schema.Types.ObjectId; ref: 'Category' }
}

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String, required: true },
    product_slug: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_category: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

// create index for search
productSchema.index({ product_name: 'text', product_description: 'text' })

// run before .save() and .create()
productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true })
  next()
})

export const ProductModel = mongoose.model<ProductDoc>(DOCUMENT_NAME, productSchema)
