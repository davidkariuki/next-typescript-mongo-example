import mongoose from "mongoose"
import User from "../models/user"

const connection = mongoose.connection
const models = { User }

const connectDb = () => {
  if (connection.readyState !== 0) return

  mongoose.connect(process.env.MONGODB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

export { connectDb, models, connection }
