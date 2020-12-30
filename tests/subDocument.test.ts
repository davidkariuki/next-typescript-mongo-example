import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("subDocument")

describe("Subdocument (posts)", () => {
  it("can create a subdocument", async () => {
    const joe: UserDocument = new User({
      name: "Joe",
      posts: [{ title: "First Post" }],
    })
    await joe.save()
    const foundUser = await User.findOne({ _id: joe._id })

    expect(foundUser?.posts?.[0].title).toEqual("First Post")
  })

  it("can add a subdocument to an existing record", async () => {
    const joe: UserDocument = await User.create({ name: "Joe", posts: [] })
    joe.posts?.push({ title: "First Post" })
    await joe.save()
    const foundUser = await User.findOne({ _id: joe._id })

    expect(foundUser?.posts?.[0].title).toEqual("First Post")
  })

  it("can remove a subdocument from an existing record", async () => {
    const joe: UserDocument = await User.create({
      name: "Joe",
      posts: [{ title: "New Post" }],
    })
    joe.posts?.[0].remove()
    await joe.save()
    const foundUser = await User.findOne({ _id: joe._id })

    expect(foundUser?.posts?.length).toEqual(0)
  })
})
