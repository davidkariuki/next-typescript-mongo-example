import type { IUser } from "../models/users"
import { models, connectDb, connection } from "../utils/db"

beforeAll(async () => await connectDb())
afterAll(async () => await connection.close())

describe("Deleting a user", () => {
  const users = models.users
  let james: IUser

  beforeEach(async () => {
    james = new users({ name: "James" })
    await james.save()
  })

  it("model instance remove", async () => {
    await james.remove()
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })

  it("class method deleteOne", async () => {
    await users.deleteOne({ _id: james.id })
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })

  it("class method findAndRemove", async () => {
    await users.findOneAndRemove({ _id: james.id })
    const foundUser = await users.findOne({ name: "James" })

    expect(foundUser).toBeNull()
  })
})
