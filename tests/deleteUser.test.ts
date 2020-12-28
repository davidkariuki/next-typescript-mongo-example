import users, { IUser } from "../models/users"
import setupDB from "./setup-tests"

setupDB("deleteUsers")

describe("Deleting a user", () => {
  let james: IUser

  beforeEach(async () => {
    james = new users({ name: "James" })
    await james.save()
  })

  it("model instance remove", async (done) => {
    await james.remove()
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
    done()
  })

  it("class method deleteOne", async (done) => {
    await users.deleteOne({ _id: james.id })
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
    done()
  })

  it("class method findAndRemove", async (done) => {
    await users.findOneAndRemove({ _id: james.id })
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
    done()
  })

  it("class method findByIdAndRemove", async (done) => {
    await users.findByIdAndRemove(james.id)
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
    done()
  })
})
