import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("virtualTypes")

describe("Virtual types", () => {
  it("postCount returns number of posts", async () => {
    const joe: UserDocument = await User.create({
      name: "Joe",
      posts: [{ title: "New Post" }],
    })

    expect(joe.postCount).toEqual(1)
  })
})
