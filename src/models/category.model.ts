import mongoose, { Schema } from 'mongoose'

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'categories'

const categorySchema = new Schema(
  {
    category_name: { type: String, required: true }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

export const CategoryModel = mongoose.model(DOCUMENT_NAME, categorySchema)
