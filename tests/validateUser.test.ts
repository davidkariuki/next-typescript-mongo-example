import User, { UserDocument } from "../models/user"
import setupDB from "./setup-tests"

setupDB("validateUsers")

describe("Validating a user", () => {
  it("requires a name", () => {
    const user: UserDocument = new User({ name: undefined })
    const valdationResult = user.validateSync()

    expect(valdationResult?.message).toMatch("Name is required")
  })

  it("requires a name longer than 2 characters", () => {
    const user: UserDocument = new User({ name: "Bo" })
    const valdationResult = user.validateSync()

    expect(valdationResult?.message).toMatch(
      "Name must be longer than 2 characters"
    )
  })

  it("disallows invalid records from being saved", async () => {
    const user: UserDocument = new User({ name: "Bo" })

    await expect(user.save()).rejects.toThrow(
      /Name must be longer than 2 characters/
    )
  })
})
