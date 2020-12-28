import { model, Types, Schema, Document } from "mongoose"
import { CommentDocument } from "./comment"

export interface BlogPostDocument extends Document {
  title: string
  content: string
  comments?: Types.Array<CommentDocument>
}

export const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: { type: String, required: [true, "Content is required"] },
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
)

export default model<BlogPostDocument>("blogPosts", BlogPostSchema)
