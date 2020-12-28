import User, { IUser } from "../models/user"
import setupDB from "./setup-tests"

setupDB("virtualTypes")

describe("Virtual types", () => {
  it("postCount returns number of posts", async (done) => {
    const joe: IUser = await User.create({
      name: "Joe",
      posts: [{ title: "New Post" }],
    })

    expect(joe.postCount).toEqual(1)
    done()
  })
})
