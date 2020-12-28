import { model, Types, Schema, Document } from "mongoose"
import Post, { IPost } from "./post"
import { BlogPostDocument, BlogPostSchema } from "./blogPost"

export interface UserDocument extends Document {
  name: string
  postCount?: number
  likes?: number
  posts?: Types.Array<IPost>
  blogPosts?: Types.Array<BlogPostDocument>
}

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be longer than 2 characters"],
    },
    likes: { type: Number, default: 0 },
    posts: [Post],
    blogPosts: [{ type: Types.ObjectId, ref: "blogPosts" }],
  },
  { timestamps: true }
)

UserSchema.virtual("postCount").get(function (this: UserDocument) {
  return this?.posts?.length
})

UserSchema.pre<UserDocument>("remove", function (next) {
  const BlogPost = model("blogPosts", BlogPostSchema)

  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next())
})

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    delete ret._id
  },
})

export default model<UserDocument>("users", UserSchema)
