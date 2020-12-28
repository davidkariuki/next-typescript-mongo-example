import type { Config } from "@jest/types"
import { createJestPreset } from "ts-jest/utils"

const config: Config.InitialOptions = {
  transform: createJestPreset().transform,
  verbose: true,
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["<rootDir>/globalConfig.json"],
}

export default config
