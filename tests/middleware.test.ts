import BlogPost, { BlogPostDocument } from "../models/blogPost"
import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("middleware")

describe("Middleware", () => {
  let joe: UserDocument, blogPost: BlogPostDocument

  beforeEach(async () => {
    joe = new User({ name: "Joe" })
    blogPost = new BlogPost({
      title: "JS is great",
      content: "Yep it really is",
    })

    joe.blogPosts?.push(blogPost)

    await Promise.all([joe.save(), blogPost.save()])
  })

  it("cleans up dangling blog posts on remove", async () => {
    await joe.delete()

    expect(await BlogPost.count()).toEqual(0)
  })
})
