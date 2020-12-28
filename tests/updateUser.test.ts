import users, { IUser } from "../models/users"
import setupDB from "./setup-tests"

setupDB("updateUsers")

describe("Updating a user", () => {
  let james: IUser
  const newName = "Jamie"

  beforeEach(async () => {
    james = await users.create({ name: "James", postCount: 0 })
  })

  it("model instance assign and save", async (done) => {
    james.name = newName
    await james.save()
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
    done()
  })

  it("model instance set and save", async (done) => {
    james.set({ name: newName })
    await james.save()
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
    done()
  })

  it("class method updateOne", async (done) => {
    await users.updateOne({ _id: james._id }, { name: newName })
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
    done()
  })

  it("class method findOneAndUpdate", async (done) => {
    await users.findOneAndUpdate({ _id: james._id }, { name: newName })
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
    done()
  })

  it("class method findByIdAndUpdate", async (done) => {
    await users.findByIdAndUpdate({ _id: james._id }, { name: newName })
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.name).toEqual(newName)
    done()
  })

  it("increments postCount by one", async (done) => {
    await users.updateOne({ _id: james._id }, { $inc: { postCount: 1 } })
    const jamie = await users.findOne({ _id: james._id })

    expect(jamie?.postCount).toEqual(1)
    done()
  })
})
