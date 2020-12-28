import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  name: string
  postCount?: number
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    postCount: { type: Number, required: true, default: 0 },
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
