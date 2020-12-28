import User from "../models/user"
import setupDB from "./setup-tests"

setupDB("createUsers")

describe("Creating user records", () => {
  it("should insert a doc into collection", async (done) => {
    await User.create({ name: "John" })

    const insertedUser = await User.findOne({ name: "John" })
    expect(insertedUser?.name).toEqual("John")
    done()
  })
})
