import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("updateUsers")

describe("Updating a user", () => {
  let james: UserDocument
  const newName = "Jamie"

  beforeEach(async () => {
    james = await User.create({ name: "James", likes: 0 })
  })

  it("model instance assign and save", async () => {
    james.name = newName
    await james.save()
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
  })

  it("model instance set and save", async () => {
    james.set({ name: newName })
    await james.save()
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
  })

  it("class method updateOne", async () => {
    await User.updateOne({ _id: james._id }, { name: newName })
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
  })

  it("class method findOneAndUpdate", async () => {
    await User.findOneAndUpdate({ _id: james._id }, { name: newName })
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
  })

  it("class method findByIdAndUpdate", async () => {
    await User.findByIdAndUpdate({ _id: james._id }, { name: newName })
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
  })

  it("increments likes by one", async () => {
    await User.updateOne({ _id: james._id }, { $inc: { likes: 10 } })
    const jamie = await User.findOne({ _id: james._id })

    expect(jamie?.likes).toEqual(10)
  })
})
