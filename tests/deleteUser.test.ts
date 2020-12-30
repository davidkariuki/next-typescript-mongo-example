import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("deleteUsers")

describe("Deleting a user", () => {
  let james: UserDocument

  beforeEach(async () => {
    james = new User({ name: "James" })
    await james.save()
  })

  it("model instance remove", async () => {
    await james.remove()
    const foundUser = await User.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })

  it("class method deleteOne", async () => {
    await User.deleteOne({ _id: james.id })
    const foundUser = await User.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })

  it("class method findAndRemove", async () => {
    await User.findOneAndRemove({ _id: james.id })
    const foundUser = await User.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })

  it("class method findByIdAndRemove", async () => {
    await User.findByIdAndRemove(james.id)
    const foundUser = await User.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })
})
