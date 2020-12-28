import users from "../models/users"
import setupDB from "./setup-tests"

setupDB("createUsers")

describe("Creating user records", () => {
  it("should insert a doc into collection", async (done) => {
    await users.create({ name: "John" })

    const insertedUser = await users.findOne({ name: "John" })
    expect(insertedUser?.name).toEqual("John")
    done()
  })
})
