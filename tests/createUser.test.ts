import { models, connectDb, connection } from "../utils/db"

beforeAll(async () => await connectDb())
afterAll(async () => await connection.close())

describe("Creating user records", () => {
  it("should insert a doc into collection", async () => {
    const users = models.users
    await users.create({ name: "John" })

    const insertedUser = await users.findOne({ name: "John" })
    expect(insertedUser?.name).toEqual("John")
  })
})
