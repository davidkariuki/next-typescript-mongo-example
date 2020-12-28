import BlogPost, { BlogPostDocument } from "../models/blogPost"
import Comment, { CommentDocument } from "../models/comment"
import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("associations")

describe("Associations", () => {
  let joe: UserDocument, blogPost: BlogPostDocument, comment: CommentDocument

  beforeEach(async (done) => {
    joe = new User({ name: "Joe" })
    blogPost = new BlogPost({
      title: "JS is great",
      content: "Yep it really is",
    })
    comment = new Comment({
      content: "Congrats on a great post",
      user: joe,
    })

    joe.blogPosts?.push(blogPost)
    blogPost.comments?.push(comment)

    await Promise.all([joe.save(), blogPost.save(), comment.save()])
    done()
  })

  it("saves the relation between a user and a blog post", async (done) => {
    const user = await User.findOne({ _id: joe._id }).populate("blogPosts")

    expect(user?.blogPosts?.[0].title).toEqual(blogPost.title)
    done()
  })

  it("saves a full relation graph", async (done) => {
    const user = await User.findOne({ _id: joe._id }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comments",
        populate: { path: "user", model: "users" },
      },
    })

    expect(user?.name).toEqual(joe.name)
    expect(user?.blogPosts?.[0].title).toEqual(blogPost.title)
    expect(user?.blogPosts?.[0].comments?.[0].content).toEqual(comment.content)
    expect(user?.blogPosts?.[0].comments?.[0].user.name).toEqual(joe.name)

    done()
  })
})
