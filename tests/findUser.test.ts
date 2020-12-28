import users, { IUser } from "../models/users"
import setupDB from "./setup-tests"

setupDB("findUsers")

describe("Reading users out of the database", () => {
  let joe: IUser

  beforeEach(async () => {
    joe = await users.create({ name: "Joe" })
  })

  it("finds all users named Joe", async (done) => {
    const dbUsers = await users.find({ name: "Joe" })

    expect(dbUsers[0].id).toEqual(joe.id)
    done()
  })

  it("finds a user with a particular id", async (done) => {
    const foundUser = await users.findOne({ _id: joe._id })

    expect(foundUser?.name).toEqual(joe.name)
    done()
  })
})
