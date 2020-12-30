import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("findUsers")

describe("Reading users out of the database", () => {
  let joe: UserDocument,
    alex: UserDocument,
    maria: UserDocument,
    zac: UserDocument

  beforeEach(async () => {
    joe = new User({ name: "Joe" })
    alex = new User({ name: "Alex" })
    maria = new User({ name: "Maria" })
    zac = new User({ name: "Zac" })

    await Promise.all([joe.save(), alex.save(), maria.save(), zac.save()])
  })

  it("finds all users named Joe", async () => {
    const dbUser = await User.find({ name: "Joe" })

    expect(dbUser[0].id).toEqual(joe.id)
  })

  it("finds a user with a particular id", async () => {
    const foundUser = await User.findOne({ _id: joe._id })

    expect(foundUser?.name).toEqual(joe.name)
  })

  it("can skip and limit the result set", async () => {
    const users = await User.find({}).sort("name").skip(1).limit(2)

    expect(users.length).toEqual(2)
    expect(users[0].name).toEqual(joe.name)
    expect(users[1].name).toEqual(maria.name)
  })
})
