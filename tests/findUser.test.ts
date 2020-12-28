import type { IUser } from "../models/users"
import { models, connectDb, connection } from "../utils/db"

beforeAll(async () => await connectDb())
afterAll(async () => await connection.close())

describe("Reading users out of the database", () => {
  const users = models.users
  let joe: IUser

  beforeEach(async () => {
    joe = new users({ name: "Joe" })

    await joe.save()
  })

  it("finds all users named Joe", async () => {
    const dbUsers = await users.find({ name: "Joe" })

    expect(dbUsers[0]._id).toEqual(joe._id)
  })

  it("finds a user with a particular id", async () => {
    const foundUser = await users.findOne({ _id: joe.id })

    expect(foundUser?.name).toEqual(joe.name)
  })
})
