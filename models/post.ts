import { Types, Schema } from "mongoose"

export interface IPost extends Types.Subdocument {
  title: string
}

const PostSchema = new Schema({
  title: { type: String, required: [true, "Title is required"] },
})

export default PostSchema
