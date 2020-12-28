import mongoose, { Types, Schema, Document } from "mongoose"
import Post, { IPost } from "./post"

export interface IUser extends Document {
  name: string
  postCount?: number
  posts?: Types.Array<IPost>
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be longer than 2 characters"],
    },
    postCount: { type: Number, required: true, default: 0 },
    posts: [Post],
  },
  { timestamps: true }
)

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    delete ret._id
  },
})

export default mongoose.model<IUser>("users", schema)
