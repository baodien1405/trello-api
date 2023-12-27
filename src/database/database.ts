import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '@/config'

let trelloDatabaseInstance: any = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const connectDB = async () => {
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const closeDB = async () => {
  await mongoClientInstance.close()
}

export const getDB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')

  return trelloDatabaseInstance
}
