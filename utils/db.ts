import mongoose from "mongoose"
import users from "../models/users"

const connection = mongoose.connection
const models = { users }

const connectDb = () => {
  if (connection.readyState !== 0) return

  mongoose.connect(process.env.MONGO_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

export { connectDb, models, connection }
