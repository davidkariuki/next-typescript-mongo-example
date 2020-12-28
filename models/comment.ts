import { model, Types, Schema, Document } from "mongoose"
import { UserDocument } from "./user"

export interface CommentDocument extends Document {
  content: string
  user: UserDocument["_id"]
}

export const CommentSchema = new Schema(
  {
    content: { type: String, required: [true, "Content is required"] },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)
export default model<CommentDocument>("comments", CommentSchema)
