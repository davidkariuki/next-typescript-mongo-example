import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("findUsers")

describe("Reading User out of the database", () => {
  let joe: UserDocument

  beforeEach(async () => {
    joe = await User.create({ name: "Joe" })
  })

  it("finds all User named Joe", async (done) => {
    const dbUser = await User.find({ name: "Joe" })

    expect(dbUser[0].id).toEqual(joe.id)
    done()
  })

  it("finds a user with a particular id", async (done) => {
    const foundUser = await User.findOne({ _id: joe._id })

    expect(foundUser?.name).toEqual(joe.name)
    done()
  })
})
